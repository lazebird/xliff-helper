<template>
  <a-row>
    <a-col :span="12"> <layoutVue v-model:data="layout" /> </a-col>
    <a-col :span="12"> <countVue v-model:data="info" /> </a-col>
  </a-row>
  <br />
  <br />
  <tableVue :data="data" />
  <br />
  <statVue :data="stat" />
</template>
<script setup>
  import tableVue from '@/components/table.vue';
  import layoutVue from './layout.vue';
  import countVue from './count.vue';
  import statVue from './stat.vue';
  import { computed, ref } from 'vue';
  import { arrayDiff, arrayFlatten } from '@/api/array';

  const info = ref({ names: [] });
  const layout = ref([]);
  const data = computed(() => {
    const tmpData = JSON.parse(JSON.stringify(layout.value));
    const names = info.value.names.map((e) => e.fmt);
    for (let row of tmpData) for (let i in row) row[i] = { class: names.includes(row[i]) ? 'green' : 'red', content: row[i] };
    // console.log('data ', tmpData);
    return tmpData;
  });
  const stat = computed(() => {
    let flatLayout = [];
    arrayFlatten(layout.value, flatLayout);
    const names = info.value.names.map((e) => e.fmt);
    const uninames = [...new Set(names.filter((e) => e))];
    const diffarr = arrayDiff(flatLayout, names);
    console.log('diffarr ', diffarr);
    const duparr = diffarr.filter((e) => flatLayout.includes(e));
    const orgduparr = info.value.names.filter((e) => duparr.includes(e.fmt)).map((e) => e.org);
    const orgnames = JSON.parse(JSON.stringify(info.value.names));
    const unknownnames = diffarr.filter((e) => !duparr.includes(e));
    var unknownarr = [];
    for (const n of unknownnames) {
      var i = orgnames.findIndex((e) => e.fmt === n);
      if (i < 0) continue;
      unknownarr.push(orgnames[i].org);
      orgnames.splice(i, 1);
    }
    // console.log('diffarr ', JSON.stringify(diffarr));
    return { total: flatLayout.length, count: uninames.length, unknown: JSON.stringify(unknownarr), dup: JSON.stringify(orgduparr) };
  });
</script>
