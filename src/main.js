import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import firebase from 'firebase';

Vue.config.productionTip = false



// firebase.onAuthStateChanged(() =>
// {
 
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')