class GoodsItem {
    constructor(good, index, cartList) {
        this.good = good;
        this.index = index;
        this.title = good.title;
        this.price = good.price;
        this.cartList = cartList;
    }

    render() {
        let goodsItemDiv = document.createElement('div');
        goodsItemDiv.className = 'goods-item';

        let goodTitle = document.createElement('h3');
        goodTitle.innerHTML = this.title;

        let goodPrice = document.createElement('p');
        goodPrice.innerHTML = this.price;

        let goodBuyButton = document.createElement('button');
        goodBuyButton.className = 'buy-button';
        goodBuyButton.innerHTML = 'Купить'
        goodBuyButton.onclick = () => this.cartList.addToCart(this.good, this.index);

        goodsItemDiv.appendChild(goodTitle);
        goodsItemDiv.appendChild(goodPrice);
        goodsItemDiv.appendChild(goodBuyButton);
        return goodsItemDiv;

    }
}

class GoodsList {
    constructor() {
        this.cartList = new CartList;
        this.goods = []
    }

    fetchGoods(url) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.timeout = 5000;
            xhr.ontimeout = () => console.log("Timeout")
            xhr.open('GET', url, true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                        this.goods = JSON.parse(xhr.responseText)
                        resolve(this.goods)
                }
            }
        })
    }

    totalPrice() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
            console.log(sum);
        });
    }

    render() {
        this.fetchGoods("goods.json")
            .then(goods => {
                let listHtml = document.querySelector('.goods-list');
                goods.forEach((good, index) => {
                    const goodItem = new GoodsItem(good, index, this.cartList);
                    listHtml.appendChild(goodItem.render());
                });
                this.totalPrice();
            })

    }
}

class CartItem {
    constructor(item, index, cartList) {
        this.item = item;
        this.index = index;
        this.title = item.title;
        this.price = item.price;
        this.amount = item.amount;
        this.cartList = cartList
    }

    render() {
        let cartListItem = document.createElement("li")
        cartListItem.innerHTML = `${this.title}, ${this.price} руб/шт - ${this.amount} шт.`
        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '-'
        deleteButton.onclick = () => this.cartList.deleteFromeCart(this.item, this.index)
        cartListItem.appendChild(deleteButton);
        return cartListItem
    }
}

class CartList {
    constructor() {
        this.cartItems = [];
    }

    addToCart(good, index) {
        good.amount++;
        this.cartItems[index] = good;
        this.render()
    }

    deleteFromeCart(good, index) {
        if (good.amount > 0) {
            good.amount--;
            this.cartItems[index] = good;
            this.render();
        }
        if (good.amount <= 0) {
            delete this.cartItems[index]
            this.render();
        }

    }
    // Здесь будет метод для подсчета суммы товаров в корзине.
    render() {
        let listHtml = document.querySelector('#basket');
        let cartUl = document.createElement("ul")
        this.cartItems.forEach((item, index) => {
            const cartItem = new CartItem(item, index, this);
            cartUl.appendChild(cartItem.render());
        })
        listHtml.innerHTML = ""
        listHtml.appendChild(cartUl)
    }
}


const list = new GoodsList();
list.render()