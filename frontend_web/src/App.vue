<template>
  <micro-page></micro-page>
</template>

<script>
import MicroPage from "@/components/MicroPage.vue";

export default {
  name: "App",
  components: {
    MicroPage,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
