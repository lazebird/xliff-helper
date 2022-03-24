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
            <a v-if="data.length" @click="copy(data)"><CopyOutlined /></a> {{ 'paths ' + Object.keys(g_paths).length + ', uris ' + g_uris.length + ', grps ' + Object.keys(g_grps).length }} <pre>{{ data }} </pre>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="postUris">
            <a v-if="postUris.length" @click="copy(postUris)"><CopyOutlined /></a> {{ 'postUris ' + g_uris.filter((u) => u.post_flag).length }}<pre>{{ postUris }} </pre>
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
  import { custom_upload } from '@/api/strUtils';
  import { basename } from '@/api/path';

  const data = ref('');
  const postUris = ref('');
  const def_grp2code = (k, v) => 'export const ' + k.toUpperCase() + 'URI = ' + JSON.stringify(v, null, 4) + ';\n\n';
  const conf = ref({ ign_deprecated: true, grp_name: 'x-apifox-folder', grp2code: def_grp2code.toString() });

  let g_paths = ref({});
  let g_uris = ref([]);
  let g_grps = ref({});

  function paths2uris(paths) {
    let uris = [];
    for (const k in paths) {
      if (conf.value.ign_deprecated && (!paths[k]['get'] || paths[k]['get'].deprecated) && (!paths[k]['post'] || paths[k]['post'].deprecated)) continue;
      uris.push({ name: basename(k), path: k, group: paths[k]['get']?.[conf.value.grp_name] ?? paths[k]['post']?.[conf.value.grp_name], post_flag: !!paths[k]['post'] });
    }
    return uris;
  }

  async function handleRequest(info) {
    let paths = {};
    await custom_upload(info, (res) => (paths = JSON.parse(res).paths ?? {}));
    const uris = paths2uris(paths).sort((a, b) => a.path.localeCompare(b.path));
    let grps = {};
    for (const u of uris) grps[u.group] = { ...grps[u.group], [u.name]: u.path };
    let code = '';
    let grp2code = conf.value.grp2code ? eval(conf.value.grp2code) : def_grp2code;
    for (const k in grps) code += grp2code(k, grps[k]);
    data.value = code;
    const postUrisgrps = uris.filter((u) => u.post_flag).map((u) => u.group.toUpperCase() + 'URI.' + u.name);
    code = '';
    for (const u of postUrisgrps.sort()) code += u + ',\n';
    postUris.value = code;
    g_paths.value = paths;
    g_uris.value = uris;
    g_grps.value = grps;
  }
  const copy = (s) => navigator.clipboard?.writeText(s);
</script>
