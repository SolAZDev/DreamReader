import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/vue-cookies";
import "./plugins/bootstrap-vue";
import "./plugins/vue-select";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // VueCookies,
  render: h => h(App)
}).$mount("#app");
