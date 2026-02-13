// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const bookBtn = document.getElementById('bookConsultationBtn');
const callBtn = document.getElementById('callNowBtn');
const contactForm = document.getElementById('contactForm');
const navbar = document.getElementById('navbar');

// Cursor Elements
const treeCursor = document.querySelector('.tree-cursor');
const cursorGlow = document.querySelector('.cursor-glow');
const cursorRing = document.querySelector('.cursor-ring');

// ===== MAGICAL CURSOR =====
if (treeCursor && cursorGlow && cursorRing) {
    document.addEventListener('mousemove', (e) => {
        // Main cursor
        treeCursor.style.left = e.clientX + 'px';
        treeCursor.style.top = e.clientY + 'px';
        
        // Glow with delay
        setTimeout(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }, 50);
        
        // Ring with more delay
        setTimeout(() => {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, input, select, textarea, .service-card, .feature-card-3d');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            treeCursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            treeCursor.classList.remove('hover');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        treeCursor.classList.add('click');
        
        // Create falling leaves
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createFallingLeaf(event.clientX, event.clientY);
            }, i * 50);
        }
    });
    
    document.addEventListener('mouseup', () => {
        treeCursor.classList.remove('click');
    });
}

// Create falling leaf
function createFallingLeaf(x, y) {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    leaf.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: linear-gradient(135deg, #2E7D32, #4CAF50, #66BB6A);
        border-radius: 50% 50% 0 50%;
        pointer-events: none;
        z-index: 100000;
        animation: leafExplode 1.5s ease-out forwards;
        filter: drop-shadow(0 0 20px gold);
    `;
    document.body.appendChild(leaf);
    
    setTimeout(() => leaf.remove(), 1500);
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax-section');
    
    parallax.forEach(section => {
        const rate = scrolled * 0.5;
        section.style.backgroundPositionY = rate + 'px';
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            
            const updateCounter = () => {
                const increment = target / 50;
                
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count) + (target === 100 ? '+' : '');
                    setTimeout(updateCounter, 40);
                } else {
                    counter.innerText = target + (target === 100 ? '+' : '');
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== TILT EFFECT =====
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== MAGNETIC BUTTONS =====
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== BOOK CONSULTATION BUTTON =====
if (bookBtn) {
    bookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = 'scale(1)', 200);
        
        const message = "Hello Aditya Developers, I would like to book a consultation for property services. Please provide details about Property Sell/Buy, N.A. Work, and Site Visit.";
        const url = `https://wa.me/916357308369?text=${encodeURIComponent(message)}`;
        
        // Create sparkles
        for (let i = 0; i < 10; i++) {
            createSparkle(event.clientX, event.clientY);
        }
        
        setTimeout(() => {
            window.open(url, '_blank');
        }, 300);
    });
}

// Create sparkle
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: gold;
        border-radius: 50%;
        pointer-events: none;
        z-index: 100000;
        animation: sparkleFly 1s ease-out forwards;
        box-shadow: 0 0 20px gold;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFly {
        0% { transform: scale(1) translate(0, 0); opacity: 1; }
        100% { transform: scale(0) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== CALL NOW BUTTON =====
if (callBtn) {
    callBtn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = 'scale(1)', 200);
        
        // Show notification
        showNotification('📞 Calling Aditya Developers...', 'info');
    });
}

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
            showNotification('❌ Please fill all fields', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        const whatsappMessage = `*🏠 New Property Query*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Service:* ${service}\n*Message:* ${message}`;
        const url = `https://wa.me/916357308369?text=${encodeURIComponent(whatsappMessage)}`;
        
        setTimeout(() => {
            window.open(url, '_blank');
            submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Send to WhatsApp';
            showNotification('✅ WhatsApp opened with your details!', 'success');
            contactForm.reset();
        }, 1000);
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 100px;
        background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 100000;
        animation: slideInRight 0.3s, fadeOut 0.3s 2.7s;
        font-size: 1rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    `;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Mobile Menu
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

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
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

// Add animation on scroll
const animateElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .slide-up');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.classList.contains('fade-in-left') 
                ? 'fadeInLeft 1s forwards' 
                : entry.target.classList.contains('fade-in-right')
                ? 'fadeInRight 1s forwards'
                : 'slideUp 1s forwards';
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => scrollObserver.observe(el));

// Add animation styles
const animStyles = document.createElement('style');
animStyles.textContent = `
    @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .falling-leaf {
        pointer-events: none;
    }
`;
document.head.appendChild(animStyles);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        treeCursor.style.display = 'none';
        cursorGlow.style.display = 'none';
        cursorRing.style.display = 'none';
    }
});
