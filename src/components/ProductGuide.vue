<template>
  <div>
    <h2>Guide</h2>
    <section class="vue__brand-container">
      <header>
        <h3>Välj ditt märke</h3>
      </header>

      <ul>
        <Brand v-for="brand in brands" v-bind:key="brand.BrandId" v-bind:brand="brand" />
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Brand from "./Brand";

export default {
  name: "ProductGuide",
  components: {
    Brand
  },
  data() {
    return {
      brands: []
    };
  },
  methods: {
    selectBrand() {
      // eslint-disable-next-line no-console
      console.log("Test");
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
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 50px;
  margin-bottom: 20px;
  visibility: hidden;
}

.vue__brand-container {
  margin: auto;
  background: white;
  border-radius: 5px;
  border: 1px solid #ddd;

  ul {
    max-height: 350px;
    overflow-y: scroll;

    margin: 0;
    padding: 10px;

    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  h3 {
    padding-top: 10px;
    margin-left: 20px;
    font-weight: 800;
  }

  header {
    background: #F0F0F0;
    padding: 0;
    margin: 0;
    height: 50px;
  }
}

</style>