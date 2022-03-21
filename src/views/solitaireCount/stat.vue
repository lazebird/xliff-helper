<template>
  <div class="stat">
    <div> Solitaire count: {{ data.count }}/{{ data.total }}</div>
    <div> Unknown: {{ data.unknown }} </div>
    <div> Duplicate: {{ data.dup }} </div>
  </div>
</template>
<script setup>
  defineProps({ data: { type: Object, required: true } });
</script>
<style scoped>
  .stat {
    text-align: left;
    word-break: break-all;
  }
</style>
