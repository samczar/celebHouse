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
    <Button :title="btnNext" :eventHandler="eventHandlerNext" />
    <Button :title="btnPrev" :eventHandler="eventHandlerPrev" />
    <Button :title="btnChange" :eventHandler="eventHandlerChange" />
    <Button :title="btnReset" :eventHandler="eventHandlerReset" />
    <Button :title="btnEnd" :eventHandler="eventHandlerEnd" />
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
      kiss: '',
      marry: '',
      kill: '',
      analysis: [],
      btnNext: 'Play Next',
      btnPrev: 'Play Prev',
      btnChange: 'Rechoose',
      btnReset: 'Reset Game',
      btnEnd: 'End Game',
      player: sessionStorage.getItem('playerName'),
      count: sessionStorage.getItem('round') || 1,
      resultData: JSON.parse(sessionStorage.getItem('ResultHolder' + this.count)) || [],
      alertMessage: 'This Feature is Coming Soon.',
      error: ''
    }
  },
  methods: {

    async getCeleb() {
      const response = await axios.get(`${this.baseUrl}/${this.api}`)
      const convertedAPI = JSON.parse(sessionStorage.getItem('loadedData' + this.count))
      if (sessionStorage.getItem('loadedData' + this.count) === null) {
        this.celebList = response.data
        sessionStorage.setItem('loadedData' + this.count, JSON.stringify(this.celebList))
      } else {
        this.celebList = convertedAPI
      }
    },

    selectCeleb(event) {
      this.$emit('selectedCeleb', event)
      this.result.add(event)
      this.resultData = [...this.result]
      if (sessionStorage.getItem('ResultHolder' + this.count !== null)) {
        this.resultData = JSON.parse(sessionStorage.getItem('ResultHolder' + this.count))
      } else {
        sessionStorage.setItem('ResultHolder' + this.count, JSON.stringify(this.resultData))
      }
      this.kiss = [...this.result].length === 3 ? Object.entries(this.resultData[0]).map((e) => { return e })[0][1] : ' '
      this.marry = [...this.result].length === 3 ? Object.entries(this.resultData[1]).map((e) => { return e })[0][1] : ''
      this.kill = [...this.result].length === 3 ? Object.entries(this.resultData[2]).map((e) => { return e })[0][1] : ''
    },

    setRound() {
      sessionStorage.setItem('round', this.count)

    },

    eventHandlerNext(e) {
      e.preventDefault()
      if (this.kiss !== '' &&
        this.marry !== '' &&
        this.kill !== '') {
        this.count++
        this.setRound()
        this.error = ' '
        if (sessionStorage.getItem('ResultHolder' + this.count) === null) {
          new Request(this.getCeleb())
          this.result = new Set()
          this.kiss = ''
          this.marry = ''
          this.kill = ''
        } else {
          new Request(this.getCeleb())
          this.loadFeeback()
          this.result = JSON.parse(sessionStorage.getItem('ResultHolder' + this.count))
        }
      } else {
        this.error = 'Error: Select Kiss, Marry , Kill'
      }
    },

    eventHandlerChange(e) {
      e.preventDefault()
      this.kill = ''
      this.marry = ''
      this.kiss = ''
      sessionStorage.removeItem(`ResultHolder${this.count}`)
      this.result = new Set()
    },

    eventHandlerPrev(e) {
      e.preventDefault()
      this.count--
      this.count < 1 ? this.count = 1 : this.count
      this.celebList = JSON.parse(sessionStorage.getItem('loadedData' + this.count))
      this.result = JSON.parse(sessionStorage.getItem('ResultHolder' + this.count))
      this.loadFeeback()
    },

    eventHandlerEnd(e) {
      e.preventDefault()
      alert(this.alertMessage)
    },

    eventHandlerReset(e) {
      e.preventDefault()
      sessionStorage.clear();
      this.$router.go({ path: this.$router.push('/home') })
    },

    loadFeeback() {
      this.resultData = JSON.parse(sessionStorage.getItem('ResultHolder' + this.count))
      this.kiss = [...this.result].length === 3 ? Object.entries(this.resultData[0]).map((e) => { return e })[0][1] : ' '
      this.marry = [...this.result].length === 3 ? Object.entries(this.resultData[1]).map((e) => { return e })[0][1] : ''
      this.kill = [...this.result].length === 3 ? Object.entries(this.resultData[2]).map((e) => { return e })[0][1] : ''

    },
  },
  created() {
    this.getCeleb()
    this.setRound()
    this.loadFeeback()
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
