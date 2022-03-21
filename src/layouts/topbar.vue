<template>
  <div>
    <div class="nav">
      <label>Navigator:</label>
      <router-link v-for="r in routes" :to="r.path" class="item" :class="r.path === currRoute.path ? 'active' : ''">{{ r.name }}</router-link>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { router } from '@/router/index';
  import { useRoute } from 'vue-router';

  const routes = ref(router.getRoutes().filter((r) => r.path !== '/'));
  const currRoute = useRoute();
  // console.log('routes ', JSON.stringify(routes.value));
  // console.log('route ', JSON.stringify(route));
</script>
<style scoped>
  .nav {
    background-color: blue;
    color: white;
    font-weight: bolder;
    font-size: large;
    margin-bottom: 10px;
  }
  .item {
    margin-left: 10px;
  }
  .active {
    background-color: yellow;
  }
</style>
