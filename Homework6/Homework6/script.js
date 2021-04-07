Vue.component('errorMessage', {
    props: ['errorMessage'],
    template: `
        <div><h3>{{errorMessage}}</h3></div>
    `
})


Vue.component('goodsList', {
    props: ['filteredGoods', 'errorMessage'],
    methods: {
        addCartGood(good) {
            this.$emit("add-cart-good", good);
        }
    },
    template: `
        <div>
          <div class="goods-list" v-if="filteredGoods.length >= 1">
             <goods-item  v-for="good in filteredGoods" :good="good"  @add-cart-good="addCartGood"></goods-item>
           </div>
         <div v-else>
             <error-message :error-message="errorMessage"></error-message>
         </div>
        </div>
    `
});

Vue.component('goodsItem', {
    props: ['good'],
    methods: {
        addCartGood() {
            this.$emit("add-cart-good", this.good);
        }
    },
    template: `
        <div class="goods-item">
            <h3>{{good.title}}</h3>
            <p>{{good.price}}</p>
            <button @click="addCartGood"> + </button>
        </div>
    `
});

Vue.component('searchItem', {
    props: ['goods'],
    data() {
        return {
            searchLine: ''
        }
    },
    methods: {
        search() {
            let filteredGoods = this.goods
                .filter(good => good.title.toLowerCase()
                    .includes(this.searchLine.toLowerCase()))
            this.$emit("filter-goods", filteredGoods);
        }
    },
    template: `
      <div>
        <input type="text" v-model="searchLine" class="goods-search" placeholder="search by name" />
        <button class="search-button" type="button" @click="search">Искать</button>
      </div>
    `
});

Vue.component('goodsCart', {
    props: ['goodsCart'],
    data() {
        return {
            isVisibleCart: false
        }
    },
    methods: {
        toggleCart() {
            this.isVisibleCart = !this.isVisibleCart
        }
    },
    template: `
        <div>
         <button class="cart-button" type="button" @click="toggleCart">Корзина</button>
         <div class="goods-list" v-show="isVisibleCart">
                <cart-item class="goods-item" v-for="good in goodsCart"  :good="good"></cart-item>
          </div>
        </div>
    `
});

Vue.component('cartItem', {
    props: ['good'],
    data() {
        return {
            cartHasItem: true
        }
    },
    template: `
        <div>
            <h3>{{good.title}}</h3>
            <p>{{good.price}}</p>
            <p>{{good.amount}}</p>
        </div>
    `
});


new Vue({
    el: '#app',
    data() {
        return {
            goods: [],
            filteredGoods: [],
            goodsCart: [],
            errorMessage: 'Нет данных'
        }
    },
    async mounted() {
        await this.fetchGoods("goods.json")
    },
    methods: {
        async fetchGoods(url) {
            const response = await (await fetch(`./${url}`)).json();
            this.goods = response;
            this.filteredGoods = response;
            this.goodsCart = response;
        },
        filterGoods(filteredGoods) {
            this.filteredGoods = filteredGoods
        },
        addCartGood(addGood) {
            this.goodsCart.map(good => {
                let temp = Object.assign({}, good);
                if (good.id === addGood.id) {
                    good.amount++;
                }
                return temp;
            })
        }
    }
});
