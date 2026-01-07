# Walkthrough Phase 2: Fitur Al-Qur'an & Audio

Dokumen ini mendetailkan **Implementasi Tahap 2** yang menambahkan fitur baca Al-Qur'an lengkap dengan audio.

## Fitur Baru

### 1. Daftar Surah
- Menampilkan 114 Surah yang diambil dari `api.alquran.cloud`.
- Dilengkapi fitur **Pencarian Real-time** (filter by nama latin/terjemahan).
- Tampilan Grid yang responsif.

### 2. Tampilan Baca (Detail Surah)
- Modal layar penuh (Full Screen) agar fokus membaca.
- Menampilkan:
    - Ayat (Teks Arab Original).
    - Terjemahan Bahasa Indonesia.
    - Nomor Ayat.

### 3. Audio Murottal (Mishary Rashid Alafasy)
- Tombol **"Putar Audio"** di bagian atas setiap surat.
- **Auto-Scroll**: Layar akan otomatis bergeser mengikuti ayat yang sedang dibacakan (Sync).
- Highlight warna hijau muda pada ayat yang sedang aktif.

## Perubahan Kode

### `index.html`
- Menambahkan section `#quran-section` di bawah jadwal shalat.
- Menambahkan `#quran-modal` untuk wadah bacaan dan player audio.

### `main.js`
- Menambahkan fungsi `fetchSurahList()`: Mengambil daftar surat saat aplikasi start.
- Menambahkan logika `window.openSurahDetail(number)`:
    - Melakukan 3 fetch sekaligus (Parallel Promise): Teks Arab, Terjemahan, dan Audio.
    - Menggabungkan data tersebut dan me-render ke HTML.
- Logika Audio Player: Menggunakan rekursif sederhana `playAyah(index)` untuk memutar ayat satu per satu secara berurutan.

### `style.css`
- Menambahkan styling untuk `.quran-card` (Kartu surat).
- Menambahkan `.modal.full-screen` untuk tampilan baca yang lega.
- Font Arab khusus (serif) agar mudah dibaca.

## Cara Menggunakan
1.  Scroll ke bawah halaman.
2.  Ketik nama surat di kolom pencarian atau pilih dari daftar.
3.  Klik surat untuk membuka.
4.  Klik tombol "Putar Audio" di pojok kanan atas untuk mendengarkan.
