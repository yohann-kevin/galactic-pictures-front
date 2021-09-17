<template>
  <Header :userConnected="this.isConnected"/>
  <router-view 
    v-if="pictures.length != 0" 
    :pictures="pictures" 
    :picture="pictureSelected" 
    v-on:selectPicture="pictureSelect"
    :currentUser="findCurrentUser()"
  ></router-view>
</template>

<script>
import Header from './components/Header.vue';

import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      axios: axios,
      pictures: [],
      pictureSelected: null,
      data: {
        "username": "plop",
        "password": "plop-man"
      },
      isConnected: false
    }
  },
  mounted() {
    this.getPictures();
    // save data in store
    // this.$store.commit("currentUser", this.data);
    // get data in storre
    // console.log(this.$store.state);
  },
  updated() {
    this.isConnected = this.$store.state.userIsConnected;
  },
  methods: {
    getPictures() {
      this.axios.get(process.env.VUE_APP_API_LINK + "picture").then(response => this.managePicture(response.data));
    },
    managePicture(data) {
      this.pictures = data;
    },
    pictureSelect(value) {
      this.pictureSelected = value;
      this.$router.push({ name: "picture" });
    },
    findCurrentUser() {
      return this.$store.state.currentUser;
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
