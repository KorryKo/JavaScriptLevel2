/*
Некая сеть фастфуда предлагает несколько видов гамбургеров:
### Маленький (50 рублей, 20 калорий).
### Большой (100 рублей, 40 калорий). 
### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
### С сыром (+10 рублей, +20 калорий).
### С салатом (+20 рублей, +5 калорий).
### С картофелем (+15 рублей, +10 калорий). 
### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 
### Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.
*/
class HamburgerItem {
    constructor(hamburger, cartList, tastes, toppings) {
        this.hamburger = hamburger;
        this.title = hamburger.title;
        this.price = hamburger.price;
        this.id = hamburger.id;
        this.calories = hamburger.calories;
        this.cartList = cartList;
        this.tastes = tastes;
        this.chosenTaste = [];
        this.toppings = toppings;
        this.chosenToppings = [];
    }

    chooseTasteForBurger(taste) {
        this.chosenTaste = taste
    }

    chooseToppingBurger(topping, isChecked) {
        if (isChecked) {
            this.chosenToppings.push(topping)
        } else {
            this.chosenToppings = this.chosenToppings.filter(chosenTopping => chosenTopping.id !== topping.id)
        }
    }

    render() {
        let hamburgerItems = document.createElement('div');
        hamburgerItems.className = "hamburger-item";

        let hamburgerItemTitle = document.createElement('h3');
        hamburgerItemTitle.innerHTML = this.title;
        let hamburgerItemPrice = document.createElement('p');
        hamburgerItemPrice.innerHTML = this.price + ' р';
        let hamburgerItemCalories = document.createElement('p');
        hamburgerItemCalories.innerHTML = this.calories + ' калорий';

        let tastesContainer = document.createElement('div')
        tastesContainer.className = 'tastes-container'
        this.tastes.forEach(taste => {

            let hamburgerItemRadioButtonLabel = document.createElement('label')
            hamburgerItemRadioButtonLabel.for = taste.title;
            hamburgerItemRadioButtonLabel.innerHTML = `${taste.title}, ${taste.calories} кл, + ${taste.price} р`;
            let hamburgerItemRadioButton = document.createElement('input');
            hamburgerItemRadioButton.type = 'radio';
            hamburgerItemRadioButton.name = this.hamburger.id;
            hamburgerItemRadioButton.id = taste.title;
            hamburgerItemRadioButton.onclick = () => this.chooseTasteForBurger(taste);
            hamburgerItemRadioButtonLabel.appendChild(hamburgerItemRadioButton);
            tastesContainer.appendChild(hamburgerItemRadioButtonLabel);
        })

        let toppingContainer = document.createElement('div')
        toppingContainer.className = 'topping-container'
        this.toppings.forEach(topping => {

            let toppingLabel = document.createElement('label')
            toppingLabel.for = topping.title;
            toppingLabel.innerHTML = `${topping.title}, ${topping.calories} кл, + ${topping.price} р`;
            let toppingCheckBox = document.createElement('input');
            toppingCheckBox.type = 'checkbox';
            toppingCheckBox.name = 'toppings';
            toppingCheckBox.id = topping.title;
            toppingCheckBox.onclick = () => this.chooseToppingBurger(topping, toppingCheckBox.checked);
            toppingLabel.appendChild(toppingCheckBox);
            toppingContainer.appendChild(toppingLabel);
        })

        let hamburgerItemBuyButton = document.createElement('button');
        hamburgerItemBuyButton.innerHTML = 'Купить';
        hamburgerItemBuyButton.className = "button"
        hamburgerItemBuyButton.onclick = () => {
            if (Object.keys(this.chosenTaste).length > 0) {
                let hamburgerAndTaste = {
                    burger: this.hamburger,
                    taste: this.chosenTaste,
                    toppings: this.chosenToppings
                }

                this.cartList.addItemToCart(hamburgerAndTaste)
            } else {
                alert('Выберите вкус!')
            }
        }

        hamburgerItems.appendChild(hamburgerItemTitle);
        hamburgerItems.appendChild(hamburgerItemPrice);
        hamburgerItems.appendChild(hamburgerItemCalories);
        hamburgerItems.appendChild(tastesContainer);
        hamburgerItems.appendChild(toppingContainer);
        hamburgerItems.appendChild(hamburgerItemBuyButton);

        return hamburgerItems;
    }
}

class HamburguersList {
    constructor() {
        this.hamburgers = [];
        this.tastes = [];
        this.toppings = [];
        this.cartList = new CartList;
    }

    fetchHamburgers() {
        this.hamburgers = [{
                id: "SMALLBUR",
                title: 'Маленький бургер',
                price: 50,
                calories: 20
            },
            {
                id: "BIGBUR",
                title: 'Большой бургер',
                price: 100,
                calories: 40
            }
        ];
    }

    fetchTastes() {
        this.tastes = [{
            id: "CHEESE",
            title: 'Сыр',
            price: 10,
            calories: 20
        }, {
            id: "SALAD",
            title: 'Салат',
            price: 20,
            calories: 5
        }, {
            id: "POTATO",
            title: 'Картофель',
            price: 15,
            calories: 10
        }];
    }

    fetchToppings() {
        this.toppings = [{
                id: "SPICES",
                title: 'Приправа',
                price: 15,
                calories: 0
            },
            {
                id: "MAYO",
                title: 'Майонез',
                price: 20,
                calories: 5
            }
        ]
    }

    render() {
        let listHtml = document.querySelector('.hamburger-list');
        this.hamburgers.forEach(good => {
            const hamburgerItem = new HamburgerItem(good, this.cartList, this.tastes, this.toppings);
            listHtml.appendChild(hamburgerItem.render());
        });
    }
}

class CartItem {
    constructor(cartItems) {
        this.titleBurger = cartItems.burger.title;
        this.titleTaste = cartItems.taste.title;
        this.toppingsTitle = cartItems.toppings.map(topping => topping.title);
        this.toppings = cartItems.toppings
        this.toppingsExist = objectIsEmpty(this.toppings)

        this.priceTopping = 0
        this.priceTopping = this.toppingsExist ? cartItems.toppings.map(topping => topping.price += this.priceTopping) : 0 //  is 0 if toppings are empty
        this.totalPrice = cartItems.burger.price + cartItems.taste.price + parseInt(this.priceTopping);

        this.caloriesTopping = 0
        this.caloriesTopping = this.toppingsExist ? cartItems.toppings.map(topping => topping.calories += this.caloriesTopping) : 0 //  is 0 if toppings are empty
        this.totalCalories = cartItems.burger.calories + cartItems.taste.calories + parseInt(this.caloriesTopping);
    }

    render() {
        let result = document.createElement("p")
        result.innerHTML = `${this.titleBurger}, вкус:${this.titleTaste}${this.toppingsExist?", топпинг:"+this.toppingsTitle:""}, ${this.totalCalories} калорий. Итого:${this.totalPrice}`
        return result;
    }
}

class CartList {
    constructor() {
        this.cartItems = [];
    }
    addItemToCart(hamburgerAndTaste) {
        this.cartItems.push(hamburgerAndTaste)
        const cartItem = new CartItem(hamburgerAndTaste)
        this.render(cartItem)
    }
    render(cartItem) {
        document.querySelector("#basket").appendChild(cartItem.render())
    }
}


function objectIsEmpty(myObject) {
    return Object.keys(myObject).length > 0
}

const list = new HamburguersList();
list.fetchHamburgers();
list.fetchTastes();
list.fetchToppings();
list.render();