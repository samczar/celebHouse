<template>
  <div id="app">
    <!-- <home @playerName="player=$event" /> -->
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      allMale: [],
      allFemale: [],
      randomMale: [],
      randomFemale: [],
      message: '',
      selection: [],
      player: ''
    }
  },
  methods: {
    async getAllMale() {
      const response = await axios.get(`${this.baseUrl}/api/allmale`)
      this.allMale = await response.data
    },
    async getAllFemale() {
      const response = await axios.get(`${this.baseUrl}/api/allfemale`)
      this.allFemale = response.data
    }

  }


}
</script>

<style>
body {
  background-color: deepskyblue;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
