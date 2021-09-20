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
    this.favoritePictures = this.$store.state.favoritePicture;
  }
}
</script>

<style>

</style>
