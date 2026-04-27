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

    // Pagination, Lazy Loading & Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const grids = document.querySelectorAll('.gallery-grid, .masonry-grid, .instagram-grid');
    
    grids.forEach(grid => {
        const items = Array.from(grid.querySelectorAll('.gallery-item, .masonry-item, .insta-item'));
        if (items.length === 0) return;
        
        let currentFilter = 'all';
        let visibleCount = 0;
        const batchSize = 5;
        let scrollObserver = null;
        
        const loadMore = () => {
            const matchingItems = items.filter(item => 
                currentFilter === 'all' || item.classList.contains(currentFilter) || item.getAttribute('data-category') === currentFilter
            );
            
            const toShow = matchingItems.slice(visibleCount, visibleCount + batchSize);
            
            toShow.forEach(item => {
                item.style.display = '';
                
                // Lazy load media using data-src
                const media = item.querySelectorAll('img, video');
                media.forEach(m => {
                    if (m.hasAttribute('data-src')) {
                        m.src = m.getAttribute('data-src');
                        m.removeAttribute('data-src');
                    }
                });
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            });
            
            visibleCount += toShow.length;
            
            if (toShow.length > 0) {
                // Observe the 2nd to last item shown in this batch to trigger next batch
                const triggerIndex = Math.max(0, toShow.length - 2);
                const triggerItem = toShow[triggerIndex];
                
                if (scrollObserver) scrollObserver.disconnect();
                
                scrollObserver = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        scrollObserver.disconnect();
                        loadMore();
                    }
                }, { rootMargin: "300px" });
                
                scrollObserver.observe(triggerItem);
            }
        };
        
        // Hide all initially
        items.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
        });
        
        // Initial load
        loadMore();
        
        // Filter logic scoped to the page
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                // Remove old event listeners if any, by redefining them (only safe if this code runs once)
                btn.addEventListener('click', () => {
                    if (btn.classList.contains('active')) return;
                    
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.getAttribute('data-filter');
                    
                    if (scrollObserver) scrollObserver.disconnect();
                    
                    // Hide all current items
                    items.forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    });
                    
                    // Reset and load next batch for new filter
                    setTimeout(() => {
                        visibleCount = 0;
                        loadMore();
                    }, 350);
                });
            });
        }
    });

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
    lightbox.innerHTML = '<span class="lightbox-close">&times;</span><div class="lightbox-content-container"></div>';
    body.appendChild(lightbox);
    
    const lightboxContainer = lightbox.querySelector('.lightbox-content-container');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Add click event for images
    document.querySelectorAll('img:not([alt="Celebrity styled nails"]):not(.no-lightbox)').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxContainer.innerHTML = `<img src="${img.src}" alt="Enlarged view">`;
            lightbox.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    // Add click event for videos to open in lightbox
    document.querySelectorAll('video').forEach(vid => {
        vid.style.cursor = 'zoom-in';
        vid.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxContainer.innerHTML = `<video src="${vid.src}" autoplay playsinline style="max-height: 90vh; max-width: 90vw; outline: none;"></video>`;
            const lbVideo = lightboxContainer.querySelector('video');
            lbVideo.addEventListener('click', () => {
                if(lbVideo.paused) lbVideo.play();
                else lbVideo.pause();
            });
            lightbox.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        body.style.overflow = '';
        lightboxContainer.innerHTML = ''; // Stop video
    };
    
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox || e.target === lightboxClose || e.target === lightboxContainer) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    // Video Scroll Observer
    const videoOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Play when 50% of the video is visible
    };
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                video.pause();
            }
        });
    }, videoOptions);
    
    document.querySelectorAll('video').forEach(video => {
        // Remove standard autoplay from HTML so JS can control it strictly based on viewport
        video.removeAttribute('autoplay');
        videoObserver.observe(video);
    });

    // Mobile Viewport Interaction for Image Overlays
    if (window.matchMedia("(max-width: 991px)").matches) {
        const centerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-center');
                } else {
                    entry.target.classList.remove('is-center');
                }
            });
        }, {
            root: null,
            rootMargin: "-40% 0px -40% 0px", // Trigger only when in the middle 20% of the viewport height
            threshold: 0
        });

        document.querySelectorAll('.gallery-item, .masonry-item').forEach(el => {
            centerObserver.observe(el);
        });
    }

    // Global Fallback for Broken Images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (!this.classList.contains('fallback-applied')) {
                this.classList.add('fallback-applied');
                // Use a styled placeholder that matches the brand colors (bg: blush pink, text: burgundy)
                this.src = 'https://placehold.co/600x600/f4e1e1/800020?text=The+Nail+Art+Shop';
                this.alt = 'Image temporarily unavailable';
                this.style.objectFit = 'contain';
                this.style.padding = '20px';
                this.style.backgroundColor = '#fbf5f5';
            }
        });
    });
});
