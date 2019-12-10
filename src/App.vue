<template>
  <div id="app">
    <header class="main-header">
      <ProductGuide v-on:summarizeSearch="summarizeSearch" v-bind:lang="language" />
      <ProductFilter v-on:summarizeFilter="summarizeFilter" />
    </header>

    <main>
      <ProductList
        v-bind:searchSummary="searchSummary"
        v-bind:filterSummary="filterSummary"
        v-bind:products="products"
      />
    </main>
  </div>
</template>

<script>
import ProductGuide from "./components/ProductGuide";
import ProductList from "./components/ProductList";
import axios from "axios";
import ProductFilter from "./components/ProductFilter";

export default {
  name: "app",
  components: {
    ProductGuide,
    ProductList,
    ProductFilter
  },
  data() {
    return {
      searchSummary: [],
      filterSummary: [],
      products: [],
      language: null
    };
  },
  methods: {
    summarizeSearch(searchSummary) {
      /**
       * Clear previous search and product result and create new
       * Get product IDs from API call
       */

      this.products = [];
      this.filterSummary = [];
      this.searchSummary = searchSummary;

      axios
        .get(
          "http://beta.configurator.engcon.com/Configurator.ashx?country=se&brand=" +
            this.searchSummary.brandId +
            "&model=" +
            this.searchSummary.modelId,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
              "Access-Control-Allow-Headers": "Content-Type,Accept"
            }
          }
        )
        .then(res => {
            this.products = res.data.Excavator[0].Model[0].Products;
            this.generateProducts();
          })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          });
    },
    summarizeFilter(filterSummary) {
      /**
       * Clear previous search and product result and create new
       * 
       */

      this.products = [];
      this.searchSummary = [];
      this.filterSummary = filterSummary;
    },
    generateProducts() {

      /**
       * Axios call to Sitevisions API to extract propducts
       * Argument: searchSummary contains product ID
       * 
       */


    }
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

li {
  list-style: none;
}

body {
  font-family: "akzidenz-grotesk-next", sans-serif;
  font-style: normal;
  font-size: 17px;
  margin: auto;
  background: #f0f0f0;
  background-image: url("https://engcon.com/webdav/files/resources/img/ourProducts/hero.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: -110px;
}

.main-header {
  padding-top: 50px;
  padding-bottom: 50px;
  height: 700px;
  max-width: 1200px;
  margin: auto;
}

.products-container {
  padding-top: 40px;
  margin: auto;
  height: 100vh;
  max-width: 1200px;
}
</style>
