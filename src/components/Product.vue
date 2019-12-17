<template>
  <article class="product-container">
    <header>
      <a :href="'http://engcon.utv' + product.uri">
        <img
          v-if="product['metadata.product-media'][0].length == 1"
          class="product-thumbnail"
          v-bind:src="'http://engcon.utv' + product['metadata.product-media']"
        />

        <img
          v-else
          class="product-thumbnail"
          v-bind:src="'http://engcon.utv' + product['metadata.product-media'][0]"
        />
      </a>
    </header>

    <main>
      <h3>
        <a :href="'http://engcon.utv' + product.uri">{{product.name}}</a>
      </h3>

      <p>{{product.title.substr(product.name.length + 1)}}</p>
      <p>{{product["metadata.product-minWeight"]}} - {{product["metadata.product-maxWeight"]}} ton</p>
    </main>

    <footer>
      <span
        class="favorite-icon"
        v-bind:class="{'in-favorites' : this.inFavorites}"
        v-on:click="$emit('handle-favorites', product)"
        @click="toggleFavoriteIcon"
      >
        <i class="far fa-star" />
      </span>

      <span class="more-info">
        <a :href="'http://engcon.utv' + product.uri">Mer info</a>
        <i class="fas fa-angle-right icon-big" />
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
    displayFavoriteModal: Boolean
  },
  data() {
    return {
      keyword: "",
      inFavorites: false
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log("Product created");

    this.checkIfProductIsInFavorites();
  },
  watch: {
    displayFavoriteModal: function() {
      // eslint-disable-next-line no-console
      console.log("displayFavoriteModal changed");

      this.checkIfProductIsInFavorites();
    }
  },
  methods: {
    checkIfProductIsInFavorites() {
      for (var i = 0; this.favorites.length > i; i++) {
        if (this.favorites[i].id === this.product.id) {
          this.inFavorites = !this.inFavorites;
        }
      }
    },
    toggleFavoriteIcon() {
      this.inFavorites = !this.inFavorites;
    },
    setFilterSummary(e) {
      // eslint-disable-next-line no-console
      console.log(e.path[0].innerHTML);

      const filterSummary = {
        maxWeight: 40,
        keyword: e.path[0].innerHTML
      };

      this.$emit("summarizeFilter", filterSummary);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-container {
  background: white;
  border: 1px solid #ddd;
  text-align: left;
  margin: 15px;
  transition: border-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transition: box-shadow 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
  border-radius: 2px;

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

    h3 {
      font-weight: 800;
      text-align: center;

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
    border-top: 1px solid #ccc;
    display: grid;
    grid-template-columns: auto auto;
    padding: 10px;

    .more-info {
      text-align: right;
      position: relative;
      bottom: 4px;
      font-weight: 600;

      a {
        color: #707070;
        transition: color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
        text-decoration: none;

        &:hover {
          color: black;
        }
      }

      i {
        color: #ffd300;
        position: relative;
        top: 5px;
        margin-left: 10px;
      }
    }
  }

  &:hover {
    cursor: pointer;
    border-color: rgb(145, 145, 145);
    box-shadow: 3px 10px 20px #ccc;
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
  border: 1px solid #ccc;

  i {
    position: relative;
    top: 5px;
  }

  &:hover {
    background-color: #ffd300;
  }
}

.in-favorites {
  background-color: #ffd300;
}

.product-tags {
  position: relative;
  bottom: 20px;

  .badge {
    transition: background-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
    border: 1px solid #ccc;
    padding: 2% 4%;
    margin: 2%;
    border-radius: 20px;
    font-size: 0.9em;

    &:hover {
      background-color: #ffd300;
      cursor: pointer;
    }
  }
}

.machine-weight {
  text-align: center;
  padding: 10px;
}
</style>
