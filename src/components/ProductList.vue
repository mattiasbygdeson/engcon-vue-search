<template>
  <div>
    <div class="summary-bar">
      <p v-if="searchSummary.length !== 0">
        <span>Märke: {{searchSummary.brandName}}</span>
        <span>Modell: {{searchSummary.modelName}}</span>
        <span>Maskinvikt: {{searchSummary.machineWeight}} ton</span>
      </p>
    </div>

    <div class="products-container">
      <p v-for="product in products" v-bind:key="product.id">{{product}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    searchSummary: Array,
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
</style>