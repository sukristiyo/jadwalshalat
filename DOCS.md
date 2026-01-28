# 📖 Dokumentasi Fitur Aplikasi Jadwal Shalat

Berikut adalah panduan lengkap mengenai fitur-fitur yang telah diimplementasikan dalam aplikasi Jadwal Shalat Modern ini.

---

## 1. 🕌 Jadwal Shalat & Lokasi Otomatis

**Fungsi:** Menampilkan jadwal shalat 5 waktu + Imsak & Terbit berdasarkan lokasi pengguna.

**Cara Kerja:**
- **Deteksi Otomatis:** Aplikasi menggunakan GPS browser (`navigator.geolocation`) untuk mendapatkan koordinat pengguna saat pertama kali dibuka.
- **Perhitungan Akurat:** Menggunakan API Aladhan.com dengan metode perhitungan yang bisa disesuaikan (Kemenag RI, MWL, dll).
- **Manual Search:** Pengguna bisa mencari kota secara manual jika GPS tidak aktif.

**Fitur Unggulan:**
- **Hitung Mundur (Countdown)**: Menampilkan waktu tersisa menuju shalat berikutnya secara real-time.
- **Highlight Aktif**: Menandai waktu shalat yang sedang berlangsung atau akan datang.

---

## 2. 🌤️ Perkiraan Cuaca (Weather Info)

**Fungsi:** Menampilkan kondisi cuaca terkini di lokasi pengguna.

**Implementasi:**
- Terintegrasi dengan **OpenWeatherMap API**.
- Menampilkan: Ikon cuaca, Suhu (°C), Deskripsi (Cerah/Hujan), Kelembaban, dan Kecepatan Angin.
- **Smart Cache**: Data cuaca disimpan selama 30 menit di memori HP untuk menghemat kuota API dan mempercepat loading.

---

## 3. 🧭 Kompas Arah Kiblat (In-App)

**Fungsi:** Membantu pengguna menemukan arah kiblat tanpa perlu keluar aplikasi.

**Cara Pakai:**
1. Klik kartu menu **"Arah Kiblat"**.
2. Izinkan akses sensor (pada iOS wajib klik tombol "Izinkan").
3. Putar HP Anda hingga jarum menunjuk ke ikon Ka'bah.
4. Teks derajat akan menunjukkan arah yang tepat (misal: 295° untuk Jakarta).

**Teknologi:** Menggunakan sensor `DeviceOrientation` dan rumus `Haversine` untuk menghitung sudut bearing ke Mekkah.

---

## 4. 📖 Al-Qur'an Digital & Audio

**Fungsi:** Membaca Al-Qur'an per surat lengkap dengan terjemahan dan audio murottal.

**Fitur:**
- **Daftar Surat**: 114 Surat dengan nama Arab & Latin.
- **Detail Surat**: Menampilkan ayat, latin, dan terjemahan Bahasa Indonesia.
- **Audio Player**: 
  - Bisa memutar Murottal per ayat.
  - Autoplay ayat selanjutnya.
  - Tombol Play/Stop global di header surat.

---

## 5. 🔊 Notifikasi Azan Otomatis (Baru!)

**Fungsi:** Mengingatkan waktu shalat dengan suara azan dan notifikasi sistem.

**Cara Mengaktifkan:**
1. Lihat ikon **Lonceng** (🔕) di pojok kanan atas aplikasi.
2. Klik ikon tersebut. Browser akan meminta izin notifikasi -> Pilih **"Allow" / "Izinkan"**.
3. Ikon akan berubah menjadi **Lonceng Aktif** (🔔).

- **Pilih Suara Azan**: Anda dapat mengganti pilihan suara Azan (Mekkah, Madinah, dll) melalui menu **Pengaturan**.
- **Fitur Preview**: Klik ikon ▶️ di sebelah pilihan suara untuk mengetes suara sebelum menyimpan.
- Audio Azan akan berbunyi otomatis.
- Notifikasi "Waktunya Shalat" akan muncul di layar (meskipun aplikasi di-minimize).
- Halaman akan refresh otomatis setelah 3 menit untuk memuat jadwal shalat berikutnya.

---

## 6. 📱 PWA (Progressive Web App)

**Fungsi:** Aplikasi bisa diinstal layaknya aplikasi native di Android/iOS.

**Keunggulan:**
- **Installable:** Bisa ditambahkan ke Home Screen.
- **Offline Mode:** Bisa dibuka tanpa koneksi internet (menampilkan UI dasar).
- **Full Screen:** Tampilan penuh tanpa address bar browser.
- **Perbaikan Vercel 404:** Sudah dilengkapi konfigurasi khusus agar tidak error saat dibuka di HP.

---

## 7. 🎨 Tampilan & Footer

- **Premium UI:** Desain modern dengan warna gradasi hijau dan Glassmorphism.
- **Dark Mode 🌙:** Mendukung tema gelap yang nyaman di mata.
- **Social Media Footer:** Link langsung ke profil pembuat (Instagram, Facebook, GitHub, LinkedIn, Email).

---

## 🛠️ Catatan Teknis (Untuk Developer)

- **API Used:** 
  - `aladhan.com` (Jadwal Shalat)
  - `openweather.org` (Cuaca)
  - `alquran.cloud` (Qur'an Data & Audio)
- **Deployment:** Vercel
- **Stack:** HTML5, CSS3, Vanilla JavaScript (No Framework).

---

*Dibuat oleh Sukristiyo - 2026*
