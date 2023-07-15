<template>
  <div>
    <label style="margin-right: 40px">{{ data.name }}</label>
    <a-button v-for="opt in data.options" :key="opt.name" @click="onclick(opt)">{{ opt.name }}</a-button>
    <a-textarea class="content" v-model:value="data.content" placeholder="textarea with clear icon" allow-clear />
  </div>
</template>
<script setup>
  const props = defineProps({ data: { type: Object, required: true } });

  const onclick = (item) => (props.data.content = item.value.trim());
</script>
<style scoped>
  .content {
    height: 200px;
  }
</style>
