// ============================================
// DOM Elements
// ============================================
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const productCategories = document.querySelectorAll('.product-category');
const productModal = document.getElementById('productModal');
const productModalImage = document.getElementById('productModalImage');
const productModalTitle = document.getElementById('productModalTitle');
const productModalDescription = document.getElementById('productModalDescription');

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
// Product Data (Images + Descriptions)
// ============================================
// NOTE: Place the corresponding images inside /images/products/
// with the exact filenames used in image paths below.
const productData = {
    'peb-primary-frames': {
        name: 'Primary Frames (Rigid Frames)',
        image: './images/products/PEB Structure Components/peb-primary-frame.jpg',
        description: 'Engineered rigid frames designed as the primary load-bearing system for pre-engineered buildings, ensuring structural stability and efficient load transfer.'
    },
    'peb-secondary-members': {
        name: 'Secondary Members (Purlins & Girts)',
        image: './images/products/PEB Structure Components/peb-secondary-members.jpg',
        description: 'Cold-formed purlins and girts that support roof and wall sheeting, optimizing load distribution and improving overall building performance.'
    },
    'peb-bracing-systems': {
        name: 'Bracing Systems',
        image: './images/products/PEB Structure Components/peb-bracing-systems.png',
        description: 'Diagonal and portal bracing systems that provide lateral stability against wind, seismic and other dynamic loads in steel structures.'
    },
    'peb-columns-beams': {
        name: 'Columns & Beams',
        image: './images/products/PEB Structure Components/peb-columns-beams.png',
        description: 'Precisely fabricated tapered and built-up columns and beams forming the structural skeleton of industrial and commercial buildings.'
    },
    'peb-connections-joints': {
        name: 'Connections & Joints',
        image: './images/products/PEB Structure Components/peb-connections-joints.png',
        description: 'High-strength bolted and welded connections engineered for reliable assembly and long-term performance of PEB structures.'
    },
    'purlins-c-section': {
        name: 'C-Section Purlins',
        image: './images/products/Purlins & Girts/purlin-c-section.jpg',
        description: 'Versatile C-section purlins used for roofing and cladding support, offering excellent strength-to-weight ratio and installation flexibility.'
    },
    'purlins-z-section': {
        name: 'Z-Section Purlins',
        image: './images/products/Purlins & Girts/purlin-z-section.jpg',
        description: 'Z-section purlins designed for continuous spans, reducing material consumption while maintaining structural efficiency.'
    },
    'purlins-girts': {
        name: 'Girts (Wall Girts)',
        image: './images/products/Purlins & Girts/purlin-girts.jpg',
        description: 'Wall girts that support wall cladding and help in transferring wind and impact loads safely to the primary structural members.'
    },
    'purlins-custom-sizes': {
        name: 'Custom Sizes & Specifications',
        image: './images/products/Purlins & Girts/purlin-custom-sizes.jpg',
        description: 'Tailor-made purlins and girts manufactured to specific span, load and project requirements for optimized performance.'
    },
    'fasteners-self-drilling-screws': {
        name: 'Self-Drilling Screws',
        image: './images/products/Fasteners/fastener-self-drilling-screws.jpg',
        description: 'Corrosion-resistant self-drilling screws designed for fast and secure fixing of roofing and cladding sheets to steel members.'
    },
    'fasteners-self-tapping-screws': {
        name: 'Self-Tapping Screws',
        image: './images/products/Fasteners/fastener-self-tapping-screws.jpg',
        description: 'Reliable self-tapping screws ideal for light-gauge steel connections and secondary fastening applications.'
    },
    'fasteners-bolts-nuts': {
        name: 'Bolts & Nuts',
        image: './images/products/Fasteners/fastener-bolts-nuts.jpg',
        description: 'High-tensile bolts and nuts used for structural connections, complying with industry standards for safety and durability.'
    },
    'fasteners-washers-anchors': {
        name: 'Washers & Anchors',
        image: './images/products/Fasteners/fastener-washers-anchors.jpg',
        description: 'Washers and anchor fasteners that ensure secure seating, load distribution and anchorage to foundations or concrete.'
    },
    'fasteners-specialty': {
        name: 'Specialty Fasteners',
        image: './images/products/Fasteners/fastener-specialty.jpg',
        description: 'Special-purpose fasteners engineered for specific detailing, accessories and challenging site conditions.'
    },
    'roofing-metal-sheets': {
        name: 'Metal Roofing Sheets',
        image: './images/products/Roofing & Cladding Sheets/roofing-metal-sheets.jpg',
        description: 'Profiled metal roofing sheets that deliver excellent weather resistance, structural performance and long service life.'
    },
    'cladding-wall-panels': {
        name: 'Wall Cladding Panels',
        image: './images/products/Roofing & Cladding Sheets/cladding-wall-panels.jpg',
        description: 'Durable wall cladding panels that enhance building aesthetics while providing protection against environmental exposure.'
    },
    'roofing-color-coated-sheets': {
        name: 'Color Coated Sheets',
        image: './images/products/Roofing & Cladding Sheets/roofing-color-coated-sheets.jpg',
        description: 'Color coated steel sheets offering superior corrosion protection and an attractive, branded appearance for facades and roofs.'
    },
    'roofing-galvanized-sheets': {
        name: 'Galvanized Sheets',
        image: './images/products/Roofing & Cladding Sheets/roofing-galvanized-sheets.jpg',
        description: 'Hot-dip galvanized sheets providing robust anti-corrosion performance for roofing and cladding applications.'
    },
    'roofing-insulated-panels': {
        name: 'Insulated Panels',
        image: './images/products/Roofing & Cladding Sheets/roofing-insulated-panels.jpg',
        description: 'Roof and wall insulated panels that combine structural strength with thermal and acoustic insulation performance.'
    },
    'accessories-ventilators-louvers': {
        name: 'Ventilators & Louvers',
        image: './images/products/Accessories/accessories-ventilators-louvers.jpg',
        description: 'Natural and mechanical ventilators with louvers designed to improve air circulation and comfort inside industrial buildings.'
    },
    'accessories-insulation-materials': {
        name: 'Insulation Materials',
        image: './images/products/Accessories/accessories-insulation-materials.jpg',
        description: 'Thermal and acoustic insulation solutions that enhance energy efficiency and occupant comfort in steel buildings.'
    },
    'accessories-gutters-downpipes': {
        name: 'Gutters & Downpipes',
        image: './images/products/Accessories/accessories-gutters-downpipes.jpg',
        description: 'Gutter and downpipe systems that efficiently channel rainwater away from the roof and building envelope.'
    },
    'accessories-flashings-trims': {
        name: 'Flashings & Trims',
        image: './images/products/Accessories/accessories-flashings-trims.jpg',
        description: 'Custom flashings and trims that provide watertight detailing and a neat finish to roofing and cladding interfaces.'
    },
    'accessories-skylights': {
        name: 'Skylights',
        image: './images/products/Accessories/accessories-skylights.jpg',
        description: 'High-performance skylight systems that introduce natural daylight into industrial and commercial buildings.'
    },
    'accessories-hardware': {
        name: 'Accessories Hardware',
        image: './images/products/Accessories/accessories-hardware.jpg',
        description: 'Associated hardware and fittings required for complete, reliable installation of roofing, cladding and building accessories.'
    },
    'infra-industrial-sheds': {
        name: 'Industrial Sheds',
        image: './images/products/Infrastructure Solutions/infra-industrial-sheds.jpg',
        description: 'Pre-engineered industrial sheds optimized for manufacturing, processing and logistics operations.'
    },
    'infra-warehouse-structures': {
        name: 'Warehouse Structures',
        image: './images/products/Infrastructure Solutions/infra-warehouse-structures.jpg',
        description: 'Large-span warehouse buildings providing clear, flexible storage space and efficient material handling.'
    },
    'infra-commercial-buildings': {
        name: 'Commercial Buildings',
        image: './images/products/Infrastructure Solutions/infra-commercial-buildings.jpg',
        description: 'Steel-framed commercial buildings designed for showrooms, offices and retail spaces with modern aesthetics.'
    },
    'infra-custom-steel-structures': {
        name: 'Custom Steel Structures',
        image: './images/products/Infrastructure Solutions/infra-custom-steel-structures.jpg',
        description: 'Project-specific steel structures engineered to meet unique architectural, functional and industrial requirements.'
    }
};

