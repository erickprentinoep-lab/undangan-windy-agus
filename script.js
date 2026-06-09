// ==========================================================================
// 1. URL QUERY PARAMETER PARSER (GUEST NAME)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get("to");
    const nameSpan = document.getElementById("guest-name");
    const formNameInput = document.getElementById("form-name");

    if (guestName) {
        const cleanName = decodeURIComponent(guestName.replace(/\+/g, ' '));
        nameSpan.textContent = cleanName;
        if (formNameInput) {
            formNameInput.value = cleanName;
        }
    } else {
        nameSpan.textContent = "Tamu Undangan";
    }

    // Load Wishes
    loadWishes();
    
    // Spawn Falling Petals
    createPetals();

    // Initialize Cover Flower Blooming immediately
    initFlowerBlooming();

    // Initialize Interactive Pointer/Touch Particle Trail
    initInteractiveTrail();
});

// ==========================================================================
// 2. OPEN INVITATION AND INITIALIZE MUSIC
// ==========================================================================
const btnOpen = document.getElementById("btn-open-invitation");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("main-content");
const musicToggle = document.getElementById("music-toggle");
const audio = document.getElementById("wedding-music");

btnOpen.addEventListener("click", () => {
    // Unlock scrolling
    mainContent.classList.remove("locked");
    
    // Play Music
    playMusic();
    
    // Fade out cover
    cover.classList.add("fade-out");
    
    // Show music toggle button
    musicToggle.classList.remove("hide");

    // Initialize Scroll Reveal Animations
    initScrollReveal();

    // Start Countdown
    startCountdown();

    // Start smooth background parallax sway loop
    requestAnimationFrame(animateBackground);

    // Remove cover from DOM after animation completes to optimize mobile rendering
    setTimeout(() => {
        cover.remove();
    }, 1200);
});

// ==========================================================================
// 3. DYNAMIC PETAL SPAWNER
// ==========================================================================
function createPetals() {
    const container = document.getElementById("petals-container");
    if (!container) return;

    const numberOfPetals = 28; // Increased density slightly for richer animation

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement("div");
        
        // Randomly assign a particle category:
        // - 35% Blue Hydrangea Petal
        // - 25% Shimmering Gold Glitter
        // - 20% Watercolor Green Leaf
        // - 20% Glowing Bokeh Orb
        const rand = Math.random();
        
        if (rand < 0.35) {
            // Blue Petal
            petal.className = "petal";
            const size = Math.random() * 8 + 6; // 6px to 14px
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
        } else if (rand < 0.60) {
            // Gold Glitter
            petal.className = "petal gold-glitter";
            const size = Math.random() * 4 + 3; // 3px to 7px
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
        } else if (rand < 0.80) {
            // Green Leaf
            petal.className = "petal green-leaf";
            const size = Math.random() * 8 + 5; // 5px to 13px
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
        } else {
            // Bokeh Orb
            petal.className = "petal bokeh-orb";
            const size = Math.random() * 12 + 6; // 6px to 18px
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
        }
        
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 9}s`;
        petal.style.animationDuration = `${Math.random() * 7 + 5}s`; // 5s to 12s
        
        container.appendChild(petal);
    }
}

// ==========================================================================
// 4. BACKGROUND MUSIC CONTROLLER
// ==========================================================================
let isPlaying = false;
const playIcon = musicToggle.querySelector(".music-icon");
const pauseIcon = musicToggle.querySelector(".music-icon-paused");

function playMusic() {
    audio.play().then(() => {
        isPlaying = true;
        playIcon.classList.remove("hide");
        playIcon.classList.add("icon-spin");
        pauseIcon.classList.add("hide");
    }).catch(err => {
        console.log("Audio autoplay prevented. Waiting for interaction.", err);
    });
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    playIcon.classList.add("hide");
    playIcon.classList.remove("icon-spin");
    pauseIcon.classList.remove("hide");
}

musicToggle.addEventListener("click", () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// ==========================================================================
// 5. COUNTDOWN TIMER (Target: August 16, 2026 09:00:00 WIB)
// ==========================================================================
function startCountdown() {
    const targetDate = new Date("Aug 16, 2026 09:00:00 GMT+0700").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// ==========================================================================
// 6. OUR STORY SLIDER (CAROUSEL) WITH SWIPE SUPPORT
// ==========================================================================
const slider = document.getElementById("story-slider");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");
const indicators = document.querySelectorAll(".carousel-indicators .indicator");

let currentSlideIdx = 0;
const totalSlides = slides.length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlideIdx * 100}%)`;
    
    slides.forEach((slide, idx) => {
        if (idx === currentSlideIdx) {
            slide.classList.add("active");
        } else {
            slide.classList.remove("active");
        }
    });

    indicators.forEach((indicator, idx) => {
        if (idx === currentSlideIdx) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

function nextSlide() {
    currentSlideIdx = (currentSlideIdx + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlideIdx = (currentSlideIdx - 1 + totalSlides) % totalSlides;
    updateSlider();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

indicators.forEach(indicator => {
    indicator.addEventListener("click", (e) => {
        currentSlideIdx = parseInt(e.target.getAttribute("data-index"));
        updateSlider();
    });
});

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const threshold = 40;
    if (touchStartX - touchEndX > threshold) {
        nextSlide();
    } else if (touchEndX - touchStartX > threshold) {
        prevSlide();
    }
}

// ==========================================================================
// 7. PHOTO GALLERY LIGHTBOX SYSTEM
// ==========================================================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(element) {
    const img = element.querySelector("img");
    if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.remove("hide");
        // Tiny timeout to let browser register the display state removal before adding opacity transition
        setTimeout(() => {
            lightbox.classList.add("show");
        }, 15);
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove("show");
        // Wait for CSS fade out transition to complete before setting display hide
        setTimeout(() => {
            lightbox.classList.add("hide");
        }, 300);
    }
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        // Close only if click targets the background backdrop overlay and not the image itself
        if (e.target !== lightboxImg && e.target !== lightboxClose) {
            closeLightbox();
        }
    });
}

