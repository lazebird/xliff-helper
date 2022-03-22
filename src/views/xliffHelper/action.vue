<template>
  <a-form class="actionbar" layout="inline" :model="action">
    <a-form-item label="PostFunc"> <a-input v-model:value="action.postFunc" allow-clear /> </a-form-item>
    <a-form-item label="Filter"> <a-input v-model:value="action.searchVal" allow-clear /> </a-form-item>
    <a-button @click="action.test()">Test</a-button>
  </a-form>
</template>

<script setup>
  defineProps({ action: { type: Object, required: true } });
</script>
<style scoped>
  .actionbar * {
    margin: auto;
  }
</style>
