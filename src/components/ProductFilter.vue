<template>
  <div class="product-filter-container">
    <header class="product-filter-container-header">
      <h2>... eller filtrera på din maskinvikt</h2>
    </header>

    <main>
      <section>
        <label for="machine-weight">Maskinvikt: {{machineWeightValue}} ton</label>
        <input
          class="machine-weight-range-input"
          type="range"
          id="start"
          name="machineWeightValue"
          min="0"
          max="40"
          value="0"
          v-model="machineWeightValue"
        />
      </section>

      <section></section>
    </main>
  </div>
</template>

<script>
export default {
  name: "ProductFilter",
  data() {
    return {
      machineWeightValue: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.product-filter-container {
  margin: auto;
  margin-top: 20px;
  float: right;

  main {
    display: grid;
    grid-template-columns: 70% auto;

    border: 1px solid #ddd;
    height: 110px;
    max-width: 900px;
    background: white;
    opacity: 0.9;
  }

  section {
    // border: 1px solid red;
    padding: 20px;
  }
}

.product-filter-container-header {
  background: #ffd300;
  width: 900px;
  padding: 0;
  margin: 0;
  height: 50px;
  padding: 11px 20px;

  h2 {
    font-weight: 800;
    font-size: 1.1em;
  }
}

.machine-weight-range-input {
  width: 80%;
  height: 20px;
  display: block;
  margin-top: 15px;
}
</style>