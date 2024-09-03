document.addEventListener('DOMContentLoaded', () => {
    const carrosselImagens = document.querySelector('.carrossel-imagens');
    const imagens = document.querySelectorAll('.carrossel-imagens img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let index = 0;

    function mostrarImagem(index) {
        carrosselImagens.style.transform = `translateX(${-index * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : imagens.length - 1;
        mostrarImagem(index);
    });

    nextButton.addEventListener('click', () => {
        index = (index < imagens.length - 1) ? index + 1 : 0;
        mostrarImagem(index);
    });
});
