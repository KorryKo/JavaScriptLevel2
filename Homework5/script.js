const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filterGoods: [],
        cart: [{
            title: "Socks",
            price: "50",
            amount: "1"
        }],
        searchLine: '',
        isVisibleCart:false
    },
    async mounted() {
        await this.fetchGoods("goods.json")
    },
    methods: {
        async fetchGoods(url) {
            const response = await (await fetch(`.//${url}`)).json();
            this.goods = response;
            this.filterGoods = response;
        },
        search() {
            this.filterGoods = this.goods.filter(good => good.title.toLowerCase().includes(this.searchLine.toLowerCase()))
        },
        toggleCart() {
            this.isVisibleCart = !this.isVisibleCart
        }
    },
   
});