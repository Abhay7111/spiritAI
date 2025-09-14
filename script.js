document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentMode = document.querySelector('.current-mode');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme;
            
            // Cycle through themes: light -> dark -> system
            if (currentTheme === 'light') {
                newTheme = 'dark';
                currentMode.textContent = 'Dark';
            } else if (currentTheme === 'dark') {
                newTheme = 'system';
                currentMode.textContent = 'Auto';
                // For system theme, check system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    newTheme = 'dark';
                } else {
                    newTheme = 'light';
                }
            } else {
                newTheme = 'light';
                currentMode.textContent = 'Light';
            }
            
            // Apply the new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button appearance
            updateThemeButtonAppearance(newTheme);
        });
        
        // Set initial button state
        const initialTheme = document.documentElement.getAttribute('data-theme');
        updateThemeButtonAppearance(initialTheme);
    }
    
    function updateThemeButtonAppearance(theme) {
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');
        const systemIcon = document.querySelector('.system-icon');
        
        // Hide all icons first
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'none';
        systemIcon.style.display = 'none';
        
        // Show the appropriate icon
        if (theme === 'light') {
            lightIcon.style.display = 'inline-block';
            currentMode.textContent = 'Light';
        } else if (theme === 'dark') {
            darkIcon.style.display = 'inline-block';
            currentMode.textContent = 'Dark';
        } else {
            systemIcon.style.display = 'inline-block';
            currentMode.textContent = 'Auto';
        }
    }
    
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });
        });
    });
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Simplified reveal - elements are visible by default
    const style = document.createElement('style');
    style.textContent = `
        .feature, .about-text p, .section-title {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Form Submission Animation
    const newsletterForm = document.querySelector('.newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            const originalButtonText = button.textContent;
            
            if (input.value.trim() === '') {
                // Shake animation for empty input
                input.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
                return;
            }
            
            // Success animation
            button.textContent = 'Subscribed!';
            button.style.backgroundColor = 'var(--accent-color)';
            button.style.color = 'white';
            
            // Reset after 3 seconds
            setTimeout(() => {
                input.value = '';
                button.textContent = originalButtonText;
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 3000);
        });
        
        // Add CSS for shake animation
        const shakeStyle = document.createElement('style');
        shakeStyle.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(shakeStyle);
    }
    
    // Removed image hover effect for simpler interaction
});