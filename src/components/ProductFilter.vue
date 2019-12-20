<template>
  <div class="product-filter-container">
    <header class="product-filter-container-header">
      <h2>{{translatedStrings.orFilter}}</h2>
    </header>

    <main>
      <section>
        <label
          class="machine-weight-range-label"
          for="machine-weight"
        ><span v-if="maxWeight > 0">{{replaceString(translatedStrings.machineWeight, maxWeight)}}</span></label>

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
          <input type="text" :placeholder="translatedStrings.searchPlaceholder" v-model="keyword" />

          <button v-on:click="setFilterSummary" type="submit">
            <i class="icon fas fa-search icon-medium" />
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "ProductFilter",
  props: {
    translatedStrings: Array
  },
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
        keyword: this.keyword
      };

      this.$emit("summarizeFilter", filterSummary);
    },

    replaceString(phrase, subject) {
      return phrase.replace("{{rep}}", subject);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.product-filter-container {
  // margin: auto;
  // margin-right: 29px;
  // float: right;

  width: 95%;
  margin: auto;
  margin-top: 20px;

  main {
    display: grid;
    grid-template-columns: 65% auto;
    border: 1px solid #ddd;
    height: 110px;
    // max-width: 900px;
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
    top: 2px;
    height: 40px;
    width: 30%;
    background: #ffd300;
    border: 1px solid #ffd300;
    &:hover {
      cursor: pointer;
    }
  }
}

.product-filter-container-header {
  background: #ffd300;
  // width: 900px;
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

.machine-weight-range-label {
  border: 1px solid white;
}

.product-filter-container {
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
}



@media screen and (max-width: $breakpoint-small) {
.product-filter-container {
  // margin: auto;
  // margin-right: 29px;
  // float: right;

  width: 95%;
  margin: auto;
  margin-top: 20px;

  main {
      display: grid;
      grid-template-columns: 100%;
      border: 1px solid #ddd;
      height: 210px;
      // max-width: 900px;
      background: white;
      opacity: 0.9;
    }
  }
}



@media screen and (max-width: $breakpoint-extra-small) {
  .product-filter-container-header {
    h2 {
      font-size: 0.9em !important;
    }
  }
}
</style>