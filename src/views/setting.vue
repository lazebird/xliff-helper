<template>
  <div>
    <div v-for="k in Object.keys(colors)">
      <label>{{ k }}</label> <input :style="{ background: colors[k] }" type="color" v-model="colors[k]" @input="handleClick(k)" />
    </div>
    <br />

    <div v-for="k in Object.keys(sizes)">
      <label>{{ k }}</label> <a-input-number v-model:value="sizes[k]" @change="handleClick(k, 'px')" />
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
  import { ConfigProvider } from 'ant-design-vue';

  const colors = ref({
    primaryColor: '#1890ff',
    linkColor: '#1890ff',
    infoColor: '#1890ff',
    successColor: '#52c41a',
    warningColor: '#faad14',
    errorColor: '#f5222d',
    //  headingColor: 'rgba(0, 0, 0, 0.85)' ,
    //  textColor: 'rgba(0, 0, 0, 0.65)' ,
    //  name: 'textColor-secondary', value: 'rgba(0, 0, 0, 0.45)' ,
    //  disabledColor: 'rgba(0, 0, 0, 0.25)' ,
    borderColor: '#d9d9d9',
    //  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' ,
  });
  const sizes = ref({ fontSize: 14, borderRadius: 4 });

  function handleClick() {
    const unit_sizes = { ...sizes.value };
    for (const k in unit_sizes) unit_sizes[k] = unit_sizes[k] + 'px';
    const obj = { ...colors.value, ...unit_sizes };
    // console.log(JSON.stringify(obj));
    ConfigProvider.config({ theme: obj });
  }
</script>
<style scoped>
  label {
    width: 150px;
    display: inline-block;
    text-align: right;
  }
</style>
