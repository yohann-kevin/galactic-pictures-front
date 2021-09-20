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
        url: process.env.VUE_APP_API_LINK + 'user/sign-up',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      this.axios(config).then(response => {
        if (response.status == 201) this.$router.push({ name: "login" });
      }).catch(error => {
        console.log(error);
      });
    }
  },
}
</script>

<style>
.register { min-height: 80vh; }
</style>
