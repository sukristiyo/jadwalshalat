/**
 * Main Application Logic
 * Architecture: Vanilla JS (No Framework)
 */
import './style.css'; // Vite handling for CSS

console.log("=== APP STARTED ===");


// --- Translations ---
// --- Translations ---
const translations = {
    id: {
        app_title: "Jadwal Shalat",
        detecting: "Mendeteksi...",
        next_prayer: "Sholat Selanjutnya",
        countdown_label: "Menuju Waktu Sholat",
        loading_schedule: "Memuat Jadwal...",
        btn_quran: "Baca Al-Qur'an",
        btn_quran_desc: "dan Terjemahannya",
        btn_qibla: "Arah Kiblat",
        btn_qibla_desc: "Cari Arah Kiblat",
        click_here: "Klik Disini",
        monthly_schedule: "Jadwal Shalat Bulan Ini",
        date: "Tanggal",
        fajr: "Subuh",
        dhuhr: "Dzuhur",
        asr: "Ashar",
        maghrib: "Maghrib",
        isha: "Isya",
        read_quran: "Baca Al-Qur'an",
        loading_quran: "Memuat Al-Qur'an...",
        settings: "Pengaturan",
        calc_method: "Metode Perhitungan",
        method_kemenag: "Kemenag RI",
        method_mwl: "Muslim World League",
        method_makkah: "Umm Al-Qura (Makkah)",
        save: "Simpan",
        search_placeholder: "Cari Surah...",
        play_audio: "Putar Audio",
        stop_audio: "Stop Audio",
        error_surah: "Gagal memuat surat.",
        no_surah: "Surat tidak ditemukan.",
        manual_location: "Lokasi Manual",
        search_city_placeholder: "Cari Kota (e.g. Jakarta)"
    },
    en: {
        app_title: "Prayer Times",
        detecting: "Detecting...",
        next_prayer: "Next Prayer",
        countdown_label: "Until Prayer Time",
        loading_schedule: "Loading Schedule...",
        btn_quran: "Read Quran",
        btn_quran_desc: "and Translations",
        btn_qibla: "Qibla Direction",
        btn_qibla_desc: "Find Qibla Direction",
        click_here: "Click Here",
        monthly_schedule: "Prayer Schedule This Month",
        date: "Date",
        fajr: "Fajr",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        read_quran: "Read Quran",
        loading_quran: "Loading Quran...",
        settings: "Settings",
        calc_method: "Calculation Method",
        method_kemenag: "Ministry of Religious Affairs RI",
        method_mwl: "Muslim World League",
        method_makkah: "Umm Al-Qura (Makkah)",
        save: "Save",
        search_placeholder: "Search Surah...",
        play_audio: "Play Audio",
        stop_audio: "Stop Audio",
        error_surah: "Failed to load Surah.",
        no_surah: "Surah not found.",
        manual_location: "Manual Location",
        search_city_placeholder: "Search City (e.g. Jakarta)"
    }
};

const state = {
    location: {
        lat: null,
        lng: null,
        city: 'Mendeteksi...',
        manual: false
    },
    settings: {
        method: localStorage.getItem('calcMethod') || '20',
        azanSound: localStorage.getItem('azanSound') || 'https://www.islamcan.com/audio/adhan/azan1.mp3'
    },
    prayers: null,
    nextPrayer: null,
    lang: localStorage.getItem('appLang') || 'id',
    theme: localStorage.getItem('appTheme') || 'light',
    adzanEnabled: localStorage.getItem('adzanEnabled') !== 'false', // Default true
    preReminder: parseInt(localStorage.getItem('preReminder') || '0'), // Default 0 (off)
    quranSettings: {
        showLatin: localStorage.getItem('quranShowLatin') !== 'false',
        showTranslation: localStorage.getItem('quranShowTrans') !== 'false',
        modePage: localStorage.getItem('quranModePage') === 'true',
        qori: localStorage.getItem('quranQori') || 'ar.alafasy'
    },
    currentSurah: null
};

// --- DOM Elements ---
const dom = {
    locationText: document.getElementById('location-text'),
    locationBtn: document.getElementById('location-btn'),
    fullDate: document.getElementById('full-date'),
    nextPrayerName: document.getElementById('next-prayer-name'),
    countdown: document.getElementById('countdown'),
    prayerList: document.getElementById('prayer-list'),
    
    // Monthly Table
    monthYearTitle: document.getElementById('month-year-title'),
    monthlyTbody: document.getElementById('monthly-tbody'),
    
    // Settings
    modal: document.getElementById('settings-modal'),
    openSettingsBtn: document.getElementById('open-settings-btn'),
    closeSettingsBtn: document.getElementById('close-settings'),
    saveSettingsBtn: document.getElementById('save-settings'),
    cityInput: document.getElementById('manual-city-input'),
    methodSelect: document.getElementById('calc-method-select'),
    azanSelect: document.getElementById('azan-sound-select'),
    previewAzanBtn: document.getElementById('preview-azan-btn'),
    
    // Monthly Filters
    monthFilter: document.getElementById('month-filter'),
    yearFilter: document.getElementById('year-filter'),
    
    // Wide Toggles
    toggleBtn: document.getElementById('lang-toggle-btn'),
    labelId: document.getElementById('label-id'),
    labelEn: document.getElementById('label-en'),
    
    themeBtn: document.getElementById('theme-toggle-btn'),
    labelLight: document.getElementById('label-light'),
    labelDark: document.getElementById('label-dark'),

    // Quran Toggles

    latinSwitch: document.getElementById('toggle-latin-switch'),
    transSwitch: document.getElementById('toggle-translation-switch'),
    quranDetailList: document.getElementById('quran-detail-list'),
    
    // Adzan
    adzanAudio: document.getElementById('adzan-audio'),
    adzanToggle: document.getElementById('adzan-toggle'),
    preReminderSelect: document.getElementById('pre-reminder-select'),

    // Quran Redesign
    quranSettingsBtn: document.getElementById('quran-settings-btn'),
    quranSettingsPopover: document.getElementById('quran-settings-popover'),
    closeQuranSettingsBtn: document.getElementById('close-quran-settings'),
    
    // Toggles (New IDs)
    latinSwitch: document.getElementById('toggle-latin-switch'),
    transSwitch: document.getElementById('toggle-translation-switch'),
    pageModeSwitch: document.getElementById('toggle-page-mode-switch'),
    
    qoriSelect: document.getElementById('qori-select'),
    
    // Header Nav
    prevSurahBtn: document.getElementById('prev-surah-btn'),
    nextSurahBtn: document.getElementById('next-surah-btn')
};

