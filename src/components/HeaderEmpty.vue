<template>
  <header class="header">
      <div class="header-logo">
        <h1>Logo</h1>
        <h2>subtitle</h2>
      </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>
.header {
  width: 100%;
  min-height: 130px;
  background-color: #000;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.header-logo {
  width: 20%;
  color: #fff;
  text-align: center;
}

.header-logo h1 {
  margin-top: 20px;
}


</style>
