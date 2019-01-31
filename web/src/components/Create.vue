<template>
  <div class="centered-box">
    <p>Creating room ...</p>
  </div>
</template>

<script>
import tenant from "../modules/tenant";

export default {
  mounted: function() {
    tenant.make().then(room => {
      this.$router.push({ path: `/room/${room}` });
    });
  }
};
</script>

<style>
.centered-box {
  width: 100%;
  margin-top: 50px;
  text-align: center;
}
</style>
