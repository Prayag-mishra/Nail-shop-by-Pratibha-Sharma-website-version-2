document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Active Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
        }
    });

    // Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    if (filterBtns.length > 0 && filterItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                filterItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue) || item.getAttribute('data-category') === filterValue) {
                        item.style.display = '';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // Scroll Animations
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            const counters = entry.target.querySelectorAll('.counter');
            if (counters.length && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2500;
                    let startTime = null;
                    
                    const update = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        
                        const easeOut = 1 - Math.pow(1 - progress, 4);
                        const current = target * easeOut;
                        
                        counter.innerText = Math.ceil(current).toLocaleString();
                        counter.parentElement.style.opacity = Math.max(0.2, progress);
                        
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target.toLocaleString();
                            counter.parentElement.style.opacity = 1;
                        }
                    };
                    requestAnimationFrame(update);
                });
            }
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    document.querySelectorAll('.fade-in, .stats-container').forEach(el => appearOnScroll.observe(el));
    
    // Form processing
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;
            setTimeout(() => {
                bookingForm.reset();
                btn.innerHTML = 'Submit Request';
                btn.disabled = false;
                document.getElementById('formStatus').classList.remove('d-none');
                setTimeout(() => document.getElementById('formStatus').classList.add('d-none'), 5000);
            }, 1500);
        });
    }

    // Lightbox Functionality
    const body = document.querySelector('body');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="Enlarged view">';
    body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    document.querySelectorAll('img:not([alt="Celebrity styled nails"]):not(.no-lightbox)').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        body.style.overflow = '';
    };
    
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox || e.target === lightboxClose) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
});
