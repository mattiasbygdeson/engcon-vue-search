<template>
  <div id="app">
    <ProductGuide />
    <!-- <ProductFilter /> -->
  </div>
</template>

<script>
import ProductGuide from "./components/ProductGuide";
// import ProductFilter from "./components/ProductFilter";

export default {
  name: "app",
  components: {
    ProductGuide
    // ProductFilter
  }
};
</script>

<style lang="scss">
// @import './main.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "akzidenz-grotesk-next", sans-serif;
  font-style: normal;
  font-size: 17px;
  max-width: 1200px;
  margin: auto;
  background-color: rgb(143, 145, 153);
}
</style>
