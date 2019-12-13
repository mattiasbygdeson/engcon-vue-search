<template>
  <div id="app">
    <div class="main-header-wrapper">
      <header class="main-header">
        <ProductGuide
          v-on:summarizeSearch="summarizeSearch"
          v-bind:class="{'unfocus' : this.filterSummary.length !== 0}"
        />
        <ProductFilter
          v-on:summarizeFilter="summarizeFilter"
          v-bind:class="{'unfocus' : this.searchSummary.length !== 0} "
        />
      </header>
    </div>

    <main>
      <ProductList
        v-bind:searchSummary="searchSummary"
        v-bind:filterSummary="filterSummary"
        v-bind:products="products"
        v-on:filterSummary="summarizeFilter"
      />
    </main>
  </div>
</template>

<script>
import ProductGuide from "./components/ProductGuide";
import ProductList from "./components/ProductList";
import axios from "axios";
import qs from "qs";
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
      favorites: [],
      language: null
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log("App created");

    this.getStoredProducts();
    this.getStoredSearchSummary();
    this.getStoredFilterSummary();
  },
  methods: {
    getStoredProducts() {
      var storedProducts = localStorage.getItem("engcon-products");

      if (storedProducts) {
        this.products = JSON.parse(storedProducts);
      }
    },

    getStoredSearchSummary() {
      var storedSearchSummary = localStorage.getItem("engcon-searchSummary");

      if (storedSearchSummary) {
        this.searchSummary = JSON.parse(storedSearchSummary);
      }
    },

    getStoredFilterSummary() {
      var storedFilterSummary = localStorage.getItem("engcon-filterSummary");

      if (storedFilterSummary) {
        this.filterSummary = JSON.parse(storedFilterSummary);
      }
    },

    summarizeSearch(searchSummary) {
      /**
       * Clear previous search and product result and create new
       * Get product IDs from API call
       *
       */

      localStorage.removeItem("engcon-filterSummary");
      // localStorage.removeItem('engcon-products');

      this.products = [];
      this.filterSummary = [];
      this.searchSummary = searchSummary;

      localStorage.setItem(
        "engcon-searchSummary",
        JSON.stringify(searchSummary)
      );

      axios
        .get(
          "http://beta.configurator.engcon.com/Configurator.ashx?country=se&brand=" +
            this.searchSummary.brandId +
            "&model=" +
            this.searchSummary.modelId
        )
        .then(res => {
          this.products = res.data.Excavator[0].Model[0].Products;
          this.generateProductsBySearch();
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    summarizeFilter(filterSummary) {
      /**
       * Clear previous search and product result and create new
       *
       */

      localStorage.removeItem("engcon-searchSummary");
      // localStorage.removeItem('engcon-products');

      this.products = [];
      this.searchSummary = [];
      this.filterSummary = filterSummary;
      localStorage.setItem(
        "engcon-filterSummary",
        JSON.stringify(filterSummary)
      );
    },

    generateProductsBySearch() {
      /**
       * Axios call to Sitevisions API to extract propducts
       *
       */

      const instance = axios.create({
        baseURL: "http://engcon.utv/rest-api/1/0/303.online-5.0/",
        paramsSerializer: params => qs.stringify(params)
      });

      let url = "/search";

      // Construct a filterQuery string
      //
      var productsIDs = [];
      var startOfString = "+(";
      var endOfString = ") AND language:sv";
      var middleOfString = "";

      for (var i = 0; this.products.length > i; i++) {
        productsIDs.push(this.products[i].id);
        middleOfString += "metadata.product-id:" + this.products[i].id;

        if (i !== this.products.length - 1) {
          // Unless loop is at the last index, print " OR " in queary string
          //
          middleOfString += " OR ";
        }
      }

      var filterQuery = startOfString + middleOfString + endOfString;

      let query = {
        query: "*",
        filterQuery: filterQuery,
        limit: 200,
        fields: [
          "name",
          "title",
          "language",
          "uri",
          "id",
          "metadata.description",
          "metadata.product-media",
          "metadata.product-minWeight",
          "metadata.product-maxWeight"
        ]
      };

      instance
        .get(url, {
          params: {
            format: "json",
            json: JSON.stringify(query)
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.products = res.data;
          localStorage.setItem("engcon-products", JSON.stringify(res.data));
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    generateProductsByFilter() {
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
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
}

.main-header-wrapper {
  background-image: url("https://engcon.com/webdav/files/resources/img/ourProducts/hero.jpg");
  background-size: cover;
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
  min-height: 100vh;
  max-width: 1200px;
}

.unfocus {
  opacity: 0.5;
  filter: grayscale(1);

  transition: opacity 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);

  &:hover {
    cursor: pointer;
    opacity: initial;
    filter: grayscale(0);
  }
}

.icon {
  // border: 1px solid red;
  // width: 40px;
  // height: 40px;
  display: block;

  position: relative;
  // top: -3px;

  background-size: 80%;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: right;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  &.close {
    background-image: url("./assets/icon-close.png");
  }

  &.share {
    background-image: url("./assets/icon-share.png");
  }

  &.print {
    background-image: url("./assets/icon-print.png");
  }
}

.inline {
  display: inline;
}
</style>
