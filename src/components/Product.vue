<template>
  <div class="product-container">
    <span class="product-thumbnail"></span>
    <h3>Produkt namn</h3>
    <p>Beskrivning</p>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object
  }
};
</script>

<style lang="scss" scoped>
.product-container {
  background: white;
  border: 1px solid #ddd;
  text-align: center;
  margin: 20px;
  transition: border-color 250ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
  border-radius: 2px;

  &:hover {
    cursor: pointer;
    border-color: #666;
  }

  h3 {
    font-weight: 800;
  }

  p {
    margin-bottom: 80px;
    margin-top: 10px;
    font-size: 0.9em;
  }
}

.product-thumbnail {
  background: #eee;
  width: 90%;
  height: 200px;
  display: block;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>