<template>
  <div class="brand-search-container">
    <header class="brand-search-container-header">
      <h1>{{translatedStrings.guideMe}}</h1>
    </header>

    <main>
      <section class="brand-search-column">
        <header>
          <h2>{{translatedStrings.selectYourBrand}}</h2>

          <input
            class="input-brand-filter hidden"
            type="text"
            :placeholder="translatedStrings.filter"
            name="filter"
          />
        </header>

        <ul class="brand-list">
          <Brand
            v-for="brand in brands"
            v-bind:key="brand.BrandId"
            :brand="brand"
            :selectedBrand="selectedBrand"
            v-on:select-brand="selectBrand"
          />
        </ul>
      </section>

      <section class="brand-search-column">
        <h2
          v-if="selectedBrand.length !== 0"
        >{{replaceString(translatedStrings.selectYour, selectedBrand.BrandName)}}</h2>

        <p v-else class="notice">{{translatedStrings.selectBrandTo}}</p>

        <ul class="model-list">
          <Model
            v-for="model in models"
            v-bind:key="model.ModelId"
            :model="model"
            :selectedModel="selectedModel"
            v-on:select-model="selectModel"
          />
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Brand from "./Brand";
import Model from "./Model";

export default {
  name: "ProductGuide",
  props: {
    lang: String,
    translatedStrings: Array
  },
  components: {
    Brand,
    Model
  },
  data() {
    return {
      brands: [],
      filteredBrands: [],
      selectedBrand: [],
      models: [],
      selectedModel: [],
      filter: ""
    };
  },
  created() {
    /**
     * Load brands into component
     *
     */

    var getBrands = localStorage.getItem("engcon-brands");

    if (getBrands) {
      this.brands = JSON.parse(getBrands);
    } else {
      axios
        .get("http://beta.configurator.engcon.com/Configurator.ashx?country=se")
        .then(res => {
          this.brands = res.data.Excavator;
          localStorage.setItem(
            "engcon-brands",
            JSON.stringify(res.data.Excavator)
          );
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  methods: {
    selectBrand(brand) {
      /**
       * Render a list of models
       * Activated when user clicks on brand icon
       *
       */

      this.selectedBrand = [];
      this.selectedModel = [];
      this.models = [];
      this.selectedBrand = brand;

      axios
        .get(
          "http://beta.configurator.engcon.com/Configurator.ashx?country=se&brand=" +
            brand.BrandId,
          {}
        )
        .then(res => {
          this.models = res.data.Excavator[0].Model;
        })
        .then(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    filterBrands() {
      /**
       * Remove any brands from component that do not match search input
       * Activated at keyup in input field
       *
       */

      //eslint-disable-next-line no-console
      // console.log("filterBrands");

      // var filterInput = this.filter.toLowerCase();
      // var brandName;
      // var result;

      // for (var i = 0; this.brands.length > i; i++) {
      //   brandName = this.brands[i].BrandName.toLowerCase();
      //   result = brandName.match(filterInput);

      //   if (result && filterInput.charAt(0) !== brandName.charAt(0)) {
      //     this.brands[i].Hide = true;
      //   }
      // }
    },

    replaceString(phrase, subject) {
      return phrase.replace("{{rep}}", subject);
    },

    selectModel(model) {
      this.selectedModel = [];
      this.selectedModel = model;
    }
  },
  updated() {
    /**
     * If a model has been selected
     * Send all relevant data to parent to display products
     *
     */

    if (this.selectedModel.length !== 0) {
      const searchSummary = {
        brandId: this.selectedBrand.BrandId,
        brandName: this.selectedBrand.BrandName,
        modelId: this.selectedModel.ModelId,
        machineWeight: this.selectedModel.ModelMachineWeight,
        modelName: this.selectedModel.ModelName
      };

      this.$emit("summarizeSearch", searchSummary);
    }
  }
};
</script>

<style lang="scss" scoped>
.brand-search-container {
  main {
    display: grid;
    grid-template-columns: 70% auto;
    max-height: 400px;
  }
}

.brand-search-column {
  header {
    height: 41px;
  }

  background: white;
  opacity: 0.9;
  border: 1px solid #ddd;
  height: 400px;

  .brand-list {
    max-height: 90%;
    overflow-y: scroll;
    padding: 10px;

    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  .model-list {
    max-height: 355px;
    overflow-y: auto;
    padding: 10px;

    display: grid;
    grid-template-columns: 50% 50%;
  }

  h2 {
    padding-top: 10px;
    margin-left: 20px;
    font-weight: 400 !important;
    font-size: 1em !important;
    display: inline-block;
    position: relative !important;
    top: 10px !important;
  }
}

.notice {
  color: #aaa;
  width: 100%;
  margin: auto;
  padding-top: 160px;
  text-align: center;
}

.brand-search-container-header {
  background: #ffd300;
  padding: 0;
  margin: 0;
  height: 50px;
  padding: 8px 20px;

  h1 {
    font-weight: 800;
    font-size: 1.5em !important;
    margin-top: 4px;
  }
}

.input-brand-filter {
  float: right;
  position: relative;
  top: 11px;
  right: 38px;
  height: 30px;
  font-size: 1em;
  padding-left: 10px;
}
</style>