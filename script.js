/* =====================================
   1. PAGE PRE-LOADER SCREEN
===================================== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Matches CSS transition duration
    }
});

/* =====================================
   2. STICKY NAV & ACTIVE NAVIGATION LINKS
===================================== */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Scroll spy active link calculations
    let current = "";
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
}, { passive: true });

/* =====================================
   3. RESPONSIVE MOBILE NAVIGATION PANEL
===================================== */
const menuBtn = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
    const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : !navLinks.classList.contains('active');
        
        menuBtn.classList.toggle('active', isOpen);
        navLinks.classList.toggle('active', isOpen);
        
        // Accessibility (Aria) tags update
        menuBtn.setAttribute('aria-expanded', isOpen);
        
        // Prevent background layout scrolling on mobile
        document.body.classList.toggle('no-scroll', isOpen);
    };

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when navigation link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close menu when clicking outside of the active panel
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            toggleMenu(false);
        }
    });

    // Keyboard support - close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu(false);
            menuBtn.focus(); // Returns keyboard focus to toggle
        }
    });

    // Mobile Swipe closing gesture
    let startX = 0;
    let endX = 0;

    navLinks.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    navLinks.addEventListener("touchmove", (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });

    navLinks.addEventListener("touchend", () => {
        if (startX - endX > 50 && navLinks.classList.contains('active')) {
            toggleMenu(false);
        }
    });
}

/* =====================================
   4. INTERSECTION OBSERVER SCROLL REVEALS
===================================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Unobserve to lock animate state
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});
