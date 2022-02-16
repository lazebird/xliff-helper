<template>
  <a-form class="confbar" layout="inline" :model="conf">
    <a-form-item label="idName"> <a-input v-model:value="conf.idName" /> </a-form-item>
    <a-form-item label="unitName"> <a-input v-model:value="conf.unitName" /> </a-form-item>
    <a-form-item label="srcName"> <a-input v-model:value="conf.srcName" /> </a-form-item>
    <a-form-item label="tgtName"> <a-input v-model:value="conf.tgtName" /> </a-form-item>
    <a-form-item label="ignorePatterns">
      <a-tag v-for="t in ignPats" :key="t" closable @close="removeTag(t)">{{ t }}</a-tag>

      <a-input v-if="newtag.input" ref="inputRef" v-model:value="newtag.val" type="text" size="small" :style="{ width: '100px' }" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
      <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput"> + New Tag </a-tag>
    </a-form-item>
  </a-form>
</template>

<script setup>
  import { ref, nextTick } from 'vue';

  const props = defineProps({
    conf: { type: Object, required: true },
    ignPats: { type: Array, required: true },
  });
  const emits = defineEmits(['update:ignPats']);

  const newtag = ref({ input: false, val: '' });
  const inputRef = ref();

  function removeTag(t) {
    ignPats.value = ignPats.value.filter((e) => e !== t);
  }
  function handleInputConfirm() {
    if (newtag.value.val && props.ignPats.indexOf(newtag.value.val) === -1) emits('update:ignPats', [...props.ignPats, newtag.value.val]);
    newtag.value = { input: false, val: '' };
  }
  function showInput() {
    newtag.value.input = true;
    nextTick(() => inputRef.value.focus());
  }
</script>
<style scoped>
  .confbar * {
    margin: auto;
  }
</style>
