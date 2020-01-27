<template>
  <div id="apptop">
    <div class="main-header-wrapper" :class="{'d-none' : this.listTitle.length !== 0}">
      <header class="main-header">
        <ProductGuide
          v-on:summarizeSearch="requestProductsByModel"
          :translatedStrings="translatedStrings"
        />
        <ProductFilter
          v-on:summarizeFilter="requestProductsByWeight"
          :translatedStrings="translatedStrings"
          
        />
      </header>
    </div>

    <!-- :class="{'unfocus' : this.filterSummary.maxWeight.length !== 0}" -->

    <ProductList
      v-on:backToStart="clearUrlQuery"
      :translatedStrings="translatedStrings"
      :searchSummary="searchSummary"
      :filterSummary="filterSummary"
      :products="products"
      :listTitle="listTitle"
      :noProducts="noProducts"
    />

    <div v-if="productsLoading" class="loading-icon-products">
      <div class="env-spinner">
        <div class="env-rect1"></div>
        <div class="env-rect2"></div>
        <div class="env-rect3"></div>
        <div class="env-rect4"></div>
        <div class="env-rect5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGuide from "./components/ProductGuide";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import { getTranslation } from "./api.js";
import { getProducts } from "./api.js";
import { getProductIDs } from "./api.js";
export default {
  name: "productfilter",
  components: {
    ProductGuide,
    ProductList,
    ProductFilter
  },
  data() {
    return {
      searchSummary: {},
      filterSummary: {},
      products: [],
      favorites: [],
      translatedStrings: {},
      testData: [],
      listTitle: "",
      productsLoading: false,
      noProducts: false,
    };
  },
  created() {
    this.getStoredProducts();
    this.getStoredSearchSummary();
    this.getStoredFilterSummary();
    this.requestTranslation();
    this.requestProductsByFavorites();
  },
  updated() {
    if(this.products === undefined) {
      this.productsLoading = false;
    }
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
    replaceString(phrase, subject) {
      return phrase.replace("{{rep}}", subject);
    },
    async requestProductsByModel(searchSummary) {
      /**
       * Clear previous search and product result and create a new one
       * Get product IDs
       *
       */

      this.noProducts = false;
      this.productsLoading = true;
      localStorage.removeItem("engcon-filterSummary");
      this.products = [];
      this.filterSummary = [];
      this.searchSummary = searchSummary;

      localStorage.setItem(
        "engcon-searchSummary",
        JSON.stringify(searchSummary)
      );

      let brandId = this.searchSummary.brandId;
      let modelId = this.searchSummary.modelId;
      
      this.products = await getProductIDs(brandId, modelId);

      var productsIDs = [];
      var middleOfString = "";

      for (var i = 0; this.products.length > i; i++) {
        productsIDs.push(this.products[i].id);
        middleOfString += "metadata.product-id:" + this.products[i].id;
        if (i !== this.products.length - 1) {
          middleOfString += " OR ";
        }
      }

      var filterQuery = "+(" + middleOfString + ") AND language:" + window.lang;

      let query = {
        query: "*",
        filterQuery: filterQuery,
        limit: 200,
        fields: [
          "name",
          "title",
          "id",
          "language",
          "uri",
          "metadata.product-media",
          "metadata.product-minWeight",
          "metadata.product-maxWeight"
        ]
      };

      let products = await getProducts(query);

      //Set the thumbnail image

      
      // console.log(products[0]['metadata.product-media']);

      // for(i = 0; products.length > i; i++) {
      //   //eslint-disable-next-line no-console
      //   console.log();

      //   if(Array.isArray(products[i]['metadata.product-media'])) {
      //     //eslint-disable-next-line no-console
      //     console.log(products[i]['metadata.product-media']);

      //     // products[i]['metadata.product-media'] = "hej.jpg";
      //   } else {
      //     //eslint-disable-next-line no-console
      //     console.log(products[i]['metadata.product-media']);
      //   }
      // }

      // product['metadata.product-media'][0]

      this.products = products;

      localStorage.setItem("engcon-products", JSON.stringify(products));

      this.productsLoading = false;

      if(products.length === 0) {
        this.noProducts = true;
      }
    },
    async requestProductsByWeight(filterSummary) {
      /**
       * Clear previous search and product result and create new
       *
       */

      this.noProducts = false;
      this.productsLoading = true;

      localStorage.removeItem("engcon-searchSummary");

      this.products = [];
      this.searchSummary = [];
      this.filterSummary = filterSummary;

      localStorage.setItem(
        "engcon-filterSummary",
        JSON.stringify(filterSummary)
      );

      var filterQuery =
        "+(metadata.product-minWeight:[* TO " +
        this.filterSummary.maxWeight +
        "] AND metadata.product-maxWeight:[" +
        this.filterSummary.maxWeight +
        " TO *]) AND language:" + window.lang;

      if (this.filterSummary.keyword) {
        var keyword = this.filterSummary.keyword.toUpperCase();
        filterQuery += " AND name:*" + keyword + "*";
      }

      if (this.filterSummary.maxWeight == 0) {
        filterQuery = filterQuery.replace(/0/g, "*");
      }

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

      let products = await getProducts(query);

      this.products = products;
      localStorage.setItem("engcon-products", JSON.stringify(products));
      this.productsLoading = false;
    },
    async requestProductsByFavorites() {
      if (this.$route.query.name) {
        this.productsLoading = true;
        var urlQuery = this.$route.query

        // Set the title
        var newTitle = urlQuery.name.replace(/-/g, " ");
        var newTitleCapitalized = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
        this.listTitle = newTitleCapitalized;

        // Construct a filterQuery string
        // var startOfString = "+(";
        // var endOfString = ") AND language:" + window.lang;
        var middleOfString = "";
        if(Array.isArray(urlQuery.id)) {
          for (var i = 0; urlQuery.id.length > i; i++) {
            middleOfString += "id:" + urlQuery.id[i];
            if (i !== urlQuery.id.length - 1) {
              // Unless loop is at the last index, print " OR " in queary string
              middleOfString += " OR ";
            }
          }
        } else {
          middleOfString = "id:" + urlQuery.id;
        }
        var filterQuery = "+(" + middleOfString + ") AND language:" + window.lang;
        let query = {
          query: "*",
          filterQuery: filterQuery,
          limit: 200,
          fields: [
            "name",
            "title",
            "id",
            "language",
            "uri",
            "metadata.product-media",
            "metadata.product-minWeight",
            "metadata.product-maxWeight"
          ]
        };
        this.products = await getProducts(query);
        this.productsLoading = false;
      }
    },
    async requestTranslation() {
      let translation = await getTranslation();
      this.translatedStrings = translation.translation;
    },
    clearUrlQuery() {
      this.$router.push(this.$route.path);
      this.listTitle = "";
      this.getStoredProducts();
    },
  }
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "Akzidenz";
  src: url("./assets/Akzidenz-grotesk-black.ttf");
}

