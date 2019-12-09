<template>
  <div id="app">
    <header class="main-header">
      <ProductGuide v-on:summarize="summarize" v-bind:lang="language" />
      <ProductFilter />
    </header>

    <main>
      <ProductList v-bind:searchSummary="searchSummary" v-bind:products="products" />
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
  methods: {
    summarize(searchSummary) {
      this.searchSummary = searchSummary;
      this.generateProducts();
    },
    generateProducts() {
      // Clear previous products
      this.products = [];

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
        .then(res => (this.products = res.data.Excavator[0].Model[0].Products))
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));

    //   axios
    //     .get(
    //       "http://engcon.utv/rest-api/1/0/303.online-5.0/search",
    //       {
    //         query: "*",
    //         filterQuery:
    //           "+(metadata.product-id:1920 OR metadata.product-id:1561) AND language:sv",
    //         limit: 200
    //       },
    //       {
    //         headers: {
    //           Authorization: "Access-Control-Allow-Origin: *",
    //           "Content-Type": "application/json;charset=UTF-8",
    //           Accept: "application/json, text/plain, */*"
    //         }
    //       }
    //     )
    //     .then(response => {
    //       // eslint-disable-next-line no-console
    //       console.log(response.data);
    //     })
    //     .catch(error => {
    //       // eslint-disable-next-line no-console
    //       console.log(error.response);
    //     });
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

  // background-image: url("https://engcon.com/webdav/files/resources/img/ourProducts/hero.jpg");
  // background-size: cover;
}

.products-container {
  padding-top: 40px;
  margin: auto;
  height: 100vh;
  max-width: 1200px;
}
</style>
