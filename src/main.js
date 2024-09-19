import "primeicons/primeicons.css";
import "./assets/main.css";
import router from "./router";
import store from "./store";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
