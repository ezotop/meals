class User {
    constructor(name, age) {
        this.name = name;
        this._userAge = age;
    }

    #surname = 'Familia';

    say = () => {
        console.log(`Имя: ${this.name}, Фамилия: ${this.#surname}, Возраст: ${this._userAge}`);
    }

    get age() {
        return this._userAge;
    }

    set age(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._userAge = age;
        } else {
            console.log('Error');
        }
    }

    get surname() {
        return this.#surname;
    }

    set surname(sur) {
        if (typeof this.#surname !== 'number') {
            this.#surname = sur;
        }
    }
}

const john = new User('John', 25);

console.log(john.name);
// console.log(john.userAge);
//console.log(john.say());
// john._userAge = 30;
console.log(john.surname);
john.surname = 'Capone';
console.log(john.surname);