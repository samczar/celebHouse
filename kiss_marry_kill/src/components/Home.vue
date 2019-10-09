<template>
  <div>
    <h1>Welcome To Kiss Marry Kill</h1>For Female Select
    <button @click="selectMale">Male</button>
    For Male Select
    <button @click="selectFemale">Female</button>
    <br />Enter Your Name:
    <input
      type="text"
      placeholder="Player Name"
      v-model="player"
      @change="getPlayerName"
    />
    <br />
    {{error}}
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      player: sessionStorage.getItem('playerName') || null,
      api: '',
      error: '',
    }

  },
  methods: {
    selectMale() {
      if (this.player !== null) {
        this.$emit('player Name', this.player)
        this.api = sessionStorage.setItem('api', 'api/celebhouse/male')
        this.$router.go({ path: this.$router.push('/gameLobby') })
        this.error = ''

      } else {
        this.error = 'input a female name'
      }

    },
    selectFemale() {
      if (this.player !== null) {
        this.$emit('player Name', this.player)
        this.api = sessionStorage.setItem('api', 'api/celebhouse/female')
        this.$router.go({ path: this.$router.push('/gameLobby') })
        this.error = ''
      } else {
        this.error = 'input a male name'
      }

    },
    getPlayerName() {
      this.$emit('playerName', this.player)
      sessionStorage.setItem('playerName', this.player);
    }

  }
}
</script>

<style>
</style>
