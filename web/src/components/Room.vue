<template>
  <div>
    <p>Room {{this.name}}</p>
  </div>
</template>

<script>
import tenant from '../modules/tenant';

export default {

  props: ['name'],

  mounted: function () {

    tenant.enter(this.name);
  }

}
</script>