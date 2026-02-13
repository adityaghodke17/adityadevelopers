// Main JavaScript File

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const bookConsultationBtn = document.getElementById('bookConsultationBtn');
const callNowBtn = document.getElementById('callNowBtn');

// Custom Cursor Elements
const cursorTree = document.querySelector('.cursor-tree');
const cursorFollower = document.querySelector('.cursor-follower');

// ===== ENHANCED MAGIC TREE CURSOR =====
if (cursorTree && cursorFollower) {
    // Mouse move tracking
    document.addEventListener('mousemove', (e) => {
        cursorTree.style.left = e.clientX + 'px';
        cursorTree.style.top = e.clientY + 'px';
        
        // Follower with slight delay
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, input, select, textarea, .service-card, .feature-card, .stat-box, .social-link, .contact-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorTree.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorTree.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Click effects with magic
    document.addEventListener('mousedown', (e) => {
        cursorTree.classList.add('click');
        cursorFollower.classList.add('click');
        
        // Create falling leaves
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFallingLeaf(e.clientX, e.clientY);
            }, i * 100);
        }
    });
    
    document.addEventListener('mouseup', () => {
        cursorTree.classList.remove('click');
        cursorFollower.classList.remove('click');
    });
    
    // Ripple effect on click
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });
}

// Create falling leaf
function createFallingLeaf(x, y) {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    leaf.style.left = x + 'px';
    leaf.style.top = y + 'px';
    leaf.style.background = `linear-gradient(135deg, ${['#2E7D32', '#4CAF50', '#66BB6A', '#8BC34A'][Math.floor(Math.random() * 4)]})`;
    leaf.style.width = Math.random() * 15 + 10 + 'px';
    leaf.style.height = leaf.style.width;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 2000);
}

// ===== BOOK CONSULTATION BUTTON FUNCTION =====
if (bookConsultationBtn) {
    bookConsultationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Button animation
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
        this.style.pointerEvents = 'none';
        
        // Pre-filled consultation message
        const consultationMessage = `🏠 *BOOK CONSULTATION* 🏠%0A%0A` +
                                   `Hello Aditya Developers,%0A%0A` +
                                   `I would like to book a consultation for property services.%0A%0A` +
                                   `Please provide details about:%0A` +
                                   `📍 Property Sell/Buy%0A` +
                                   `📍 N.A. Work%0A` +
                                   `📍 Site Visit%0A%0A` +
                                   `_Sent from website_`;
        
        const whatsappURL = `https://wa.me/916357308369?text=${consultationMessage}`;
        
        // Open WhatsApp after short delay
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            this.innerHTML = originalText;
            this.style.pointerEvents = 'auto';
            
            // Show success notification
            showNotification('✅ WhatsApp opened for consultation!', 'success');
        }, 800);
    });
}

// ===== CALL NOW BUTTON FUNCTION =====
if (callNowBtn) {
    callNowBtn.addEventListener('click', function(e) {
        // Don't prevent default - let the tel: link work
        // Just add a nice notification
        showNotification('📞 Calling Aditya Developers...', 'info');
    });
}

// ===== FORM SUBMIT FUNCTION =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !phone || !service || !message) {
            showNotification('❌ Please fill all required fields!', 'error');
            return;
        }
        
        // Animation on button
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Create WhatsApp message for consultation
        const whatsappMessage = `🏠 *NEW CONSULTATION REQUEST* 🏠%0A%0A` +
                               `*Name:* ${name}%0A` +
                               `*Email:* ${email}%0A` +
                               `*Phone:* ${phone}%0A` +
                               `*Service Required:* ${service}%0A` +
                               `*Requirements:*%0A${message}%0A%0A` +
                               `_Sent from Aditya Developers website_`;
        
        // WhatsApp URL
        const whatsappURL = `https://wa.me/916357308369?text=${whatsappMessage}`;
        
        // Open WhatsApp directly
        window.open(whatsappURL, '_blank');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('✅ WhatsApp opened with your details!', 'success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
        }, 2000);
    });
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Colors based on type
    let bgColor = '#4CAF50';
    if (type === 'error') bgColor = '#f44336';
    if (type === 'info') bgColor = '#2196F3';
    if (type === 'success') bgColor = '#4CAF50';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 120px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10001;
        animation: slideInRight 0.3s, fadeOut 0.3s 2.7s;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
    
    .falling-leaf {
        position: fixed;
        border-radius: 50% 50% 0 50%;
        pointer-events: none;
        z-index: 10000;
        animation: leafFallAnim 2s ease-out forwards;
        filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.5));
    }
    
    @keyframes leafFallAnim {
        0% {
            transform: rotate(0deg) translateY(0) translateX(0);
            opacity: 1;
        }
        50% {
            transform: rotate(180deg) translateY(100px) translateX(50px);
            opacity: 0.8;
        }
        100% {
            transform: rotate(360deg) translateY(200px) translateX(-50px);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(76, 175, 80, 0.5) 0%, transparent 70%);
        transform: scale(0);
        animation: rippleEffect 0.8s ease-out;
        pointer-events: none;
        z-index: 9997;
    }
    
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Mobile Menu Toggle
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

// Nav link active state
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// Back to Top Button
function updateBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                const width = progressFill.getAttribute('data-width');
                progressFill.style.width = '0%';
                
                setTimeout(() => {
                    progressFill.style.width = width + '%';
                }, 300);
            }
        }
    });
}, { threshold: 0.5 });

// Copy email and phone
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.querySelector('h4')?.textContent.includes('Email')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const email = this.querySelector('p').textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> <div><h4>Copied!</h4><p>Email copied to clipboard</p></div>';
                this.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                }, 2000);
            });
        });
    }
    
    if (item.querySelector('h4')?.textContent.includes('Phone')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const phoneNumber = this.querySelector('p').textContent.trim();
            navigator.clipboard.writeText(phoneNumber).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> <div><h4>Copied!</h4><p>Phone number copied</p></div>';
                this.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                }, 2000);
            });
        });
    }
});

// Particle effect (falling leaves background)
const particlesContainer = document.querySelector('.particles');
if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-10%';
        particle.style.background = ['#2E7D32', '#4CAF50', '#66BB6A', '#8BC34A'][Math.floor(Math.random() * 4)];
        particle.style.borderRadius = '50% 50% 0 50%';
        particle.style.animation = `floatAround ${Math.random() * 15 + 15}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .service-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.progress-item').forEach(item => progressObserver.observe(item));
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = '&copy; 2016 Aditya Developers. All rights reserved.';
    }
    
    // Check if on mobile and hide custom cursor
    if (window.innerWidth <= 768) {
        if (cursorTree) cursorTree.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    }
});

// Scroll events
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateBackToTop();
});

// Initialize
updateActiveNavLink();
updateBackToTop();
