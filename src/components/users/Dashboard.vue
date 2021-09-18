<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <h2>Your information : </h2>
    <p>your name : <span>{{ this.userInfo.login }}</span></p>
    <p>Your role : <span>{{ this.userInfo.role }}</span></p>
    <div class="user-comments">
      <h2>Your comments : </h2>
      <div class="user-comment" v-for="(userComment, i) in userComments" :key="i">
        <p>Picture title : {{ userComment.picture_title }}</p>
        <p>Comment content : {{ userComment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInfo: null,
      axios: axios,
      userComments: null
    }
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  beforeMount() {
    this.userInfo = this.currentUser;
    this.findUserComment();
  },
  methods: {
    findUserComment() {
      let config = {
        method: 'get',
        url: process.env.VUE_APP_API_LINK + 'comment/by/user',
        headers: { 
          'Authorization': 'Bearer ' + this.$store.state.userToken
        }
      };

      this.axios(config).then(response => {
        this.manageUserCommentData(response.data);
      }).catch(error => {
        console.log(error);
      });
    },
    manageUserCommentData(data) {
      this.userComments = data;
      this.$store.commit("userComment", this.userComments);
      // console.log(this.$store.state.userComment);
    }
  }
}
</script>

<style>
.dashboard {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.dashboard h1,
.dashboard h2,
.dashboard p {
  width: 100%;
}

.user-comments {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.user-comment {
  width: 80%;
  background-color: #efefef;
  border-radius: 15px;
  text-align: left;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
