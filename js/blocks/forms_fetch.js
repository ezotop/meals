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