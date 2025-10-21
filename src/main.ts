import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ApexCharts from 'vue3-apexcharts';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App).use(
    Vue3Toastify,
    {
        autoClose: 1500,
        newestOnTop: true,
        position: 'top-right',
        theme: 'light',
    } as ToastContainerOptions
);

app.use(createPinia());
app.use(ApexCharts);
app.use(router);
app.mount('#app');
