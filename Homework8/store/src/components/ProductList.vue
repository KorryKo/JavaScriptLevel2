<template>
  <div class="d-flex justify-space-around mb-6">
    <v-card class="d-flex mb-6" 
            max-width="344" 
            outlined v-for="product in productListObject" 
            :key="product.id_product">

      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{product.product_name}}
          </v-list-item-title>
          <v-list-item-subtitle>{{product.price}} руб</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="buyItem(product)">
          Купить
        </v-btn>
      </v-card-actions>

    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'ProductList',
    props: ["productListObject"],
    methods:{
      buyItem(product){
        this.$emit("buy-item", product);
      }
    }
  }
</script>
