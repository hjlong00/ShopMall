<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'common/swiper'

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 不加判断就会发送4次，因为有4张图，现在只需要发送一次，用不着防抖，用一个变量来足矣
    imageLoad () {
      if (!this.isLoad) {
        this.$emit('imageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
</style>
