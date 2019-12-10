<template>
  <div>
    <div class="summary-bar">
      <p v-if="searchSummary.length !== 0">
        <span>Märke: {{searchSummary.brandName}}</span>
        <span>Modell: {{searchSummary.modelName}}</span>
        <span>Maskinvikt: {{searchSummary.machineWeight}} ton</span>
      </p>

      <p v-if="filterSummary.length !== 0">
        <span>Maskinvikt: 0 - {{filterSummary.maxWeight}} ton</span>
        <span v-if="filterSummary.keyword">Sökord: {{filterSummary.keyword}}</span>
      </p>
    </div>

    <div class="products-container">
      <Product v-for="product in products" v-bind:key="product.id" v-bind:product="product" />
    </div>
  </div>
</template>

<script>
import Product from "./Product";

export default {
  name: "ProductList",
  components: {
    Product
  },
  props: {
    searchSummary: Object,
    filterSummary: String,
    products: Array
  }
};
</script>

<style lang="scss" scoped>
.summary-bar {
  background: #1f1f1f;
  height: 50px;
  color: white;
  font-size: 1.1em;
  font-weight: 800;
  padding-top: 11px;

  p {
    max-width: 1200px;
    margin: auto;
  }

  span {
    margin-right: 5%;
  }
}

.products-container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
</style>