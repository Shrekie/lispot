<template>
  <div>
    <span class="room-number">{{this.name}}</span>
    <div class="clients-container">
      <div class="user-circle" v-for="item in clients" :key="item.id">
        <span class="listener-stat">{{item.id}}</span>
        <span class="listener-stat">{{item.song.name}}</span>
      </div>
    </div>
    <div class="user-circle">
      <span class="listener-stat">{{listener.id}}</span>
      <span class="listener-stat">{{listener.song}}</span>
    </div>
  </div>
</template>

<script>
import tenant from "../modules/tenant.js";
import context from "../modules/context.js";

export default {
  props: ["name"],

  mounted: function() {
    tenant.enter(this.name);
  },
  computed: {
    listener() {
      return context.getListener();
    },
    clients() {
      return context.getUsers();
    }
  }
};
</script>

<style>
.listener-stat {
  display: block;
  margin-top: 10px;
  text-align: center;
}

.user-circle {
  border: 1px solid;
  padding: 5%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: gray;
  margin: 10px auto;
}

.clients-container {
  flex-direction: row;
}

.room-number {
  font-size: 24px;
  font-weight: 800;
  background: #000000;
  color: white;
  padding: 10% 10px;
  width: 80%;
  height: 10%;
  display: block;
  text-align: center;
  margin: 10% auto;
  border-radius: 25px;
}
</style>