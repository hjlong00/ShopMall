import { debounce } from './utils'

export const itemListerMixin = {
  data () {
    return {
      itemImgLister: null,
      newRefresh: null
    }
  },
  mounted () {
    // 这个地方img标签确实被挂载，但是其中的图片还没有占据高度

    //用常量定义一个 防抖函数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

    // 对监听的事件进行保存
    this.itemImgLister = () => { this.newRefresh() }

    this.$bus.$on('itemImageLoad', this.itemImgLister)
  },
}

// 返回顶部mixin
import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      // 是否显示按钮，默认false
      isShowBackTop: false,
    }
  },
  methods: {
    // 返回顶部
    backTop () {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    // 监听是否显示返回按钮
    listenShowBackTop (position) {
      this.isShowBackTop = Math.abs(position.y) > 1000
    }
  },
}

export const tabControlMixin = {
  data () {
    return {
      currentType: 'pop'
    }
  },
  methods: {
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
      console.log(this.currentType);
    }
  },
}
