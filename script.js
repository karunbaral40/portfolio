/* =====================================
   1. PAGE LOADER
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
   2. SCROLL EFFECT (HEADER & NAV LINKS)
===================================== */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Scroll Spy (Active nav link updating)
    let current = "";
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

/* =====================================
   3. MOBILE NAVIGATION MENU
===================================== */
const menuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when links are clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });

    // Mobile swipe close support
    let startX = 0;
    let endX = 0;

    navLinks.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    navLinks.addEventListener("touchmove", (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });

    navLinks.addEventListener("touchend", () => {
        if (startX - endX > 50) {
            navLinks.classList.remove("active");
            menuBtn.classList.remove("active");
        }
    });
}

/* =====================================
   4. SCROLL REVEAL (INTERSECTION OBSERVER)
===================================== */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve once animation plays to lock active state
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});