// ... (initTheme remains)

// --- Quran Settings Logic ---
function initQuranSettings() {
    // Popover Toggles
    if (dom.quranSettingsBtn && dom.quranSettingsPopover) {
        // Remove old listeners to avoid duplicates (cleaner: use named function or check)
        // For now, simpler to clone node to strip listeners if we re-run this often
        // but initQuranSettings is likely called once or idempotent checks needed.
        
        dom.quranSettingsBtn.onclick = (e) => {
            e.stopPropagation();
            dom.quranSettingsPopover.classList.toggle('hidden');
        };
        
        // click outside to close
        document.addEventListener('click', (e) => {
             if (!dom.quranSettingsPopover.contains(e.target) && !dom.quranSettingsBtn.contains(e.target)) {
                 dom.quranSettingsPopover.classList.add('hidden');
             }
        });

        if (dom.closeQuranSettingsBtn) {
            dom.closeQuranSettingsBtn.onclick = () => {
                dom.quranSettingsPopover.classList.add('hidden');
            };
        }
    }

    // Toggles
    if (dom.latinSwitch) {
        dom.latinSwitch.checked = state.quranSettings.showLatin;
        dom.latinSwitch.onchange = () => {
            state.quranSettings.showLatin = dom.latinSwitch.checked;
            localStorage.setItem('quranShowLatin', state.quranSettings.showLatin);
            updateQuranDisplay();
        };
    }

    if (dom.transSwitch) {
        dom.transSwitch.checked = state.quranSettings.showTranslation;
        dom.transSwitch.onchange = () => {
            state.quranSettings.showTranslation = dom.transSwitch.checked;
            localStorage.setItem('quranShowTrans', state.quranSettings.showTranslation);
            updateQuranDisplay();
        };
    }

    if (dom.pageModeSwitch) {
        dom.pageModeSwitch.checked = state.quranSettings.modePage;
        dom.pageModeSwitch.onchange = () => {
            state.quranSettings.modePage = dom.pageModeSwitch.checked;
            localStorage.setItem('quranModePage', state.quranSettings.modePage);
            updateQuranDisplay();
        };
    }

    if (dom.qoriSelect) {
        dom.qoriSelect.value = state.quranSettings.qori || 'ar.alafasy';
        dom.qoriSelect.onchange = () => {
             state.quranSettings.qori = dom.qoriSelect.value;
             localStorage.setItem('quranQori', state.quranSettings.qori);
             if (state.currentSurah) {
                 openSurahDetail(state.currentSurah);
             }
        };
    }

    // Nav Buttons Logic - Handled in openSurahDetail for dynamic text, 
    // but click handlers can be here or updated there.
    // Let's keep generic click handlers here that read state.
    
    if (dom.prevSurahBtn) {
        dom.prevSurahBtn.onclick = () => {
            if (state.currentSurah && state.currentSurah > 1) {
                openSurahDetail(state.currentSurah - 1);
            }
        };
    }

    if (dom.nextSurahBtn) {
        dom.nextSurahBtn.onclick = () => {
             if (state.currentSurah && state.currentSurah < 114) {
                 openSurahDetail(state.currentSurah + 1);
             }
        };
    }
}

function initTheme() {
    const theme = state.theme;
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeUI(theme);
}

function updateThemeUI(theme) {
    if (dom.themeBtn && dom.labelLight && dom.labelDark) {
        if (theme === 'dark') {
            dom.themeBtn.classList.add('active-right');
            dom.labelLight.classList.remove('active');
            dom.labelDark.classList.add('active');
        } else {
            dom.themeBtn.classList.remove('active-right');
            dom.labelLight.classList.add('active');
            dom.labelDark.classList.remove('active');
        }
    }
}

// Theme Toggle Listener
if (dom.themeBtn) {
    dom.themeBtn.addEventListener('click', () => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        state.theme = newTheme;
        localStorage.setItem('appTheme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeUI(newTheme);
    });
}

function updateLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('appLang', lang);
    
    // Update Toggle UI
    if (dom.toggleBtn && dom.labelId && dom.labelEn) {
        if (lang === 'en') {
            dom.toggleBtn.classList.add('active-right');
            dom.labelId.classList.remove('active');
            dom.labelEn.classList.add('active');
        } else {
            dom.toggleBtn.classList.remove('active-right');
            dom.labelId.classList.add('active');
            dom.labelEn.classList.remove('active');
        }
    }
    
    // Update Text Elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        } else {
            // Fallback to ID if key missing
            if (translations['id'][key]) el.innerText = translations['id'][key];
        }
    });

    // Update Placeholders
    const searchInput = document.getElementById('quran-search');
    if (searchInput) {
        searchInput.placeholder = translations[lang].search_placeholder;
    }
    if (dom.cityInput) {
        dom.cityInput.placeholder = translations[lang].search_city_placeholder;
    }

    // Re-render things if needed
    if (state.prayers) renderUI(state.prayers);
}

