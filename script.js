const goods = [{
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

const renderGoods = (goodsList = goods) => {
    goodsList.map(good => {

        let goodItem = document.createElement("div")
        goodItem.className = "goods-item"
        goodItem.innerHTML = `<h3>${good.title}</h3>        
                             <p>${good.price} р</p>        
                             <button class="buy-button">Купить</button>`

        document.querySelector('.goods-list').appendChild(goodItem)
    })
}

renderGoods()