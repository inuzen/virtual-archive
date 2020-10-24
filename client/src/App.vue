<template>
  <div id="app">
      <!-- <router-link to="/">Home</router-link> | -->
    <router-view/>
  </div>
</template>
<style lang="scss">
@import "~vue-material/dist/theme/engine";
@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent or secondary color
));

@import "~vue-material/dist/theme/all";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px;
}
</style>
