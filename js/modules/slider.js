function slider() {
    // SLIDER

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;
    const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'), //В вёрстке слайды дополнительно обернули в inner и здесь поместили в переменную для карусели
          width = window.getComputedStyle(slidesWrapper).width;
    let offset = 0;

        //CAROUSEL SLIDER:
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    function getZero(num) {
        if (num >= 0 && num < 10) { //Если арг больше или равно 0 И арг меньше 10, то ф-ция возвращает модифицированную строку
            return `0${num}`;
        } else { //В инном случае возвращаем неизмененный аргумент
            return num;
        }
    }

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    slides.forEach(item => {
        item.style.width = width; //Каждому слайду задали фиксированную ширину на случай если картинка будет немного больше или меньше
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];      

    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) { //Можно было и forEach
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function opacifyDots(arr) {
        arr.forEach(dot => dot.style.opacity = '.5');
        arr[slideIndex - 1].style.opacity = 1;
    }

    function offsetField(offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //Если отступ будет равен ширине одного слайда умноженного на кол-во слайдов минуc один (если у нас ширина оффсета будет один слайд и 3 за кадром)
            offset = 0;
        } else {
            offset += deleteNotDigits(width); //добавляем к предыдущему отступу еще ширину одного слайда
        }

        // slidesField.style.transform = `translateX(-${offset}px)`;
        offsetField(offset);

        if (slideIndex == slides.length) { //Индекс равен количеству слайдов
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        current.textContent = getZero(slideIndex);

        opacifyDots(dots);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width); //отнимаем от предыдущего отступа ширину одного слайда
        }

        // slidesField.style.transform = `translateX(-${offset}px)`;
        offsetField(offset);

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        current.textContent = getZero(slideIndex);

        opacifyDots(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to'); //Получили значение дата-атрибута у обьекта события
            
            slideIndex = slideTo; //Кликнули на 4 точку, получили значение дата-атрибута "4", в Индекс пойдёт 4
            offset = deleteNotDigits(width) * (slideTo - 1);

            // slidesField.style.transform = `translateX(-${offset}px)`;
            offsetField(offset);

            current.textContent = getZero(slideTo);

            opacifyDots(dots);


        });
    });
}

module.exports = slider;