// Lang Toggle Listener
if (dom.toggleBtn) {
    dom.toggleBtn.addEventListener('click', () => {
        const newLang = state.lang === 'id' ? 'en' : 'id';
        updateLanguage(newLang);
    });
}

// Call initLanguage and initTheme on startup
updateLanguage(state.lang);
initTheme();


// --- API ---
const API_BASE = 'https://api.aladhan.com/v1';

// Weather API Configuration
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

// Fetch Weather Data with Cache (30 minutes)
async function fetchWeatherData(lat, lng) {
    // Check cache first (30 minutes)
    const cached = localStorage.getItem('weatherCache');
    if (cached) {
        try {
            const data = JSON.parse(cached);
            const now = Date.now();
            if (now - data.timestamp < 30 * 60 * 1000) { // 30 minutes
                console.log('Using cached weather data');
                return data.weather;
            }
        } catch (e) {
            console.error('Cache parse error:', e);
            localStorage.removeItem('weatherCache');
        }
    }
    
    // Check if API key is set
    if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('Weather API key not set');
        return null;
    }
    
    try {
        const url = `${WEATHER_API}?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric&lang=id`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Save to cache
        localStorage.setItem('weatherCache', JSON.stringify({
            weather: data,
            timestamp: Date.now()
        }));
        
        console.log('Weather data fetched:', data);
        return data;
    } catch (error) {
        console.error('Weather Fetch Error:', error);
        return null;
    }
}

// Render Weather Card
function renderWeatherCard(weatherData) {
    const weatherContainer = document.getElementById('weather-container');
    const weatherCard = document.getElementById('weather-card');
    
    if (!weatherData || !weatherContainer || !weatherCard) {
        if (weatherContainer) weatherContainer.style.display = 'none';
        return;
    }
    
    // Show container
    weatherContainer.style.display = 'block';
    
    // Extract data
    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const humidity = weatherData.main.humidity;
    const windSpeed = Math.round(weatherData.wind.speed * 3.6); // m/s to km/h
    
    // Update DOM
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const weatherHumidity = document.getElementById('weather-humidity');
    const weatherWind = document.getElementById('weather-wind');
    
    if (weatherIcon) weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    if (weatherTemp) weatherTemp.innerText = `${temp}°C`;
    if (weatherDesc) weatherDesc.innerText = description.charAt(0).toUpperCase() + description.slice(1);
    if (weatherHumidity) weatherHumidity.innerText = `${humidity}%`;
    if (weatherWind) weatherWind.innerText = `${windSpeed} km/h`;
}


async function fetchPrayers(lat, lng) {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const method = state.settings.method;

    try {
        const url = `${API_BASE}/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=${method}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 200) {
            return data.data;
        } else {
            throw new Error('API Error');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}

// --- Logic ---

function formatTime(timeStr) {
    // API returns "HH:MM", we just ensure it's clean
    return timeStr.split(" ")[0]; // Remove (WIB) if exists
}

function getNextPrayer(timings) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    // Ordered prayer keys
    const prayerKeys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    // Find first prayer that is later than now
    for (let key of prayerKeys) {
        const time = timings[key];
        const [h, m] = time.split(':').map(Number);
        const prayerMinutes = h * 60 + m;
        
        if (prayerMinutes > currentMinutes) {
            return { name: key, time: time, targetMinutes: prayerMinutes };
        }
    }
    
    // If all passed, return Fajr (next day)
    return { name: 'Fajr', time: timings['Fajr'], targetMinutes: -1, isTomorrow: true };
}

function startCountdown(targetTimeStr, isTomorrow = false) {
    const [h, m] = targetTimeStr.split(':').map(Number);
    const now = new Date();
    let target = new Date();
    target.setHours(h, m, 0, 0);
    
    if (isTomorrow || target < now) {
        target.setDate(target.getDate() + 1);
    }
    
    // Clear existing interval if any (to prevent multiple timers)
    if (window.timerInterval) clearInterval(window.timerInterval);

    function update() {
        const nowMs = new Date().getTime();
        const diff = target.getTime() - nowMs;
        
        if (diff < 0) {
            clearInterval(window.timerInterval);
            dom.countdown.innerText = "00 : 00 : 00";
            
            // Trigger Notification & Audio
            if (state.nextPrayer) {
                triggerAdhan(state.nextPrayer.name);
            }
            
            // Delay reload to let audio play (approx 3 mins)
            setTimeout(() => {
                window.location.reload();
            }, 180000); 
            return;
        }
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        dom.countdown.innerText = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

        // Pre-Reminder Check (Exact minute match, e.g. 5:00)
        if (state.preReminder > 0 && state.nextPrayer) {
            const totalSeconds = Math.floor(diff / 1000);
            const reminderSeconds = state.preReminder * 60;
            
            // Trigger 1 second window to avoid multiple alerts
            if (totalSeconds === reminderSeconds) {
                triggerPreReminder(state.nextPrayer.name);
            }
        }
    }
    
    window.timerInterval = setInterval(update, 1000);
    update();
}

function renderUI(data) {
    if (!data) return;
    
    // Date: "Rabu, 7 Januari 2026"
    // Locale: id-ID or en-US
    const locale = state.lang === 'id' ? 'id-ID' : 'en-US';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dom.fullDate.innerText = today.toLocaleDateString(locale, options);
    
    // Prayer List
    // Use translations for keys
    const prayerNames = {
        Fajr: translations[state.lang].fajr,
        Dhuhr: translations[state.lang].dhuhr,
        Asr: translations[state.lang].asr,
        Maghrib: translations[state.lang].maghrib,
        Isha: translations[state.lang].isha
    };
    
    const timings = data.timings;
    const next = getNextPrayer(timings);
    state.nextPrayer = next;
    
    dom.nextPrayerName.innerText = prayerNames[next.name] || next.name;
    startCountdown(next.time, next.isTomorrow);

    let html = '';
    for (const [key, label] of Object.entries(prayerNames)) {
        const time = formatTime(timings[key]);
        const isNext = key === next.name;
        const activeClass = isNext ? 'active' : '';
        
        // Icons mapping
        const icons = {
            'Fajr': 'ph-sun-horizon',
            'Dhuhr': 'ph-sun-dim',
            'Asr': 'ph-cloud-sun',
            'Maghrib': 'ph-moon-stars',
            'Isha': 'ph-moon'
        };

        html += `
        <div class="prayer-item ${activeClass}">
            <div class="prayer-info">
                <i class="ph-fill ${icons[key]} prayer-icon"></i>
                <span class="prayer-name">${label}</span>
            </div>
            <span class="prayer-time">${time}</span>
        </div>
        `;
    }
    
    dom.prayerList.innerHTML = html;
}

async function fetchMonthlyPrayers(lat, lng, month = null, year = null) {
    const date = new Date();
    const queryMonth = month || (date.getMonth() + 1);
    const queryYear = year || date.getFullYear();
    const method = state.settings.method;

    try {
        const url = `${API_BASE}/calendar?latitude=${lat}&longitude=${lng}&method=${method}&month=${queryMonth}&year=${queryYear}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 200) {
            return data.data;
        }
        return null;
    } catch (e) {
        console.error("Monthly fetch failed", e);
        return null;
    }
}

