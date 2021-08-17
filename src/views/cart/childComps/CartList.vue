<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in list" :key="item.iid" :product="item" />
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    // 从vuex的getters里拿到产品属性列表
    ...mapGetters({ list: 'cartList' })
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
