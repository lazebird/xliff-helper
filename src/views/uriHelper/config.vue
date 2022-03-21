<template>
  <a-form class="confbar" layout="inline" :model="conf">
    <a-form-item label="Group Name"><a-input v-model:value="conf.grp_name" allowClear /> </a-form-item>
    <a-form-item label="Ignore Deprecated"><a-switch v-model:checked="conf.ign_deprecated" /> </a-form-item>
  </a-form>
</template>

<script setup>
  import { ref, nextTick } from 'vue';

  const props = defineProps({
    conf: { type: Object, required: true },
  });
</script>
<style scoped>
  .confbar * {
    margin: auto;
  }
</style>
