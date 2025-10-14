// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar Feather Icons
  feather.replace();
  
  // Ano do footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Inicializar funcionalidades
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
  // Simular um delay de carregamento
  setTimeout(() => {
    const skeletons = document.querySelectorAll('.skeleton-image, .skeleton-title, .skeleton-text');
    skeletons.forEach(skeleton => {
      const realContent = skeleton.closest('.program-card, .coach-card').nextElementSibling;
      if (realContent && realContent.classList.contains('real-content')) {
        skeleton.closest('.program-card, .coach-card').style.display = 'none';
        realContent.style.display = 'block';
      }
    });
  }, 1500); // Delay de 1.5 segundos para simular o carregamento
}
  initStickyCTA();
  initActiveSectionIndicator();
  initFormValidation();
  initSkeletonScreens();
});

// ===================================
// ACESSIBILIDADE
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
  
  // Abrir/fechar painel
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
  
  // Controle de tamanho de fonte
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
    
    // Carregar preferência salva
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      fontSize = parseInt(savedFontSize);
      document.documentElement.style.fontSize = fontSize + '%';
      fontDisplay.textContent = fontSize + '%';
    }
  }
  
  // Alto contraste
  if (highContrastToggle) {
    highContrastToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('high-contrast', e.target.checked);
      localStorage.setItem('highContrast', e.target.checked);
    });
    
    // Carregar preferência salva
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    if (savedHighContrast) {
      highContrastToggle.checked = true;
      document.body.classList.add('high-contrast');
    }
  }
  
  // Reduzir animações
  if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('reduce-motion', e.target.checked);
      localStorage.setItem('reduceMotion', e.target.checked);
    });
    
    // Carregar preferência salva
    const savedReduceMotion = localStorage.getItem('reduceMotion') === 'true';
    if (savedReduceMotion) {
      reduceMotionToggle.checked = true;
      document.body.classList.add('reduce-motion');
    }
  }
}

// ===================================
// INDICADOR DE PROGRESSO DE LEITURA
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
      
      // Adicionar classe scrolled
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
// MENU MOBILE
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
    
    // Fechar menu ao clicar em um link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Fechar menu ao clicar fora
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
// BUSCA
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
    
    // Fechar ao clicar fora
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
    
    // Buscar na página
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
      // Buscar texto na página
      if (window.find) {
        window.find(query, false, false, true, false, false, false);
      }
    }
  }
}

// ===================================
// ESTATÍSTICAS ANIMADAS
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
  
  // Observar quando a seção de stats entra na viewport
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
// DEPOIMENTOS (SLIDER)
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
    
    // Reinicializar ícones
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
  
  // Auto-play (opcional)
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
        
        // Fechar todos os outros
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Abrir o clicado se não estava ativo
        if (!isActive) {
          item.classList.add('active');
        }
        
        // Reinicializar ícones
        feather.replace();
      });
    }
  });
}

// ===================================
// FORMULÁRIO DE CONTATO
// ===================================
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simular envio (aqui você integraria com um backend real)
      setTimeout(() => {
        contactForm.reset();
        formSuccess.classList.add('show');
        feather.replace();
        
        // Esconder mensagem após 5 segundos
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
      alert('Obrigado por se inscrever! Você receberá nossas novidades em breve.');
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
  
  // Abrir modal
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
  
  // Fechar modal
  if (closeTryoutModal && tryoutModal) {
    closeTryoutModal.addEventListener('click', () => {
      tryoutModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }
  
  // Fechar ao clicar fora
  if (tryoutModal) {
    tryoutModal.addEventListener('click', (e) => {
      if (e.target === tryoutModal) {
        tryoutModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tryoutModal && tryoutModal.classList.contains('active')) {
      tryoutModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}

// ===================================
// BOTÃO VOLTAR AO TOPO
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
// ANIMAÇÕES DE SCROLL
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
  
  // Elementos para animar
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
      
      // Mostrar CTA após 30% de scroll
      if (scrollPercentage > 30 && !hasShown) {
        stickyCTA.classList.add('show');
        hasShown = true;
      }
      
      // Esconder CTA quando chegar ao footer
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
    
    // Abrir modal ao clicar no botão
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
// INDICADOR DE SEÇÃO ATIVA
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
        
        // Remover classe active de todos os links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Adicionar classe active ao link correspondente
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
// VALIDAÇÃO DE FORMULÁRIO
// ===================================
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Validar em tempo real
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
          validateField(input);
        }
      });
    });
    
    // Validar ao submeter
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // Adicionar loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('loading');
        }
        
        // Simular envio
        setTimeout(() => {
          contactForm.reset();
          if (submitBtn) {
            submitBtn.classList.remove('loading');
          }
          
          // Remover classes de validação
          inputs.forEach(input => {
            input.parentElement.classList.remove('success', 'error');
          });
          
          // Mostrar toast de sucesso
          showToast('Mensagem enviada!', 'Entraremos em contato em breve.', 'success');
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
  
  // Verificar se é obrigatório
  if (field.hasAttribute('required') && value === '') {
    isValid = false;
    errorMessage = 'Este campo é obrigatório.';
  }
  
  // Validar email
  if (field.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Por favor, insira um e-mail válido.';
    }
  }
  
  // Validar telefone
  if (field.type === 'tel' && value !== '') {
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(value) || value.length < 10) {
      isValid = false;
      errorMessage = 'Por favor, insira um telefone válido.';
    }
  }
  
  // Atualizar UI
  if (isValid) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    // Remover mensagem de erro se existir
    const existingError = formGroup.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
  } else {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    // Adicionar ou atualizar mensagem de erro
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
    <button class="toast-close" aria-label="Fechar notificação">
      <i data-feather="x"></i>
    </button>
  `;
  
  container.appendChild(toast);
  feather.replace();
  
  // Fechar ao clicar no botão
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });
  
  // Auto-remover após 5 segundos
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

// ===================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Ignorar links vazios ou apenas #
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

