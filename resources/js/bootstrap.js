import axios from 'axios';
import {createPinia} from "pinia";
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


// Настройка Axios для отправки AJAX-запросов
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Инициализация Vue и подключение маршрутизации
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app');
