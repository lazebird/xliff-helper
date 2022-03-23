<template>
  <RouterView />
</template>
<script setup>
  import settingVue from '@/views/setting.vue'; // comment this line will cause ConfigProvider.config not work!

  document.title = __APP_INFO__.pkg?.name ?? 'Hello World!';
</script>
