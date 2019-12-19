<template>
  <div>
    <article class="favorite-list__product">
      <section>
        <a :href="'http://engcon.utv' + favorite.uri">
          <img
            v-if="favorite['metadata.product-media'][0].length == 1"
            class="product-thumbnail"
            v-bind:src="'http://engcon.utv' + favorite['metadata.product-media']"
          />

          <img
            v-else
            class="product-thumbnail"
            v-bind:src="'http://engcon.utv' + favorite['metadata.product-media'][0]"
          />
        </a>
      </section>

      <section>
        <h3>{{favorite.title}}</h3>
        <p
          class="d-block"
        >{{replaceString(translatedStrings.machineWeight, favorite["metadata.product-minWeight"] + " - " + favorite["metadata.product-maxWeight"])}}</p>

        <a :href="'http://engcon.utv' + favorite.uri" class="badge">{{translatedStrings.readMore}}</a>
        <span
          v-on:click="$emit('remove-favorite', favorite)"
          class="badge remove"
        >{{translatedStrings.remove}}</span>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: "Favorite",
  props: {
    favorite: Array,
    strings: Array,
    translatedStrings: Array
  },
  data() {
    return {
      displayShareModal: true
    };
  },
  methods: {
    replaceString(phrase, subject) {
      return phrase.replace("{{rep}}", subject);
    }
  }
};
</script>

<style lang="scss" scoped>
.favorite-list__product {
  display: grid;
  grid-template-columns: 20% 80%;
  padding-top: 10px;
  border-bottom: 1px solid #ccc;

  p {
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1em;
  }
}

.badge {
  background: #fdd300;
  border: 1px solid #fdd300;
  display: inline-block;
  padding: 4px 15px;
  border-radius: 2px;
  font-size: 0.9em;
  text-decoration: none;
  color: black;
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
  border: 1px solid #ccc;
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