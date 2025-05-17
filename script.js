document.addEventListener('DOMContentLoaded', function() {
    // Language switching
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('language') || 'uk';

    function updateContent(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const translation = key.split('.').reduce((obj, i) => obj[i], translations[lang]);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    function setActiveLanguage(lang) {
        langToggle.checked = lang === 'en';
        localStorage.setItem('language', lang);
        currentLang = lang;
        updateContent(lang);
    }

    langToggle.addEventListener('change', () => {
        const lang = langToggle.checked ? 'en' : 'uk';
        setActiveLanguage(lang);
    });

    // Initialize with saved language
    setActiveLanguage(currentLang);

    // Logo animation
    const logo = document.querySelector('header .logo');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.pageYOffset > scrollThreshold) {
            logo.classList.add('expanded');
        } else {
            logo.classList.remove('expanded');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        console.log('Form submission:', formData);
        
        const successMessage = currentLang === 'uk' 
            ? 'Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.'
            : 'Thank you for your message! We will contact you soon.';
        
        alert(successMessage);
        
        contactForm.reset();
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (!value.startsWith('380')) {
                value = '380' + value;
            }
            if (value.length > 12) {
                value = value.slice(0, 12);
            }
            e.target.value = '+' + value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
        }
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}); 