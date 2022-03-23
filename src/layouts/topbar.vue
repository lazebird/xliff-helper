<template>
  <div>
    <div class="nav">
      <label>Navigator:</label>
      <RouterLink v-for="r in routes" :to="r.path" class="item" :class="r.path === currRoute.path ? 'active' : ''">{{ r.name }}</RouterLink>
    </div>
    <div class="body">
      <RouterView v-slot="{ Component }">
        <KeepAlive v-if="$route.meta.keepAlive !== false"> <component :is="Component" /> </KeepAlive>
        <component :is="Component" v-else />
      </RouterView>
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
