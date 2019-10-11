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
img {
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
}
ul {
  li {
    list-style-type: none;
  }
}
</style>