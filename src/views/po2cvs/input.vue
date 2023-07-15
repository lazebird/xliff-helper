<template>
  <div>
    <label>{{ data.name }}</label>
    <a-textarea class="content" v-model:value="data.content" placeholder="textarea with clear icon" allow-clear />
  </div>
</template>
<script setup>
  defineProps({ data: { type: Object, required: true } });
</script>
<style scoped>
  .content {
    height: 200px;
  }
</style>