html {
  scroll-behavior: smooth !important;
  overflow-y: initial !important;
  overflow-x: initial !important;
}

body {
  overflow: auto !important;
  font-family: 'Akzidenz', sans-serif;
}

a {
  text-decoration: none;
}

.main-header-wrapper {
  background-image: url("https://engcon.com/webdav/files/resources/img/ourProducts/hero.jpg");
  background-size: cover;
  background-position: center;
}

.main-header {
  padding-top: 50px;
  padding-bottom: 50px;
  height: 700px;
  max-width: 1200px;
  margin: auto;
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

.inline {
  display: inline;
}

.icon {
  font-family: "FontAwesome";
  font-style: initial;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}

.icon-big {
  font-size: 2em;
}

.icon-medium {
  font-size: 1.5em;
}

.d-block {
  display: block !important;
}

.d-none {
  display: none;
}

.hidden {
  visibility: hidden;
}

.button {
  font-size: 1em;
  height: 45px;
  padding: 0 20px;
  border: 1px solid #9b9b9b;
  border-radius: 2px;
  margin-right: 10px;

  &:hover {
    cursor: pointer;
    // color: white;
  }

  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: color 500ms;
  transition: color 500ms;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: black;
    background: #ebb729;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition: 200ms ease-out;
    transition: 200ms ease-out;
  }

  &:hover:before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

  &.primary {
    background: $color-primary;
  }

  &.secondary {
    background: white;

    &:before {
      background: rgb(235, 235, 235);
    }
  }

  &.small {
    padding: 5px 15px;
    height: 40px;
    font-size: 0.9em;
  }
}

@media screen and (max-width: $breakpoint-small) {
  .main-header {
    height: auto;
  }
  .products-container {
    grid-template-columns: 50% 50%;
  }
}

.loading-icon-products {
  text-align: center !important;
  width: 100%;
  position: absolute;
  top: 935px;
  left: 0;
  height: 100px;
  padding-top: 35px;
  z-index: 999;
}
</style>