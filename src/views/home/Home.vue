<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control
      ref="tabcontrol1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="backToTop"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @imageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        ref="tabcontrol2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from '@/common/utils'

export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created () {
    // 1，请求多个数据
    this.getHomeMultidata()

    // 2,请求商品据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  // 活跃时
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  // 不活跃时
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /*
     * 网络请求相关的方法
     */
    getHomeMultidata () {
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
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成下拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },

    /*
    * 事件监听相关的方法
    */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    backToTop (position) {
      // console.log(position);
      this.isShow = Math.abs(position.y) > 1000

      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    loadMore () {
      // console.log('爸爸收到');
      this.getHomeGoods(this.currentType)
    },
    // 获取tabControl的offsetTop值
    swiperImageLoad () {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    }

  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
  /*
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>

