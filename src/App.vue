<template>
  <Header/>
  <Galery v-if="pictures.length != 0" :pictures="pictures"/>
</template>

<script>
import Header from './components/Header.vue';
import Galery from './components/Galery.vue';

import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header,
    Galery
  },
  data() {
    return {
      axios: axios,
      pictures: []
    }
  },
  mounted() {
    this.getPictures();
  },
  methods: {
    getPictures() {
      this.axios.get("https://fast-peak-47997.herokuapp.com/api/picture").then(response => this.managePicture(response.data));
    },
    managePicture(data) {
      for (let i = 1; i < 11; i++) {
        this.pictures.push(data[i]);
      }
    },
  },
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
