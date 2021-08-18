<template>
  <div class="category">
    <nav-bar class="nav-bar"> <div slot="center">商品分类</div> </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <scroll id="tab-content">
        <div>
          <tab-content-category :subcategories="showSubcategory" />
          <tab-control
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
          />
          <tab-content-detail :categoryDetail="showCategoryDetail" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import TabControl from '../../components/content/tabControl/TabControl'
import TabContentDetail from './childComps/TabContentDetail'

import Scroll from 'components/common/scroll/Scroll'


import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'
import { tabControlMixin } from '@/common/mixin'

export default {
  name: 'Category',
  data () {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    }
  },
  mixins: [tabControlMixin],
  components: { NavBar, TabMenu, Scroll, TabContentCategory, TabControl, TabContentDetail },
  created () {
    // 1.请求分类数据
    this._getCategory();
  },
  computed: {
    showSubcategory () {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail () {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    // 获取数据
    _getCategory () {
      getCategory().then(res => {
        // console.log(res);
        // 1,获取分类的数据
        this.categories = res.data.category.list

        // 2,初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: { 'pop': [], 'new': [], 'sell': [] },
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories (index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = { ...this.categoryData }
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')

      })
    },
    _getCategoryDetail (type) {
      //1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = { ...this.categoryData }
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem (index) {
      this._getSubcategories(index)
    }
  }
}
</script>

<style scoped>
.category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-size: 16px;
  color: #fff;
  font-weight: 700;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
}
</style>
