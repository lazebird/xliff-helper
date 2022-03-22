<template>
  <div>
    <div v-for="c in colors">
      <label>{{ c.name }}</label> <input :style="{ background: c.value }" type="color" v-model="c.value" @change="handleClick(c)" />
    </div>
    <br />

    <div v-for="s in sizes">
      <label>{{ s.name }}</label> <a-input-number v-model:value="s.value" @change="handleClick(s, 'px')" />
    </div>
  </div>
  <br />

  <a-button type="primary">Primary Button</a-button>
  <a-button>Default Button</a-button>
  <a-button type="dashed">Dashed Button</a-button>
  <a-button type="text">Text Button</a-button>
  <a-button type="link">Link Button</a-button>
  <button class="test">Primary TEST</button>
</template>
<script setup>
  import { ref } from 'vue';

  const colors = ref([
    { name: '@primary-color', value: '#1890ff' },
    { name: '@link-color', value: '#1890ff' },
    { name: '@success-color', value: '#52c41a' },
    { name: '@warning-color', value: '#faad14' },
    { name: '@error-color', value: '#f5222d' },
    // { name: '@heading-color', value: 'rgba(0, 0, 0, 0.85)' },
    // { name: '@text-color', value: 'rgba(0, 0, 0, 0.65)' },
    // { name: '@text-color-secondary', value: 'rgba(0, 0, 0, 0.45)' },
    // { name: '@disabled-color', value: 'rgba(0, 0, 0, 0.25)' },
    { name: '@border-color-base', value: '#d9d9d9' },
    // { name: '@box-shadow-base', value: '0 2px 8px rgba(0, 0, 0, 0.15)' },
  ]);
  const sizes = ref([
    { name: '@font-size-base', value: 14 },
    { name: '@border-radius-base', value: 4 },
  ]);

  function handleClick(c, unit = '') {
    const obj = { [c.name]: c.value + unit };
    console.log(JSON.stringify(obj));
    window.less.modifyVars(obj).catch(() => console.error(`Failed to update theme`));
  }
</script>
<style scoped lang="less">
  @import 'ant-design-vue/lib/style/themes/default.less';
  label {
    width: 150px;
    display: inline-block;
    text-align: right;
  }
  .test {
    background-color: @primary-color;
    font-size: @font-size-base;
  }
</style>
