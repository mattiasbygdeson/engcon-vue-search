<template>
  <article class="product-container">
    <header @click="redirect()">
      <img
        alt="Product thumbnail"
        class="product-thumbnail"
        v-bind:src="this.baseurl + this.thumbnail"
      />
    </header>

    <main @click="redirect()">
      <h3>{{product.name}}</h3>

      <p>{{this.category}}</p>
      <p>{{product["metadata.product-minWeight"]}} - {{product["metadata.product-maxWeight"]}} ton</p>
    </main>

    <footer>
      <button
        style="width:100px"
        v-if="!this.inFavorites"
        class="button secondary small"
        v-bind:class="{'button-primary' : this.inFavorites}"
        v-on:click="$emit('handle-favorites', product)"
        @click="toggleFavoriteIcon"
      >
        {{this.translatedStrings.addToProductList}}
      </button>

      <button
        style="width:100px"
        v-if="this.inFavorites"
        class="button primary small"
        v-bind:class="{'button-primary' : this.inFavorites}"
        v-on:click="$emit('handle-favorites', product)"
        @click="toggleFavoriteIcon"
      >
        {{this.translatedStrings.addedToProductList}}
      </button>

      <span class="more-info">
        <a :href="this.baseurl + product.uri">{{translatedStrings.readMore}}</a>
        <i class="icon fas fa-angle-right icon-big" />
      </span>
    </footer>
  </article>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object,
    favorites: Array,
    displayFavoriteModal: Boolean,
    translatedStrings: Object,
    baseurl: String,
  },
  data() {
    return {
      keyword: "",
      inFavorites: false,
      category: this.product.title,
      thumbnail: ""
    };
  },
  created() {
    this.checkIfProductIsInFavorites();
    this.formatCategory();
    this.setThumbnail();
  },
  watch: {
    displayFavoriteModal: function() {
      this.checkIfProductIsInFavorites();
    }
  },
  methods: {
    redirect() {
      window.location = this.baseurl + this.product.uri;
    },
    checkIfProductIsInFavorites() {
      for (var i = 0; this.favorites.length > i; i++) {
        if (this.favorites[i].id == this.product.id) {
          this.inFavorites = !this.inFavorites;
        }
      }
    },
    setThumbnail() {
      if(Array.isArray(this.product['metadata.product-media'])) {
        this.thumbnail = this.product['metadata.product-media'][0];
      } else {
        this.thumbnail = this.product['metadata.product-media'];
      }
    },
    toggleFavoriteIcon() {
      this.inFavorites = !this.inFavorites;
    },
    formatCategory() {
      if(this.category != undefined) {
        this.category = this.category.split(' ');
        this.category.shift();
        this.category = this.category.join();
        this.category = this.category.replace(/,/g, ' ');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.product-container {
  background: white;
  border: 1px solid $color-gray;
  text-align: left;
  margin: 15px;
  transition: border-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transition: box-shadow 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
  border-radius: 2px;
  max-height: 500px;

  display: grid;
  grid-template-rows: auto 100px 60px;

  header {
    img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: scale-down;
    }
  }

  main {
    text-align: center;
    line-height: 1.4em;
    font-size: 0.9em;
    height: 80px;

    p {
      display: block !important;
    }

    h3 {
      font-weight: 800;

      a {
        color: black;
        text-decoration: none;
      }
    }

    p {
      font-size: 0.9em; 

      &:first-of-type {
        margin-top: 20px;
        font-weight: 700;
        font-size: 1em;
      }
    }
  }

  footer {
    border-top: 1px solid $color-gray;
    display: grid;
    grid-template-columns: auto auto;
    padding: 10px;

    .more-info {
      text-align: right;
      position: relative;
      bottom: 4px;
      font-weight: 600;

      a {
        color: darken($color-gray, 40%);
        transition: color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
        text-decoration: none;

        &:hover {
          color: black;
        }
      }

      i {
        color: $color-primary;
        position: relative;
        top: 5px;
        margin-left: 10px;
      }
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 3px 10px 20px $color-gray;
  }
}

.product-thumbnail {
  width: 100%;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 20px;
}

.favorite-icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  text-align: center;
  font-size: 1.5em;
  color: darken($color-gray, 10%);

  i {
    position: relative;
    top: 5px;
  }

  &:hover {
    font-size: 2em;
    position: relative;
    top: -4px;
  }
}

.in-favorites {
  color: $color-primary;
}

.machine-weight {
  text-align: center;
  padding: 10px;
}

@media screen and (max-width: $breakpoint-small) {
.product-container {
  display: initial;

    header {
      width: 30%;
      display: inline-block;

      img {
        height: 100px;
      }
    }

    main {
      text-align: left;
      float: right;
      width: 70%;
      padding-top: 20px;
    }
  }
}

.fav-button {
  background: white;
  border: 1px solid #9b9b9b;
  border-radius: 2px;
  width: 100px;

  &:hover {
    cursor: pointer;
  }
}

.saved {
  background: $color-primary;
}

</style>