<template>
  <header class="header">
      <div class="header-logo">
        <h1>Logo</h1>
        <h2>subtitle</h2>
      </div>
      <nav class="header-nav">
        <ul>
          <li><router-link to="/">Galery</router-link></li>
          <li><a href="#">Plop</a></li>
          <li><a href="#">Plop</a></li>
          <li v-if="this.isConnected"><router-link to="/favorite">Favorite Picture</router-link></li>
        </ul>
      </nav>
      <div class="header-button" v-if="!this.isConnected">
        <button><router-link to="/login">Login</router-link></button>
        <button><router-link to="/sign-up">Sign in</router-link></button>
      </div>
      <div class="header-button" v-else>
        <button><router-link to="/dashboard">Dashboard</router-link></button>
        <button><router-link to="/" v-on:click="logoutUser()">Logout</router-link></button>
      </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isConnected: null
    }
  },
  props: {
    userConnected: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    this.isConnected = this.userConnected;
  },
  watch: {
    userConnected: function() {
      this.isConnected = this.userConnected;
    }
  },
  methods: {
    logoutUser() {
      this.$store.commit("currentUser", null);
      this.$store.commit("userIsConnected", false);
      this.$store.commit("userIsAdmin", false);
      this.$store.commit("userToken", false);
      this.$store.commit("userComment", null);
      this.$store.commit("favoritePicture", null);
    }
  },
}
</script>

<style>
.header {
  width: 100%;
  min-height: 130px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.header-logo {
  width: 15%;
  color: #fff;
}

.header-logo h1 {
  margin-top: 20px;
}

.header-nav {
  width: 70%;
}

.header-nav > ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.header-nav > ul > li {
  border-right: 2px solid #fff;
  border-left: 2px solid #fff;
  margin-top: 30px;
  font-size: 1.4rem;
  padding-right: 25px;
  padding-left: 25px;
  transition: 0.7s;
}

.header-nav > ul > li:hover {
  border-right: 2px solid #000;
  border-left: 2px solid #000;
  border-bottom: 1px solid #fff;
  cursor: pointer;
}

.header-nav > ul > li > a {
  text-decoration: none;
  color: #fff;
}

.header-button {
  width: 12%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.header-button button {
  width: 100%;
  font-size: 1.2rem;
  background-color: #fff;
  border: none;
  transition: 0.7s;
}

.header-button button:hover {
  cursor: pointer;
  color: #fff;
  background-color: #000;
}

.header-button button:nth-child(1) {
  border-bottom: 2px solid #000;
}

.header-button button:nth-child(2) {
  border-top: 1px solid #000;
}

.header-button button > a {
  text-decoration: none;
  color: #000;
  transition: 0.7s;
}

.header-button button:hover > a {
  color: #fff;
}
</style>
