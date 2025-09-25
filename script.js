document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('tryout-popup');
    const closeBtn = document.querySelector('.close-btn');
    const registerBtn = document.querySelector('.btn-popup');

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
});