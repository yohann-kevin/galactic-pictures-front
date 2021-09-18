<template>
  <div class="favorite">
    <h1>Favorite Picture</h1>
    <div class="favorite-pictures" v-for="(favoritePicture, i) in favoritePictures" :key="i">
      <p>Picture title : {{ favoritePicture.pictures.title }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      axios: axios,
      favoritePictures: null
    }
  },
  beforeMount() {
    this.findFavoritePicture();
  },
  methods: {
    findFavoritePicture() {
      let config = {
        method: 'get',
        url: process.env.VUE_APP_API_LINK + 'favorite',
        headers: { 
          'Authorization': 'Bearer ' + this.$store.state.userToken, 
        }
      };

      this.axios(config).then(response => {
        this.favoritePictures = response.data;
      }).catch(error => {
        console.log(error);
      });
    }
  },
}
</script>

<style>

</style>
