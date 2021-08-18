<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isCheckAll"
        @click.native="checkAll"
      />
      <span>全选</span>
    </div>
    <div class="checkoutLength" v-show="checkoutLength > 0">
      已选 {{ checkoutLength }} 件
    </div>
    <div class="total-price">合计：{{ totalPrice }}</div>
    <div class="checkout" @click="checkOut">结算</div>
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
    isCheckAll () {
      if (this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length) // 数字取反就是false， 0取反是true
      return !(this.cartList.find(item => !item.checked))
    }
  },
  // watch: {
  //   checkoutLength (val, oldVal) {
  //     console.log(val, oldVal);
  //   }
  // },
  mounted () {
  },
  methods: {
    checkAll () {
      if (this.isCheckAll) {
        return this.cartList.forEach(item => {
          return item.checked = false
        });
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    // 未选择商品时点结算的弹窗
    checkOut () {
      if (!this.checkoutLength) {
        this.$toast.show('还未选择商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 45px;
  line-height: 45px;
  border-top: 1px solid #ccc;
  /* background-color: #eee; */
}
.check-content {
  display: flex;
  align-items: center;
}
.check-button {
  /* line-height: 20px; */
  width: 21px;
  height: 21px;
  margin: 0 10px;
  align-items: center;
  justify-content: center;
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
