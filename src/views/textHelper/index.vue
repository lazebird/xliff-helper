<template>
  <div style="margin: 20px">
    <inputVue v-model:data="input" />
    <br />
    <codeVue v-model:data="code" />
    <br />
    <outputVue :data="output" />
  </div>
</template>
<script setup>
  import inputVue from './input.vue';
  import codeVue from './code.vue';
  import outputVue from './output.vue';
  import { computed, ref } from 'vue';

  const input = ref({ name: 'Input', content: '' });
  const code = ref({ name: 'Code', content: '(n) => { const o = JSON.parse(n); return JSON.stringify(o, null, 4); }' });

  const output = computed(() => {
    try {
      const parser = eval(code.value.content);
      // console.log('input %s, code %s, parser %o', input.value.content, code.value.content, parser);
      return typeof parser === 'function' ? { content: parser(input.value.content) } : { content: 'code is not a valid function!', class: 'error' };
    } catch (error) {
      // console.log('input %s, code %s, error %o', input.value.content, code.value.content, error);
      return { content: error.toString(), class: 'error' };
    }
  });
</script>
