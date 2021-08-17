<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>

<style scoped>
.check-button {
  border: 2px solid var(--color-tint);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: relative;
}
.check {
  background-color: var(--color-tint);
}
.check-button img {
  position: absolute;
  left: 1.5px;
  top: 2px;
  width: 75%;
}
</style>
