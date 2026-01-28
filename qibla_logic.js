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
        // Calculate rotation needed to point to Qibla
        // If Phone points North (0°), Qibla is at `qiblaBearing`
        // We rotate the arrow: `qiblaBearing - phoneDirection`
        // Wait, visual rotation is often reversed in CSS transforms
        
        // Let's try: Rotate the CARD (Arrow container) so it points to Qibla
        // Relation: 
        // 0 deg phone -> Arrow points to Qibla (CSS rotate Qibla deg)
        // 90 deg phone -> Arrow should rotate -90 deg visual
        
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
