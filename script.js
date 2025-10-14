// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather Icons
  feather.replace();
  
  // Footer year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize functionalities
  initAccessibility();
  initReadingProgress();
  initHeader();
  initMobileMenu();
  initSearch();
  initStats();
  initTestimonials();
  initFAQ();
  initContactForm();
  initModal();
  initBackToTop();
  initScrollAnimations();

// ===================================
// SKELETON SCREENS
// ===================================
function initSkeletonScreens() {
  // Simulate a loading delay
  setTimeout(() => {
    const skeletons = document.querySelectorAll('.skeleton-image, .skeleton-title, .skeleton-text');
    skeletons.forEach(skeleton => {
      const realContent = skeleton.closest('.program-card, .coach-card').nextElementSibling;
      if (realContent && realContent.classList.contains('real-content')) {
        skeleton.closest('.program-card, .coach-card').style.display = 'none';
        realContent.style.display = 'block';
      }
    });
  }, 1500); // 1.5 seconds delay to simulate loading
}
  initStickyCTA();
  initActiveSectionIndicator();
  initFormValidation();
  initSkeletonScreens();
});

// ===================================
// ACCESSIBILITY
// ===================================
function initAccessibility() {
  const accessibilityBtn = document.getElementById('accessibility-btn');
  const accessibilityPanel = document.getElementById('accessibility-panel');
  const closeAccessibility = document.getElementById('close-accessibility');
  const increaseFontBtn = document.getElementById('increase-font');
  const decreaseFontBtn = document.getElementById('decrease-font');
  const fontDisplay = document.getElementById('font-display');
  const highContrastToggle = document.getElementById('high-contrast');
  const reduceMotionToggle = document.getElementById('reduce-motion');
  
  let fontSize = 100;
  
  // Open/close panel
  if (accessibilityBtn && accessibilityPanel) {
    accessibilityBtn.addEventListener('click', () => {
      accessibilityPanel.classList.toggle('active');
    });
  }
  
  if (closeAccessibility && accessibilityPanel) {
    closeAccessibility.addEventListener('click', () => {
      accessibilityPanel.classList.remove('active');
    });
  }
  
  // Font size control
  if (increaseFontBtn && decreaseFontBtn && fontDisplay) {
    increaseFontBtn.addEventListener('click', () => {
      if (fontSize < 150) {
        fontSize += 10;
        document.documentElement.style.fontSize = fontSize + '%';
        fontDisplay.textContent = fontSize + '%';
        localStorage.setItem('fontSize', fontSize);
      }
    });
    
    decreaseFontBtn.addEventListener('click', () => {
      if (fontSize > 80) {
        fontSize -= 10;
        document.documentElement.style.fontSize = fontSize + '%';
        fontDisplay.textContent = fontSize + '%';
        localStorage.setItem('fontSize', fontSize);
      }
    });
    
    // Load saved preference
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      fontSize = parseInt(savedFontSize);
      document.documentElement.style.fontSize = fontSize + '%';
      fontDisplay.textContent = fontSize + '%';
    }
  }
  
  // High contrast
  if (highContrastToggle) {
    highContrastToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('high-contrast', e.target.checked);
      localStorage.setItem('highContrast', e.target.checked);
    });
    
    // Load saved preference
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    if (savedHighContrast) {
      highContrastToggle.checked = true;
      document.body.classList.add('high-contrast');
    }
  }
  
  // Reduce animations
  if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('reduce-motion', e.target.checked);
      localStorage.setItem('reduceMotion', e.target.checked);
    });
    
    // Load saved preference
    const savedReduceMotion = localStorage.getItem('reduceMotion') === 'true';
    if (savedReduceMotion) {
      reduceMotionToggle.checked = true;
      document.body.classList.add('reduce-motion');
    }
  }
}

// ===================================
// READING PROGRESS INDICATOR
// ===================================
function initReadingProgress() {
  const readingProgress = document.getElementById('reading-progress');
  
  if (readingProgress) {
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      readingProgress.style.width = progress + '%';
    });
  }
}

// ===================================
// HEADER
// ===================================
function initHeader() {
  const header = document.getElementById('header');
  
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      // Add scrolled class
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
}

// ===================================
// SEARCH
// ===================================
function initSearch() {
  const searchToggle = document.getElementById('search-toggle');
  const searchBox = document.getElementById('search-box');
  const searchInput = document.getElementById('search-input');
  const searchSubmit = document.getElementById('search-submit');
  
  if (searchToggle && searchBox && searchInput) {
    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const headerActions = document.getElementById("header-actions");
      if (searchBox.classList.contains("active")) {
        searchBox.classList.remove("active");
        headerActions.classList.remove("search-active");
        searchInput.value = "";
      } else {
        searchBox.classList.add("active");
        headerActions.classList.add("search-active");
        searchInput.focus();
      }
    });
    
    // Close when clicking outside
    document.addEventListener("click", (e) => {
      const headerActions = document.getElementById("header-actions");
      if (searchBox.classList.contains("active") && 
          !searchBox.contains(e.target) && 
          !searchToggle.contains(e.target)) {
        searchBox.classList.remove("active");
        headerActions.classList.remove("search-active");
        searchInput.value = "";
      }
    });
    
    // Search on page
    if (searchSubmit) {
      searchSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
      });
      
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });
    }
  }
  
  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      // Find text on the page
      if (window.find) {
        window.find(query, false, false, true, false, false, false);
      }
    }
  }
}

// ===================================
// ANIMATED STATS
// ===================================
function initStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;
  
  function animateStats() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };
      
      updateCounter();
    });
    
    animated = true;
  }
  
  // Observe when the stats section enters the viewport
  const statsSection = document.querySelector('.stats-section');
  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }
}

