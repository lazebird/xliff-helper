<template>
  <div class="example">
    <a-form class="confbar" layout="inline" :model="conf">
      <a-form-item label="idName"> <a-input v-model:value="conf.idName" /> </a-form-item>
      <a-form-item label="unitName"> <a-input v-model:value="conf.unitName" /> </a-form-item>
      <a-form-item label="srcName"> <a-input v-model:value="conf.srcName" /> </a-form-item>
      <a-form-item label="tgtName"> <a-input v-model:value="conf.tgtName" /> </a-form-item>
      <a-form-item label="Home"> <a href="https://github.com/lazebird/xliff-helper" target="_blank">Github</a> </a-form-item>
    </a-form>
    <br />

    <a-row>
      <a-col :span="8">
        <input type="file" @change="upload_xliff" accept=".xliff, text/xml" />
      </a-col>
      <a-col :span="8">
        <a-row class="btnrow"> <button @click="extract">Extract Souces</button> </a-row>
        <br />
        <a-row class="btnrow"> <button @click="save">Save</button> </a-row>
      </a-col>
      <a-col :span="8">
        <input type="file" @change="upload_target" accept=".json, application/JSON" />
      </a-col>
    </a-row>
    <br />

    <a-table v-if="map.length" :dataSource="map" :columns="columns" :rowKey="(record, index) => index" class="ant-table-striped" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Source', dataIndex: 'srcText' },
    { title: 'Target', dataIndex: 'tgtText' },
    { title: 'New', dataIndex: 'newtgt' },
  ];

  var xmlDoc;
  const conf = ref({ idName: 'id', unitName: 'trans-unit', srcName: 'source', tgtName: 'target' });
  const map = ref([]);

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
      m.target.innerHTML = obj[m.id] ?? m.tgtText;
      m.newtgt = obj[m.id] ?? m.newtgt;
    }
    console.log(obj);
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
    console.log(JSON.stringify(data));
  }
  function upload_target(e) {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0], 'UTF-8');
    reader.onload = Json2obj;
  }
  function save() {
    str2file(new XMLSerializer().serializeToString(xmlDoc), 'result.xliff');
    console.log(xmlDoc);
  }
</script>
<style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
  .confbar * {
    margin: auto;
  }
  .btnrow button {
    margin: auto;
    width: 120px;
  }
</style>
