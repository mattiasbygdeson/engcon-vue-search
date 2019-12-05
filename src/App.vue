<template>
  <div id="app">
    <header class="main-header">
      <ProductGuide v-on:summarize="summarize" v-bind:lang="language" />
      <!-- <ProductFilter /> -->
    </header>
    <div class="summary-bar">
      <p v-if="searchSummary.length !== 0">
        <span>Märke: {{searchSummary.brandName}}</span>
        <span>Modell: {{searchSummary.modelName}}</span>
        <span>Maskinvikt: {{searchSummary.machineWeight}} ton</span>
      </p>
    </div>

    <div class="products-container">
      <p>Produkter</p>
    </div>
  </div>
</template>

<script>
import ProductGuide from "./components/ProductGuide";
import axios from "axios";
// import ProductFilter from "./components/ProductFilter";

export default {
  name: "app",
  components: {
    ProductGuide
    // ProductFilter
  },
  methods: {
    summarize(searchSummary) {
      this.searchSummary = searchSummary;
      this.generateProducts();
    },
    generateProducts() {
      axios
        .get(
          "http://beta.configurator.engcon.com/Configurator.ashx?country=se&brand=" + this.searchSummary.brandId + "&model=" + this.searchSummary.modelId,
          {
            headers: {
              Authorization: "Access-Control-Allow-Origin: *"
            }
          }
        )
        .then(res => (this.products = res.data.Excavator[0].Model[0].Products))
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    }
  },
  data() {
    return {
      searchSummary: [],
      products: [],
      language: null
    };
  },
  created() {
    // this.language = navigator.language.substr(3,5);
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
}

.main-header {
  padding-top: 50px;
  padding-bottom: 50px;
  height: 700px;

  background-image: url("https://engcon.com/webdav/files/resources/img/ourProducts/hero.jpg");
  background-size: cover;
}

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
  background: #f0f0f0;
  height: 100vh;
}
</style>
