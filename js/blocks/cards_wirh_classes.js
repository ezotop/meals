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