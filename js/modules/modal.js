function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) { //Если у нас есть аргумент modalTimerId, то
        clearInterval(modalTimerId); // когда пользователь раньше открыл окно, чем сработал таймер, то очистим таймер
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Убираем прокрутку контента на странице под модальным окном
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
          //modalCloseBtn = document.querySelector('[data-close]'); //Удалили, потому-что будем использовать делегирование собития, чтобы закрывался динамически созданное модальное окно благодарности


    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    //modalCloseBtn.addEventListener('click', closeModal); //удалили, потому что нам больше не нужно событие отслеживающее нажатие на крестик. Будем использовать делегирование:
    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal || e.target.getAttribute('data-close') == '') { //Делегировали, что если и на дата-клоуз будет нажатие
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // Закрываем модальное окно при нажатии клавиши "Esc"
    // 'keydown' следит за нажатием клавиш
        if (e.code === 'Escape' && modal.classList.contains('show')) { // И проверяем что модальное окно открыто, чтобы функция не срабатывала при каждом нажатии клавиши
            // e.code отслеживает код клавиши (Для "Esc" - "Escape")
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        // Если пользователь долистал до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // Ремувим обработчик события
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};