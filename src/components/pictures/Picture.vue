<template>
  <div class="single-picture">
    <div class="single-picture-content">
      <h1>{{ image.title }}</h1>
      <img :src="image.url" />
      <p>Copyright : <span>{{ image.copyright }}</span></p>
      <p>release date : <span>{{ this.formatDate(image.date) }}</span></p>
      <p>{{ image.description }}</p>
    </div>
    <div class="single-picture-comment" v-if="this.isConnected">
      <h2>Comment : </h2>
      <!-- space comment here, display if user connected -->
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      type: Object,
      image: null,
      isConnected: false,
      moment: moment
    }
  },
  props: {
    picture: {
      required: true
    }
  },
  beforeMount() {
    this.image = this.picture;
    console.log(this.image);
    this.isConnected = this.$store.state.userIsConnected;
    if (this.isConnected) this.findPictureComment();
  },
  methods: {
    formatDate(date) {
      return this.moment(date).format("LL");
    },
    findPictureComment() {
      console.log(this.$store.state.userToken);
    }
  },
}
</script>

<style>
.single-picture {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.single-picture-content {
  width: 80%;
}

.single-picture-comment {
  width: 80%;
}

.single-picture-comment h2 {
  text-align: left;
}
</style>
