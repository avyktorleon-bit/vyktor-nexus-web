document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // MOBILE MENU LOGIC
    // =========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');

    // Toggle Hamburger Menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    // Close Menu Button
    const closeMenuBtn = document.querySelector('.close-menu');
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Mobile Dropdown Accordion
    const isMobile = () => window.getComputedStyle(mobileToggle).display !== 'none';

    if (isMobile()) {
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    const dropdown = item.querySelector('.dropdown');
                    if (dropdown && isMobile()) {
                        e.preventDefault();

                        // Close other items (optional, but cleaner)
                        navItems.forEach(otherItem => {
                            if (otherItem !== item) otherItem.classList.remove('open');
                        });

                        item.classList.toggle('open');
                    }
                });
            }
        });
    }


    // =========================================
    // NEWS FILTERING LOGIC
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    // Function to apply filter
    const applyFilter = (category) => {
        // Update Buttons
        filterBtns.forEach(b => {
            if (b.getAttribute('data-category') === category) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // Filter Cards
        if (newsCards.length > 0) {
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || category === cardCategory) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    };

    // 1. Event Listeners for Buttons
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                applyFilter(category);
                // Optional: Update URL without reload
                // history.pushState(null, '', `?category=${category}`); 
            });
        });
    }

    // 2. Check URL Parameters on Load
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        // If on index.html but want to jump to specific section, handle that
        // But mainly for noticias.html
        applyFilter(categoryParam);

        // If we are on news page, maybe scroll to filter bar?
        const filterBar = document.querySelector('.filter-bar');
        if (filterBar) {
            filterBar.scrollIntoView({ behavior: 'smooth' });
        }
    }


    // =========================================
    // GENERAL UI ANIMATIONS
    // =========================================

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's a valid anchor on this page
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            // Check if target exists on this page
            // If it's pure hash like "#videos"
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    // Close mobile menu if open
                    navMenu.classList.remove('active');

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-title, .hero-content').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const addVisibleStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };
    addVisibleStyles();

});
