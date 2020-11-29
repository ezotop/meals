function timer() {
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
}

module.exports = timer;