function renderMonthlyTable(monthlyData, selectedMonth = null, selectedYear = null) {
    if (!monthlyData) return;

    const tbody = document.getElementById('monthly-tbody');
    const title = document.getElementById('month-year-title');
    
    if (!tbody || !title) return;
    
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    
    // Build a date object for the selected month/year to get its name
    const displayMonth = selectedMonth || (today.getMonth() + 1);
    const displayYear = selectedYear || today.getFullYear();
    
    const tempDate = new Date(displayYear, displayMonth - 1, 1);
    const monthName = tempDate.toLocaleDateString(state.lang === 'id' ? 'id-ID' : 'en-US', { month: 'long' });
    
    title.innerText = `${monthName} ${displayYear}`;

    let html = '';
    
    monthlyData.forEach(dayData => {
        const dayNum = parseInt(dayData.date.gregorian.day);
        
        // Only active if it's CURRENT day AND matching month/year
        const isActive = (dayNum === currentDay && displayMonth == currentMonth && displayYear == currentYear);
        const activeClass = isActive ? 'active-row' : '';
        const timings = dayData.timings;

        html += `
            <tr class="${activeClass}">
                <td style="text-align:left; padding-left:24px;">${dayNum} ${monthName}</td>
                <td>${formatTime(timings.Imsak)}</td>
                <td>${formatTime(timings.Fajr)}</td>
                <td>${formatTime(timings.Dhuhr)}</td>
                <td>${formatTime(timings.Asr)}</td>
                <td>${formatTime(timings.Maghrib)}</td>
                <td>${formatTime(timings.Isha)}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// --- Geolocation & Search ---

async function reverseGeocode(lat, lng) {
    try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`;
        const res = await fetch(url);
        const data = await res.json();
        // Priority: Locality (City) -> PrincipalSubdivision (Province)
        return data.locality || data.city || data.principalSubdivision || 'Lokasi Terdeteksi';
    } catch (e) {
        return 'Lokasi Terdeteksi';
    }
}

async function searchCity(query) {
    try {
        dom.locationText.innerText = "Mencari...";
        // Use Open-Meteo Geocoding API (More reliable for simple usage)
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=id&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const lat = result.latitude;
            const lng = result.longitude;
            const name = result.name; 
            
            // Update State
            state.location.lat = lat;
            state.location.lng = lng;
            state.location.city = name;
            state.location.manual = true;
            
            // Save
            localStorage.setItem('savedLat', lat);
            localStorage.setItem('savedLng', lng);
            localStorage.setItem('savedCity', name);
            
            // Update UI
            dom.locationText.innerText = name;
            dom.cityInput.value = '';
            dom.modal.classList.remove('active');
            
            loadData();
        } else {
            alert('Kota tidak ditemukan! Coba nama lain.');
            dom.locationText.innerText = state.location.city;
        }
    } catch (e) {
        console.error("Search Error:", e);
        alert('Gagal mencari kota. Cek koneksi internet.');
        dom.locationText.innerText = state.location.city;
    }
}


function initLocation() {
    console.log("Initializing Location..."); // Log startup
    if (localStorage.getItem('savedLat') && localStorage.getItem('savedLng')) {
        console.log("Found saved location in LocalStorage");
        state.location.lat = localStorage.getItem('savedLat');
        state.location.lng = localStorage.getItem('savedLng');
        state.location.city = localStorage.getItem('savedCity') || 'Lokasi Tersimpan';
        dom.locationText.innerText = state.location.city;
        loadData();
    } else {
        console.log("No saved location, requesting Geolocation...");
        dom.locationText.innerText = "Mendeteksi...";
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log("Geolocation success:", position.coords);
                state.location.lat = position.coords.latitude;
                state.location.lng = position.coords.longitude;
                
                const cityName = await reverseGeocode(state.location.lat, state.location.lng);
                console.log("Reverse Geocode result:", cityName);
                
                state.location.city = cityName;
                dom.locationText.innerText = cityName;
                
                localStorage.setItem('savedLat', state.location.lat);
                localStorage.setItem('savedLng', state.location.lng);
                localStorage.setItem('savedCity', cityName);
                
                loadData();
            },
            (error) => {
                console.error("Geolocation error:", error);
                let msg = "Lokasi Off";
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        msg = "Izin Ditolak";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = "GPS Hilang";
                        break;
                    case error.TIMEOUT:
                        msg = "Waktu Habis";
                        break;
                }
                dom.locationText.innerText = msg;
                
                // Fallback to Default (Jakarta)
                console.log("Using fallback location (Jakarta)");
                state.location.lat = -6.2088;
                state.location.lng = 106.8456;
                state.location.city = "Jakarta Pusat";
                loadData();
            }
        );
    }
}