// Close Lightbox on Escape Key press
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.classList.contains("hide")) {
        closeLightbox();
    }
});

// ==========================================================================
// 8. COPY TO CLIPBOARD FUNCTION
// ==========================================================================
function copyAccountNumber(elementId, button) {
    const accNum = document.getElementById(elementId).innerText;
    const btnText = button.querySelector(".btn-copy-text");
    
    navigator.clipboard.writeText(accNum).then(() => {
        btnText.innerText = "Tersalin!";
        button.style.background = "#22543D";
        button.style.color = "#FFFFFF";

        setTimeout(() => {
            btnText.innerText = "Salin";
            button.style.background = "linear-gradient(135deg, #C5A880 0%, #E2D1B9 50%, #A68A5E 100%)";
            button.style.color = "#0B1E3F";
        }, 2000);
    }).catch(err => {
        console.error("Gagal menyalin text: ", err);
    });
}

// ==========================================================================
// 9. WISHES & RSVP FORM (LOCAL STORAGE ENGINE)
// ==========================================================================
const preseededWishes = [
    {
        name: "Budi Santoso",
        attendance: "Hadir",
        message: "Selamat ya Windy & Agus! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Lancar sampai hari H!",
        timestamp: new Date("2026-06-05T10:30:00").getTime()
    },
    {
        name: "Siti Rahma",
        attendance: "Hadir",
        message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat menempuh hidup baru sahabatku!",
        timestamp: new Date("2026-06-05T14:45:00").getTime()
    },
    {
        name: "David & Eca",
        attendance: "Hadir",
        message: "Happy Wedding Windy & Agus! Maaf belum bisa hadir langsung karena masih di luar kota, tapi doa terbaik dari kami selalu menyertai kalian berdua.",
        timestamp: new Date("2026-06-06T09:15:00").getTime()
    },
    {
        name: "Rian Wijaya",
        attendance: "Ragu-ragu",
        message: "Semoga lancar acaranya Windy & Agus. Insya Allah diusahakan hadir jika jadwal dinas tidak berbenturan.",
        timestamp: new Date("2026-06-06T12:00:00").getTime()
    }
];

