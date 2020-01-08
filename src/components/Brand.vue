<template>
  <div>
    <li v-if="this.selectedBrand.BrandId === this.brand.BrandId" class="brand-icon selected">
      <img v-bind:src="'http://beta.configurator.engcon.com/' + brand.Logo.substr(2)" />
    </li>

    <li
      v-else
      class="brand-icon"
      @click="$emit('select-brand', brand)"
      v-bind:class="{'d-none' : brand.Hide}"
    >
      <img v-bind:src="'http://beta.configurator.engcon.com/' + brand.Logo.substr(2)" />
    </li>
  </div>
</template>

<script>
export default {
  name: "Brand",
  props: {
    brand: {},
    selectedBrand: {}
  },
  data() {
    return {
      selected: false
    };
  },
  methods: {
    highlight() {
      if (this.selectedBrand.BrandId === this.brand.BrandId) {
        this.selected = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.brand-icon {
  margin: 10px;
  border: 1px solid $color-gray;
  text-align: center;
  transition: border-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
  list-style: none;

  p {
    font-size: 0.8em;
    padding-bottom: 15px;
  }

  img {
    width: 60%;
    height: auto;
    mix-blend-mode: multiply;
  }

  &:hover {
    cursor: pointer;
    border-color: $color-secondary;
  }
}

.vue__brand-name {
  padding-top: 15px;
  padding-bottom: 5px;
  margin: auto;
  width: 80%;
}

.selected {
  background-color: $color-primary;

  &:hover {
    cursor: initial;
    border-color: $color-primary;
  }

  img {
    mix-blend-mode: multiply;
    filter: invert(0%);
  }
}

</style>