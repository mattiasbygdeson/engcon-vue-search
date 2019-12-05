<template>
  <div class="vue__brand-search-container">
    <header>
      <h2>Guida mig till rätt produkt</h2>
    </header>

    <main>
      <section class="vue__brand-search-column">
        <h3>Välj ditt märke</h3>

        <ul class="vue__brand-list">
          <Brand
            v-for="brand in brands"
            v-bind:key="brand.BrandId"
            :brand="brand"
            :selectedBrand="selectedBrand"
            v-on:select-brand="selectBrand"
          />
        </ul>
      </section>

      <section class="vue__brand-search-column">
        <h3 v-if="selectedBrand.length !== 0">Välj din modell</h3>
        <h3 v-else class="inactive">Välj din modell</h3>

        <ul class="vue__model-list">
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
    lang: String
  },
  components: {
    Brand,
    Model
  },
  data() {
    return {
      brands: [],
      selectedBrand: [],
      models: [],
      selectedModel: []
    };
  },
  methods: {
    selectBrand(brand) {
      // Reset all search data when clicking on new brand
      this.selectedBrand = [];
      this.selectedModel = [];
      this.models = [];

      this.selectedBrand = brand;

      axios
        .get(
          "http://beta.configurator.engcon.com/Configurator.ashx?country=se&brand=" +
            brand.BrandId,
          {
            headers: {
              Authorization: "Access-Control-Allow-Origin: *"
            }
          }
        )
        .then(res => (this.models = res.data.Excavator[0].Model))
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    },
    selectModel(model) {
      this.selectedModel = [];
      this.selectedModel = model;
    }
  },
  created() {
    axios
      .get("http://beta.configurator.engcon.com/Configurator.ashx?country=se", {
        headers: {
          Authorization: "Access-Control-Allow-Origin: *"
        }
      })
      .then(res => (this.brands = res.data.Excavator))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  },
  updated() {
    // eslint-disable-next-line no-console
    console.log("Updated");

    if (this.selectedBrand.length !== 0 && this.selectedModel.length !== 0) {
      // Both brand and machine selected, summarize results
      const searchSummary = {
        brandId: this.selectedBrand.BrandId,
        brandName: this.selectedBrand.BrandName,
        modelId: this.selectedModel.ModelId,
        machineWeight: this.selectedModel.ModelMachineWeight,
        modelName: this.selectedModel.ModelName,
      };

      // Send object to parent
      this.$emit("summarize", searchSummary);
    }
  }
};
</script>

<style lang="scss" scoped>
.vue__brand-search-container {
  max-width: 1200px;
  margin: auto;

  main {
    display: grid;
    grid-template-columns: 70% auto;
    max-height: 400px;
  }
}

.vue__brand-search-column {
  background: white;
  border: 1px solid #ddd;
  height: 400px;

  .vue__brand-list {
    height: 90%;
    overflow-y: scroll;
    padding: 10px;

    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  .vue__model-list {
    max-height: 90%;
    overflow-y: auto;
    padding: 10px;

    display: grid;
    grid-template-columns: 33% 33% 33%;
  }

  h3 {
    padding-top: 10px;
    margin-left: 20px;
    font-weight: 800;
    font-size: 1em;
  }

  .inactive {
    color: #aaa;
  }
}

header {
  background: #f0f0f0;
  padding: 0;
  margin: 0;
  height: 50px;
  padding: 8px 20px;

  h2 {
    font-weight: 800;
    font-size: 1.3em;
  }
}
</style>