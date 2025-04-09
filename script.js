 document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Testimonial Slider - Fixed Version
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    let slideInterval;

    function showTestimonial(index) {
        // Remove active class from all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Handle index boundaries
        if (index >= testimonials.length) {
            currentTestimonial = 0;
        } else if (index < 0) {
            currentTestimonial = testimonials.length - 1;
        } else {
            currentTestimonial = index;
        }
        
        // Add active class to current testimonial
        testimonials[currentTestimonial].classList.add('active');
    }

    // Button event listeners
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
        resetInterval();
    });

    function startInterval() {
        slideInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startInterval();
        });
    }

    // Initialize first testimonial and start auto-rotation
    showTestimonial(0);
    startInterval();
    
    // WhatsApp Integration for Form Submission
    const bookingForm = document.getElementById('bookingForm');
    const whatsappLink = document.getElementById('whatsapp-link');
    
    // Set WhatsApp number
    const whatsappNumber = "917878084019"; // Joyti's WhatsApp number
    
    // Set WhatsApp link in contact section
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${whatsappNumber}`;
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `*New Booking Request*%0A%0A` +
                                  `*Name:* ${name}%0A` +
                                  `*Phone:* ${phone}%0A` +
                                  `*Email:* ${email || 'Not provided'}%0A` +
                                  `*Service:* ${service}%0A` +
                                  `*Date:* ${date}%0A` +
                                  `*Message:* ${message || 'None'}`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
            
            // Optional: Reset form
            bookingForm.reset();
            
            // Optional: Show confirmation
            alert('Thank you! You will be redirected to WhatsApp to complete your booking.');
        });
    }

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
