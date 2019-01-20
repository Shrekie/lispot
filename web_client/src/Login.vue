<template>
  <div id="centered-box">

    <div class="centered-box">
      <p>Lispot</p>
    </div>

    <div class="centered-box">
      <img class="minimal-logo" src="/assets/lispot-logo.png">
    </div>

  </div>
</template>

<script>
import logo from './assets/lispot-logo.png';

export default {

}
</script>

<style>

.centered-box {
  width:100%;
  margin-top:15px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.minimal-logo {
  width:5%;
}

</style>