async function loadData() {
    console.log("Loading Data...");
    dom.prayerList.innerHTML = '<div class="loading-state"><i class="ph ph-spinner ph-spin"></i><p>Memuat Jadwal...</p></div>';
    
    try {
        const currentMonth = dom.monthFilter ? dom.monthFilter.value : null;
        const currentYear = dom.yearFilter ? dom.yearFilter.value : null;

        const [dailyData, monthlyData, weatherData] = await Promise.all([
            fetchPrayers(state.location.lat, state.location.lng),
            fetchMonthlyPrayers(state.location.lat, state.location.lng, currentMonth, currentYear),
            fetchWeatherData(state.location.lat, state.location.lng)
        ]);

        console.log("Data loaded:", { dailyData, monthlyData, weatherData });

        if(dailyData) {
            state.prayers = dailyData;
            renderUI(dailyData);
        } else {
            dom.prayerList.innerHTML = '<div class="loading-state"><p>Gagal memuat data.</p></div>';
        }

        if(monthlyData) {
            renderMonthlyTable(monthlyData, currentMonth, currentYear);
        }
        
        if(weatherData) {
            renderWeatherCard(weatherData);
        }
    } catch (err) {
        console.error("Error loading data:", err);
        dom.prayerList.innerHTML = '<div class="loading-state"><p>Error.</p></div>';
    }
}


// --- Event Listeners ---
if (dom.openSettingsBtn) {
    dom.openSettingsBtn.addEventListener('click', () => {
        if (dom.modal) {
            // Set current values to UI
            if (dom.methodSelect) dom.methodSelect.value = state.settings.method;
            if (dom.azanSelect) dom.azanSelect.value = state.settings.azanSound;
            
            dom.modal.classList.add('active');
            dom.modal.classList.remove('hidden');
        }
    });
}

if (dom.closeSettingsBtn) {
    dom.closeSettingsBtn.addEventListener('click', () => {
        if (dom.modal) dom.modal.classList.remove('active');
    });
}

if (dom.saveSettingsBtn) {
    dom.saveSettingsBtn.addEventListener('click', () => {
        if (dom.methodSelect) {
            const newMethod = dom.methodSelect.value;
            state.settings.method = newMethod;
            localStorage.setItem('calcMethod', newMethod);
        }
        if (dom.azanSelect) {
            const newSound = dom.azanSelect.value;
            state.settings.azanSound = newSound;
            localStorage.setItem('azanSound', newSound);
            if (azanAudio) azanAudio.src = newSound;
        }
        if (dom.modal) dom.modal.classList.remove('active');
        loadData();
    });
}

// Preview Adhan Listener
if (dom.previewAzanBtn && dom.azanSelect) {
    let isPreviewing = false;
    dom.previewAzanBtn.addEventListener('click', () => {
        if (isPreviewing) {
            azanAudio.pause();
            azanAudio.currentTime = 0;
            dom.previewAzanBtn.innerHTML = '<i class="ph ph-play"></i>';
            isPreviewing = false;
            return;
        }

        const selectedSound = dom.azanSelect.value;
        azanAudio.src = selectedSound;
        azanAudio.play();
        dom.previewAzanBtn.innerHTML = '<i class="ph ph-stop"></i>';
        isPreviewing = true;

        azanAudio.onended = () => {
            dom.previewAzanBtn.innerHTML = '<i class="ph ph-play"></i>';
            isPreviewing = false;
        };
    });
}

if (dom.locationBtn) {
    dom.locationBtn.addEventListener('click', () => {
        if (dom.modal) {
            dom.modal.classList.add('active');
            dom.modal.classList.remove('hidden');
        }
        if (dom.cityInput) dom.cityInput.focus();
    });
}

const searchBtn = document.getElementById('search-city-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        if (dom.cityInput) {
            const query = dom.cityInput.value;
            if (query) searchCity(query);
        }
    });
}

// Add Enter Key Support
if (dom.cityInput) {
    dom.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = dom.cityInput.value;
            if (query) searchCity(query);
        }
    });
}

// --- Quran Logic ---

let allSurahs = [];
let currentAudio = null;

async function fetchSurahList() {
    const quranListEl = document.getElementById('quran-list');
    if (!quranListEl) return; // Prevent crash if element missing

    try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await res.json();
        
        if (data.code === 200) {
            allSurahs = data.data;
            renderSurahList(allSurahs);
        } else {
            quranListEl.innerHTML = '<p class="error">Gagal memuat surat.</p>';
        }
    } catch (e) {
        console.error("Quran Fetch Error", e);
        quranListEl.innerHTML = '<p class="error">Gagal memuat surat. Cek koneksi.</p>';
    }
}

function renderSurahList(surahs) {
    const quranListEl = document.getElementById('quran-list');
    if (!quranListEl) return;
    
    // Clear current content
    quranListEl.innerHTML = '';
    
    if (surahs.length === 0) {
        quranListEl.innerHTML = '<p>Surat tidak ditemukan.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    surahs.forEach(surah => {
        const card = document.createElement('div');
        card.className = 'quran-card';
        
        // Attach event listener directly
        card.addEventListener('click', () => {
            openSurahDetail(surah.number);
        });

        card.innerHTML = `
            <div class="surah-number">${surah.number}</div>
            <div>
                <div class="surah-name-latin">${surah.englishName}</div>
                <div class="surah-info">${surah.englishNameTranslation} • ${surah.numberOfAyahs} Ayat</div>
            </div>
            <div class="surah-name-arabic">${surah.name}</div>
        `;
        
        fragment.appendChild(card);
    });

    quranListEl.appendChild(fragment);
}

