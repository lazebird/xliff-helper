<template>
  <div class="page">
    <configVue :conf="conf" />
    <br />
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="JSON File" :wrapperCol="{ span: 8 }">
        <a-upload-dragger accept=".txt, .json, text/plain" :customRequest="handleRequest" :maxCount="1"> <UploadOutlined /><p>Click or drag file to this area to upload</p> </a-upload-dragger>
      </a-form-item>
      <a-row>
        <a-col :span="12">
          <a-form-item label="Result">
            <a v-if="data.length" @click="copy(data)"><CopyOutlined /></a> <pre>{{ data }} </pre>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="postUris">
            <a v-if="postUris.length" @click="copy(JSON.stringify(postUris, null, 4))"><CopyOutlined /></a> <pre>{{ JSON.stringify(postUris, null, 4) }} </pre>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import configVue from './config.vue';
  import { UploadOutlined, CopyOutlined } from '@ant-design/icons-vue';
  import { blob2obj } from '@/api/strUtils';
  import { basename } from '@/api/path';

  const data = ref('');
  const paths = ref({});
  const postUris = ref([]);
  const conf = ref({ ign_deprecated: true, grp_name: 'x-apifox-folder' });

  function paths2uris(paths) {
    let uris = [];
    for (const k in paths) {
      if (conf.value.ign_deprecated && (!paths[k]['get'] || paths[k]['get'].deprecated) && (!paths[k]['post'] || paths[k]['post'].deprecated)) continue;
      uris.push({ name: basename(k), path: k, group: paths[k]['get']?.[conf.value.grp_name] ?? paths[k]['post']?.[conf.value.grp_name], post_flag: !!paths[k]['post'] });
    }
    return uris;
  }
  async function handleRequest(info) {
    await blob2obj(info.file, (e) => (paths.value = JSON.parse(e.target.result).paths ?? {}));
    const uris = paths2uris(paths.value).sort((a, b) => a.path.localeCompare(b.path));
    let grps = {};
    for (const u of uris) grps[u.group] = { ...grps[u.group], [u.name]: u.path };
    let code = '';
    for (const k in grps) code += 'export const ' + k.toUpperCase() + 'URI = ' + JSON.stringify(grps[k], null, 4) + ';\n\n';
    data.value = code;
    const postUrisgrps = uris.filter((u) => u.post_flag).map((u) => u.path);
    postUris.value = postUrisgrps.sort();
    info.onSuccess('success', info.file);
  }
  const copy = (s) => navigator.clipboard?.writeText(s);
</script>
