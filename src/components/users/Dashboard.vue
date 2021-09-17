<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Your information : </h2>
    <p>your name : <span>{{ this.userInfo.login }}</span></p>
    <p>Your role : <span>{{ this.userInfo.role }}</span></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null
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
  }
}
</script>

<style>

</style>