// Search Logic
const quranSearchInput = document.getElementById('quran-search');
if (quranSearchInput) {
    quranSearchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = allSurahs.filter(s => 
            s.englishName.toLowerCase().includes(keyword) || 
            s.englishNameTranslation.toLowerCase().includes(keyword)
        );
        renderSurahList(filtered);
    });
}

// Detail & Audio Logic
// Detail & Audio Logic
window.openSurahDetail = async function(number) {
    state.currentSurah = number;
    const modal = document.getElementById('quran-modal');
    const content = document.getElementById('quran-detail-list');
    const title = document.getElementById('quran-title-modal');
    const subtitle = document.getElementById('quran-surah-info');
    
    // Init settings logic if not already (or ensure listeners are active)
    initQuranSettings();

    if (!modal || !content) return;

    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    updateQuranDisplay();
    content.innerHTML = '<div class="loading-state"><i class="ph ph-spinner ph-spin"></i> Memuat Ayat...</div>';
    
    // Update Header Nav Buttons
    if (allSurahs.length > 0) {
        if (dom.prevSurahBtn) {
            if (number > 1) {
                const prev = allSurahs[number - 2];
                dom.prevSurahBtn.innerHTML = `<i class="ph ph-caret-left"></i> <span class="desktop-only">${prev.englishName}</span>`;
                dom.prevSurahBtn.disabled = false;
                dom.prevSurahBtn.style.opacity = '1';
            } else {
                dom.prevSurahBtn.disabled = true;
                dom.prevSurahBtn.style.opacity = '0.5';
                dom.prevSurahBtn.innerHTML = `<i class="ph ph-caret-left"></i>`;
            }
        }
        
        if (dom.nextSurahBtn) {
            if (number < 114) {
                const next = allSurahs[number];
                dom.nextSurahBtn.innerHTML = `<span class="desktop-only">${next.englishName}</span> <i class="ph ph-caret-right"></i>`;
                dom.nextSurahBtn.disabled = false;
                dom.nextSurahBtn.style.opacity = '1';
            } else {
                dom.nextSurahBtn.disabled = true;
                dom.nextSurahBtn.style.opacity = '0.5';
                dom.nextSurahBtn.innerHTML = `<i class="ph ph-caret-right"></i>`;
            }
        }
    }
    
    try {
        const qoriEdition = state.quranSettings.qori || 'ar.alafasy';
        
        let arabicData, transData, audioData, latinData;

        try {
            const [arabicRes, transRes, audioRes, latinRes] = await Promise.all([
                fetch(`https://api.alquran.cloud/v1/surah/${number}`),
                fetch(`https://api.alquran.cloud/v1/surah/${number}/id.indonesian`),
                fetch(`https://api.alquran.cloud/v1/surah/${number}/${qoriEdition}`),
                fetch(`https://api.alquran.cloud/v1/surah/${number}/en.transliteration`)
            ]);

            console.log("Responses received:", { arabicRes, transRes, audioRes, latinRes });

            arabicData = await arabicRes.json();
            transData = await transRes.json();
            audioData = await audioRes.json();
            latinData = await latinRes.json();
        
        } catch (innerError) {
             console.error("Inner Fetch Error:", innerError);
             throw innerError;
        }

        if (arabicData.code !== 200) throw new Error("API Error");

        const surah = arabicData.data;
        const trans = transData.data.ayahs;
        const audio = audioData.data.ayahs;
        const latin = latinData.data.ayahs;

        if (title) title.innerText = surah.englishName;
        if (subtitle) subtitle.innerText = `${surah.revelationType} • ${surah.numberOfAyahs} Ayat`;
        
        let html = '';
        if (number !== 9 && number !== 1) { // Skip bismillah for Al-Fatihah (already in ayah 1) and At-Taubah
            html += `<div class="bismillah" style="text-align:center; margin-bottom:20px; font-family:'Amiri'; font-size:24px;">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>`;
        }

        surah.ayahs.forEach((ayah, index) => {
            const translationText = trans[index].text;
            const latinText = latin[index].text;
            
            html += `
            <div class="ayah-item" id="ayah-${index}">
                <div class="ayah-sidebar">
                    <div class="surah-number">${surah.number}:${ayah.numberInSurah}</div>
                    <button class="action-btn play-ayah-btn" data-index="${index}">
                        <i class="ph-fill ph-play"></i>
                    </button>
                    <button class="action-btn share-ayah-btn" data-index="${index}">
                        <i class="ph ph-share-network"></i>
                    </button>
                </div>
                <div class="ayah-content">
                    <div class="ayah-arabic">${ayah.text}</div>
                    <div class="ayah-latin">${latinText}</div>
                    <div class="ayah-translation">${translationText}</div>
                </div>
            </div>
            `;
        });
        
        content.innerHTML = html;
        
        // --- Audio Logic Redesigned ---
        const audioPlayer = document.getElementById('quran-audio-player');
        let currentPlayingIndex = -1;

        // Attach Listeners
        document.querySelectorAll('.play-ayah-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(btn.dataset.index);
                if (currentPlayingIndex === index && !audioPlayer.paused) {
                    pauseAudio();
                } else {
                    playAyah(index);
                }
            });
        });

        function updatePlayIcons() {
            document.querySelectorAll('.play-ayah-btn').forEach(btn => {
                const idx = parseInt(btn.dataset.index);
                if (idx === currentPlayingIndex && !audioPlayer.paused) {
                    btn.innerHTML = '<i class="ph-fill ph-pause"></i>';
                    btn.classList.add('active-play');
                } else {
                    btn.innerHTML = '<i class="ph-fill ph-play"></i>';
                    btn.classList.remove('active-play');
                }
            });
        }

        function pauseAudio() {
            audioPlayer.pause();
            updatePlayIcons();
        }

        function playAyah(index) {
            if (index >= audio.length) {
                currentPlayingIndex = -1;
                updatePlayIcons();
                return;
            }

            currentPlayingIndex = index;
            
            // Highlight
            document.querySelectorAll('.ayah-item').forEach(el => el.classList.remove('playing-ayah'));
            const el = document.getElementById(`ayah-${index}`);
            if (el) {
                el.classList.add('playing-ayah');
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            audioPlayer.src = audio[index].audio;
            audioPlayer.play().catch(e => console.log("Play error", e));
            
            updatePlayIcons();
            
            audioPlayer.onended = () => {
                playAyah(index + 1);
            };
        }
        
    } catch (e) {
        console.error(e);
        content.innerHTML = '<p class="error">Gagal memuat detail surat.</p>';
    }
};

