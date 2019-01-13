import Vue from 'vue'

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App.vue'
import Room from './Room.vue'
import Login from './Login.vue'

const routes = [

  { 
    path: '', 
    component: Login,
  },

  { 
    path: '/room/:roomId', 
    component: Room,
    props: true
  }

];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
})