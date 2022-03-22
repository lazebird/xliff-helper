<template>
  <div>
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-row>
        <a-col :span="12">
          <a-form-item label="JSON File">
            <a-upload-dragger accept=".txt, .json, text/plain" :customRequest="upload_json" :maxCount="1"> <UploadOutlined /><p>Click or drag file to this area to upload</p> </a-upload-dragger>
            <a-button @click="down_zip">Download Zip</a-button>
          </a-form-item>
          <a-form-item v-if="Object.keys(root).length" label="Mono File">
            <pre>{{ JSON.stringify(root, null, 2) }} </pre>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="JSON Directory">
            <a-upload-dragger :customRequest="upload_dir" :maxCount="1" directory> <UploadOutlined /><p>Click or drag file to this area to upload</p> </a-upload-dragger>
            <a-button @click="down_json">Download JSON</a-button>
          </a-form-item>
          <a-form-item v-if="Object.keys(files).length" label="Directory">
            <pre>{{ JSON.stringify(files, null, 2) }} </pre>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup>
  import { custom_upload, str2file, blob2file } from '@/api/strUtils';
  import { ref } from 'vue';
  import * as zip from '@zip.js/zip.js';
  import { UploadOutlined, CopyOutlined } from '@ant-design/icons-vue';

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

  const upload_json = async (info) => await custom_upload(info, (res) => do_file_combine({ path: info.file.name, data: JSON.parse(res) }, root.value));
  const down_zip = () => do_file_download();

  async function upload_dir(info) {
    await custom_upload(info, (res) => (files.value[info.file.webkitRelativePath] = JSON.parse(res)));
    for (const path in files.value) do_file_combine({ path, data: files.value[path] }, root.value);
    // console.log('[upload_dir] root ', root.value);
  }
  const down_json = () => Object.keys(root.value).length && str2file(JSON.stringify(root.value[Object.keys(root.value)[0]], null, indentSpace), Object.keys(root.value)[0] + jsonExt);
</script>
