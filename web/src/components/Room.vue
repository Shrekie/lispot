<template>
  <div>
    <span class="room-number">{{this.name}}</span>
    <div class="listener-container">
      <span class="listener-stat">spotify name</span>
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

.listener-container {
  border: 1px solid;
  padding: 5%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: gray;
  margin: 10px auto;
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