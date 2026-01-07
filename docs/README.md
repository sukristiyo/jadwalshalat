# Jadwal Shalat PWA

Aplikasi Web Progressive (PWA) modern untuk menampilkan jadwal shalat harian dan bulanan yang akurat, lengkap dengan deteksi lokasi otomatis dan hitung mundur waktu shalat.

## Fitur Utama

- **Jadwal Shalat Harian**: Menampilkan waktu Subuh, Dzuhur, Ashar, Maghrib, dan Isya untuk hari ini.
- **Jadwal Bulanan**: Tabel lengkap jadwal shalat untuk bulan berjalan.
- **Baca Al-Qur'an**: Akses lengkap 114 Surah dengan terjemahan Bahasa Indonesia.
- **Audio Murottal**: Putar bacaan Al-Qur'an (Mishary Rashid Alafasy) per surah dengan fitur auto-scroll.
- **Deteksi Lokasi Otomatis**: Menggunakan GPS browser untuk mendeteksi lokasi pengguna dan menyesuaikan jadwal secara akurat.
- **Pencarian Kota Manual**: Fitur pencarian untuk memilih kota secara manual jika GPS tidak tersedia atau tidak akurat.
- **Hitung Mundur**: Timer *real-time* menuju waktu shalat berikutnya.
- **Highlight Baris Hari Ini**: Pada tabel bulanan, baris untuk tanggal hari ini ditandai agar mudah dilihat.
- **Pengaturan Metode Perhitungan**: Pengguna dapat memilih metode perhitungan (Kemenag RI, Muslim World League, dll).
- **PWA Ready**: Dapat diinstal sebagai aplikasi di perangkat mobile (Android/iOS) dan desktop.
- **Offline Support**: (Basic Service Worker implementation)

## Teknologi

Project ini dibangun menggunakan:
- **HTML5 & CSS3**: Layout responsif dan desain modern menggunakan variable CSS.
- **Vanilla JavaScript**: Tanpa framework, performa ringan dan cepat.
- **API Eksternal**:
  - [Aladhan API](https://aladhan.com/prayer-times-api) untuk data jadwal shalat.
  - [Nominatim OpenStreetMap](https://nominatim.org/) untuk pencarian kota.
  - [BigDataCloud](https://www.bigdatacloud.com/) untuk reverse geocoding (koordinat ke nama kota).
- **Phosphor Icons**: Ikon yang bersih dan konsisten.

## Cara Menjalankan (Local Development)

1. Clone atau download repository ini.
2. Buka folder project.
3. Anda dapat membuka file `index.html` langsung di browser, namun disarankan menggunakan local server (seperti Live Server di VS Code) agar fitur PWA dan fetch API berjalan lancar tanpa isu CORS.
4. Pastikan koneksi internet aktif untuk mengambil data API pertama kali.

## Struktur Project

- `index.html`: Struktur utama aplikasi.
- `style.css`: Styling dan tema aplikasi.
- `main.js`: Logika utama, fetch API, dan update UI.
- `sw.js`: Service Worker untuk kapabilitas PWA.
- `manifest.json`: Metadata aplikasi untuk instalasi PWA.
- `docs/`: Dokumentasi lengkap (Technical & User Guide).

---
*Dibuat dengan ❤️ sebagai panduan ibadah harian.*
