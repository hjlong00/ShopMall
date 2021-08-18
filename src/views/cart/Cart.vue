<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部的汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 但是这里代码有些重复了
    /*  carLength () {
           return this.$store.getters.carLength
         },
     */

    // 直接用vuex里的getters
    // 可以直接用getters里的名字
    // ...mapGetters(['carLength', 'carList'])
    // 也可以改个名字用 通过映射完成
    ...mapGetters({ length: 'cartLength' })

  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
}
</style>
