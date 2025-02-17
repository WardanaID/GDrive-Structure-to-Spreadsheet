function listAllFoldersAndFiles() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.appendRow(["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Tipe", "Nama", "Owner"]);

  var rootFolderId = "XX-IDGDRIVEDISINIXXXXXXXXX"; // ID folder utama
  listContents(rootFolderId, sheet, [], 0);
}

function listContents(folderId, sheet, pathArray, level) {
  if (level >= 5) return;

  try {
    var folder = Drive.Files.get(folderId, {fields: "id, name, owners"});
    var folderName = folder.name.replace(/"/g, '""'); // Escape karakter kutip
    var folderUrl = "https://drive.google.com/drive/folders/" + folderId;
    var owner = folder.owners && folder.owners.length > 0 ? folder.owners[0].emailAddress : "Unknown";

    var currentPath = pathArray.slice();
    currentPath[level] = {name: folderName, url: folderUrl};

    while (currentPath.length < 5) {
      currentPath.push("");
    }

    var lastRow = sheet.getLastRow() + 1;

    // Tambahkan Folder ke Spreadsheet
    for (var i = 0; i < currentPath.length; i++) {
      if (typeof currentPath[i] === "object" && currentPath[i].url) {
        var cell = sheet.getRange(lastRow, i + 1);
        cell.setFormula(`=HYPERLINK("${currentPath[i].url}"; "${currentPath[i].name}")`);
      }
    }
    sheet.getRange(lastRow, 6).setValue("📁 Folder");
    sheet.getRange(lastRow, 7).setValue(folderName);
    sheet.getRange(lastRow, 8).setValue(owner);

    // Ambil Semua File & Folder di Dalamnya
    var query = `'${folderId}' in parents and trashed = false`;
    var contents = Drive.Files.list({
      q: query,
      fields: "files(id, name, mimeType, owners)"
    });

    if (contents.files && contents.files.length > 0) {
      for (var i = 0; i < contents.files.length; i++) {
        var item = contents.files[i];
        var itemName = item.name.replace(/"/g, '""'); // Escape kutip
        var itemOwner = item.owners && item.owners.length > 0 ? item.owners[0].emailAddress : "Unknown";

        if (item.mimeType === "application/vnd.google-apps.folder") {
          // Jika item adalah Folder, lakukan rekursi
          listContents(item.id, sheet, currentPath, level + 1);
        } else {
          // Jika item adalah File
          var fileUrl = "https://drive.google.com/file/d/" + item.id + "/view";

          var fileRow = sheet.getLastRow() + 1;
          for (var j = 0; j < currentPath.length; j++) {
            if (typeof currentPath[j] === "object" && currentPath[j].url) {
              var fileCell = sheet.getRange(fileRow, j + 1);
              fileCell.setFormula(`=HYPERLINK("${currentPath[j].url}"; "${currentPath[j].name}")`);
            }
          }
          sheet.getRange(fileRow, 6).setValue("📄 File");
          var fileCell = sheet.getRange(fileRow, 7);
          fileCell.setFormula(`=HYPERLINK("${fileUrl}"; "${itemName}")`);
          sheet.getRange(fileRow, 8).setValue(itemOwner);
        }
      }
    }
  } catch (e) {
    Logger.log("Error accessing folder: " + folderId + " - " + e.toString());
  }
}
