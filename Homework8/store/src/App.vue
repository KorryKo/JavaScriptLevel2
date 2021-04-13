<template>
  <v-app>

    <v-main>

      <v-app-bar color="deep-purple" dark>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="product in cartProducts" :key="product.id_product">
              {{product.product_name}}, {{product.price}} руб - {{product.amount}}
            </v-list-item>
          </v-list>
        </v-menu>
        <v-text-field v-model="searchLine" class="shrink mx-4" hide-details single-line></v-text-field>
        <v-btn icon @click="search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

      </v-app-bar>

      <v-container>
        <ProductList :product-list-object.sync="filteredList" @buy-item="buyItem"></ProductList>
      </v-container>



    </v-main>
  </v-app>
</template>

<script>
  import ProductList from './components/ProductList';
  import axios from "axios";

  export default {
    name: 'App',

    components: {
      ProductList,
    },
    methods: {
      async fetchProducts(url) {
        return await (await axios.get(url)).data
      },
      search() {
        this.filteredList = this.productListObject
          .filter(product => product.product_name.toLowerCase()
            .includes(this.searchLine.toLowerCase()))
      },
      buyItem(product) {
      
        if (this.cartProducts.some(cartProduct=>cartProduct.id_product ===product.id_product)) {
          this.cartProducts
          .find(cartProduct => cartProduct.id_product === product.id_product)
          .amount += 1
        } else {
          let result = {
            id_product: product.id_product,
            product_name: product.product_name,
            price: product.price,
            amount: 1
          }
          this.cartProducts.push(result)
          console.log(this.cartProducts)
        }
      }
    },
    async mounted() {
      const products = await this.fetchProducts(
        "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json")
      this.productListObject = products;
      this.filteredList = products;
    },
    data: () => {
      return {
        productListObject: [],
        filteredList: [],
        cartProducts: [],
        searchLine: ''
      }
    },
  };
</script>