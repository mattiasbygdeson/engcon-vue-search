<template>
  <div>
    <article class="favorite-list__product">
      <section>
        <a :href="baseurl + favorite.uri">
          <img
            alt="Product thumbnail"
            class="product-thumbnail"
            v-bind:src="baseurl + this.thumbnail"
          />
        </a>
      </section>

      <section>
        <h3>{{favorite.title}}</h3>
        <p class="d-block">
          {{replaceString(translatedStrings.machineWeight, favorite["metadata.product-minWeight"] + " - " + favorite["metadata.product-maxWeight"])}}
        </p>

        <nav>
          <a :href="baseurl + favorite.uri">
            <button class="button primary small">
              {{translatedStrings.readMore}}
            </button>
          </a>

          <button
            v-on:click="this.deleteFavorite"
            class="button secondary small"
          >
            {{translatedStrings.remove}}
          </button>
        </nav>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: "Favorite",
  props: {
    favorite: Object,
    translatedStrings: Object,
    baseurl: String,
  },
  data() {
    return {
      displayShareModal: true,
      thumbnail: ""
    };
  },
  created() {
    this.setThumbnail();
  },
  methods: {
    replaceString(phrase, subject) {
      return phrase.replace("{{rep}}", subject);
    },
    setThumbnail() {
      if(Array.isArray(this.favorite['metadata.product-media'])) {
        this.thumbnail = this.favorite['metadata.product-media'][0];
      } else {
        this.thumbnail = this.favorite['metadata.product-media'];
      }
    },
    deleteFavorite() {
      const product = this.favorite;
      this.$emit('remove-favorite', product);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.favorite-list {
  &__product {
    display: grid;
    grid-template-columns: 20% 80%;
    padding-top: 10px;
    border-top: 1px solid $color-gray;

    p {
      margin-bottom: 10px;
    }

    h3 {
      margin-bottom: 10px;
      font-size: 1em;
    }

    nav {
      padding-top: 10px;
      margin-bottom: 15px;
    }
  }

  article {
    background: red;
  }
}

.badge {
  background: $color-primary;
  border: 1px solid $color-primary;
  display: inline-block;
  padding: 10px 15px;
  border-radius: 2px;
  font-size: 0.9em;
  text-decoration: none;
  color: $color-secondary;
  display: inline-block;
  margin-right: 10px;
  margin-top: 14px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}

.remove {
  background: white;
  border: 1px solid $color-gray;
}

.product-thumbnail {
  width: 100%;
  height: 100px;
  object-fit: scale-down;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 20px;

  p {
    display: block !important;
  }
}
</style>