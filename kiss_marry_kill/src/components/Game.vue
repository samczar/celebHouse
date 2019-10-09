<template>
  <div>
    <img :src="image" :alt="name" style="width:200px;height:200px;" />
    <p>{{name}}</p>
  </div>
</template>

<script>

export default {
  name: 'game',
  props: {
    image: String,
    name: String
  }

}


</script>

<style lang="scss" scoped>
ul {
  li {
    list-style-type: none;
  }
}
</style>