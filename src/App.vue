<template>
  <Header :userConnected="this.isConnected"/>
  <router-view 
    v-if="pictures.length != 0" 
    :pictures="pictures" 
    :picture="pictureSelected" 
    v-on:selectPicture="pictureSelect"
    :currentUser="findCurrentUser()"
  ></router-view>
  <Footer/>
</template>

<script>
import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';

import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      axios: axios,
      pictures: [],
      pictureSelected: null,
      isConnected: false
    }
  },
  mounted() {
    this.getPictures();
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
@font-face {
  font-family: 'nasa';
  src: url('./assets/fonts/nasalization/nasalization_rg-webfont.woff2') format('woff2'),
        url('./assets/fonts/nasalization/nasalization_rg-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-x: hidden;
}

h1 {
  font-family: 'nasa';
}

body {
  margin: 0;
  padding: 0;
}
</style>
