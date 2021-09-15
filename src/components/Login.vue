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
      // let FormData = require('form-data');
      // let data = new FormData();
      // data.append('username', this.login);
      // data.append('password', this.password);

      // let config = {
      //   method: 'post',
      //   url: 'https://fast-peak-47997.herokuapp.com/api/login?',
      //   data : data
      // };

      // this.axios(config).then((response) => {
      //   console.log(JSON.stringify(response.data));
      // }).catch((error) => {
      //   console.log(error);
      // });

      var myHeaders = new Headers();
      myHeaders.append("Cookie", "JSESSIONID=5105E067238ECC9B41A3533150CB2088");

      var formdata = new FormData();
      formdata.append("username", "kirua");
      formdata.append("password", "Kercode4");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:8081/api/login?", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  },
}
</script>

<style>

</style>
