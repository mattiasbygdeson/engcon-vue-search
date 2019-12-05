<template>
  <li class="vue__brand-icon">
    <img v-bind:src="'http://beta.configurator.engcon.com/' + brand.Logo.substr(2)" />
    <p class="vue__brand-name">{{brand.BrandName}}</p>
  </li>
</template>

<script>
export default {
  name: "Brand",
  props: ["brand"]
}
</script>

<style lang="scss" scoped>
.vue__brand-icon {
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

.vue__brand-container {
  li {
    list-style: none;
  }
}

</style>