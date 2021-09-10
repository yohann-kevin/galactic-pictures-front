<template>
  <Header/>
  <Galery/>
</template>

<script>
import Header from './components/Header.vue';
import Galery from './components/Galery.vue';

export default {
  name: 'App',
  components: {
    Header,
    Galery
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

body {
  margin: 0;
  padding: 0;
}
</style>
