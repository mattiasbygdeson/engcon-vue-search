<template>
  <div class="brand-search-container">
    <header class="brand-search-container-header">
      <h2>Guida mig till rätt produkter</h2>
    </header>

    <main>
      <section class="brand-search-column">
        <header>
          <h3>Välj ditt märke</h3>

          <input
            class="input-brand-filter"
            type="text"
            placeholder="Sök ..."
            v-on:keyup="filterBrands"
            v-model="filter"
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
        <h3 v-if="selectedBrand.length !== 0">Välj din {{selectedBrand.BrandName}}</h3>

        <p v-else class="notice">Välj ett märke för att se tillgängliga modeller</p>

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
    lang: String
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
  methods: {
    selectBrand(brand) {
      /**
       * Activated when user clicks on brand icon
       * Will render a list of models
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
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
              "Access-Control-Allow-Headers": "Content-Type,Accept"
            }
          }
        )
        .then(res => (this.models = res.data.Excavator[0].Model))
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    },
    filterBrands() {
      /**
       * Activated at keyup in input field
       * Will remove any brands from component that do not match search input
       *
       */

      var getBrands = localStorage.getItem("engcon-brands");
      this.brands = JSON.parse(getBrands);

      this.filteredBrands = [];

      var filter = this.filter.toLowerCase();
      var brand;
      var result;

      if (filter !== "") {
        for (var i = 0; this.brands.length > i; i++) {
          brand = this.brands[i].BrandName.toLowerCase();
          result = brand.match(filter);

          if (result && filter.charAt(0) === brand.charAt(0)) {
            this.filteredBrands.push(this.brands[i]);
          }
        }

        this.brands = this.filteredBrands;
      }
    },
    selectModel(model) {
      this.selectedModel = [];
      this.selectedModel = model;
    }
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
        .get(
          "http://beta.configurator.engcon.com/Configurator.ashx?country=se",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
              "Access-Control-Allow-Headers": "Content-Type,Accept"
            }
          }
        )
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
    max-height: 90%;
    overflow-y: auto;
    padding: 10px;

    display: grid;
    grid-template-columns: 50% 50%;
  }

  h3 {
    padding-top: 10px;
    margin-left: 20px;
    font-weight: 800;
    font-size: 1em;
    display: inline-block;
  }
}

.notice {
  color: #aaa;
  width: 50%;
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

  h2 {
    font-weight: 800;
    font-size: 1.3em;
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