// ============================================
// DOM Elements
// ============================================
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const productCategories = document.querySelectorAll('.product-category');

// ============================================
// Sticky Header with Shadow
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Smooth scrolling for hero buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Active Menu Highlight on Scroll
// ============================================
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinks);

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Handle home/hero section
    if (window.scrollY < 100) {
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ============================================
// Scroll Reveal Animation
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .value-card, .service-card, .feature-card, .product-category, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// Product Category Expand/Collapse
// ============================================
productCategories.forEach(category => {
    const header = category.querySelector('.product-category-header');
    
    header.addEventListener('click', () => {
        const isActive = category.classList.contains('active');
        
        // Close all other categories
        productCategories.forEach(cat => {
            if (cat !== category) {
                cat.classList.remove('active');
            }
        });
        
        // Toggle current category
        category.classList.toggle('active');
    });
});

// ============================================
// Scroll to Top Button
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Lazy Loading for Images (if any are added later)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Form Validation (for future contact form)
// ============================================
// This section is ready for when a contact form is added
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

// ============================================
// Performance Optimization
// ============================================
// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
const throttledUpdateActiveNav = throttle(updateActiveNavLink, 100);
window.addEventListener('scroll', throttledUpdateActiveNav);

// ============================================
// Logo Display Handler
// ============================================
// Ensure both logo and company name text are always visible together
const logoImg = document.querySelector('.logo-img');
const logoText = document.querySelector('.logo-text');

if (logoImg && logoText) {
    // Hide image only if it fails to load, text always stays visible
    logoImg.addEventListener('error', () => {
        logoImg.style.display = 'none';
        logoText.style.display = 'block';
    });
    
    // When logo loads successfully, both logo and text should be visible
    logoImg.addEventListener('load', () => {
        logoImg.style.display = 'block';
        logoText.style.display = 'block';
    });
    
    // On page load, ensure text is always visible
    logoText.style.display = 'block';
    
    // If image is already loaded, ensure it's visible
    if (logoImg.complete && logoImg.naturalHeight !== 0) {
        logoImg.style.display = 'block';
    }
}

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Add smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill would go here if needed
        console.log('Smooth scroll polyfill may be needed for older browsers');
    }
    
    // Log page load completion
    console.log('Creative Infratech website loaded successfully');
});

// ============================================
// WhatsApp Integration
// ============================================
// The WhatsApp button is already in HTML with the correct link
// This ensures it works properly on all devices
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
        // Analytics or tracking can be added here if needed
        console.log('WhatsApp contact initiated');
    });
}

// ============================================
// Keyboard Navigation Support
// ============================================
// Improve accessibility with keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
    
    // Enter/Space on product category headers
    productCategories.forEach(category => {
        const header = category.querySelector('.product-category-header');
        if (document.activeElement === header && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            header.click();
        }
    });
});

// Make product category headers focusable
productCategories.forEach(category => {
    const header = category.querySelector('.product-category-header');
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    
    category.addEventListener('click', () => {
        const isActive = category.classList.contains('active');
        header.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
});


