<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'


import { getHomeMultidata } from 'network/home'

export default {
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created () {
    // 1，请求多个数据
    //console.log(this); <- 打印 created 的this
    //知识补充：为什么这里的箭头函数里面可以使用this.result
    //因为它的外层created()this指向当前的组件
    //所以这里的箭头函数里的this就能找到当前的作用域
    getHomeMultidata()
      .then((res) => {
        // console.log(res)  //函数执行完的结果是会被内存回收，得用变量把数据存起来
        this.banners = res.data.banner.list   // 保存数据
        this.recommends = res.data.recommend.list   // 保存数据
      }).catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}
</style>

