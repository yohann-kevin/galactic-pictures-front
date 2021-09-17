<template>
  <div class="single-picture">
    <div class="single-picture-content">
      <h1>{{ image.title }}</h1>
      <img :src="image.url" />
      <p>Copyright : <span>{{ image.copyright }}</span></p>
      <p>release date : <span>{{ this.formatDate(image.date) }}</span></p>
      <p>{{ image.description }}</p>
    </div>
    <div class="single-picture-comments" v-if="this.isConnected">
      <h2>Comment : </h2>
      <div class="single-picture-comment" v-for="(comment, i) in comments" :key="i">
        <p class="comment-author">Author : {{ comment.user_writer }}</p>
        <p class="comment-content" >{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      type: Object,
      image: null,
      isConnected: false,
      moment: moment,
      axios: axios,
      comments: null
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
      let config = {
        method: 'get',
        url: process.env.VUE_APP_API_LINK + 'comment/' + this.image.id,
        headers: { 
          'Authorization': 'Bearer ' + this.$store.state.userToken
        }
      };

      this.axios(config).then(response => {
        this.manageCommentData(response.data);
      }).catch(error => {
        console.log(error);
      });
    },
    manageCommentData(data) {
      this.comments = data;
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

.single-picture-comments {
  width: 80%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.single-picture-comments h2 {
  width: 100%;
  text-align: left;
}

.single-picture-comment {
  width: 100%;
  background-color: #efefef;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: 15px;
}

.comment-author {
  width: 10%;
  text-align: left;
  margin-left: 15px;
}

.comment-content {
  width: 85%;
  text-align: center;
}
</style>
