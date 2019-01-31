<template>
  <div>
    <span class="room-number">{{this.name}}</span>
  </div>
</template>

<script>
import tenant from "../modules/tenant";

export default {
  props: ["name"],

  mounted: function() {
    tenant.enter(this.name);
  }
};
</script>

<style>
.room-number {
  font-size: 24px;
  font-weight: 800;
  background: #000000;
  color: white;
  padding-top: 150px;
  width: 70%;
  height: 200px;
  display: block;
  text-align: center;
  margin: 25% auto;
  border-radius: 25px;
}
</style>