import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bootstrap/scss/bootstrap.scss'; 

import '../node_modules/bootstrap/scss/bootstrap.scss'; 


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
