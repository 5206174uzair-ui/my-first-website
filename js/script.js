* ============================================================================
   THE COZY BEAN CAFE - JAVASCRIPT
   Interactivity, animations, and smooth scrolling
   ============================================================================ */

// ============================================================================
// 1. MOBILE MENU TOGGLE
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// ============================================================================
// 2. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================================
// 3. NAVBAR BACKGROUND ON SCROLL
// ============================================================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
});

// ============================================================================
// 4. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe menu cards and contact cards
document.querySelectorAll('.menu-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// ============================================================================
// 5. MENU CARD HOVER EFFECTS
// ============================================================================

const menuCards = document.querySelectorAll('.menu-card');
menuCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================================
// 6. IMAGE LAZY LOADING
// ============================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// 7. BUTTON CLICK EFFECTS
// ============================================================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================================================
// 8. FORM VALIDATION (if needed in future)
// ============================================================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ============================================================================
// 9. SCROLL TO TOP BUTTON (optional enhancement)
// ============================================================================

// Create scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.id = 'scrollTopBtn';
scrollTopButton.innerHTML = '↑';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #6B4423;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 99;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
`;

document.body.appendChild(scrollTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

// Scroll to top on click
scrollTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effects for scroll to top button
scrollTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.backgroundColor = '#D97757';
});

scrollTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.backgroundColor = '#6B4423';
});

// ============================================================================
// 10. CONTACT CARD CLICK HANDLERS
// ============================================================================

const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================================
// 11. PERFORMANCE OPTIMIZATION
// ============================================================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const handleScroll = debounce(function() {
    // Add any expensive scroll operations here
}, 100);

window.addEventListener('scroll', handleScroll);

// ============================================================================
// 12. KEYBOARD NAVIGATION
// ============================================================================

// Allow keyboard navigation for buttons
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close mobile menu on Escape
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
});

// ============================================================================
// 13. PRINT STYLES SUPPORT
// ============================================================================

window.addEventListener('beforeprint', function() {
    // Hide non-essential elements for printing
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.style.display = 'none';
    }
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn && window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    }
});

// ============================================================================
// 14. UTILITY FUNCTIONS
// ============================================================================

// Get element by ID safely
function getElement(id) {
    return document.getElementById(id);
}

// Add class to element
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

// Remove class from element
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

// Toggle class on element
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

// ============================================================================
// 15. INITIALIZATION
// ============================================================================

console.log('The Cozy Bean Cafe - Website loaded successfully');

// ============================================================================
// END OF JAVASCRIPT
// ============================================================================
