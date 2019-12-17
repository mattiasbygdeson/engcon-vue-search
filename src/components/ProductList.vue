<template>
  <main>
    <div id="summary-bar" class="summary-bar">
      <div class="summary-bar__content">
        <span v-if="searchSummary.brandName">{{replaceString(translatedStrings.brand, searchSummary.brandName)}}</span>
        <span v-if="searchSummary.modelName">{{replaceString(translatedStrings.model, searchSummary.modelName)}}</span>
        <span v-if="searchSummary.machineWeight">{{replaceString(translatedStrings.machineWeight, searchSummary.machineWeight)}}</span>

        <span v-if="filterSummary.maxWeight">{{replaceString(translatedStrings.machineWeight, filterSummary.maxWeight)}}</span>
        <span v-if="filterSummary.keyword">Sökord: {{filterSummary.keyword}}</span>

        <nav>
          <button
            v-if="this.favorites.length !== 0"
            @click="toggleDisplayFavoriteModal"
            class="favorite-list__button"
          >
            {{replaceString(translatedStrings.favorites, favorites.length)}}
          </button>

          <a href="#app" class="back-to-top">
            <i class="fas fa-angle-up icon-big" />
          </a>
        </nav>
      </div>
    </div>

    <div class="products-container">
      <Product
        v-on:handle-favorites="handleFavorites"
        v-for="product in products"
        :key="product.id"
        :product="product"
        :favorites="favorites"
        :displayFavoriteModal="displayFavoriteModal"
        v-on:summarizeFilter="$emit('summarizeFilter')"
      />
    </div>



    <section v-if="displayFavoriteModal" class="favorite-list__wrapper">
      <div class="favorite-list__container">
        <header class="favorite-list__header">
          <h2>{{replaceString(translatedStrings.favorites, favorites.length)}}</h2>

          <nav>
            <i class="fas fa-print icon-big" />
            <i class="fas fa-share-alt icon-big" />
            <i @click="toggleDisplayFavoriteModal" class="fas fa-times icon-big" />
          </nav>
        </header>

        <main class="favorite-list__content">
          <Favorite
            v-on:remove-favorite="handleFavorites"
            v-for="favorite in favorites"
            v-bind:translatedStrings="translatedStrings"
            :key="favorite.id"
            :favorite="favorite"
          />
        </main>
      </div>
    </section>
  </main>
</template>

<script>
import Product from "./Product";
import Favorite from "./Favorite";

export default {
  name: "ProductList",
  components: {
    Product,
    Favorite
  },
  props: {
    searchSummary: Object,
    filterSummary: String,
    products: Array,
    translatedStrings: Array
  },
  data() {
    return {
      favorites: [],
      displayFavoriteModal: false
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log("ProductList created");

    this.getFavorites();
  },
  methods: {
    getFavorites() {
      var storedFavorites = localStorage.getItem("engcon-favorites");

      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    },
    replaceString(phrase, subject) {
      return phrase.replace("{{rep}}", subject);
    },
    toggleDisplayFavoriteModal() {
      this.displayFavoriteModal = !this.displayFavoriteModal;

      // Reload products
      var test = this.products;
      this.products = [];
      this.products = test;
    },
    handleFavorites(product) {
      // eslint-disable-next-line no-console
      console.log("handleFavorites");

      /**
       * Add to favorite list if it's a new object
       * Remove from favorite list if it already exists
       *
       */

      for (var i = 0; this.favorites.length > i; i++) {
        if (product.id === this.favorites[i].id) {
          this.favorites = this.favorites.filter(
            favorites => favorites.id !== product.id
          );
          localStorage.removeItem(
            "engcon-favorites",
            JSON.stringify(this.favorites)
          );
          localStorage.setItem(
            "engcon-favorites",
            JSON.stringify(this.favorites)
          );
          return;
        }
      }

      this.favorites = [...this.favorites, product];
      localStorage.setItem("engcon-favorites", JSON.stringify(this.favorites));

      // Reload products
      var test = this.products;
      this.products = [];
      this.products = test;
    }
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
  position: sticky;
  top: 0px;
  z-index: 100;

  &__content {
    max-width: 1200px;
    margin: auto;

    nav {
      // border: 1px solid red;
      // display: inline;
      float: right;


    }
  }

  span {
    margin-right: 5%;
  }
}

.products-container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  clear: both;
  margin-bottom: 120px;
}

.favorite-list {
  // &__button {
  //   font-weight: 900;
  //   font-size: 0.9em;
  //   border-radius: 2px;
  //   background: #ffd300;
  //   border: 0;
  //   height: 60px;
  //   padding: 0 20px 3px 20px;
  //   border: 2px solid #191b1d;

  //   // position: fixed;
  //   // bottom: -2px;
  //   // right: 10%;

  //   box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.45);

  //   &:hover {
  //     cursor: pointer;
  //   }
  // }

  &__button {
    font-weight: 900;
    position: relative;
    top: -14px;
    background: #ffd300;
    border: 0;
    font-size: 0.85em;
    padding: 0 20px 3px 20px;
    box-shadow: 0 0 0 6px #ffd300;
    margin-right: 28px;

    &:hover {
      cursor: pointer;
    }
  }

  &__wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background: rgba(0, 0, 0, 0.3);
  }

  &__container {
    background: white;
    width: 100%;
    max-width: 1000px;
    max-height: 700px;
    height: 100%;
    margin: auto;
    margin-top: 15vh;
    border-radius: 3px;
    box-shadow: 16px 16px 20px rgba(0, 0, 0, 0.2);
  }

  &__header {
    background: #ffd300;
    padding: 0;
    margin: 0;
    height: 50px;
    padding: 8px 20px;

    display: grid;
    grid-template-columns: auto 300px;

    nav {
      text-align: right;

      i {
        margin-left: 25px;
      }
    }

    h2 {
      font-weight: 800;
      font-size: 1.2em;
    }
  }

  &__content {
    padding: 2%;
    max-height: 650px;
    overflow-y: scroll;
  }

  &__product {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
}

.back-to-top {
  text-decoration: none;
  // float: right;
  position: relative;
  top: -7px;
  color: white;

  // border: 4px solid white;
  // width: 40px;
  // height: 40px;
  // text-align: center;
  // border-radius: 2px;
  // padding-bottom: 4px;

  &:active {
    color: inherit;
  }
}
</style>