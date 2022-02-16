<template>
  <div class="example">
    <div class="btnbar">
      <input type="file" @change="upload_xliff" />
      <button @click="extract">Extract Souces</button>
      <input type="file" @change="upload_target" />
      <button @click="save">Save</button>
    </div>
    <div>
      <table v-if="map.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(e, index) in map" :key="index">
            <td>{{ e.id }}</td>
            <td>{{ e.srcText }}</td>
            <td>{{ e.tgtText }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  var xmlDoc;
  const map = ref([]);

  function XML2obj(e) {
    var text = e.target.result;
    var domParser = new DOMParser();
    xmlDoc = domParser.parseFromString(text, 'text/xml');
    var transUnits = xmlDoc.querySelectorAll('trans-unit');
    for (const u of transUnits) {
      const source = u.querySelector('source');
      const target = u.querySelector('target');
      map.value.push({ id: u.id, source, target, srcText: source.innerHTML, tgtText: target.innerHTML });
    }
    // console.log(map);
  }
  function Json2obj(e) {
    var text = e.target.result;
    var obj = JSON.parse(text);
    for (const m of map.value) m.target.innerHTML = obj[m.id] ?? m.tgtText;
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
    text-align: center;
    margin-right: 40px;
  }
</style>
