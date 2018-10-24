// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import $ from 'jquery'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.http.interceptors.push(function(request, next) {
  // modify headers
  if(this.$store.state.user.tokenid){
  request.headers.set('Authorization', this.$store.state.user.tokenid);
}
	console.log(request.headers)
  // continue to next interceptor
  next();
});

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});

