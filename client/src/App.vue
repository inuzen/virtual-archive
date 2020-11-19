<template>
  <div id="app">
      <!-- <router-link to="/">Home</router-link> | -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme("default", (
  primary: #1bc3ce, // The primary color of your application
  accent: #B8E6E9 // The accent or secondary color
));

@import "~vue-material/dist/theme/all";
@import './styles/main.scss';

html{
  background-color: $white;
}
#app {
  font-family: Open Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
   margin: 0 165px;
   margin-top: 60px;
}

 select {
        background-image: url('./assets/icons/select-arrow.svg');
        &:disabled{
          background-image: url('./assets/icons/select-arrow-disabled.svg');
        }
        }
</style>
