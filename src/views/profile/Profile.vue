<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">威龙商城</div></nav-bar>
    <user-info></user-info>
    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view :list-data="orderList" class="order-list" />
    <list-view :list-data="serviceList" class="service-list" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import UserInfo from './childComps/UserInfo'
import ListView from './childComps/ListView'

export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data () {
    return {
      orderList: [
        { icon: '#icon-xiaoxi', iconColor: '#ff8198', info: '我的消息' },
        { icon: '#icon-gouwudai', iconColor: '#fc7b53', info: '积分商城' },
        { icon: '#icon-chess-queen', iconColor: '#ffc636', info: '会员卡' },
      ],
      serviceList: [
        { icon: '#icon-gouwuche', iconColor: '#ff8198', info: '我的购物车' },
        { icon: '#icon-xiazai', iconColor: '#ff8198', info: '下载购物APP' },
      ]
    }
  },
}
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
}
.account {
  display: flex;
}
.account-item {
  flex: 1;
  background-color: #fff;
  text-align: center;
  margin-right: 1px;
}
.account-item:last-child {
  margin-right: 0px;
}
.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}
.account-item .balance {
  color: #ff5f3e;
  font-weight: 700;
  font-size: 24px;
}
.account-info {
  margin-top: 6px;
}
.order-list,
.service-list {
  margin-top: 12px;
}
</style>
