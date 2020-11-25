const result = document.querySelector('.calculating__result span');
let sex = 'female', //Задаем дефолтные значения, чтобы сразу было вырано на странице. С точки зрения UX это правильно
    height, weight, age,
    ratio = 1.375; //Задаем дефолтные значения

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

function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`); //Получать div внутри parenSelector

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

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

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