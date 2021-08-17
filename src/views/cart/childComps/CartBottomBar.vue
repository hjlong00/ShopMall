<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" @click.native="checkAll"/>
      <span>全选</span>
    </div>
    <div class="checkoutLength" v-show="isCheckout">
      已选 {{ checkoutLength }} 件
    </div>
    <div class="total-price">合计：{{ totalPrice }}</div>
    <div class="checkout">结算</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: { CheckButton },
  data () {
    return {
      isCheckout: false,
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkoutLength () {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
  },
  mounted () {
    this.isCheckout = this.checkoutLength > 0
  },
  methods: {

  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #ccc;
  /* background-color: #eee; */
}
.check-content {
  display: flex;
  align-items: center;
}
.check-button {
  /* line-height: 20px; */
  width: 20px;
  height: 20px;
  margin: 0 10px;
}
.check-content span {
  font-weight: 520;
}
.checkoutLength {
  font-size: 13px;
  color: #ccc;
  position: absolute;
  right: 185px;
  top: -3px;
}
.total-price {
  margin-left: 125px;
}
.checkout {
  position: absolute;
  top: 2px;
  right: 20px;
  background-color: var(--color-tint);
  border-radius: 10%;
  width: 42px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
</style>