function loadWishes() {
    let wishes = JSON.parse(localStorage.getItem("wedding_wishes"));
    
    if (!wishes || wishes.length === 0) {
        wishes = preseededWishes;
        localStorage.setItem("wedding_wishes", JSON.stringify(wishes));
    }

    wishes.sort((a, b) => b.timestamp - a.timestamp);

    const wishesList = document.getElementById("wishes-list");
    const countSpan = document.getElementById("wishes-count");
    
    wishesList.innerHTML = "";
    countSpan.textContent = wishes.length;

    wishes.forEach(wish => {
        const item = document.createElement("div");
        item.className = "wish-item";
        
        let badgeClass = "badge-ragu";
        if (wish.attendance === "Hadir") badgeClass = "badge-hadir";
        if (wish.attendance === "Tidak Hadir") badgeClass = "badge-tidak";

        const wishDate = new Date(wish.timestamp);
        const timeString = wishDate.toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        item.innerHTML = `
            <div class="wish-header">
                <span class="wish-name">${escapeHTML(wish.name)}</span>
                <span class="wish-badge ${badgeClass}">${wish.attendance}</span>
            </div>
            <p class="wish-message">${escapeHTML(wish.message)}</p>
            <div class="wish-time">${timeString}</div>
        `;
        wishesList.appendChild(item);
    });
}

