
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});

const menuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {

      menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
};
document.addEventListener('click', (e) => {
    if (
        navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        navLinks.classList.remove('active');
    }
});


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
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
let startX = 0;
let endX = 0;

navLinks.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});


navLinks.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

navLinks.addEventListener("touchend", () => {
    if (startX - endX > 50) {
        navLinks.classList.remove("active");
    }
});

