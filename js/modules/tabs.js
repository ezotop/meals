function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { // В ES6 появилось, если функция вызывается без указания аргумента, то туда запишется дефолтное присвоенное значение
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains(tabsSelector.slice(1))) { //Поскольку tabsSelector имеет точку класса, а здесь нам она не нужна, то просто методом вырежем ее, создав новую строку начинающуюся без точки
            tabs.forEach((item, i) => {
                if (target == item) { // Если объект события совпадает с перебераемым айтемом
                    hideTabContent();
                    showTabContent(i); // Аргументом передаём порядковый номер айтема, который совпал с таргетом
                }
            });
        }
    });
}

export default tabs;