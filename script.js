document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('tryout-popup');
    const closeBtn = document.querySelector('.close-btn');
    const registerBtn = document.querySelector('.btn-popup');
    const scrollArrow = document.getElementById('scroll-arrow');
    const mainNav = document.getElementById('mainNav');

    // Mostra o pop-up
    popup.style.display = 'flex';

    // Esconde o pop-up ao clicar no botão de fechar
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Esconde o pop-up ao clicar no botão REGISTER
    registerBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Opcional: Esconde o pop-up ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Rola para a próxima seção ao clicar na seta
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const nextSection = document.getElementById('about');
            nextSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Faz o menu ficar fixo (sticky) e muda a cor ao rolar
    window.onscroll = function() {
        if (window.scrollY > 50) {
            mainNav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            mainNav.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }
    };
    
    // Tratamento do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
        });
    }
    
    // Garante que o vídeo seja reproduzido automaticamente
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.play();
    }
});