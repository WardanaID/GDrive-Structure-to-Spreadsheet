# GDrive Structure to Spreadsheet

GDrive Structure to Spreadsheet adalah skrip Google Apps Script yang secara otomatis mengekstrak struktur folder dan file dari Google Drive Anda ke dalam sebuah Google Spreadsheet, mendukung hingga 6 level subfolder. Skrip ini memudahkan pelacakan, audit, dan dokumentasi isi Google Drive Anda dalam format tabel yang mudah dianalisis.

## Fitur

- Ekstraksi struktur folder dan file hingga 6 tingkat subfolder.
- Output langsung ke Google Spreadsheet dalam format tabel terstruktur.
- Mendukung Google Drive API untuk akses dan pengambilan data secara efisien.
- Otomatisasi proses dokumentasi dan audit folder serta file Google Drive.

## Cara Penggunaan

1. **Buat Spreadsheet Baru**
   - Buka Google Spreadsheet dan buat dokumen baru sesuai kebutuhan.

2. **Buka Editor Apps Script**
   - Klik menu **Extensions → Apps Script**.

3. **Tambahkan Kode Apps Script**
   - Salin dan tempel kode skrip ke dalam editor Apps Script.

4. **Aktifkan Drive API**
   - Di Google Apps Script, klik **Layanan (Services)** di panel kiri.
   - Klik **+ Add a service**.
   - Cari **Drive API**, lalu tambahkan (**Add**).

5. **Jalankan Skrip**
   - Simpan kode skrip.
   - Klik **Run → listAllFoldersAndFiles** untuk memulai proses.
   - Pada eksekusi pertama, Google akan meminta izin akses ke Google Drive dan Spreadsheet. Izinkan akses agar skrip dapat berjalan.

## Contoh Struktur Direktori Google Drive

![Cuplikan layar 2025-02-17 110031](https://github.com/user-attachments/assets/9b04d6a1-848c-4b3f-aa2f-70ec1edf63e4)

## Hasil pada Spreadsheet

![Cuplikan layar 2025-02-17 110625](https://github.com/user-attachments/assets/605cf434-b5d2-4c9f-baf5-211faf58950f)

