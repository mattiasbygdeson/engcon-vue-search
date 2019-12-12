<template>
  <div class="product-filter-container">
    <header class="product-filter-container-header">
      <h2>... eller filtrera på din maskinvikt</h2>
    </header>

    <main>
      <section>
        <label for="machine-weight">Maskinvikt: {{maxWeight}} ton</label>
        <input
          v-on:change="setFilterSummary"
          class="machine-weight-range-input"
          type="range"
          id="start"
          name="maxWeight"
          min="0"
          max="40"
          value="0"
          v-model="maxWeight"
        />
      </section>

      <section class="product-filter-search">
        <form v-on:submit.prevent>
          <input type="text" placeholder="Sök bland produkter" v-model="keyword" />
          <button v-on:click="setFilterSummary" type="submit" />
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "ProductFilter",
  data() {
    return {
      maxWeight: 0,
      keyword: ""
    };
  },
  methods: {
    setFilterSummary() {

      const filterSummary = {
        maxWeight: this.maxWeight,
        keyword: this.keyword,
      };

      // this.$emit("summarize", searchSummary);

      this.$emit("summarizeFilter", filterSummary);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-filter-container {
  margin: auto;
  margin-top: 20px;
  float: right;

  main {
    display: grid;
    grid-template-columns: 65% auto;

    border: 1px solid #ddd;
    height: 110px;
    max-width: 900px;
    background: white;
    opacity: 0.9;
  }

  section {
    padding: 20px;
  }
}

.product-filter-search {
  input[type="text"] {
    margin-top: 15px;
    height: 40px;
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 2px 0 0 2px;
    padding: 10px;
    font-size: 0.8em;
  }

  button {
    position: relative;
    top: 14px;
    height: 40px;
    width: 30%;
    background: #ffd300;
    border: 0;
    border: 1px solid #ffd300;

    background-image: url("../assets/icon-search.png");
    background-size: 30%;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: center;

    &:hover {
      cursor: pointer;
    }
  }
}

.product-filter-container-header {
  background: #ffd300;
  width: 900px;
  padding: 0;
  margin: 0;
  height: 50px;
  padding: 11px 20px;

  h2 {
    font-weight: 800;
    font-size: 1.1em;
  }
}

.machine-weight-range-input {
  width: 100%;
  height: 20px;
  display: block;
  margin-top: 15px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  min-height: 26px;
  min-width: 26px;
  background: #ffffff;
  margin-top: -5px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type="range"]::-moz-range-thumb {
  border: 1px solid #000000;
  min-height: 26px;
  min-width: 26px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 18px;
  cursor: pointer;
  background: #ccc;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 18px;
  cursor: pointer;
  background: #ccc;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
</style>