<template>
  <div>
    <h1>Information</h1> <ktableVue :data="info" />
    <br />
    <h1>Prod Deps</h1><ktableVue :data="prodDeps" />
    <br />
    <h1>Dev Deps</h1><ktableVue :data="devDeps" />
  </div>
</template>
<script setup>
  import ktableVue from '@/components/ktable.vue';

  const { pkg, lastBuildTime } = __APP_INFO__;
  const { name, version, homepage, license, dependencies, devDependencies } = pkg;
  document.title = name;
  const info = [
    { name: 'Name', value: name, link: homepage },
    { name: 'License', value: license },
    { name: 'Version', value: version },
    { name: 'Last Build', value: lastBuildTime },
  ];
  const prodDeps = Object.keys(dependencies).map((k) => ({ name: k, value: dependencies[k] }));
  const devDeps = Object.keys(devDependencies).map((k) => ({ name: k, value: devDependencies[k] }));
</script>
<style scoped>
  label {
    margin-left: 20px;
  }
</style>
