/
 * PDS – Pune Documents Support
 * Main JavaScript File
 * 
 * Features:
 * 1. Mobile Navigation Toggle
 * 2. Lead Form to WhatsApp Integration
 * 3. FAQ Accordion Functionality
 * 4. Smooth Scrolling Navigation
 * 5. Floating Button Visibility
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // FEATURE 1: MOBILE NAVIGATION MENU
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // Toggle menu on click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // =========================================
    // FEATURE 2: LEAD FORM TO WHATSAPP
    // =========================================
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Capture values
            const name = document.getElementById('leadName').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            const message = document.getElementById('leadMessage').value.trim();

            // Validation
            if (name === '' || phone === '') {
                alert('Please fill in your Name and Phone Number.');
                return;
            }

            // Format WhatsApp Message
            const whatsappMessage = `Hello PDS Team,%0A%0AMy Name: ${name}%0APhone: ${phone}%0A%0AMessage:%0A${message}%0A%0AI want help with passport services.`;

            // WhatsApp Number
            const whatsappNumber = "918788437112";

            // Create URL and Redirect
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Optional: Change button text to indicate loading
            const submitBtn = leadForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Opening WhatsApp...';
            submitBtn.disabled = true;

            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                // Reset button
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                // Reset form
                leadForm.reset();
            }, 1000);
        });
    }

    // =========================================
    // FEATURE 3: FAQ ACCORDION
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items (Optional - remove if you want multiple open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // =========================================
    // FEATURE 4: SMOOTH SCROLL NAVIGATION
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for sticky header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================
    // FEATURE 5 & 6: FLOATING BUTTONS
    // =========================================
    // Ensure buttons are always clickable and handle visibility on scroll
    const floatingWa = document.querySelector('.floating-wa');
    const floatingCall = document.querySelector('.floating-call');

    // Add click events for better tracking (optional)
    if (floatingWa) {
        floatingWa.addEventListener('click', () => {
            window.open('https://wa.me/918788437112', '_blank');
        });
    }

    if (floatingCall) {
        floatingCall.addEventListener('click', () => {
            window.location.href = 'tel:+918788437112';
        });
    }

    // =========================================
    // FEATURE 7: BUTTON ANIMATION & INTERACTION
    // =========================================
    // Add a ripple effect or active state to buttons
    const buttons = document.querySelectorAll('.btn, .btn-submit');

    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });

        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // =========================================
    // FEATURE 8: SCROLL REVEAL (Optional Polish)
    // =========================================
    // Simple fade-in effect for sections when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Apply to sections (assuming they have a class like 'reveal-section')
    // You can add class="reveal-section" to your HTML sections to enable this
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(section);
    });
});
