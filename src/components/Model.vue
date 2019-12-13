<template>
  <div>
    <a v-if="this.selectedModel.ModelId === this.model.ModelId" href="#summary-bar" v-smooth-scroll>
      <li class="vue__model-name selected">{{model.ModelName}}</li>
    </a>

    <a v-else href="#summary-bar" v-smooth-scroll>
      <li @click="$emit('select-model', model)" class="vue__model-name">{{model.ModelName}}</li>
    </a>
  </div>
</template>

<script>
export default {
  name: "Model",
  props: {
    model: Object,
    selectedModel: Array
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}

.vue__model-name {
  padding-top: 16px;
  font-size: 0.8em;

  margin: 10px;
  height: 50px;
  border: 1px solid #ddd;
  text-align: center;
  transition: border-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);

  &:hover {
    cursor: pointer;
    border-color: #222;
  }
}

.selected {
  background-color: #ffd300;

  &:hover {
    cursor: initial;
    border-color: #ffd300;
  }

  img {
    mix-blend-mode: multiply;
  }
}
</style>