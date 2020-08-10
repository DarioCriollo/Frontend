<template>
  <div class="home">
    <img alt="Vue logo" src="https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-logo.png">
   <br><br>
    <h3 class="title">Prueba de Desarrollo Sigma</h3>
    <br>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
    <Principal/>
    <br><br><br>
  </div>
</template>

<script>
// @ is an alias to /src
import Principal from '@/components/Principal.vue'

export default {
  name: 'Home',
  components: {
    Principal
  }
}
</script>

<style scoped>
.title{
  font-weight: bold;
  font-size: 26px;
  color: black;
}
</style>