// Update Display based on settings
function updateQuranDisplay() {
    const list = document.getElementById('quran-detail-list');
    if (!list) return;
    
    // Toggles for Latin/Translation
    if (state.quranSettings.showLatin) {
        list.classList.remove('hide-latin');
    } else {
        list.classList.add('hide-latin');
    }
    
    if (state.quranSettings.showTranslation) {
        list.classList.remove('hide-translation');
    } else {
        list.classList.add('hide-translation');
    }

    // Page Mode logic (Visual only for now)
    if (state.quranSettings.modePage) {
        list.classList.add('quran-page-mode');
    } else {
        list.classList.remove('quran-page-mode');
    }
}

const closeQuranBtn = document.getElementById('close-quran');
if (closeQuranBtn) {
    closeQuranBtn.addEventListener('click', () => {
        const modal = document.getElementById('quran-modal');
        const player = document.getElementById('quran-audio-player');
        
        if (player) player.pause();
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    });
}

// Make searchCity global for HTML inline clicks
window.searchCity = searchCity;

// Init
initLocation();
fetchSurahList(); // Load Quran List

// --- Qibla Compass Logic ---

const qiblaModal = document.getElementById('qibla-modal');
const closeQiblaBtn = document.getElementById('close-qibla');
const compassArrow = document.getElementById('compass-arrow');
const qiblaDegreeEl = document.getElementById('qibla-degree');
const qiblaStatus = document.getElementById('qibla-status');
const iosPermBtn = document.getElementById('ios-permission-btn');

let qiblaBearing = 0;

// 1. Calculate Qibla Direction
function calculateQibla(lat, lng) {
    const KAABA_LAT = 21.422487;
    const KAABA_LNG = 39.826206;

    const latK = KAABA_LAT * (Math.PI / 180);
    const lngK = KAABA_LNG * (Math.PI / 180);
    const latU = lat * (Math.PI / 180);
    const lngU = lng * (Math.PI / 180);

    const y = Math.sin(lngK - lngU);
    const x = Math.cos(latU) * Math.tan(latK) - Math.sin(latU) * Math.cos(lngK - lngU);
    
    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    qiblaBearing = (bearing + 360) % 360; // Normalize to 0-360
    
    return Math.round(qiblaBearing);
}

// 2. Open Modal & Init
window.openQiblaModal = function() {
    if (qiblaModal) {
        qiblaModal.classList.remove('hidden');
        qiblaModal.classList.add('active');
        
        // Use current location
        if (state.location.lat && state.location.lng) {
            const bearing = calculateQibla(state.location.lat, state.location.lng);
            qiblaDegreeEl.innerText = `${bearing}°`;
            initCompass();
        } else {
            qiblaStatus.innerText = "Lokasi tidak ditemukan.";
        }
    }
};

// 3. Compass Handler
function handleOrientation(event) {
    let alpha = event.alpha; // Direction (0-360) based on North
    let webkitAlpha = event.webkitCompassHeading; // iOS special
    
    let compassDir = null;
    
    if (webkitAlpha) {
        // iOS
        compassDir = webkitAlpha;
    } else if (alpha !== null) {
        // Android / Non-iOS
        // alpha is counter-clockwise, so 360 - alpha
        compassDir = 360 - alpha; 
    }
    
    if (compassDir !== null) {
        const rotation = qiblaBearing - compassDir;
        
        compassArrow.style.transform = `rotate(${rotation}deg)`;
        qiblaStatus.innerText = `Kompas Aktif (${Math.round(compassDir)}°)`;
        
        // Visual feedback if close
        const diff = Math.abs(rotation % 360);
        if (diff < 5 || diff > 355) {
            compassArrow.style.filter = "drop-shadow(0 0 10px #00A859)";
            if (navigator.vibrate) navigator.vibrate(50); // Haptic
        } else {
            compassArrow.style.filter = "";
        }
    }
}

// 4. Init Listeners
function initCompass() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+
        iosPermBtn.classList.remove('hidden');
        qiblaStatus.innerText = "Perlu izin akses kompas (iOS)";
    } else if ('ondeviceorientationabsolute' in window) {
        // Chrome Android (Absolute is better)
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        qiblaStatus.innerText = "Mendeteksi Arah...";
    } else if ('ondeviceorientation' in window) {
        // Standard
        window.addEventListener('deviceorientation', handleOrientation, true);
        qiblaStatus.innerText = "Mendeteksi Arah...";
    } else {
        qiblaStatus.innerText = "Kompas tidak didukung di perangkat ini.";
    }
}

// iOS Permission Click
if (iosPermBtn) {
    iosPermBtn.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    iosPermBtn.classList.add('hidden');
                    window.addEventListener('deviceorientation', handleOrientation, true);
                } else {
                    alert('Izin ditolak.');
                }
            })
            .catch(console.error);
    });
}

// Close Modal
if (closeQiblaBtn) {
    closeQiblaBtn.addEventListener('click', () => {
        qiblaModal.classList.remove('active');
        // Stop listener to save battery
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('deviceorientationabsolute', handleOrientation);
    });
}


