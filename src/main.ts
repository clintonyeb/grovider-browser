import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { ValidationProvider } from 'vee-validate';

Vue.config.productionTip = false;
Vue.component('Validator', ValidationProvider);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");