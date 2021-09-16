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
      var header = new Headers();
      header.append("Cookie", "JSESSIONID=5105E067238ECC9B41A3533150CB2088");

      var formdata = new FormData();
      formdata.append("username", "kirua");
      formdata.append("password", "Kercode4");

      var requestOptions = {
        method: 'POST',
        headers: header,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:8081/api/login?", requestOptions)
        .then(response => response.json())
        .then(result => this.manageResponseLogin(result))
        .catch(error => console.log('error', error));
    },








    manageResponseLogin(response) {
      console.log(response);

      // var header = new Headers();
      // header.append("Cookie", "JSESSIONID=" + response.session_id);

      var config = {
        method: 'get',
        url: 'http://localhost:8081/api/user/current-user',
        headers: { 
          'Cookie': "JSESSIONID=5105E067238ECC9B41A3533150CB2088"
        }
      };

      this.axios(config).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
}
</script>

<style>

</style>