function submitWish(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById("form-name");
    const attendanceSelect = document.getElementById("form-attendance");
    const messageInput = document.getElementById("form-message");

    const newWish = {
        name: nameInput.value.trim(),
        attendance: attendanceSelect.value,
        message: messageInput.value.trim(),
        timestamp: new Date().getTime()
    };

    if (!newWish.name || !newWish.attendance || !newWish.message) {
        alert("Harap lengkapi semua kolom!");
        return;
    }

    let wishes = JSON.parse(localStorage.getItem("wedding_wishes")) || [];
    wishes.push(newWish);
    localStorage.setItem("wedding_wishes", JSON.stringify(wishes));

    loadWishes();

    messageInput.value = "";
    alert("Terima kasih! Ucapan Anda telah terkirim.");
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// ==========================================================================
// 10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px 0px 0px"
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================================================
// 11. PARALLAX & SWAY BACKGROUND FLOWERS ENGINE
// ==========================================================================
let currentScrollY = window.pageYOffset || window.scrollY;
let targetScrollY = window.pageYOffset || window.scrollY;

window.addEventListener("scroll", () => {
    targetScrollY = window.pageYOffset || window.scrollY;
}, { passive: true });

const parallaxElements = [
    { selector: ".flower-1", speed: 0.14, ampX: 15, ampY: 12, freq: 0.00045, scaleX: 1, scale: 1, rotate: 0 },
    { selector: ".flower-2", speed: 0.09, ampX: -15, ampY: 12, freq: 0.00039, scaleX: -1, scale: 1, rotate: 0 },
    { selector: ".flower-3", speed: 0.16, ampX: 15, ampY: 10, freq: 0.00035, scaleX: 1, scale: 1, rotate: 10 },
    { selector: ".flower-4", speed: 0.11, ampX: -15, ampY: 12, freq: 0.00042, scaleX: -1, scale: 1, rotate: -10 },
    { selector: ".flower-5", speed: 0.13, ampX: 15, ampY: 12, freq: 0.00037, scaleX: 1, scale: 1, rotate: 5 },
    { selector: ".flower-6", speed: 0.08, ampX: -15, ampY: 10, freq: 0.0004, scaleX: -1, scale: 0.8, rotate: 0 },
    { selector: ".flower-7", speed: 0.15, ampX: 12, ampY: 8, freq: 0.00032, scaleX: 1, scale: 0.9, rotate: 25 },
    { selector: ".flower-8", speed: 0.12, ampX: -16, ampY: 12, freq: 0.00038, scaleX: -1, scale: 0.85, rotate: -15 }
];

// Cache elements
parallaxElements.forEach(item => {
    item.el = document.querySelector(item.selector);
});

function animateBackground(timestamp) {
    // Smooth interpolation (lerp) of scroll position
    currentScrollY += (targetScrollY - currentScrollY) * 0.1;
    
    parallaxElements.forEach(item => {
        // Query if not cached (safety backup)
        if (!item.el) {
            item.el = document.querySelector(item.selector);
        }
        if (!item.el) return;
        
        // Sway math based on clock timestamp
        const time = timestamp || 0;
        const swayX = Math.sin(time * item.freq) * item.ampX;
        const swayY = Math.cos(time * item.freq * 1.1) * item.ampY;
        const swayRotate = Math.sin(time * item.freq * 0.8) * 3; // rotate up to 3deg
        
        // Parallax math
        const parallaxY = currentScrollY * item.speed;
        
        // Combine transforms
        const finalX = swayX;
        const finalY = swayY + parallaxY;
        const finalRotate = item.rotate + swayRotate;
        
        // Construct transform string
        let transformStr = `translate(${finalX}px, ${finalY}px)`;
        if (item.scaleX === -1) {
            transformStr += ` scaleX(-1)`;
        }
        if (item.scale !== 1) {
            transformStr += ` scale(${item.scale})`;
        }
        if (finalRotate !== 0) {
            transformStr += ` rotate(${finalRotate}deg)`;
        }
        
        item.el.style.transform = transformStr;
    });
    
    requestAnimationFrame(animateBackground);
}

// ==========================================================================
// 12. SCROLL-TRIGGERED FLOWER BLOOMING (OBSERVER)
// ==========================================================================
function initFlowerBlooming() {
    // Bloom cover page flowers immediately
    const coverFlowers = document.querySelectorAll(".cover-flower");
    coverFlowers.forEach(el => {
        setTimeout(() => {
            el.classList.add("bloomed");
        }, 150);
    });

    const bloomElements = document.querySelectorAll(".section-flower-decor, .card-flower-decor");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("bloomed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px"
    });

    bloomElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================================================
// 13. INTERACTIVE POINTER/TOUCH SPARKLE TRAIL
// ==========================================================================
function initInteractiveTrail() {
    const container = document.querySelector(".app-container");
    if (!container) return;

    let lastSpawnTime = 0;
    const spawnThrottle = 35; // ms between particle spawns

    function spawnParticle(x, y) {
        const now = Date.now();
        if (now - lastSpawnTime < spawnThrottle) return;
        lastSpawnTime = now;

        const particle = document.createElement("div");
        const isGold = Math.random() > 0.45;
        
        particle.className = `trail-particle ${isGold ? 'sparkle-gold' : 'sparkle-blue'}`;
        
        // Randomize size slightly
        const size = Math.random() * 8 + 5; // 5px to 13px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position relative to app container
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Add random slight drift variables
        const driftX = (Math.random() - 0.5) * 45;
        const driftY = (Math.random() - 0.5) * 45 - 20; // drift upward slightly
        
        particle.style.setProperty('--drift-x', `${driftX}px`);
        particle.style.setProperty('--drift-y', `${driftY}px`);
        
        container.appendChild(particle);
        
        // Remove from DOM after animation ends
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }

    function handlePointerMove(e) {
        const rect = container.getBoundingClientRect();
        
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        // Only spawn if within container boundaries
        if (clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom) {
            
            const relativeX = clientX - rect.left + container.scrollLeft;
            const relativeY = clientY - rect.top + window.pageYOffset;
            
            spawnParticle(relativeX, relativeY);
        }
    }

    // Bind events to document for smooth tracking
    document.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("touchmove", handlePointerMove, { passive: true });
}
