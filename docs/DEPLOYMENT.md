# Panduan Deployment - Jadwal Shalat PWA

Panduan ini akan membantu Anda mengonlinekan aplikasi Jadwal Shalat agar bisa diakses oleh siapa saja melalui internet. Karena aplikasi ini bersifat **Static** (Hanya HTML, CSS, JS), deployment-nya sangat mudah dan gratis.

## Opsi 1: Vercel (Rekomendasi)
Vercel sangat cepat dan otomatis.

1.  **Siapkan Akun**: Daftar di [vercel.com](https://vercel.com).
2.  **Upload Project**:
    *   Jika kode ada di **GitHub/GitLab**: Hubungkan akun GitHub Anda, pilih repository `jadwalshalat`, lalu klik **Deploy**.
    *   **Drag & Drop (Manual)**: Install [Vercel CLI](https://vercel.com/docs/cli) atau cukup drag folder project Anda ke dashboard Vercel (jika didukung).
3.  **Konfigurasi**:
    *   Framework Preset: *Other* (karena ini natif/vanilla).
    *   Root Directory: `./` (biarkan default).
4.  **Selesai**: Vercel akan memberikan URL unik (contoh: `jadwal-shalat.vercel.app`).

## Opsi 2: Netlify
Sangat mudah untuk pemula dengan fitur drag-and-drop.

1.  Buka [netlify.com](https://www.netlify.com) dan login.
2.  Masuk ke **Sites** > **Add new site** > **Deploy manually**.
3.  **Drag & Drop** seluruh folder project `jadwalshalat` Anda ke area upload di browser.
4.  Tunggu beberapa detik, dan website Anda sudah online!
5.  Anda bisa mengubah nama domain di *Site Settings* > *Change site name*.

## Opsi 3: GitHub Pages
Gratis selamanya jika Anda menaruh kode di GitHub.

1.  Push kode Anda ke repository GitHub.
2.  Buka repository tersebut, masuk ke **Settings** > **Pages**.
3.  Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
4.  Pilih branch `main` (atau `master`) dan folder `/` (root).
5.  Klik **Save**.
6.  Tunggu 1-2 menit, link website akan muncul di bagian atas halaman settings tersebut.

> **Catatan Penting**: Pastikan file utama bernama `index.html` agar server hosting bisa mengenalinya secara otomatis.