// ===================================
// TESTIMONIALS (SLIDER)
// ===================================
function initTestimonials() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonials-dots .dot');
  
  if (testimonialCards.length === 0) return;
  
  let currentIndex = 0;
  
  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove('active');
      if (i === index) {
        card.classList.add('active');
      }
    });
    
    dots.forEach((dot, i) => {
      dot.classList.remove('active');
      if (i === index) {
        dot.classList.add('active');
      }
    });
    
    // Reinitialize icons
    feather.replace();
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
      showTestimonial(currentIndex);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonialCards.length;
      showTestimonial(currentIndex);
    });
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showTestimonial(currentIndex);
    });
  });
  
  // Auto-play (optional)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(currentIndex);
  }, 5000);
}

// ===================================
// FAQ (ACCORDION)
// ===================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Open the clicked one if it was not active
        if (!isActive) {
          item.classList.add('active');
        }
        
        // Reinitialize icons
        feather.replace();
      });
    }
  });
}

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate submission (here you would integrate with a real backend)
      setTimeout(() => {
        contactForm.reset();
        formSuccess.classList.add('show');
        feather.replace();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      }, 500);
    });
  }
  
  // Newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing! You will receive our news soon.');
      newsletterForm.reset();
    });
  }
}

// ===================================
// MODAL
// ===================================
function initModal() {
  const openTryoutBtn = document.getElementById('open-tryout-btn');
  const tryoutModal = document.getElementById('tryout-modal');
  const closeTryoutModal = document.getElementById('close-tryout-modal');
  const ctaEnroll = document.getElementById('cta-enroll');
  
  // Open modal
  if (openTryoutBtn && tryoutModal) {
    openTryoutBtn.addEventListener('click', () => {
      tryoutModal.classList.add('active');
      document.body.classList.add('no-scroll');
      feather.replace();
    });
  }
  
  if (ctaEnroll && tryoutModal) {
    ctaEnroll.addEventListener('click', () => {
      tryoutModal.classList.add('active');
      document.body.classList.add('no-scroll');
      feather.replace();
    });
  }
  
  // Close modal
  if (closeTryoutModal && tryoutModal) {
    closeTryoutModal.addEventListener('click', () => {
      tryoutModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }
  
  // Close when clicking outside
  if (tryoutModal) {
    tryoutModal.addEventListener('click', (e) => {
      if (e.target === tryoutModal) {
        tryoutModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
  
  // Close with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tryoutModal && tryoutModal.classList.contains('active')) {
      tryoutModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Elements to animate
  const animatedElements = document.querySelectorAll(`
    .about-card,
    .program-card,
    .coach-card,
    .stat-card,
    .info-card
  `);
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===================================
// STICKY CTA
// ===================================
function initStickyCTA() {
  const stickyCTA = document.getElementById('sticky-cta');
  const stickyCTABtn = document.getElementById('sticky-cta-btn');
  const tryoutModal = document.getElementById('tryout-modal');
  
  if (stickyCTA && stickyCTABtn) {
    let hasShown = false;
    
    window.addEventListener('scroll', () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Show CTA after 30% scroll
      if (scrollPercentage > 30 && !hasShown) {
        stickyCTA.classList.add('show');
        hasShown = true;
      }
      
      // Hide CTA when reaching the footer
      const footer = document.querySelector('.footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
          stickyCTA.classList.remove('show');
        } else if (hasShown) {
          stickyCTA.classList.add('show');
        }
      }
    });
    
    // Open modal when button is clicked
    stickyCTABtn.addEventListener('click', () => {
      if (tryoutModal) {
        tryoutModal.classList.add('active');
        document.body.classList.add('no-scroll');
        feather.replace();
      }
    });
  }
}

// ===================================
// ACTIVE SECTION INDICATOR
// ===================================
function initActiveSectionIndicator() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a[href^="#"]');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to the corresponding link
        const activeLink = document.querySelector(`.nav-desktop a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// ===================================
// FORM VALIDATION
// ===================================
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Validate in real time
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
          validateField(input);
        }
      });
    });
    
    // Validate on submission
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('loading');
        }
        
        // Simulate submission
        setTimeout(() => {
          contactForm.reset();
          if (submitBtn) {
            submitBtn.classList.remove('loading');
          }
          
          // Remove validation classes
          inputs.forEach(input => {
            input.parentElement.classList.remove('success', 'error');
          });
          
          // Show success toast
          showToast('Message sent!', 'We will contact you shortly.', 'success');
        }, 1500);
      }
    });
  }
}

function validateField(field) {
  const formGroup = field.parentElement;
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Check if it's required
  if (field.hasAttribute('required') && value === '') {
    isValid = false;
    errorMessage = 'This field is required.';
  }
  
  // Validate email
  if (field.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
  }
  
  // Validate phone number
  if (field.type === 'tel' && value !== '') {
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(value) || value.length < 10) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number.';
    }
  }
  
  // Update UI
  if (isValid) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    // Remove error message if it exists
    const existingError = formGroup.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
  } else {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    // Add or update error message
    let errorElement = formGroup.querySelector('.form-error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'form-error';
      formGroup.appendChild(errorElement);
    }
    errorElement.textContent = errorMessage;
  }
  
  return isValid;
}

// ===================================
// TOAST NOTIFICATIONS
// ===================================
function showToast(title, message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'check-circle' : 'alert-circle';
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i data-feather="${icon}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close notification">
      <i data-feather="x"></i>
    </button>
  `;
  
  container.appendChild(toast);
  feather.replace();
  
  // Close when button is clicked
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

// ===================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Ignore empty links or just #
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      
      const headerHeight = document.getElementById('header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});