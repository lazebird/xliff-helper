<template>
  <div class="table">
    <div v-for="d in data" class="row">
      <template class="cell name">{{ d.name }}</template>
      <template v-if="d.link">
        <a class="cell value" :href="d.link" target="_blank">{{ d.value }}</a>
      </template>
      <template v-else>
        <template class="cell value">{{ d.value }}</template>
      </template>
    </div>
  </div>
</template>
<script setup>
  defineProps({ data: { type: Array, required: true } });
</script>
<style scoped>
  .table {
    margin-left: 10px;
  }
  .table,
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .cell {
    border: 1px solid;
    display: inline-flex;
    width: 300px;
    margin: 0px -1px -1px 0px;
    padding: 10px;
  }
  .name {
    font-weight: bolder;
    background-color: lightgray;
  }
</style>
