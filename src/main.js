import "primeicons/primeicons.css";
import "./assets/main.css";
import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Aura from '@primevue/themes/aura';
import Toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App);

// Initialize Pinia
const pinia = createPinia();
app.use(pinia);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

// Register PrimeVue components globally
app.component('Card', Card);
app.component('Button', Button);
app.component('Divider', Divider);

app.use(store);
app.use(router);
app.use(Toast);
app.mount("#app");
