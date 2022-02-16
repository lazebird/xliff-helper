<template>
  <div class="example">
    <a-form class="actionbar" layout="inline" :model="action">
      <a-form-item label="Home"> <a href="https://github.com/lazebird/xliff-helper" target="_blank">@lazebird/xliff-helper</a> </a-form-item>
      <a-form-item label="Filter"> <a-input v-model:value="action.searchVal" allow-clear /> </a-form-item>
    </a-form>

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
    <br />

    <a-row>
      <a-col :span="8">
        <label>XLIFF/XML File </label>
        <input type="file" @change="upload_xliff" accept=".xliff, text/xml" />
      </a-col>
      <a-col :span="8">
        <a-row class="btnrow"> <button @click="extract">Extract Souces</button> </a-row>
        <br />
        <a-row class="btnrow"> <button @click="save">Save</button> </a-row>
      </a-col>
      <a-col :span="8">
        <label>JSON File </label>
        <input type="file" @change="upload_target" accept=".json, application/JSON" />
      </a-col>
    </a-row>
    <br />

    <a-table v-if="filterData.length" :dataSource="filterData" :columns="columns" :rowKey="(record, index) => index" class="ant-table-striped" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" />
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Source', dataIndex: 'srcText' },
  { title: 'Target', dataIndex: 'tgtText' },
  { title: 'New', dataIndex: 'newtgt' },
];

var xmlDoc;
const action = ref({ searchVal: '' });
const conf = ref({ idName: 'id', unitName: 'trans-unit', srcName: 'source', tgtName: 'target' });
const map = ref([]);
const ignPats = ref(['SWITCH.*#']);
const newtag = ref({ input: false, val: '' });
const inputRef = ref();
const filterData = computed(() => map.value.filter((m) => !action.value.searchVal || m.tgtText.indexOf(action.value.searchVal) !== -1 || m.srcText.indexOf(action.value.searchVal) !== -1));
// watchEffect(() => {
//   filterData.value = map.value.filter((m) => !action.value.searchVal || m.tgtText.indexOf(action.value.searchVal) !== -1 || m.srcText.indexOf(action.value.searchVal) !== -1);
// });

function str2file(s, filename) {
  var e = document.createElement('a');
  e.setAttribute('download', filename);
  e.style.display = 'none';
  var blob = new Blob([s]);
  e.href = URL.createObjectURL(blob);
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
}
function removeTag(t) {
  ignPats.value = ignPats.value.filter((e) => e !== t);
}
function handleInputConfirm() {
  if (newtag.value.val && ignPats.value.indexOf(newtag.value.val) === -1) ignPats.value = [...ignPats.value, newtag.value.val];
  newtag.value = { input: false, val: '' };
}
function showInput() {
  newtag.value.input = true;
  nextTick(() => {
    inputRef.value.focus();
  });
}
function isIgnore(text) {
  for (const p of ignPats.value) {
    if (new RegExp(p).test(text)) return true;
  }
  return false;
}
function XML2obj(e) {
  var text = e.target.result;
  var domParser = new DOMParser();
  xmlDoc = domParser.parseFromString(text, 'text/xml');
  var transUnits = xmlDoc.querySelectorAll(conf.value.unitName);
  for (const u of transUnits) {
    const source = u.querySelector(conf.value.srcName);
    const target = u.querySelector(conf.value.tgtName);
    map.value.push({ id: u[conf.value.idName], source, target, srcText: source.innerHTML, tgtText: target.innerHTML });
  }
  // console.log(map);
}
function Json2obj(e) {
  var text = e.target.result;
  var obj = JSON.parse(text);
  for (const m of map.value) {
    try {
      if (isIgnore(m.srcText)) m.target.innerHTML = m.srcText;
      else m.target.innerHTML = obj[m.id] ?? m.tgtText;
      m.newtgt = m.target.innerHTML;
    } catch (e) {
      console.log(e);
      console.log(m);
      console.log(m.srcText);
      console.log(isIgnore(m.srcText));
      console.log(obj[m.id]);
    }
  }
  // console.log(obj);
}
function upload_xliff(e) {
  // console.log('[upload]  file ', e.target.files[0]);
  let reader = new FileReader();
  reader.readAsText(e.target.files[0], 'UTF-8');
  reader.onload = XML2obj;
}
function extract() {
  const data = {};
  for (const m of map.value) data[m.id] = m.srcText;
  str2file(JSON.stringify(data), 'sources.json');
  // console.log(JSON.stringify(data));
}
function upload_target(e) {
  let reader = new FileReader();
  reader.readAsText(e.target.files[0], 'UTF-8');
  reader.onload = Json2obj;
}
function save() {
  str2file(new XMLSerializer().serializeToString(xmlDoc), 'result.xliff');
  // console.log(xmlDoc);
}
</script>
<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
.actionbar *,
.confbar * {
  margin: auto;
}
.btnrow button {
  margin: auto;
  width: 120px;
}
</style>
