# Jadwal Shalat & Al-Quran Web App 🕌

A modern, responsive, and feature-rich Islamic web application built with **Vanilla JavaScript** and **Vite**. This application provides accurate prayer times, full Al-Qur'an reading experience with audio, and direction to Qibla, wrapped in a beautiful UI.

![Project Preview](https://via.placeholder.com/800x400?text=Jadwal+Shalat+App+Preview)

## ✨ Key Features

- **📍 Accurate Prayer Times**: 
  - Automatic geolocation detection.
  - Manual city search (global support).
  - Countdown to the next prayer time.
  - Monthly schedule view.

- **📖 Al-Qur'an Digital**:
  - Complete 114 Surahs.
  - **Arabic Text** (Uthmani).
  - **Latin Transliteration** for easy reading.
  - **Indonesian Translation**.
  - **Audio Recitation** (Mishary Rashid Alafasy).

- **🧭 Qibla Direction**:
  - Integrated with Google Qibla Finder for precise direction.

- **🌐 Bilingual Support**:
  - One-click toggle between **Indonesian (ID)** and **English (EN)**.
  - Fully translated interface.

- **📱 Modern & Responsive**:
  - Mobile-first design.
  - PWA (Progressive Web App) ready structure.
  - Beautiful animations and glassmorphism effects.

## 🛠️ Tech Stack

- **Core**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Build Tool**: [Vite](https://vitejs.dev/) - For blazing fast development and optimized production build.
- **APIs Used**:
  - [Aladhan API](https://aladhan.com/) (Prayer Times).
  - [Al-Quran Cloud](https://alquran.cloud/) (Quran Text & Audio).
  - [Open-Meteo](https://open-meteo.com/) (Geocoding).

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher) installed on your machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/jadwal-shalat.git
    cd jadwal-shalat
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

4.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
├── public/             # Static assets (icons, manifest)
├── docs/               # Documentation files
├── index.html          # Main HTML entry
├── main.js             # Core Application Logic
├── style.css           # Global Styling
├── sw.js               # Service Worker (PWA)
└── vite.config.js      # Vite Configuration
```

## 🎨 Design

Designed with a focus on **cleanliness** and **usability**. The primary color palette uses calming greens and golds to reflect Islamic aesthetics, ensuring a spiritual yet modern user experience.

**Design Credits**: [Sukristiyo]

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
*Created with ❤️ by Sukristiyo*
