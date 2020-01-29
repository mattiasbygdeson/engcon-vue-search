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
            class="input-brand-filter d-none"
            type="text"
            :placeholder="translatedStrings.filter"
            name="filter"
          />
        </header>

        <div v-if="brandsLoading" class="loading-icon">
          <div class="env-spinner">
            <div class="env-rect1"></div>
            <div class="env-rect2"></div>
            <div class="env-rect3"></div>
            <div class="env-rect4"></div>
            <div class="env-rect5"></div>
          </div>
        </div>

        <ul class="brand-list">
          <Brand
            v-for="brand in brands"
            v-bind:key="brand.BrandId"
            :brand="brand"
            :selectedBrand="selectedBrand"
            v-on:select-brand="requestModels"
          />
        </ul>
      </section>

      <section class="brand-search-column">
        <h2 v-if="selectedBrand.length !== 0">
          {{replaceString(translatedStrings.selectYour, selectedBrand.BrandName)}}
        </h2>

        <p v-else class="notice">{{translatedStrings.selectBrandTo}}</p>

        <div v-if="modelsLoading" class="loading-icon">
          <div class="env-spinner">
            <div class="env-rect1"></div>
            <div class="env-rect2"></div>
            <div class="env-rect3"></div>
            <div class="env-rect4"></div>
            <div class="env-rect5"></div>
          </div>
        </div>

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
import Brand from "./Brand";
import Model from "./Model";
import { getBrands } from "../api.js";
import { getModels } from "../api.js";

export default {
  name: "ProductGuide",
  props: {
    translatedStrings: Object
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
      filter: "",
      modelsLoading: false,
      brandsLoading: false,
    };
  },
  created() {
    this.requestBrands();
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
  },
  methods: {
    async requestBrands() {
      this.brandsLoading = true;
      this.brands = await getBrands();
      this.brandsLoading = false;
    },
    async requestModels(brand) {
      this.modelsLoading = true;

      this.selectedBrand = [];
      this.selectedModel = [];
      this.models = [];
      this.selectedBrand = brand;

      var id = brand.BrandId;

      this.models = await getModels(id);

      this.modelsLoading = false;
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
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.brand-search-container {
  width: 95%;
  margin: auto;

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
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  .model-list {
    max-height: 355px;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 50% 50%;
    position: relative;
    top: 12px;
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
  background: $color-primary;
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

.loading-icon {
  // border: 2px solid red;
  text-align: center !important;
  width: 100%;
  margin-top: 150px;  
}

@media screen and (max-width: $breakpoint-medium) {
  .brand-search-column {
    .brand-list {
      grid-template-columns: 33% 33% 33%;
    }

    .model-list {
      grid-template-columns: 100%;
    }
  }
}

@media screen and (max-width: $breakpoint-small) {
  .main-header {
    height: auto;
  }

  .products-container {
    grid-template-columns: 50% 50%;
  }

  .brand-search-container {
    width: 95%;
    margin: auto;

    main {
      display: grid;
      grid-template-columns: 100%;
      grid-row-gap: 20px;
      max-height: 900px;
    }
  }

  .brand-search-column {
    .brand-list {
      grid-template-columns: 33% 33% 33%;
    }

    .model-list {
      grid-template-columns: 25% 25% 25% 25%;
    }
  }
}

@media screen and (max-width: $breakpoint-extra-small) {
.brand-search-container-header {
  background: $color-primary;
  padding: 0;
  margin: 0;
  height: 50px;
  padding: 8px 20px;

    h1 {
      font-weight: 800;
      font-size: 1em !important;
      margin-top: 4px;
    }
  }

  .brand-search-column {
    .brand-list {
      grid-template-columns: 50% 50%;
    }

    .model-list {
      grid-template-columns: 100%;
    }
  }
}

</style>