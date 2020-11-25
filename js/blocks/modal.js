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
