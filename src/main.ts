import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

import { setupRouter } from './router';

const app = createApp(App);
setupRouter(app);
app.use(Antd).mount('#app');