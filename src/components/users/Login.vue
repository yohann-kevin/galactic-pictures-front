<template>
  <div class="login">
    <h1>Login</h1>
    <div class="login-form">
      <label for="login">Login</label>
      <input type="text" name="login" ref="login"/>
      <label for="login">Password</label>
      <input type="password" name="password" ref="pass"/>

      <button type="submit" v-on:click="getUserLogin()">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      axios: axios,
      login: null,
      password: null
    }
  },
  methods: {
    getUserLogin() {
      // this.login = this.$refs.login.value;
      // this.password = this.$refs.pass.value;
      this.login = "kirua";
      this.password = "Kercode4";
      this.userLogin();
    },
    userLogin() {
      var data = JSON.stringify({
        "login": this.login,
        "password": this.password
      });

      var config = {
        method: 'post',
        url:  process.env.VUE_APP_API_LINK +'auth',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      this.axios(config).then(response => {
        this.manageResponseLogin(response.headers.authorization);
      }).catch(error => {
        console.log(error);
      });
    },
    manageResponseLogin(token) {
      var config = {
        method: 'get',
        url: process.env.VUE_APP_API_LINK + 'user/current-user',
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };

      this.axios(config).then(response => {
        this.saveUserLog(response.data, token);
      }).catch(error => {
        console.log(error);
      });
    },
    saveUserLog(data, token) {
      this.$store.commit("currentUser", data);
      this.$store.commit("userIsConnected", true);
      this.$store.commit("userToken", token);
      if (data.role == "ADMIN") this.$store.commit("userIsAdmin", true);
      this.$router.push({ name: "dashboard" });
      console.log(this.$store.state.userToken);
    }
  },
}
</script>

<style>

</style>
