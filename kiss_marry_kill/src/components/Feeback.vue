<template>
  <div>
    <p>feedback</p>
    <span class="kiss">Kiss: {{kiss}}</span>
    <span class="marry">Marry: {{marry}}</span>
    <span class="kill">Kill: {{kill}}</span>
  </div>
</template>
<script>
export default {
  name: 'feedback',
  props: {
    kiss: String,
    marry: String,
    kill: String
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