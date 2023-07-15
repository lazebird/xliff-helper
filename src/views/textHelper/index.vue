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
  const options = [
    { name: 'prettier', value: `(n) => { const o = JSON.parse(n); return JSON.stringify(o, null, 4); }` },
    {
      name: 'po2cvs',
      value: `
        (str) => {
          const lines = str.replace('\\r', '').split('\\n').filter(l=>l.length);
          if (lines.length & 1) return "length error: "+ lines.length;
          const chunks = [];
          for (var i = 0, len = lines.length; i < len; i += 2) chunks.push(lines.slice(i, i+2));
          const obj = {};
          for (var [id, str] of chunks) obj[id.replace('msgid', '').trim()] = str.replace('msgstr', '').trim();
          var result = '';
          for (const k of Object.keys(obj).sort()) result += k + ',' + obj[k] + '\\r\\n';
          return result;
        }
      `,
    },
    {
      name: 'cvs2po',
      value: `
        (str) => {
          const lines = str.replace('\\r', '').split('\\n').filter(l=>l.length);
          const chunks = lines.map(l=>l.split(','));
          const obj = {};
          for (var [id, str] of chunks) obj[id.trim()] = str.trim();
          var result = '';
          for (const k of Object.keys(obj).sort()) result += 'msgid ' + k + '\\r\\n' + 'msgstr ' + obj[k] + '\\r\\n\\r\\n';
          return result;
        }
        `,
    },
  ];
  const code = ref({
    name: 'Code',
    options,
    content: options[0].value,
  });

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
