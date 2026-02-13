// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const bookBtn = document.getElementById('bookConsultationBtn');
const callBtn = document.getElementById('callNowBtn');
const contactForm = document.getElementById('contactForm');

// Cursor Elements
const cursor = document.querySelector('.cursor-tree');
const cursorFollower = document.querySelector('.cursor-follower');

// ===== CURSOR LOGIC =====
if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Hover effect
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, input, select, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ===== BOOK CONSULTATION BUTTON =====
if (bookBtn) {
    bookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const message = "Hello Aditya Developers, I would like to book a consultation for property services.";
        const url = `https://wa.me/916357308369?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

// ===== CALL NOW BUTTON =====
// No need for extra code - href="tel:" already works

// ===== MOBILE MENU =====
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== BACK TO TOP =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== FORM SUBMIT =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !phone || !service || !message) {
            alert('Please fill all fields');
            return;
        }
        
        const whatsappMessage = `*New Query*\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;
        const url = `https://wa.me/916357308369?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
        contactForm.reset();
    });
}

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