// ============================================
// Product Modal Logic
// ============================================
let lastFocusedProductItem = null;

/**
 * Helper function to try loading image with fallback support for .jpg and .png
 * Supports both formats automatically
 */
function loadProductImage(imgElement, imagePath, productName) {
    // Try the provided path first
    imgElement.src = imagePath;
    imgElement.alt = productName;
    
    // If image fails to load, try alternative format
    imgElement.onerror = function() {
        // Extract base path without extension
        const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '');
        
        // Try opposite format
        if (imagePath.toLowerCase().endsWith('.png')) {
            imgElement.src = basePath + '.jpg';
        } else if (imagePath.toLowerCase().endsWith('.jpg') || imagePath.toLowerCase().endsWith('.jpeg')) {
            imgElement.src = basePath + '.png';
        }
        
        // If still fails, remove error handler to prevent infinite loop
        imgElement.onerror = null;
    };
}

function openProductModal(product) {
    if (!productModal || !product) return;

    // Load image with automatic format fallback (.jpg or .png)
    loadProductImage(productModalImage, product.image, product.name);
    productModalTitle.textContent = product.name;
    productModalDescription.textContent = product.description;

    productModal.classList.add('open');
    productModal.setAttribute('aria-hidden', 'false');
}

function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove('open');
    productModal.setAttribute('aria-hidden', 'true');

    // Restore focus to last clicked product item for accessibility
    if (lastFocusedProductItem) {
        lastFocusedProductItem.focus();
        lastFocusedProductItem = null;
    }
}

// Attach click handlers to product items
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.getAttribute('data-product-id');
        const product = productData[id];
        lastFocusedProductItem = item;
        openProductModal(product);
    });
});

// Close modal when clicking overlay or close button
if (productModal) {
    productModal.addEventListener('click', (event) => {
        const target = event.target;
        if (target.hasAttribute('data-product-modal-close')) {
            closeProductModal();
        }
    });
}

// Close modal on ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && productModal && productModal.classList.contains('open')) {
        closeProductModal();
    }
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


