<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <div class="hot" ref="recommend">热门推荐</div>
      <goods-list class="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'



import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'
import { itemListerMixin, backTopMixin } from '@/common/mixin'
import { debounce } from '@/common/utils'
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  created () {
    // 1,保存iid
    this.iid = this.$route.params.iid

    // 2,根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // ~1，获取轮播图数据
      // ~ console.log(res.result);
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      // ~2,获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // ~3,获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // ~4,保存商品的详情数据
      this.detailInfo = data.detailInfo

      // ~5,保存商品的参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // ~6,获取评论信息 , 如果有就获取
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }

    })

    // ~3,请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommend = res.data.list
    })

    // ~4,给getThemeTopY 赋值 (对给getThemeTopY赋值的操作进行防抖)
    // ~记录['商品', '参数', '评论', '推荐']的高度
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.offsetTop)
      // 这里给getThemeTopY再push一个js里能表示的最大值，用于 方法二 的判断
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);

    }, 100)
  },
  mixins: [itemListerMixin, backTopMixin],

  methods: {
    // 详情页刷新
    imgLoad () {
      this.newRefresh(),
        this.getThemeTopY()
    },

    // 从子组件导航栏传来的事件
    // 根据子组件点击时产生的参数，来跳到对应的页面高度
    titleClick (index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },

    //获取当前滚动高度,同时和themeTopYs [0, 7903, 8538, 8876] 数组做对比
    contentScroll (position) {
      // console.log(position);
      // ~1,获取y值
      const positionY = -position.y

      // ~ 对比
      /*  ↓ 分析： [0, 7903, 8538, 8876]
          情况一：  this.themeTopYs[i]< positionY < this.themeTopYs[i+1]
          positionY 在0和7903之间，index=0
          positionY 在7903和8538之间，index=1
          positionY 在8538和8876之间，index=2
          情况二： >= 8876后 this.themeTopYs[i+1] 取不到值，返回undefined，就没法判断了
          positionY >= 8876，index=3
      */
      /* for in 循环里面的 i 是字符串String类型，非数字类型，可以用 *1 的方式强制转化成数字类型
          或者用 for(let i=0; i < this.themeTopYs.length; i++ )

      for (let i in this.themeTopYs) {
         console.log(typeof (i)); 通过打印可以确认是String类型
        if (positionY > this.themeTopYs[i * 1] && positionY < this.themeTopYs[i * 1 + 1]) {
          console.log(i);
        }

      }
      */
      // 方法一：
      /*
      let length = this.themeTopYs.length
       for (let i = 0; i < length; i++) {
         // this.currentIndex !== i 这个条件可以让判断没有那么频繁
         if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
           this.currentIndex = i
           // console.log(this.currentIndex);
           this.$refs.nav.currentIndex = this.currentIndex
         }
       }
       */
      // 方法二： 再往数组里push一个无穷大的数
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && (positionY > this.themeTopYs[i * 1] && positionY < this.themeTopYs[i * 1 + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // backTopMixin带来的方法，判断是否显示返回图标
      this.listenShowBackTop(position)
    },

    ...mapActions(['addCart']),
    addToCart () {
      // 1，获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid

      // 2,添加到购物车. 通过dispatch提交 actions 处理
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res, 2000)
      })
    }
  },
  destroyed () {
    // 2，取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgLister)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* position: absolute;
  top: 44px;
  bottom: 49px; */
  height: calc(100% - 44px - 59px);
}
.content .hot {
  box-sizing: border-box;
  height: 16px;
  line-height: 16px;
  margin: 15px;
}
.recommend {
  margin-top: 10px;
}
</style>
