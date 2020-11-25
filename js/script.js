//'use strict';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // В ES6 появилось, если функция вызывается без указания аргумента, то туда запишется дефолтное присвоенное значение
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) { // Если объект события совпадает с перебераемым айтемом
                    hideTabContent();
                    showTabContent(i); // Аргументом передаём порядковый номер айтема, который совпал с таргетом
                }
            });
        }
    });

    // Timer

    const deadline = '2020-10-29'; //отправная точка-конец акции

    function getTimeRemaining(endtime) { //Разница между дедлайном и текущим временем
        const t = Date.parse(endtime) - Date.parse(new Date()), //превращаем строки в миллисекунды с помощью парса и отнимаем текущее время, чтобы знать сколько осталось до дедлайна
              days = Math.floor(t / (1000 * 60 * 60 *24)), //floor - округлит десятичные числа; (1000ms * 60s * 60m *24h) - узнали сколько миллисекунд в сутках
              hours = Math.floor((t / (1000 * 60 * 60)) % 24), //Общее к-во ms делим на ms в одном часе и можем получить много часов, поэтому делим на 24 и остается остаток, который и пойдет в "Часы" 
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return { //Возвращаем наружу созданный объект из наших переменных
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) { //Если арг больше или равно 0 И арг меньше 10, то ф-ция возвращает модифицированную строку
            return `0${num}`;
        } else { //В инном случае возвращаем неизмененный аргумент
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); //Чтобы не было мигания таймера в начале (потому что updateClock запускается через 1сек), мы её инициализируем тут. Она один раз сработает выставит таймер и изчезнет, а дальше будет работать setInterval

        function updateClock() {
            const t = getTimeRemaining(endtime); //Сюда вернулся обьект из getTimeRemaining

            days.innerHTML = getZero(t.days); //Левый days это элемент на странице. Правый days это полученный элемент из обьекта, который вернулся в t
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { //Если дедлайн наступил, тоесть миллисекунды пошли уже в отрицательное значение, то останавливается updateClock и последние цыфры (нули) застынут на экране
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          //modalCloseBtn = document.querySelector('[data-close]'); //Удалили, потому-что будем использовать делегирование собития, чтобы закрывался динамически созданное модальное окно благодарности

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // Если пользователь раньше открыл окно, чем сработал таймер, то очистим таймер
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);

    // item.addEventListener('click', () => {
    //     // modal.classList.add('show');
    //     // modal.classList.remove('hide');
    //     document.body.style.overflow = 'hidden';
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Убираем прокрутку контента на странице под модальным окном
    }

    //modalCloseBtn.addEventListener('click', closeModal); //удалили, потому что нам больше не нужно событие отслеживающее нажатие на крестик. Будем использовать делегирование 

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal || e.target.getAttribute('data-close') == '') { //Делегировали, что если и на дата-клоуз будет нажатие
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // Закрываем модальное окно при нажатии клавиши "Esc"
    // 'keydown' следит за нажатием клавиш
        if (e.code === 'Escape' && modal.classList.contains('show')) { // И проверяем что модальное окно открыто, чтобы функция не срабатывала при каждом нажатии клавиши
            // e.code отслеживает код клавиши (Для "Esc" - "Escape")
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        // Если пользователь долистал до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.     scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // Ремувим обработчик события
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) { //условие, которое добавляет класс по умолчанию если арг не был передан, а если был, то добавляет его в класс до элемента
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                       <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: &{res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { //В {} скобках это деструктуризация обьекта из БД.json
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // new MenuCard( //Теперь не нуждаемся в повторении этого блока для создания карточек, выше все сделали в forEach
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     'menu__item' //Добавленный аргумент с помощью Rest оператора
    // ).render();

        //Через Fetch API:

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); //Создали изображение
            statusMessage.src = message.loading; // и подставили ему атрибут src
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const object = {}; //Уже нет нужды переберать и перезаписывать в обьект, потому что можем использовать entries
            // formData.forEach((value, key) => { //Перебрали обьект formData и перезаписали его как обычный обьект в переменную object
            //     object[key] = value;
            // });

            // fetch('server.php', { //Перенесли общение с сервером в фанкшн-экспершн postData
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)
            // })
            postData('http://localhost:3000/requests', json)
            .then(data => { // В data передается response
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove(); //Удаляем наш спинер
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => { //Форма очищается в любом случае, поэтому finally
                form.reset();
            });

                //Этот блок кода нам не нужен, потому что его функции перенесли в Fetch
            // request.addEventListener('load', () => { //Следим, что запрос прошел - 200 OK
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         statusMessage.remove(); //Удаляем наш спинер
            //         form.reset(); //Очищаем форму
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

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

    //Calculator

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute("data-ratio") === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { //Если нет хоть одного показателя, то функция не запустится и всплывет какое-то предупреждение
            result.textContent = '0000';
            return; //Досрочно прерываем функцию
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target && e.target.getAttribute("data-ratio")) { //Если в обьекта события есть дата-атрибут "data-ratio", то запишем его значение в переменную ratio
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem('ratio', +e.target.getAttribute("data-ratio"));
                } else { //Если обьект события не имеет "data-ratio", то в переменную sex запишем значения атрибута id
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
    
                calcTotal(); //При каждом клике происходит пересчёт 
            });
        });

            //К сожалению, при клике на подложку, ей тоже будет добавляться класс активности и зеленая краска. Поэтому делегирование событий в данном случае не подходит, а подойдет обычный forEach
        // document.querySelector(parentSelector).addEventListener('click', (e) => {
        //     if (e.target.getAttribute("data-ratio")) { //Если в обьекта события есть дата-атрибут, то запишем его значение в переменную ratio
        //         ratio = +e.target.getAttribute("data-ratio");
        //     } else { //Если обькт события не имеет "data-ratio", то в переменную sex запишем значения атрибута id
        //         sex = e.target.getAttribute('id');
        //     }

        //     elements.forEach(item => {
        //         item.classList.remove(activeClass);
        //     });

        //     e.target.classList.add(activeClass);

        //     calcTotal(); //При каждом клике происходит пересчёт 
        // });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D+/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal(); //При каждом изименении в инпуте происходит пересчёт 
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});