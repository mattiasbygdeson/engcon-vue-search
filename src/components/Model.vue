<template>
  <div class="model-wrapper">
    <a v-if="this.selectedModel.ModelId === this.model.ModelId" href="#summary-bar" v-smooth-scroll>
      <li class="model-name selected">{{model.ModelName}}</li>
    </a>

    <a v-else href="#summary-bar" v-smooth-scroll>
      <li @click="$emit('select-model', model)" class="model-name">{{model.ModelName}}</li>
    </a>
  </div>
</template>

<script>
export default {
  name: "Model",
  props: {
    model: Object,
    selectedModel: {}
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.model-wrapper {
  a {
    text-decoration: none;
    color: $color-secondary;
  }
}

.model-name {
  padding-top: 16px;
  font-size: 0.8em;
  list-style: none;
  margin: 10px;
  height: 50px;
  border: 1px solid $color-gray;
  text-align: center;
  transition: border-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);

  &:hover {
    cursor: pointer;
    border-color: $color-secondary;
  }
}

.selected {
  background-color: $color-primary;

  &:hover {
    cursor: initial;
    border-color: $color-primary;
  }

  img {
    mix-blend-mode: multiply;
  }
}
</style>