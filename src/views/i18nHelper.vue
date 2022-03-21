<template>
  <div class="page">
    <div>
      <label> JSON File </label> <input type="file" accept=".json, application/JSON" @change="upload_json" />
      <button @click="down_zip">Download Zip</button>
    </div>
    <br />
    <div>
      <label>JSON Directory </label> <input type="file" webkitdirectory @change="upload_dir" />
      <button @click="down_json">Download JSON</button>
    </div>

    <div v-if="Object.keys(files).length" class="detail">
      <h1>Directory</h1>
      <pre>{{ JSON.stringify(files, null, 2) }}</pre>
    </div>
    <br />
    <div v-if="Object.keys(root).length" class="detail">
      <h1>Mono File</h1>
      <pre>{{ JSON.stringify(root, null, 2) }}</pre>
    </div>
  </div>
</template>
<script setup>
  import { blob2obj, str2file, blob2file } from '@/api/strUtils';
  import { ref } from 'vue';
  import * as zip from '@zip.js/zip.js';

  const root = ref({});
  const files = ref({});
  const jsonExt = '.json';
  const zipExt = '.zip';
  const indentSpace = 4;

  function do_file_combine(file, parent) {
    if (file.path.slice(-jsonExt.length) !== jsonExt) return;
    const p = file.path.slice(0, -jsonExt.length);
    for (const d of p.split('/')) {
      if (!parent[d]) parent[d] = {};
      parent = parent[d];
    }
    Object.assign(parent, file.data);
  }

  function do_file_split(obj, path) {
    for (const k in obj) {
      if (typeof obj[k] === 'object') do_file_split(obj[k], path + '/' + k);
      else {
        if (!files.value[path]) files.value[path] = {};
        files.value[path][k] = obj[k];
      }
    }
  }
  async function do_file_download() {
    let name = Object.keys(root.value)[0];
    do_file_split(root.value[name], name);
    const blobWriter = new zip.BlobWriter('application/zip');
    const writer = new zip.ZipWriter(blobWriter);
    for (const k in files.value) await writer.add(k + jsonExt, new zip.TextReader(JSON.stringify(files.value[k], null, indentSpace)));
    await writer.close();
    const blob = blobWriter.getData();
    blob2file(blob, name + zipExt);
  }

  const upload_json = async (e) => await blob2obj(e.target.files[0], (e1) => do_file_combine({ path: e.target.files[0].name, data: JSON.parse(e1.target.result) }, root.value));
  const down_zip = () => do_file_download();

  async function upload_dir(e) {
    for (const f of e.target.files) await blob2obj(f, (e) => (files.value[f.webkitRelativePath] = JSON.parse(e.target.result)));
    for (const path in files.value) do_file_combine({ path, data: files.value[path] }, root.value);
    // console.log('[upload_dir] root ', root.value);
  }
  const down_json = () => Object.keys(root.value).length && str2file(JSON.stringify(root.value[Object.keys(root.value)[0]], null, indentSpace), Object.keys(root.value)[0] + jsonExt);
</script>
<style scoped>
  .page {
    text-align: center;
  }
  .detail {
    text-align: left;
    width: 45%;
    margin: 10px;
    float: left;
  }
</style>
