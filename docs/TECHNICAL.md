# Dokumentasi Teknis - Jadwal Shalat PWA

Dokumen ini menjelaskan arsitektur teknis, alur data, dan fungsi utama dari aplikasi Jadwal Shalat.

## Arsitektur Aplikasi

Aplikasi ini menggunakan pendekatan **Vanilla JavaScript** (tanpa framework/library JS besar) untuk menjaga performa tetap ringan.

- **Frontend**: HTML5, CSS3 (Custom Properties), JavaScript ES6+.
- **Data Source**: REST API (Aladhan).
- **Persistence**: `localStorage` browser.

## Struktur Data & State

State aplikasi dikelola dalam objek global `state` di `main.js`:

```javascript
const state = {
    location: {
        lat: null,      // Latitude
        lng: null,      // Longitude
        city: '...',    // Nama Kota
        manual: false   // Flag jika user set manual
    },
    settings: {
        method: '20'    // Default: 20 (Kemenag RI)
    },
    prayers: null,      // Data jadwal harian saat ini
    nextPrayer: null    // Data waktu shalat berikutnya
};
```

## Alur Utama

### 1. Inisialisasi (`initLocation`)
- Aplikasi memeriksa `localStorage` apakah ada data lokasi tersimpan (`savedLat`, `savedLng`).
- **Jika Ada**: Load data lokasi dari storage dan langsung fetch jadwal shalat.
- **Jika Tidak Ada**: Meminta izin Geolocation browser (`navigator.geolocation.getCurrentPosition`).
    - *Success*: Ambil koordinat -> Reverse Geocode nama kota -> Simpan ke storage -> Fetch jadwal.
    - *Error*: Fallback ke lokasi default (Jakarta Pusat).

### 2. Fetch Data (`loadData`)
Aplikasi melakukan dua request paralel (`Promise.all`):
1. **Daily Timings**: `GET /timings/{date}?latitude=...&longitude=...&method=...`
2. **Monthly Calendar**: `GET /calendar?month=...&year=...&...`

Data dari Aladhan API diproses untuk ditampilkan ke UI.

### 3. Hitung Mundur (`startCountdown`)
- Fungsi ini mengambil waktu target shalat berikutnya.
- Menghitung selisih waktu sekarang dengan target.
- Mengupdate DOM setiap detik (`setInterval`).
- Jika waktu habis (00:00:00), halaman akan direload otomatis untuk memperbarui jadwal ke waktu shalat berikutnya (mencegah data stale).

## Integrasi API

### Aladhan API (Jadwal Shalat)
- **Base URL**: `https://api.aladhan.com/v1`
- **Endpoints**:
    - `/timings`: Paling sering digunakan untuk data hari ini.
    - `/calendar`: Digunakan untuk tabel jadwal bulanan.
- **Parameter Penting**:
    - `method`: Menentukan cara perhitungan (20 = Kemenag RI).
    - `latitude`, `longitude`: Koordinat lokasi.

### BigDataCloud & Estimasi Lokasi
- Digunakan untuk mengubah koordinat GPS menjadi nama kota yang mudah dibaca user (Reverse Geocoding).
- API yang dipakai: `api.bigdatacloud.net/data/reverse-geocode-client` (Free tier, client-side only).

### Nominatim (OpenStreetMap)
- Digunakan untuk fitur pencarian kota manual.
- Endpoint: `nominatim.openstreetmap.org/search`.

## Service Worker (PWA)
File `sw.js` bertugas untuk caching aset statis agar aplikasi bisa berjalan dalam kondisi *network flaky* atau offline (terbatas pada aset yang sudah dicache).
- **Cache Name**: `jadwal-shalat-v1`
- **Strategi**: Install -> Cache Assets. (Saat ini implementasi dasar).

## Kustomisasi & Styling
- `style.css` menggunakan CSS Variables (`:root`) untuk memudahkan penggantian warna tema atau font.
- Layout menggunakan Flexbox dan Grid untuk responsivitas mobile-first.
