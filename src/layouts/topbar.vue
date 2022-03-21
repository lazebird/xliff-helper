<template>
  <div>
    <div class="nav">
      <label>Navigator:</label>
      <router-link v-for="r in routes" :to="r.path" class="route">{{ r.name }}</router-link>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { router } from '@/router/index';

  const routes = ref(router.getRoutes().filter((r) => r.path !== '/'));
  // console.log('routes ', JSON.stringify(routes.value));
</script>
<style scoped>
  .nav {
    background-color: blue;
    color: white;
    font-weight: bolder;
    font-size: large;
    margin-bottom: 10px;
  }
  .route {
    margin-left: 10px;
  }
</style>
