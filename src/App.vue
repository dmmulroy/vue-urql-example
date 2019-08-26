<template>
  <div id="app">
    <img class="logo" width="75%" src="./assets/vue_urql.png" />
    <!-- <HelloWorld msg="Hello Vue in CodeSandbox!" /> -->
    <artist-search />
  </div>
</template>

<script>
import ArtistSearch from "./components/ArtistSearch";

export default {
  name: "App",
  components: {
    ArtistSearch
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 25px auto;
  width: 50%;
}

#app > .logo {
  margin-bottom: 25px;
}
</style>
