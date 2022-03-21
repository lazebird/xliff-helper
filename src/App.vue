<template>
  <RouterView />
</template>
<script setup>
  const { pkg } = __APP_INFO__;
  document.title = pkg.name ?? 'Hello World!';
</script>
