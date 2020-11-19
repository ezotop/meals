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

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
            // data.forEach(({img, altimg, title, descr, price}) => { //В {} скобках это деструктуризация обьекта из БД.json
            //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            // });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            console.log(data);
            data.data.forEach(({img, altimg, title, descr, price}) => { //В {} скобках это деструктуризация обьекта из БД.json
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
    
    //Forms FormData

        // Через XMLHttpRequest:

    /* const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            //request.setRequestHeader('Content-type', 'multipart/form-data; charset=utf-8'); //Для FormData заголовок устанавливать не нужно, он будет автоматически установлен
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => { //Следим, что запрос прошел
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    } */

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

    // fetch('db.json')
    //     .then(data => data.json())
    //     .then(res => console.log(res));


});