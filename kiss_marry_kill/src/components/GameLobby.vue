<template>
  <div class="gamelobby">
    <p>Welcome {{player}}</p>
    <p>Round: {{count}}</p>
    <h2>Instruction: click On any image in regards to: 1: Kiss 2: Marry 3: Kill</h2>
    <ul>
      <li v-for="(items, index) in celebList" :key="index" @click="selectCeleb(items)">
        <Game :image="items.image" :name="items.name" />
      </li>
    </ul>

    <Feedback :kiss="kiss" :marry="marry" :kill="kill" />
    <p class="error">{{error}}</p>
    <Button :title="btnTitle" :eventHandler="eventHandler" />
  </div>
</template>

<script>
import axios from 'axios'

import Game from './Game'
import Button from './Button'
import Feedback from './Feeback'

export default {
  name: 'gameLobby',
  components: {
    Game,
    Button,
    Feedback
  },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      api: sessionStorage.getItem('api') || '',
      celebList: [],
      result: new Set(),
      kiss: {},
      marry: {},
      kill: {},
      analysis: [],
      btnTitle: 'Play Next',
      player: sessionStorage.getItem('playerName'),
      count: sessionStorage.getItem('round') || 1,
      error: ''

    }
  },
  methods: {

    async getCeleb() {
      const response = await axios.get(`${this.baseUrl}/${this.api}`)
      this.celebList = response.data
    },
    selectCeleb(event) {
      this.$emit('selectedCeleb', event)
      this.result.add(event)
      const deconstructResult = [...this.result]
      this.kiss = Object.entries(deconstructResult)[0][1]
      this.marry = Object.entries(deconstructResult)[1][1]
      this.kill = Object.entries(deconstructResult)[2][1]

    },
    setRound() {
      sessionStorage.setItem('round', this.count)
    },
    eventHandler(e) {
      e.preventDefault()
      if (Object.keys(this.kiss).length !== 0 &&
        Object.keys(this.marry).length !== 0 &&
        Object.keys(this.kill).length !== 0) {
        this.count++
        this.setRound()
        new Request(this.getCeleb())
        this.result = new Set()
        this.kiss = {}
        this.marry = {}
        this.kill = {}
        this.error = ' '
      } else {
        this.error = 'Error: Select Kiss, Marry , Kill'
      }
    }
  },
  created() {
    this.getCeleb()
    this.setRound()
  }
}
</script>

<style lang="scss" scoped>
h1,
h2,
p {
  text-align: center;
  color: white;
}
.error {
  color: red;
  font-weight: bolder;
}
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  li {
    list-style-type: none;
    padding: 1em;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 600px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
