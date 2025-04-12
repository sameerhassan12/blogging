document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - fixed version
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('open');
        
        // Change icon from bars to X when open
        const icon = this.querySelector('i');
        if (mainNav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }
  
    // Close mobile menu when clicking on a nav link - fixed version
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          menuToggle.classList.remove('open');
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  
    // Set active page based on current URL - new function
    function setActivePage() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('.main-nav a');
      
      navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' && linkPage === 'index.html') || 
            (currentPage === linkPage && currentPage !== 'index.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  
    // Call the function when page loads
    setActivePage();
  
    // Smooth scrolling for anchor links - fixed version
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
          e.preventDefault();
          return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
          alert(`Thanks for subscribing with ${email}! We'll keep you updated.`);
          emailInput.value = '';
        }
      });
    }
  
    // Animation on scroll - fixed version
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.blog-card, .team-member, .value-card, .info-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
  
    // Set initial state for animated elements
    window.addEventListener('load', function() {
      document.querySelectorAll('.blog-card, .team-member, .value-card, .info-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });
      animateOnScroll();
    });
  
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Update copyright year
    const yearElement = document.querySelector('.footer-bottom');
    if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
  });