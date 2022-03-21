import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import LAYOUT from '@/layouts/topbar.vue';
import { routes as dynRoutes } from './import';
import { routes as staticRoutes } from './static';

// const route_sort = (a: any, b: any) => a.meta?.orderNo - b.meta?.orderNo;
const route_sort = (a: any, b: any) => (a.name === 'about' ? 1 : -1);
const routes = [{ path: '/', name: 'Home', component: LAYOUT, children: [...staticRoutes, ...dynRoutes].sort(route_sort) }];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
