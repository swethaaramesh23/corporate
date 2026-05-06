document.addEventListener('DOMContentLoaded', () => {

    // Preloader Logic
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => preloader.remove(), 500); // Wait for transition to finish
        }, 1500);
    }

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
            mobileBtn.style.fontSize = navLinks.classList.contains('active') ? '2rem' : '1.5rem';
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // Intersection Observer for ALL animated elements
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.05 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale');
    animatedElements.forEach(el => observer.observe(el));
    
    // Fallback: ensure elements at the top or visible are shown even if observer delays
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('is-visible');
            }
        });
    }, 100);

    // Set Active Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // Social Icon Click → Redirect to 404 Page
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            contactForm.querySelectorAll('[required]').forEach(field => {
                const group = field.closest('.form-group');
                if (!field.value.trim()) {
                    group.classList.add('error');
                    valid = false;
                } else {
                    group.classList.remove('error');
                }
            });

            if (!valid) {
                showToast('Please fill in all required fields before sending.', 'error');
            } else {
                showToast('Message sent successfully!', 'info');
                contactForm.reset();
            }
        });
    }

    // Auth Form Logic (Login & Signup)
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validate basic required fields
            let valid = true;
            authForm.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) valid = false;
            });

            if (valid) {
                showToast('Success! Redirecting...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            } else {
                showToast('Please fill in all required fields.', 'error');
            }
        });
    }

    // Toast Notification
    function showToast(message, type) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    }

    // Counter Up Animation
    const counterUp = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target % 1 === 0 ? target : target.toFixed(1);
                // Append suffix if exists
                const suffix = el.getAttribute('data-suffix') || '';
                el.innerText += suffix;
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current) + (el.getAttribute('data-suffix') || '');
            }
        }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-value');
                counters.forEach(counter => counterUp(counter));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.section.bg-dark');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

});
