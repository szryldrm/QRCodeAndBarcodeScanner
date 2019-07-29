import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueQrcodeReader from 'vue-qrcode-reader'
import Toasted from 'vue-toasted';
import VueQuagga from 'vue-quaggajs';

Vue.config.productionTip = false;

Vue.use(VueQuagga);
Vue.use(VueQrcodeReader);
Vue.use(Toasted);


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
