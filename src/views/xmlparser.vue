<template>
  <div class="example">
    <a-form layout="inline" :model="conf">
      <a-form-item label="unitName"> <a-input v-model:value="conf.unitName" /> </a-form-item>
      <a-form-item label="srcName"> <a-input v-model:value="conf.srcName" /> </a-form-item>
      <a-form-item label="tgtName"> <a-input v-model:value="conf.tgtName" /> </a-form-item>
    </a-form>
    <br />

    <div class="btnbar">
      <input type="file" @change="upload_xliff" />
      <button @click="extract">Extract Souces</button>
      <input type="file" @change="upload_target" />
      <button @click="save">Save</button>
    </div>
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
  const conf = ref({ unitName: 'trans-unit', srcName: 'source', tgtName: 'target' });
  const map = ref([]);

  function XML2obj(e) {
    var text = e.target.result;
    var domParser = new DOMParser();
    xmlDoc = domParser.parseFromString(text, 'text/xml');
    var transUnits = xmlDoc.querySelectorAll(conf.value.unitName);
    for (const u of transUnits) {
      const source = u.querySelector(conf.value.srcName);
      const target = u.querySelector(conf.value.tgtName);
      map.value.push({ id: u.id, source, target, srcText: source.innerHTML, tgtText: target.innerHTML });
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
    console.log(JSON.stringify(data));
  }
  function upload_target(e) {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0], 'UTF-8');
    reader.onload = Json2obj;
  }
  function save() {
    console.log(xmlDoc);
  }
</script>
<style scoped>
  .btnbar * {
    margin-right: 40px;
  }
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
