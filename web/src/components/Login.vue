<template>
  <div>
    <router-link to="/create" tag="div" class="top-text">
      <div class="centered-logo">
        <img class="minimal-logo" src="/assets/lispot-logo.png">
      </div>

      <div class="app-name">Lispot</div>
      <div>Spotify, together</div>
    </router-link>
  </div>
</template>

<script>
import logo from "../assets/lispot-logo.png";

export default {};
</script>

<style>
.top-text {
  background: #1e1e1e;
  color: white;
  margin: auto;
  padding: 15px 15px;
  width: 160px;
  height: 230px;
  border-radius: 15px;
  font-family: monospace;
  cursor: pointer;
  text-align: center;
}

.app-name {
  padding-top: 10px;
  margin-bottom: 15px;
  font-size: 25px;
}
.centered-logo {
  width: 100px;
  margin: 0px auto 5px auto;
}
.minimal-logo {
  width: 100%;
}
</style>
