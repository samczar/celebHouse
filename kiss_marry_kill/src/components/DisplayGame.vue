<template>
  <div>
    <img :src="image" :alt="name" style="width:200px;height:200px;" />
    <p>{{name}}</p>
  </div>
</template>
<script>
export default {
  name: 'displayGame',
  props: [image, name]

}
</script>