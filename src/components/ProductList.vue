<template>
  <main>
    <div id="summary-bar" class="summary-bar">
      <div class="summary-bar__content">
        <template v-if="this.listTitle">
          <span>{{listTitle}}</span>

          <button class="return-button" @click="$emit('backToStart')">Tillbaka till produktfilter</button>
        </template>

        <template v-else>
          <span
            v-if="searchSummary.brandName" class="brand-name"
          >{{replaceString(translatedStrings.brand, searchSummary.brandName)}}</span>

          <span
            v-if="searchSummary.modelName"
          >{{replaceString(translatedStrings.model, searchSummary.modelName)}}</span>

          <span
            v-if="searchSummary.machineWeight"
          >{{replaceString(translatedStrings.machineWeight, searchSummary.machineWeight)}}</span>

          <span
            v-if="filterSummary.maxWeight > 0"
          >{{replaceString(translatedStrings.machineWeight, filterSummary.maxWeight)}}</span>

          <span v-if="filterSummary.keyword">Sökord: "{{filterSummary.keyword}}"</span>
        </template>

        <nav>
          <button
            v-if="this.favorites.length !== 0"
            @click="toggleDisplayFavoriteModal"
            class="favorite-list__button"
          >{{replaceString(translatedStrings.favorites, favorites.length)}}</button>

          <a href="#apptop" class="back-to-top" :class="{'hidden' : this.listTitle}">
            <i class="icon fas fa-angle-up icon-big" />
          </a>
        </nav>
      </div>
    </div>

    <h2 class="products-headline">{{replaceString(translatedStrings.products, products.length)}}</h2>

    <div class="products-container">
      <Product
        v-on:handle-favorites="handleFavorites"
        v-for="product in products"
        :key="product.id"
        :product="product"
        :favorites="favorites"
        :displayFavoriteModal="displayFavoriteModal"
        :translatedStrings="translatedStrings"
        v-on:summarizeFilter="$emit('summarizeFilter')"
      />
    </div>

    <section v-if="displayFavoriteModal" class="favorite-list__wrapper">
      <article class="favorite-list__container">
        <header class="favorite-list__header">
          <h2>{{replaceString(translatedStrings.favorites, favorites.length)}}</h2>

          <nav>
            <i class="d-none icon fas fa-print icon-big" />
            <i @click="toggleDisplayShareModal" class="icon fas fa-share-alt icon-big" />
            <i @click="toggleDisplayFavoriteModal" class="icon fas fa-times icon-big" />
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
      </article>
    </section>

    <ShareList
      :favorites="favorites"
      :translatedStrings="translatedStrings"
      v-if="displayShareModal"
      v-on:toggle-share-modal="toggleDisplayShareModal"
      class="share-modal__wrapper"
    />
  </main>
</template>

<script>
import Product from "./Product";
import Favorite from "./Favorite";
import ShareList from "./ShareList";

export default {
  name: "ProductList",
  components: {
    Product,
    Favorite,
    ShareList
  },
  props: {
    searchSummary: {},
    filterSummary: {},
    products: Array,
    translatedStrings: {},
    listTitle: String
  },
  data() {
    return {
      favorites: [],
      displayFavoriteModal: false,
      displayShareModal: false
    };
  },
  created() {
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
      if(phrase !== undefined && subject !== undefined) {
        return phrase.replace("{{rep}}", subject);
      }
    },

    toggleDisplayFavoriteModal() {
      this.displayFavoriteModal = !this.displayFavoriteModal;

      // Reload products
      var test = this.products;
      this.products = [];
      this.products = test;
    },

    toggleDisplayShareModal() {
      this.displayShareModal = !this.displayShareModal;
    },

    handleFavorites(product) {
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
@import "../scss/_variables.scss";

.summary-bar {
  background: #1f1f1f;
  height: 50px;
  color: white;
  font-size: 1.1em;
  padding-top: 16px;
  position: sticky;
  top: 0px;
  z-index: 100;

  &__content {
    // max-width: 1200px;
    // margin: auto;
    padding: 0 30px;

    nav {
      float: right;
    }
  }

  span {
    margin-right: 5%;
  }
}

.products-headline {
  max-width: 1200px;
  margin: auto;
  margin-top: 30px;
  padding-left: 15px;
}

.products-container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  clear: both;
  margin-bottom: 120px;
  margin: auto;
  min-height: 100vh;
  max-width: 1200px;
}

.favorite-list {
  &__button {
    position: relative;
    top: -14px;
    background: #ffd300;
    border: 0;
    font-size: 0.85em;
    padding: 0 20px 0 20px;
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
    width: 90%;
    max-width: 1000px;
    max-height: 600px;
    height: 100%;
    margin: auto;
    margin-top: 10vh;
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
    grid-template-columns: auto 100px;
    nav {
      text-align: right;
      i {
        margin-left: 25px;
      }
    }
    h2 {
      font-weight: 800;
      font-size: 1.2em;
      margin-top: 4px;
    }
  }
  &__content {
    max-height: 550px;
    padding: 2%;
    overflow-y: scroll;
  }
  &__product {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
}

.back-to-top {
  text-decoration: none;
  position: relative;
  top: -7px;
  color: white;

  &:active {
    color: inherit;
  }
}

.return-button {
  @extend .favorite-list__button;
  top: 0px;
}

@media screen and (max-width: $breakpoint-medium) {
  body {
    background: pink;
  }

  .products-container {
    grid-template-columns: 33% 33% 33%;
  }

  .back-to-top {
    display: none;
  }

  .favorite-list {
    &__button {
      position: relative;
      top: 0px;
      background: #ffd300;
      border: 0;
      font-size: 0.85em;
      padding: 0 20px 0 20px;
      box-shadow: 0 0 0 6px #ffd300;
      margin-right: 28px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .summary-bar {
    span {
      margin-right: 2%;
      font-size: 0.9em;
    }

    &__content {
      padding: 0 10px;
    }
  }
}

@media screen and (max-width: $breakpoint-small) {
  .products-container {
    grid-template-columns: 100%;
  }

  .favorite-list {
    &__button {
      position: absolute;
      top: 66px;
      right: -12px;
      height: 41px;

      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    }
  }

  .summary-bar {
    top: 64px;

    span {
      margin-right: 4%;
      font-size: 0.75em;
    }
  }
}

@media screen and (max-width: $breakpoint-extra-small) {
  .brand-name {
    display: none;
  }

  .favorite-list {
    &__header {
      font-size: 1.2em !important;
    }

    &__content {
      max-height: 100%;
    }

    &__container {
      width: 100%;
      max-height: 100%;
      height: 100%;
      margin-top: 0;
      border-radius: 3px;
    }
  }
}
</style>