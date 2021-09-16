<template>
  <div>
    <h1>{{ image.title }}</h1>
    <img :src="image.url" />
    <p>{{ image.description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: Object,
      image: null,
    }
  },
  props: {
    picture: {
      require: true
    }
  },
  beforeMount() {
    this.image = this.picture;
  },
}
</script>

<style>

</style>
