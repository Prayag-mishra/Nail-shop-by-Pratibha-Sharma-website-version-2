document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    mobileMenuToggle.click();
                }
            });
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
    
    // Form processing for WhatsApp
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Redirecting...';
            btn.disabled = true;
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            const whatsappNumber = "917889123473";
            const text = `Hi Pratibha,\n\nI have a new inquiry:\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Message:* ${message}`;
            const encodedText = encodeURIComponent(text);
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 800);
        });
    }

    // Lightbox Functionality
    const body = document.querySelector('body');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close" aria-label="Close Lightbox" role="button">&times;</span>
        <button class="lightbox-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
        <div class="lightbox-content-container"></div>
    `;
    body.appendChild(lightbox);
    
    const lightboxContainer = lightbox.querySelector('.lightbox-content-container');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentGalleryGroup = [];
    let currentLightboxIndex = -1;

    const renderLightboxMedia = (index) => {
        lightboxContainer.innerHTML = '';
        if (index < 0 || index >= currentGalleryGroup.length) return;
        
        const media = currentGalleryGroup[index];
        
        lightboxPrev.style.display = index > 0 ? 'flex' : 'none';
        lightboxNext.style.display = index < currentGalleryGroup.length - 1 ? 'flex' : 'none';
        
        if (media.tagName === 'IMG') {
            const fullImg = document.createElement('img');
            const source = media.getAttribute('data-src') || media.src;
            fullImg.src = source;
            fullImg.alt = media.alt || 'Enlarged view';
            fullImg.onerror = function() {
                this.src = 'https://placehold.co/1200x800/f4e1e1/800020?text=Image+Unavailable';
                this.style.objectFit = 'contain';
            };
            lightboxContainer.appendChild(fullImg);
        } else if (media.tagName === 'VIDEO') {
            const fullVideo = document.createElement('video');
            fullVideo.src = media.src;
            fullVideo.autoplay = true;
            fullVideo.controls = true;
            fullVideo.playsInline = true;
            fullVideo.style.maxHeight = '90vh';
            fullVideo.style.maxWidth = '90vw';
            lightboxContainer.appendChild(fullVideo);
        }
    };

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            renderLightboxMedia(currentLightboxIndex);
        }
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentLightboxIndex < currentGalleryGroup.length - 1) {
            currentLightboxIndex++;
            renderLightboxMedia(currentLightboxIndex);
        }
    });
    
    document.addEventListener('click', (e) => {
        let target = e.target.closest('img, video, .masonry-item, .gallery-item, .service-card, .service-card-detailed');
        if (!target) return;

        let media = target;
        if (target.tagName !== 'IMG' && target.tagName !== 'VIDEO') {
            media = target.querySelector('img, video');
        }

        if (!media || media.classList.contains('no-lightbox')) return;
        if (media.getAttribute('alt') === 'Celebrity styled nails') return;
        if (e.target.closest('a, button') && !e.target.closest('.masonry-overlay')) return;

        e.preventDefault();
        
        const container = media.closest('.gallery-grid, .masonry-grid, .instagram-grid, section');
        if (container) {
            currentGalleryGroup = Array.from(container.querySelectorAll('img:not(.no-lightbox), video:not(.no-lightbox)')).filter(m => m.getAttribute('alt') !== 'Celebrity styled nails');
        } else {
            currentGalleryGroup = [media];
        }
        
        currentLightboxIndex = currentGalleryGroup.indexOf(media);
        if (currentLightboxIndex === -1) {
            currentGalleryGroup = [media];
            currentLightboxIndex = 0;
        }
        
        renderLightboxMedia(currentLightboxIndex);
        lightbox.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        body.style.overflow = '';
        lightboxContainer.innerHTML = '';
        currentGalleryGroup = [];
        currentLightboxIndex = -1;
    };
    
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox || e.target === lightboxClose || e.target === lightboxContainer) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) {
            currentLightboxIndex--;
            renderLightboxMedia(currentLightboxIndex);
        }
        if (e.key === 'ArrowRight' && currentLightboxIndex < currentGalleryGroup.length - 1) {
            currentLightboxIndex++;
            renderLightboxMedia(currentLightboxIndex);
        }
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
            }
        });
    });

    // Academy Carousel Navigation (Infinite Loop)
    const academyCarousel = document.getElementById('academyCarousel');
    const academyPrev = document.getElementById('academyPrev');
    const academyNext = document.getElementById('academyNext');

    if (academyCarousel && academyPrev && academyNext) {
        // Infinite Scroll Setup: Clone items
        const cards = Array.from(academyCarousel.querySelectorAll('.academy-card'));
        cards.forEach(card => {
            const cloneBefore = card.cloneNode(true);
            const cloneAfter = card.cloneNode(true);
            academyCarousel.insertBefore(cloneBefore, academyCarousel.firstChild);
            academyCarousel.appendChild(cloneAfter);
        });

        // Initial scroll to the middle set
        const scrollAmount = () => {
            const card = academyCarousel.querySelector('.academy-card');
            return card ? card.offsetWidth + 25 : 320;
        };
        
        const centerCarousel = () => {
            academyCarousel.scrollLeft = academyCarousel.scrollWidth / 3;
        };

        window.addEventListener('load', centerCarousel);
        setTimeout(centerCarousel, 500);

        const handleScroll = (direction) => {
            const step = scrollAmount();
            const targetScroll = direction === 'next' 
                ? academyCarousel.scrollLeft + step 
                : academyCarousel.scrollLeft - step;
            
            academyCarousel.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        };

        academyPrev.onclick = (e) => { e.preventDefault(); handleScroll('prev'); };
        academyNext.onclick = (e) => { e.preventDefault(); handleScroll('next'); };

        const checkInfinite = () => {
            const totalWidth = academyCarousel.scrollWidth;
            const viewWidth = academyCarousel.clientWidth;
            const scrollLeft = academyCarousel.scrollLeft;

            // Jump back to middle if we go too far
            if (scrollLeft <= 5) {
                academyCarousel.scrollTo({ left: totalWidth / 3, behavior: 'auto' });
            } else if (scrollLeft + viewWidth >= totalWidth - 5) {
                academyCarousel.scrollTo({ left: (totalWidth / 3) - viewWidth + (totalWidth / 3), behavior: 'auto' });
                // Simplified jump:
                academyCarousel.scrollLeft = totalWidth / 3;
            }
        };

        academyCarousel.addEventListener('scroll', checkInfinite);
    }
});
