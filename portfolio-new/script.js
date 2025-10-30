document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Set active section and update navigation
    function setActiveSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        
        // Update URL hash
        window.location.hash = sectionId;
    }
    
    // Add click event to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            setActiveSection(sectionId);
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('mobile-open');
            }
        });
    });
    
    // Check URL hash on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setActiveSection(sectionId);
    }
    
    // Theme switcher functionality
    const themeColors = document.querySelectorAll('.theme-color');
    
    themeColors.forEach(color => {
        color.addEventListener('click', function() {
            const newColor = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', newColor);
            
            // Save color preference
            localStorage.setItem('primary-color', newColor);
            
            // Show notification
            showNotification('Theme color updated!');
        });
    });
    
    // Load saved primary color
    const savedPrimaryColor = localStorage.getItem('primary-color');
    if (savedPrimaryColor) {
        document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
    }
    
    // Dark/Light theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;
    
    // Check for saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Set initial theme
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Show notification
        showNotification(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated!`);
    }
    
    // Update theme icon
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('title', 'Switch to Light Mode');
        } else {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('title', 'Switch to Dark Mode');
        }
    }
    
    // Add event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            root.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
    
    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    
    const name = "Naviya Dharshini";
    let index = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deletingSpeed = 100;
    let pauseTime = 2000;
    
    function typeWriter() {
        const currentText = typingText.textContent;
        
        if (!isDeleting) {
            // Typing mode
            if (index < name.length) {
                typingText.textContent += name.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Finished typing, wait then start deleting
                isDeleting = true;
                setTimeout(typeWriter, pauseTime);
            }
        } else {
            // Deleting mode
            if (index > 0) {
                typingText.textContent = currentText.substring(0, index - 1);
                index--;
                setTimeout(typeWriter, deletingSpeed);
            } else {
                // Finished deleting, wait then start typing again
                isDeleting = false;
                setTimeout(typeWriter, 500);
            }
        }
    }
    
    // Start the typing animation after a short delay
    setTimeout(typeWriter, 1000);
    
    // Download CV functionality
    const downloadCV = document.getElementById('downloadCV');
    
    downloadCV.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a temporary link for download
        const link = document.createElement('a');
        link.href = 'path/to/your-cv.pdf'; // Update this path to your actual CV file
        link.download = 'Naviya_Dharshini_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showNotification('CV downloaded successfully!');
    });
    
    // Scroll Animation Functionality
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .service-card, .portfolio-item, .timeline-item, .skill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add delay for skills animation
                    if (entry.target.classList.contains('skill')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = (index * 0.1) + 's';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize scroll animations when DOM is loaded
    setTimeout(initScrollAnimations, 1000);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for sidebar
    window.addEventListener('scroll', function() {
        const sidebar = document.querySelector('.sidebar');
        const scrolled = window.pageYOffset;
        
        if (sidebar && window.innerWidth > 768) {
            const rate = scrolled * -0.5;
            sidebar.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded class with delay for smooth entrance
        setTimeout(() => {
            document.querySelector('.sidebar').classList.add('loaded');
            document.querySelector('.main-content').classList.add('loaded');
        }, 500);
    });
    
    // Mobile menu toggle
    function initMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.createElement('button');
        
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background: var(--primary-color);
            color: white;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 4px 15px var(--shadow-color);
        `;
        
        document.body.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
        
        // Show/hide based on screen size
        function updateMenuVisibility() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'flex';
                sidebar.classList.remove('mobile-open');
            } else {
                menuToggle.style.display = 'none';
                sidebar.classList.remove('mobile-open');
            }
        }
        
        updateMenuVisibility();
        window.addEventListener('resize', updateMenuVisibility);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name').value;
            const email = formData.get('email') || document.getElementById('email').value;
            const subject = formData.get('subject') || document.getElementById('subject').value;
            const message = formData.get('message') || document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields!', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : 'var(--primary-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add notification keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .sidebar.mobile-open {
            transform: translateX(0) !important;
        }
        
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .sidebar.mobile-open {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add floating particles background
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.3;
                animation: float 6s ease-in-out infinite;
                animation-delay: ${Math.random() * 6}s;
            `;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add floating animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(10px, -10px) rotate(90deg);
                }
                50% {
                    transform: translate(0, -20px) rotate(180deg);
                }
                75% {
                    transform: translate(-10px, -10px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }
    
    // Initialize particles
    createParticles();
    
    // Add scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Initialize scroll progress
    initScrollProgress();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            document.querySelector('.sidebar')?.classList.remove('mobile-open');
        }
    });
    
    // Console welcome message
    console.log('%c👋 Welcome to Naviya\'s Portfolio!', 'color: #ff4757; font-size: 18px; font-weight: bold;');
    console.log('%c💻 Built with passion using HTML, CSS & JavaScript', 'color: #1e90ff; font-size: 14px;');
});