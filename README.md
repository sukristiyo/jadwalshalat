# 🕌 Jadwal Shalat & Al-Qur'an PWA

<div align="center">

![Jadwal Shalat App](https://img.shields.io/badge/Jadwal-Shalat-00A859?style=for-the-badge&logo=mosque&logoColor=white)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-4285F4?style=for-the-badge&logo=pwa&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Aplikasi web modern untuk jadwal shalat harian, Al-Qur'an digital lengkap dengan audio, dan fitur cuaca**

[Demo Live](#) • [Lapor Bug](https://github.com/yourusername/jadwalshalat/issues) • [Request Fitur](https://github.com/yourusername/jadwalshalat/issues)

</div>

---

## 📖 Tentang Project

Jadwal Shalat PWA adalah aplikasi web progresif yang dirancang untuk membantu umat Muslim dalam menjalankan ibadah harian. Aplikasi ini menampilkan waktu shalat yang akurat berdasarkan lokasi, Al-Qur'an lengkap dengan audio murottal, dan integrasi dengan berbagai fitur islami lainnya.

### ✨ Fitur Utama

#### 🕒 Jadwal Shalat
- **Deteksi Lokasi Otomatis** - GPS-based location detection
- **Pencarian Kota Manual** - Cari kota di seluruh dunia
- **Countdown Real-time** - Hitung mundur ke waktu shalat berikutnya
- **Jadwal Bulanan** - Lihat jadwal lengkap untuk bulan berjalan
- **Metode Perhitungan** - Pilih metode (Kemenag RI, MWL, Umm Al-Qura)

#### 📖 Al-Qur'an Digital
- **114 Surah Lengkap** dengan teks Arab (Uthmani)
- **Transliterasi Latin** untuk kemudahan membaca
- **Terjemahan Bahasa Indonesia** untuk setiap ayat
- **Audio Murottal** (Mishary Rashid Alafasy)
- **Auto-scroll** saat audio diputar
- **Pencarian Surah** dengan filter real-time

#### 🌤️ Perkiraan Cuaca
- **Data Real-time** dari OpenWeatherMap
- **Suhu, Humidity, Wind Speed** terintegrasi dengan lokasi
- **Cache 30 Menit** untuk efisiensi API usage
- **Bahasa Indonesia** untuk deskripsi cuaca

#### 🧭 Additional Features
- **Arah Kiblat** - Integrasi dengan Google Qibla Finder
- **Bilingual** - Toggle antara Indonesia & English
- **Dark Mode** - Theme gelap yang nyaman di mata
- **Responsive Design** - Optimal di semua ukuran layar
- **PWA Support** - Install sebagai aplikasi native

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 atau lebih tinggi)
- **npm** atau **yarn**

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/jadwalshalat.git
cd jadwalshalat

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka browser dan navigasi ke `http://localhost:5173`

### Build untuk Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology |
|----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Build Tool** | Vite 6.0 |
| **Styling** | CSS Variables, Glassmorphism, Dark Mode |
| **Icons** | Phosphor Icons |
| **PWA** | Service Worker, Web Manifest |

</div>

### APIs Yang Digunakan

- **[Aladhan API](https://aladhan.com/)** - Prayer times calculation
- **[Al-Quran Cloud](https://alquran.cloud/)** - Quran text, translation & audio
- **[OpenWeatherMap](https://openweathermap.org/)** - Weather data
- **[Open-Meteo Geocoding](https://open-meteo.com/)** - City search
- **[BigDataCloud](https://www.bigdatacloud.com/)** - Reverse geocoding

---

## 📁 Struktur Project

```
jadwalshalat/
├── public/                 # Static assets
│   ├── icon_kaaba.png     # Kiblat icon
│   └── icon_quran.png     # Quran icon
├── docs/                   # Documentation
│   ├── README.md          # Main documentation
│   ├── TECHNICAL.md       # Technical details
│   └── WALKTHROUGH.md     # Feature walkthrough
├── index.html             # Main HTML entry point
├── main.js                # Core application logic
├── style.css              # Global styles & themes
├── sw.js                  # Service Worker (PWA)
├── manifest.json          # PWA manifest
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies & scripts
```

---

## ⚙️ Konfigurasi

### Weather API Setup

Untuk mengaktifkan fitur cuaca:

1. **Daftar di OpenWeatherMap**
   - Kunjungi [openweathermap.org/api](https://openweathermap.org/api)
   - Buat akun gratis
   - Dapatkan API key Anda

2. **Update main.js**
   ```javascript
   // Line 219 di main.js
   const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Ganti dengan API key Anda
   ```

3. **Reload aplikasi** - Weather card akan muncul otomatis

### Calculation Methods

Aplikasi mendukung beberapa metode perhitungan waktu shalat:
- **Kemenag RI** (Default) - Method ID: 20
- **Muslim World League** - Method ID: 3
- **Umm Al-Qura (Makkah)** - Method ID: 4

Ubah di modal Settings atau edit `localStorage.getItem('calcMethod')` di `main.js`

---

## 🎨 Design Philosophy

Aplikasi ini dirancang dengan prinsip:
- **Clean & Modern** - UI minimalis dengan fokus pada konten
- **Islamic Aesthetics** - Palet warna hijau & gold yang menenangkan
- **User-First** - Mobile-first approach dengan UX yang intuitif
- **Performance** - Optimized loading dengan lazy loading & caching
- **Accessibility** - Contrast ratio yang baik untuk readability

### Color Palette

- **Primary**: `#00A859` (Emerald Green)
- **Accent**: `#F59E0B` (Gold/Orange)
- **Background Light**: `#F3F4F6`
- **Background Dark**: `#111827`

---

## 📱 PWA Features

Aplikasi ini adalah Progressive Web App yang dapat:
- ✅ **Diinstall** ke home screen (Android/iOS/Desktop)
- ✅ **Offline Support** (basic caching)
- ✅ **Fast Loading** dengan service worker
- ✅ **App-like Experience** tanpa browser chrome

### Install sebagai App

**Android/Chrome:**
1. Buka aplikasi di Chrome
2. Tap menu (⋮) > "Add to Home screen"
3. Aplikasi akan muncul seperti native app

**iOS/Safari:**
1. Buka aplikasi di Safari
2. Tap Share → "Add to Home Screen"

---

## 🤝 Contributing

Contributions are welcome! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Development Guidelines

- Follow existing code style
- Test di mobile dan desktop
- Ensure dark mode compatibility
- Update documentation jika perlu

---

## 🐛 Known Issues

- [ ] Weather card tidak muncul jika API key belum di-set (intentional)
- [ ] Audio murottal memerlukan internet connection (API-based)
- [ ] Geolocation mungkin tidak akurat di beberapa browser

---

## 📝 Changelog

### Version 1.1.0 (2026-01-28)
- ✨ **NEW**: Weather forecast integration dengan OpenWeatherMap
- ✨ **NEW**: Enhanced feature cards design (larger, gradients, animations)
- 🐛 **FIX**: JavaScript error pada `renderMonthlyTable()`
- 💄 **UI**: Improved hover effects dan dark mode support
- ⚡ **PERF**: Implemented 30-minute weather cache

### Version 1.0.0
- 🎉 Initial release
- ✅ Prayer times dengan geolocation
- ✅ Al-Qur'an digital lengkap
- ✅ Bilingual support (ID/EN)
- ✅ Dark mode
- ✅ PWA ready

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sukristiyo**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: sukrisstiyo29@gmail.com

---

## 🙏 Acknowledgments

- **Aladhan API** - Prayer times calculation
- **Al-Quran Cloud** - Quran data & audio
- **OpenWeatherMap** - Weather data
- **Phosphor Icons** - Beautiful icon set
- **Vite** - Amazing build tool

---

## 📞 Support

Jika Anda menemukan bug atau punya pertanyaan:
- 🐛 [Report Bug](https://github.com/yourusername/jadwalshalat/issues)
- 💡 [Request Feature](https://github.com/yourusername/jadwalshalat/issues)
- 📧 Email: sukrisstiyo29@gmail.com

---

## ⭐ Show Support

Jika project ini bermanfaat, berikan ⭐ di GitHub!

---

<div align="center">

**Made with ❤️ by Sukristiyo**

*Semoga bermanfaat untuk ibadah kita semua* 🤲

</div>
