<template>
  <div class="single-picture">
    <div class="single-picture-content">
      <h1>{{ image.title }}</h1>
      <img :src="image.url" v-if="image.mediaType != 'video'" />
      <iframe width="100%" height="600px" :src="image.url" v-if="image.mediaType == 'video'"></iframe>
      <div class="picture-icon" v-if="this.isConnected">
        <i class="fas fa-star" v-on:click="unlikePicture()" v-if="isLiked"></i>
        <i class="far fa-star" v-on:click="likePicture()" v-else></i><p> {{ image.toLike }}</p>
        <i class="fas fa-download" v-on:click="downloadPicture()" v-if="image.mediaType != 'video'"></i><p> {{ image.download }}</p>
      </div>
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
      <div class="comment-add">
        <label for="comment">Your comment : </label>
        <textarea type="text" name="comment" ref="comment"></textarea>
        <button type="submit" v-on:click="sendComment()">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import Downloader from '../../assets/script/Downloader.js';

export default {
  data() {
    return {
      type: Object,
      image: null,
      isConnected: false,
      moment: moment,
      axios: axios,
      comments: null,
      userComment: null,
      isLiked: false,
      favoriteId: null,
      downloader: new Downloader
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
    if (this.isConnected) {
      this.findPictureComment();
      this.pictureIsLiked();
    }
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
    },
    sendComment() {
      this.checkComment();
      let config = {
        method: 'post',
        url: process.env.VUE_APP_API_LINK + 'comment?content=' + this.userComment + '&uuid=' + this.picture.id,
        headers: { 
          'Authorization': 'Bearer ' + this.$store.state.userToken
        }
      };

      this.axios(config).then(response => {
        if (response.status == 201) this.findPictureComment();
      }).catch(error => {
        console.log(error);
      });

      this.$refs.comment.value = "";
    },
    checkComment() {
      this.userComment = this.$refs.comment.value;
    },
    likePicture() {
      var config = {
        method: 'post',
        url: process.env.VUE_APP_API_LINK + 'picture/like/' + this.image.id,
        headers: { 
          'Authorization': 'Bearer ' + this.$store.state.userToken
        }
      };

      this.axios(config).then(response => {
        if (response.status == 201) this.refreshFavoritePicture();
      }).catch(error => {
        console.log(error);
      });
    },
    refreshFavoritePicture() {
      let config = {
        method: 'get',
        url: process.env.VUE_APP_API_LINK + 'favorite',
        headers: { 
          'Authorization': 'Bearer ' + this.$store.state.userToken, 
        }
      };

      this.axios(config).then(response => {
        this.$store.state.favoritePicture = response.data;
        if (!this.isLiked) { 
          this.isLiked = true;
          this.image.toLike++;
        } else {
          this.isLiked = false;
          this.image.toLike--;
        }
        
      }).catch(error => {
        console.log(error);
      });
    },
    pictureIsLiked() {
      let favoritePictures = this.$store.state.favoritePicture;
      if (favoritePictures != null) {
        for (let i = 0; i < favoritePictures.length; i++) {
          if (favoritePictures[i].pictures.id == this.image.id) {
            this.isLiked = true;
            this.favoriteId = favoritePictures[i].id;
          }
        }
      }
    },
    unlikePicture() {
      var config = {
        method: 'delete',
        url: process.env.VUE_APP_API_LINK + 'favorite?pictureId=' + this.image.id + '&id=' + this.favoriteId,
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.userToken
        }
      };

      this.axios(config).then(response => {
        if (response.status == 200) this.refreshFavoritePicture();
      }).catch(error => {
        console.log(error);
      });
    },
    downloadPicture() {
      this.downloader.download_file(this.image.hdurl, this.image.title);

      let config = {
        method: 'post',
        url: process.env.VUE_APP_API_LINK + 'picture/download/' + this.image.id,
        headers: { 
          'Authorization': 'Bearer ' + this.$store.state.userToken
        }
      };

      this.axios(config).then(response => {
        if (response.status == 201) this.image.download++;
      }).catch(error => {
        console.log(error);
      });
    }
  }
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

.picture-icon {
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.picture-icon i {
  margin: 10px;
  font-size: 1.5rem;
  transition: 0.5s;
}

.picture-icon p {
  font-weight: bold;
  font-size: 1.1rem;
}

.picture-icon i:hover {
  cursor: pointer;
  transform: scale(1.1);
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

.comment-add {
  width: 100%;
  background-color: #efefef;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: 15px;
}

.comment-add label {
  width: 20%;
  text-align: left;
  margin-left: 15px;
  margin-top: 30px;
  align-items: center;
}

.comment-add textarea {
  outline: none;
  border-radius: 5px;
  width: 60%;
  border: 1px solid #000;
  margin: 15px;
  height: 40px;
}

.comment-add button {
  width: 10%;
  margin-right: 15px;
  margin-top: 30px;
  height: 20px;
}
</style>
