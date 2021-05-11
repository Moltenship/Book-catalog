<template>
  <AppHeader/>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  methods: {
    ...mapActions([ 'getUserStatus' ]),
  },
  async created() {
    await this.getUserStatus()
  },
}
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
