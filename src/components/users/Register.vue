<template>
  <div class="register">
    <h1>Register</h1>
    <div class="register-form">
      <label for="login">Login</label>
      <input type="text" name="login" ref="login"/>
      <label for="login">Password</label>
      <input type="password" name="password" ref="pass"/>

      <button type="submit" v-on:click="register()">Register</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      axios: axios,
      registerUrl: "https://fast-peak-47997.herokuapp.com/api/user/sign-up",
      login: null,
      password: null
    }
  },
  methods: {
    register() {
      this.login = this.$refs.login.value;
      this.password = this.$refs.pass.value;
      this.sendUser();
    },
    sendUser() {
      let data = JSON.stringify({
        "login": this.login,
        "password": this.password
      });

      let config = {
        method: 'post',
        url: 'https://fast-peak-47997.herokuapp.com/api/user/sign-up',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      this.axios(config).then(response => {
        if (response.status == 200) this.$router.push({ name: "login" });
      }).catch(error => {
        console.log(error);
      });
    }
  },
}
</script>

<style>

</style>
