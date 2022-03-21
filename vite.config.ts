import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import pkg from './package.json';

const __APP_INFO__ = {
  pkg,
  lastBuildTime: new Date().toLocaleString(),
};

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const buildlib = {
  lib: {
    entry: pathResolve('src/components/toc/index.js'),
    name: 'vue3outline',
    fileName: (format) => `vue3outline.${format}.js`,
  },
  sourcemap: true,
  rollupOptions: {
    external: ['vue'],
    output: { globals: { vue: 'Vue' } },
  },
};
const builddemo = {};

export default defineConfig(({ command, mode }) => {
  console.log('[vite.config.ts] command %s mode %s', command, mode);
  return {
    base: './',
    resolve: {
      alias: [
        { find: /@\//, replacement: pathResolve('src') + '/' },
        { find: /#\//, replacement: pathResolve('types') + '/' },
      ],
    },
    plugins: [vue(), Components({})],
    build: mode === 'demo' ? builddemo : buildlib,
    server: { host: true },
    define: { __APP_INFO__: JSON.stringify(__APP_INFO__) },
  };
});
