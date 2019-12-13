<template>
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
      <p>Maskinvikt: {{favorite["metadata.product-minWeight"]}} - {{favorite["metadata.product-maxWeight"]}} ton</p>
      <span class="badge">Läs mer</span>
      <br />
      <span class="badge remove">Ta bort</span>
    </section>
  </article>
</template>

<script>
export default {
  name: "Favorite",
  props: {
    favorite: Array
  }
};
</script>

<style lang="scss" scoped>
article {
  display: grid;
  grid-template-columns: 20% 80%;
}

p {
  margin-bottom: 10px;
}

h3 {
  margin-bottom: 10px;
}

.badge {
  background: #fdd300;
  border: 1px solid #fdd300;
  // max-width: 100px;
  margin-bottom: 10px;
  display: inline-block;
  padding: 4px 15px;
  border-radius: 25px;
  font-size: 0.9em;
  

  &:hover {
    cursor: pointer;
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
}
</style>