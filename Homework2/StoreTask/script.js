class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p><button class="buy-button">Купить</button></div>`;
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [{
                title: 'Shirt',
                price: 150
            },
            {
                title: 'Socks',
                price: 50
            },
            {
                title: 'Jacket',
                price: 350
            },
            {
                title: 'Shoes',
                price: 250
            },
        ];
    }
    totalPrice() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
            console.log(sum)
        });
       
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

class CartItem {
    constructor(title, price, amount) {
        this.title = title;
        this.price = price;
        this.amount = amount;
    }
    render() {
        // здесь будет задан UI в html для CartItem
    }
}

class CartList {
    constructor(){
        this.CartItems = [];
    }
    // Здесь будет метод для добавления товаров в корзину.
    // здесь будет метод для удаления товаров из корзины.
    // Здесь будет метод для подсчета суммы товаров в корзине.
    render() {
        // Для каждого элемента в обьекте CartItems будет вызван экземпляр класса CartItem.
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.totalPrice();