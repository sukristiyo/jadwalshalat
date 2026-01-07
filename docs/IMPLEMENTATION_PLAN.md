# Implementation Plan & Roadmap

## Phase 1: Core Features (Completed)
- [x] **Jadwal Shalat**: Harian & Bulanan.
- [x] **Geolocation**: Auto-detect & Manual Search (Open-Meteo).
- [x] **UI/UX**: Responsive design, PWA support, Modern styling.
- [x] **Documentation**: README, Technical, User Guide, Deployment.

## Phase 2: Al-Qur'an Feature (Completed)
### Goal Description
Add a feature to read Al-Quran (Text + Translation) AND listen to the audio recitation per Surah.

### Implemented Changes
#### [MODIFY] [index.html](../index.html)
- Added `<section id="quran-section">` with Search Bar.
- Added `<div id="quran-modal">` for full-screen reading.

#### [MODIFY] [style.css](../style.css)
- Added `.quran-grid` for Surah list.
- Added typography for Arabic text (`Amiri` / `serif`).
- Added Styles for Audio Player controls.

#### [MODIFY] [main.js](../main.js)
- `fetchSurahList()`: Get 114 Surahs from API.
- `openSurahDetail(number)`: Fetch Text + Translation + Audio.
- **Audio Logic**: Sequential playback per Ayah using `playAyah(index)`.

## Phase 3: Future Ideas (Proposed)
- [ ] **Arah Kiblat**: Menggunakan kompas device atau Google Maps link.
- [ ] **Tasbih Digital**: Counter sederhana untuk dzikir.
- [ ] **Notifikasi Adzan**: Mengeluarkan suara saat waktu shalat tiba (Web Audio API).

## Verification Plan
- **Manual Test**: Buka app -> Scroll ke section Qur'an -> Buka Surah -> Play Audio.
