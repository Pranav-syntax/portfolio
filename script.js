document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // If mobile menu is open, close it
                navLinks.classList.remove('active');

                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Header offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .section-title, .glass-card');
    fadeElements.forEach(el => {
        // Add fade-in class if not already there, for valid css targeting
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
        observer.observe(el);
    });

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursorGlow.style.top = y + 'px';
        cursorGlow.style.left = x + 'px';
    });

    // EmailJS Init
    (function () {
        emailjs.init("oZ9BdyjRCEDyb6Hoe");
    })();

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';

            // Use FormData to avoid clashing with built-in form properties
            const formData = new FormData(this);
            const templateParams = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                title: 'New Contact Form Submission'
            };

            emailjs.send('service_e1wu49p', 'template_ti9mvog', templateParams)
                .then(() => {
                    alert('Message sent successfully!');
                    btn.innerText = originalText;
                    contactForm.reset();
                })
                .catch((error) => {
                    alert('Failed to send message. Please try again.');
                    btn.innerText = originalText;
                    console.log('FAILED...', error);
                });
        });
    }
});