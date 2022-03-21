<template>
  <table>
    <tr v-for="(row, index) in data" :key="index">
      <td v-for="(d, index2) in row" :key="index2" :class="d.class">{{ d.content ?? d }}</td>
      <br />
    </tr>
  </table>
</template>
<script setup>
  defineProps({ data: { type: Array, required: true } });
</script>
<style scoped>
  .green {
    background-color: green;
  }
  .red {
    background-color: red;
  }
  td {
    border: 1px solid #0094ff;
    margin: 0px -1px -1px 0px;
    width: 80px;
    margin-right: 10px;
    color: white;
    text-align: left;
  }
</style>