// --- Adhan Notification Logic ---

const notificationBtn = document.getElementById('notification-btn');
const azanAudio = document.getElementById('azan-audio');
if (azanAudio) azanAudio.src = state.settings.azanSound;
let notificationEnabled = localStorage.getItem('notificationEnabled') === 'true';

// Update Notification Icon State
function updateNotificationUI() {
    if (notificationEnabled) {
        notificationBtn.innerHTML = '<i class="ph-fill ph-bell-ringing"></i>'; // Active Icon
        notificationBtn.classList.add('active');
    } else {
        notificationBtn.innerHTML = '<i class="ph ph-bell-slash"></i>'; // Inactive Icon
        notificationBtn.classList.remove('active');
        if (azanAudio) {
            azanAudio.pause();
            azanAudio.currentTime = 0;
        }
    }
}

// Toggle Notification
if (notificationBtn) {
    updateNotificationUI();
    
    notificationBtn.addEventListener('click', () => {
        if (!notificationEnabled) {
            // Request Permission
            if ("Notification" in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        notificationEnabled = true;
                        localStorage.setItem('notificationEnabled', 'true');
                        updateNotificationUI();
                        // Test Play to unlock audio on mobile
                        if (azanAudio) {
                            azanAudio.play().then(() => {
                                azanAudio.pause();
                                azanAudio.currentTime = 0;
                            }).catch(err => console.log("Audio unlock failed, wait for real event", err));
                        }
                        new Notification("Notifikasi Diaktifkan", { body: "InsyaAllah Anda akan diingatkan waktu shalat." });
                    } else {
                        alert("Izin notifikasi ditolak browser.");
                    }
                });
            } else {
                alert("Browser tidak mendukung notifikasi.");
            }
        } else {
            // Turn Off
            notificationEnabled = false;
            localStorage.setItem('notificationEnabled', 'false');
            updateNotificationUI();
        }
    });
}

// Function to Trigger Adhan (Call this when countdown reaches 0)


// Hook into Countdown Logic (Overwrite/Extend timer check)
// Since we used setInterval logic inside startCountdown, we need to inject this trigger there.
// But startCountdown assumes reload on diff < 0.
// We should trigger slightly BEFORE reload or handle it specially.

// We will Monkey Patch the reload behavior in startCountdown? 
// No, risky. Better to check in `update()` loop.
// Since `startCountdown` logic is inside a closure in main.js, we can't easily hook it without modifying `startCountdown` function itself.

// Let's MODIFY startCountdown function to include triggerAdhan.

// --- Quran Toggle Logic ---


// --- Filter Initializer ---
function initFilters() {
    if (!dom.monthFilter || !dom.yearFilter) return;

    const date = new Date();
    dom.monthFilter.value = date.getMonth() + 1;
    
    // Set Year Range (2024 to 2030)
    let yearHtml = '';
    for (let y = 2024; y <= 2030; y++) {
        yearHtml += `<option value="${y}">${y}</option>`;
    }
    dom.yearFilter.innerHTML = yearHtml;
    dom.yearFilter.value = date.getFullYear();

    // Event Listeners
    dom.monthFilter.addEventListener('change', () => {
        updateMonthlyDataOnly();
    });
    dom.yearFilter.addEventListener('change', () => {
        updateMonthlyDataOnly();
    });
}

async function updateMonthlyDataOnly() {
    const title = document.getElementById('month-year-title');
    const tbody = document.getElementById('monthly-tbody');
    if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="padding: 40px; text-align: center;"><i class="ph ph-spinner ph-spin" style="font-size: 24px;"></i></td></tr>';
    
    const m = dom.monthFilter.value;
    const y = dom.yearFilter.value;
    
    const monthlyData = await fetchMonthlyPrayers(state.location.lat, state.location.lng, m, y);
    if (monthlyData) {
        renderMonthlyTable(monthlyData, m, y);
    }
}

initFilters();

// --- Adzan Logic ---
function initAdzan() {
    if (dom.adzanToggle) {
        dom.adzanToggle.checked = state.adzanEnabled;
        dom.adzanToggle.addEventListener('change', () => {
             state.adzanEnabled = dom.adzanToggle.checked;
             localStorage.setItem('adzanEnabled', state.adzanEnabled);
             
             // Unlock audio on interaction
             if (state.adzanEnabled && dom.adzanAudio) {
                 dom.adzanAudio.load(); 
             }
        });
    }

    // Pre-Reminder Listener
    if (dom.preReminderSelect) {
        dom.preReminderSelect.value = state.preReminder;
        dom.preReminderSelect.addEventListener('change', () => {
            state.preReminder = parseInt(dom.preReminderSelect.value);
            localStorage.setItem('preReminder', state.preReminder);
        });
    }
}

function triggerPreReminder(prayerName) {
    if (!state.preReminder || state.preReminder === 0) return;
    
    // Arabic Message: "The prayer is approaching, do not forget to remember Allah"
    const msg = `اقتربت صلاة ${prayerName}، لا تنس ذكر الله`;
    
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pengingat Shalat", {
            body: msg,
            icon: '/icon_kaaba.png' // Ensure this icon exists or remove
        });
    }
}

function triggerAdhan(prayerName) {
    if (!state.adzanEnabled || !dom.adzanAudio) return;
    
    // Check if it's prayer time (not sunrise/imsak if we want to filter)
    // For now, play for all NEXT prayers
    
    console.log(`Triggering Adzan for ${prayerName}`);
    
    // Play Audio
    dom.adzanAudio.play().catch(e => {
        console.log("Autoplay prevented:", e);
        // Fallback: Show notification if supported
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`Waktunya Shalat ${prayerName}`);
        }
    });
}

// Check Notification Permission
if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission();
}

initAdzan();
