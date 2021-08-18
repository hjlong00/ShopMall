<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    // duration 是持续时间
    show (message = '默认文字', duration = 2000) {
      //旧的设置默认值的方法
      //duration = duration || 2000
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  border-radius: 8px;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
