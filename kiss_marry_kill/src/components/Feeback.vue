<template>
  <div>
    <p>feedback</p>
    <span class="kiss">Kiss: {{getKissName.name}}</span>
    <span class="marry">Marry: {{getMarryName.name}}</span>
    <span class="kill">Kill: {{getKillName.name}}</span>
  </div>
</template>
<script>
export default {
  name: 'feedback',
  props: {
    kiss: Object,
    marry: Object,
    kill: Object
  },
  data() {
    return {
      dataKiss: '',
      dataMarry: '',
      dataKill: ''
    }
  },
  computed: {
    getKissName() {
      return { ...this.dataKiss, name: this.kiss['name'] }
    },
    getMarryName() {
      return { ...this.dataMarry, name: this.marry['name'] }
    },
    getKillName() {
      return { ...this.dataKill, name: this.kill['name'] }
    }

  }
}
</script>
<style lang="scss" scoped>
p {
  color: white;
}
span {
  margin: 0.5rem;
}
.kiss {
  color: gold;
  font-weight: bolder;
}
.marry {
  color: yellow;
  font-weight: bolder;
}
.kill {
  color: red;
  font-weight: bolder;
}
</style>