<template>
  <Header/>
  <router-view v-if="pictures.length != 0" :pictures="pictures" :picture="pictureSelected" v-on:selectPicture="pictureSelect"></router-view>
</template>

<script>
import Header from './components/HeaderEmpty.vue';
// import Galery from './components/Galery.vue';

import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header,
    // Galery
  },
  data() {
    return {
      axios: axios,
      pictures: [],
      pictureSelected: null
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
      for (let i = 0; i < data.length; i++) {
        if (data[i].copyright != "video") this.pictures.push(data[i]);
      }
    },
    pictureSelect(value) {
      this.pictureSelected = value;
      console.log(this.pictureSelected);
      this.$router.push({ name: "picture" });
    } 
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
