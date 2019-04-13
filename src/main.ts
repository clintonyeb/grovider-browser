import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import http from '@/plugins/http.ts'
import Spinner from '@/components/Spinner.vue'

Vue.config.productionTip = false;
Vue.component('Validator', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('Spinner', Spinner);
Vue.use(http)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");