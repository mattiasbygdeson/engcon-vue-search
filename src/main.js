import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

Vue.config.productionTip = false

// document.addEventListener('DOMContentLoaded', function(){
  const langDiv = document.querySelector('#lang');
  const lang = langDiv.dataset.lang;

  window.lang = lang;
// });


//eslint-disable-next-line no-console
// console.log(window.lang);

const router = new VueRouter({
  routes: [
    { path: '/', component: App },
    // { path: '/:favlist', component: App },
    { path: '/:favlist', component: App }
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#productfilter')
