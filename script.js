document.addEventListener('DOMContentLoaded', function() {
    const mainNav = document.querySelector('.main-nav');
    const scrollArrow = document.getElementById('scroll-arrow');

    // Smooth scroll for arrow
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const nextSection = document.getElementById('about');
            if (nextSection) {
                window.scrollTo({
                    top: nextSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Make header sticky on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add("sticky");
        } else {
            mainNav.classList.remove("sticky");
        }
    });

    // Toggle search input on button click
    const searchBtn = document.querySelector('.search-btn');
    const searchTxt = document.querySelector('.search-txt');
    if (searchBtn && searchTxt) {
        searchBtn.addEventListener('click', function() {
            searchTxt.focus();
        });
    }

    // Pop-up with video functionality
    const videoPopup = document.getElementById('video-popup');
    const closeBtn = document.querySelector('#video-popup .close-btn');
    const videoFrame = document.getElementById('futsal-video');
    const learnMoreBtn = document.querySelector('.close-popup-link');

    // Funções para gerenciar o pop-up
    function openPopup() {
        videoPopup.style.display = 'flex';
        // Adiciona autoplay na URL do vídeo ao abrir
        const videoSrc = videoFrame.src;
        if (!videoSrc.includes('autoplay=1')) {
            videoFrame.src = videoSrc + '?autoplay=1';
        }
    }

    function closePopup() {
        videoPopup.style.display = 'none';
        // Pausa o vídeo ao fechar
        const videoSrc = videoFrame.src;
        if (videoSrc.includes('?')) {
            videoFrame.src = videoSrc.split('?')[0];
        }
    }

    // Abre o pop-up automaticamente 2 segundos após o carregamento da página
    setTimeout(openPopup, 2000);

    // Fecha o pop-up ao clicar no botão de fechar
    closeBtn.addEventListener('click', closePopup);

    // Fecha o pop-up ao clicar no botão 'Learn More'
    learnMoreBtn.addEventListener('click', closePopup);

    // Fecha o pop-up ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target === videoPopup) {
            closePopup();
        }
    });

});