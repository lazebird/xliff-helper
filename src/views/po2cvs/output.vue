<template>
  <label @click="copy(data.content)">Output <CopyOutlined /></label>
  <div class="stat" :class="data.class"> {{ data.content }} </div>
</template>
<script setup>
  import { CopyOutlined } from '@ant-design/icons-vue';

  defineProps({ data: { type: Object, required: true } });

  const copy = (s) => navigator.clipboard?.writeText(s);
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
