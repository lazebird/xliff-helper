<template>
  <label style="margin-right: 10px">Output</label>
  <a-button @click="copy(data.content)" type="text" :loading="loading">
    <template #icon><CopyOutlined /></template>
  </a-button>
  <div class="stat" :class="data.class"> {{ data.content }} </div>
</template>
<script setup>
  import { CopyOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  defineProps({ data: { type: Object, required: true } });
  const loading = ref(false);

  function copy(s) {
    loading.value = true;
    navigator.clipboard?.writeText(s);
    window.setTimeout(() => (loading.value = false), 500);
  }
</script>
<style scoped>
  .stat {
    text-align: left;
    word-break: break-all;
    white-space: pre-wrap;
  }
  .error {
    color: red;
  }
</style>
