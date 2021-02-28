// import something here
import Vue from 'vue';
import VueLocalForage from 'vue-localforage';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default ({ Vue }) => {
  // something to do
  Vue.use(VueLocalForage);
};
