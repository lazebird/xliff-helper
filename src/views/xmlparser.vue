<template>
  <div class="example">
    <actionVue v-model:action="action" />
    <configVue v-model:conf="conf" v-model:ignPats="ignPats" />
    <br />

    <a-row>
      <a-col :span="8">
        <label>XLIFF/XML </label>
        <input type="file" @change="upload_xliff" accept=".xliff, .mxliff, text/xml" />
      </a-col>
      <a-col :span="8">
        <a-row class="btnrow"> <button @click="extract">Extract Souces</button> </a-row>
        <br />
        <a-row class="btnrow"> <button @click="save">Save</button> </a-row>
        <br />
        <a-row class="btnrow"> <button @click="do_test">Test</button> </a-row>
      </a-col>
      <a-col :span="8">
        <label>JSON </label>
        <input type="file" @change="upload_target" accept=".json, application/JSON" />
      </a-col>
    </a-row>
    <br />

    <tableVue v-model:data="filterData" />
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import actionVue from './action.vue';
  import configVue from './config.vue';
  import tableVue from './table.vue';
  import { str2file, xml2obj, blob2obj } from '@/api/strUtils';
  import { basename, extname } from '@/api/path';

  const action = ref({ searchVal: '', postFunc: '(s)=>s.replace(/id\\s*=\\s*\\"\\s*(\\d+)\\s*"/g, "id=\\"$1\\"")' });
  const conf = ref({ idName: 'id', unitName: 'trans-unit', srcName: 'source', tgtName: 'target' });
  const ignPats = ref(['SWITCH.*#']);

  const info = { suffix: '-res' };
  const map = ref([]);
  const filterData = computed(() => map.value.filter((m) => !action.value.searchVal || m.tgtText.indexOf(action.value.searchVal) !== -1 || m.srcText.indexOf(action.value.searchVal) !== -1));
  // watchEffect(() => (filterData.value = map.value.filter((m) => !action.value.searchVal || m.tgtText.indexOf(action.value.searchVal) !== -1 || m.srcText.indexOf(action.value.searchVal) !== -1)));

  function isIgnore(text) {
    for (const p of ignPats.value) {
      if (new RegExp(p).test(text)) return true;
    }
    return false;
  }
  function jsonProc(jsonText) {
    var obj = JSON.parse(jsonText);
    let postFunc = action.value.postFunc ? eval(action.value.postFunc) : (e) => e;
    for (const m of map.value) {
      try {
        if (obj[m.id]) obj[m.id] = postFunc(obj[m.id]);
        if (isIgnore(m.srcText)) m.target.innerHTML = m.srcText;
        else m.target.innerHTML = obj[m.id] ?? m.tgtText;
        m.newtgt = m.target.innerHTML;
        if (m.target.getAttribute('state') === 'needs-translation') m.target.setAttribute('state', 'translated');
        if (m.unit.getAttribute('m:confirmed') === '0') m.unit.setAttribute('m:confirmed', '1');
        // console.log('[jsonProc] attr names ', m.unit.getAttributeNames());
      } catch (e) {
        console.log(e, m, isIgnore(m.srcText), obj[m.id]);
      }
    }
    // console.log(obj);
  }
  const upload_xliff = (e) => {
    info.src = e.target.files[0].name;
    blob2obj(e.target.files[0], (e) => (map.value = xml2obj((info.xmlDoc = new DOMParser().parseFromString(e.target.result, 'text/xml')), conf.value)));
  };
  const upload_target = (e) => blob2obj(e.target.files[0], (e) => jsonProc(e.target.result));

  const extract = () => {
    const data = {};
    for (const m of map.value) data[m.id] = m.srcText;
    str2file(JSON.stringify(data), 'sources.json');
  };
  const save = () => str2file(new XMLSerializer().serializeToString(info.xmlDoc), basename(info.src, extname(info.src)) + info.suffix + extname(info.src));

  function do_test() {
    console.log('info ', info);
    console.log('ignPats ', ignPats.value);
    let postFunc = action.value.postFunc ? eval(action.value.postFunc) : (e) => e;
    console.log(typeof postFunc, postFunc, postFunc('test: id = " 3" abc'));
  }
</script>
<style scoped>
  .btnrow button {
    margin: auto;
    width: 120px;
  }
</style>
