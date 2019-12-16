<template>
  <div>
    <div id="summary-bar" class="summary-bar">
      <p v-if="searchSummary.length !== 0">
        <span>Märke: {{searchSummary.brandName}}</span>
        <span>Modell: {{searchSummary.modelName}}</span>
        <span>Maskinvikt: {{searchSummary.machineWeight}} ton</span>

        <a href="#app">
          <i class="back-to-top-icon" />
        </a>
      </p>

      <p v-if="filterSummary.length !== 0">
        <span>Maskinvikt: {{filterSummary.maxWeight}} ton</span>
        <span v-if="filterSummary.keyword">Sökord: {{filterSummary.keyword}}</span>
      </p>
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

    <button
      v-if="this.favorites.length !== 0"
      @click="toggleDisplayFavoriteModal"
      class="favorite-list__button"
    >
      Mina favoriter
      <span class="favorite-list__number">({{favorites.length}})</span>
    </button>

    <section v-if="displayFavoriteModal" class="favorite-list__wrapper">
      <div class="favorite-list__container">
        <header class="favorite-list__header">
          <h2>Mina favoriter</h2>

          <i class="icon print" />

          <i class="icon share" />

          <i @click="toggleDisplayFavoriteModal" class="icon close" />
        </header>

        <main class="favorite-list__content">
          <Favorite
            v-on:remove-favorite="handleFavorites"
            v-for="favorite in favorites"
            :key="favorite.id"
            :favorite="favorite"
          />
        </main>
      </div>
    </section>
  </div>
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
    products: Array
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
  clear: both;
  margin-bottom: 120px;
}

.back-to-top-icon {
  position: relative;
  top: -5px;

  width: 40px;
  height: 40px;
  float: right;

  background-image: url("../assets/icon-chevron.png");
  background-size: 85%;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
}

.favorite-list {
  &__button {
    font-weight: 900;
    font-size: 0.9em;
    border-radius: 2px;
    // background: #ffd300;
    background-image: linear-gradient(#ffd300, #ffb800);
    border: 0;
    height: 60px;
    padding: 0 20px 3px 20px;
    border: 2px solid #191b1d;

    position: fixed;
    bottom: -2px;
    right: 10%;

    box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.45);

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
    background-image: linear-gradient(#ffd300, #ffb800);
    padding: 0;
    margin: 0;
    height: 50px;
    padding: 8px 20px;

    display: grid;
    grid-template-columns: auto 30px 30px 30px;
    grid-column-gap: 10px;

    h2 {
      font-weight: 800;
      font-size: 1.3em;
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
</style>