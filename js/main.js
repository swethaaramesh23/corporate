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
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => observer.observe(el));

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

});
