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
      this.login = this.$refs.login.value;
      this.password = this.$refs.pass.value;
      this.userLogin();
    },
    userLogin() {
      var data = JSON.stringify({
        "login": "kirua",
        "password": "Kercode4"
      });

      var config = {
        method: 'post',
        url: 'http://localhost:8081/api/auth',
        headers: { 
          'Content-Type': 'application/json'
          // 'Cookie': 'JSESSIONID=9FA53451EF709C31F03BFDC1DEB54C3E; XSRF-TOKEN=c8c9d594-ab71-4623-8366-e30e6dd0bf2c'
        },
        data : data
      };

      this.axios(config).then(response => {
        console.log(response);
        this.manageResponseLogin(response.headers.authorization);
      }).catch(error => {
        console.log(error);
      });
    },
    manageResponseLogin(token) {
      console.log(token);
      var config = {
        method: 'get',
        url: 'http://localhost:8081/api/user/current-user',
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };

      this.axios(config).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      });
    }
  },
}
</script>

<style>

</style>
