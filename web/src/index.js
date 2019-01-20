import Vue from 'vue'

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './components/App.vue'
import Room from './components/Room.vue'
import Login from './components/Login.vue'
import Create from './components/Create.vue'

const routes = [

  { 
    path: '', 
    component: Login,
  },

  { 
    path: '/create', 
    component: Create,
  },

  { 
    path: '/room/:name', 
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