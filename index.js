
// Function 1: Visit Counter using localStorage
// Stores and updates visit count in browser's local storage
function updateVisitsCounter() {
    try {
        const key = 'site-visits';
        let visits = parseInt(localStorage.getItem(key) || '0', 10);
        if (Number.isNaN(visits)) visits = 0;
        visits += 1;
        localStorage.setItem(key, String(visits));
        const visitsEl = document.getElementById('visits-count');
        if (visitsEl) visitsEl.textContent = `Visits: ${visits}`;
    } catch (err) {
        console.error('Visits counter error:', err);
    }
}

// Function 2: Typewriter Effect
// Creates typing animation effect for text elements
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        if (!element) return resolve();
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        
        type();
    });
}

// Function 3: Smooth Scroll to Section
// Smoothly scrolls to target element with offset for fixed header
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Function 4: Toggle CSS Class
// Adds/removes CSS class from element with optional timeout
function toggleClass(element, className, duration = 0) {
    if (!element) return;
    
    element.classList.add(className);
    
    if (duration > 0) {
        setTimeout(() => {
            element.classList.remove(className);
        }, duration);
    }
}

// Function 5: Format Date
// Returns current date in readable format (e.g., "January 1, 2024")
function getFormattedDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize visit counter
    updateVisitsCounter();
    
    // Setup navigation smooth scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
    
    // Typewriter animation setup
    const typeEl = document.getElementById('typewriter');
    const phrases = [
        'Cybersecurity Portfolio',
        'Web Security • DevSecOps • CTF',
        'Building Secure Digital Solutions'
    ];
    
    let currentPhrase = 0;
    
    async function runTypewriter() {
        while (true) {
            await typeWriter(typeEl, phrases[currentPhrase], 40);
            await new Promise(r => setTimeout(r, 2000));
            
            // Clear text
            await typeWriter(typeEl, '', 20);
            await new Promise(r => setTimeout(r, 500));
            
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
    }
    
    if (typeEl) {
        runTypewriter();
    }
    
    // Theme toggle button functionality
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            toggleClass(themeBtn, 'active', 200);
            // Restart typewriter animation
            if (typeEl) {
                typeEl.textContent = '';
                currentPhrase = 0;
            }
        });
    }
    
    // Display current date in console (demo of date function)
    console.log('Page loaded on:', getFormattedDate());
});