// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Mobile Navbar Toggle --- */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle the 'active' class on the menu
            navMenu.classList.toggle('active');
            
            // Toggle the bars/x icon based on the active class
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'; // Close icon
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'; // Hamburger icon
            }
        });

        // Close menu when a link is clicked (for better user experience)
        const navLinks = navMenu.querySelectorAll('ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    /* --- 2. Smooth Scrolling --- */
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- 3. Simple Form Validation --- */
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            // Clear previous error messages
            document.querySelectorAll('.error-msg').forEach(msg => msg.innerText = '');

            // Get input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Simple check if name is empty
            if (name === '') {
                document.getElementById('name-error').innerText = 'Name is required.';
                isValid = false;
            }

            // Simple email validation using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email-error').innerText = 'Please enter a valid email address.';
                isValid = false;
            }

            // Simple check if message is empty
            if (message === '') {
                document.getElementById('message-error').innerText = 'Message is required.';
                isValid = false;
            }

            // If all fields are valid, show success message and clear form
            if (isValid) {
                console.log('Form Submitted Successfully:', { name, email, message });
                
                // Show success message and hide form
                successMsg.classList.remove('hidden');
                contactForm.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }
        });
    }

});
