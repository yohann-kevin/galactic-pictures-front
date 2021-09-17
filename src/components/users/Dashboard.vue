<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Your information : </h2>
    <p>your name : <span>{{ this.userInfo.login }}</span></p>
    <p>Your role : <span>{{ this.userInfo.role }}</span></p>
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
      console.log(this.$store.state.userComment);
    }
  }
}
</script>

<style>

</style>
