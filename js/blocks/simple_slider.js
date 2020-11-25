//SIMPLE SLIDER:

const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');
let slideIndex = 1;

showSlides(slideIndex); //Вызываем функцию, чтобы на странице изчезли все слайды и отобразился первый слайд. Если этого не сделать, то изначально все слайды будут видны до нажатия одной из кнопкок

total.textContent = getZero(slides.length);

function showSlides(n) {
    if (n > slides.length) { //Если n становится больше общего количества слайдов, то slideIndex переключаем в 1, то есть возвращаемся на первый слайд
        slideIndex = 1;
    }

    if (n < 1) { //Если n уходит в отрицательное значение, то переходим от первого к последнему слайду
        slideIndex = slides.length;
    }

    slides.forEach(item => {
        item.classList.add('hide'); //Скрыли все слайды
    });

    slides[slideIndex -1].classList.toggle('hide');

    current.textContent = getZero(slideIndex);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

prev.addEventListener('click', () => {
    plusSlides(-1); //Отнимаем от slideIndex единицу и соответственно возвращаемся к предыдущему слайду
});

next.addEventListener('click', () => {
    plusSlides(1); //Добавляем к slideIndex единицу и соответственно идем к следующему слайду
});
