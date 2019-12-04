<template>
  <div>
    <h2>Guide</h2>
    <section class="vue__brand-container">
      <header>
        <h3>Välj ditt märke TEST123</h3>
      </header>

      <ul>
        <li class="vue__brand-icon" v-for="brand in brands" v-bind:key="brand.BrandId">
          <!-- <p>{{brand.Logo}}</p> -->
          <img v-bind:src="'http://beta.configurator.engcon.com/' + brand.Logo.substr(2)" />
          <p class="vue__brand-name">{{brand.BrandName}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductGuide",
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
  // padding: 10px;
  border: 1px solid #ddd;

  ul {
    max-height: 350px;
    overflow-y: scroll;

    margin: 0;
    padding: 10px;

    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  li {
    list-style: none;
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

.vue__brand-icon {
  // display: inline-block;
  // width: calc(20% - 10px);
  // max-width: 150px;
  // margin-right: 5px;
  // margin-left: 5px;
  // margin-bottom: 20px;
  // padding: 10px 0 10px 0;
  margin: 10px;
  border: 1px solid #ddd;
  text-align: center;
  transition: border-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);

  p {
    font-size: 0.8em;
    padding-bottom: 15px;
  }

  img {
    width: 60%;
    height: auto;
  }

  &:hover {
    cursor: pointer;
    border-color: #222;
  }
}

.vue__brand-name {
  border-top: 2px dotted #ccc;
  padding-top: 15px;
  padding-bottom: 5px;
  margin: auto;
  width: 80%;
}
</style>