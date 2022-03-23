import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import LAYOUT from '@/layouts/topbar.vue';
import { routes as dynRoutes } from './import';
import { routes as staticRoutes } from './static';

// const route_sort = (a: any, b: any) => a.meta?.orderNo - b.meta?.orderNo;
const defOrder: any = { setting: 100, about: 90 };
const getOrder = (name: string) => defOrder[name] ?? 50;
const route_sort = (a: any, b: any) => getOrder(a.name) - getOrder(b.name);
const routes = [{ path: '/', name: 'Home', component: LAYOUT, redirect: '/about', children: [...staticRoutes, ...dynRoutes].sort(route_sort) }];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
