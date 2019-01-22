<template>
  <div class="centered-box">
    <p>Creating room ...</p>
  </div>
</template>

<script>
import tenant from '../modules/tenant';

export default {

  mounted: function () {
    tenant.make();
  }

}
</script>

<style>

.centered-box {
  width:100%;
  margin-top:50px;
  text-align: center;
}

</style>
