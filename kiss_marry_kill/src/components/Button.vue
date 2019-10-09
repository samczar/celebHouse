<template>
  <div>
    <button @click="eventHandler" :disabled="disabled" class="button button--yellow">{{ title }}</button>
  </div>
</template>

<script>

export default {

  name: 'ButtonComponent',
  props: {
    eventHandler: { type: Function },
    title: String,
    disabled: Boolean

  }
}
</script>

<style lang="scss" scoped>
.button {
  width: 5rem;
  height: 1rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  &--yellow {
    background-color: yellow;
  }
  &:hover {
    background-color: green;
  }
  &:disabled {
    background-color: gray;
  }
}
</style>
