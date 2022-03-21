<template>
  <div>
    <label>Statistics Formatter</label> <a-input style="width: 80%" v-model:value="conf.formatter" allow-clear />
    <a-textarea class="content" v-model:value="content" placeholder="textarea with clear icon" allow-clear />
  </div>
</template>
<script setup>
  import { ref, watch } from 'vue';

  defineProps({ data: { type: Object, required: true } });
  const emits = defineEmits(['update:data']);

  const content = ref('');
  watch(content, () => {
    let names = content.value.split('\n');
    let parser = conf.value.formatter ? eval(conf.value.formatter) : name_formatter;
    for (let i in names) names[i] = { org: names[i], fmt: parser(names[i]) };
    // names.sort(name_cmp);
    // names = [...new Set(names)]; // remove duplicates
    emits('update:data', { names });
    // console.log('names ', names);
  });

  const conf = ref({ formatter: "(n)=>n.replace(/(\\d+\\.)/, '').replace(/([^\\d]+)/g, '?').replace(/(^\\?)/, '').replace(/^7([12])\\?/, '7$1#').replace(/\\?.*/, '');" });
  function name_formatter(n) {
    return n
      .replace(/(\d+\.)/, '')
      .replace(/([^\d]+)/g, '?')
      .replace(/(^\?)/, '')
      .replace(/^7([12])\?/, '7$1#')
      .replace(/\?.*/, '');
  }
  //   function name_cmp(a, b) {
  //     var aa = a.split('#');
  //     var bb = b.split('#');
  //     return aa[0] !== bb[0] ? aa[0] - bb[0] : aa[1] - bb[1];
  //   }
</script>
<style scoped>
  .content {
    height: 200px;
  }
</style>
