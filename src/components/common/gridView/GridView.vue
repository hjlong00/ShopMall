<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GridView',
  props: {
    // 默认列数
    cols: {
      type: Number,
      default: 2
    },
    // 默认上下边距
    vMargin: {
      type: Number,
      default: 8
    },
    // 默认左右边距
    hMargin: {
      type: Number,
      default: 8
    },
    // 默认格子左右之间的间距
    itemSpace: {
      type: Number,
      default: 8
    },
    // 默认格子上下的间距
    lineSpace: {
      type: Number,
      default: 8
    }
  },
  mounted: function () {
    setTimeout(this._autoLayout, 20)
  },
  updated: function () {
    this._autoLayout()
  },
  methods: {
    // 自动布局
    _autoLayout: function () {
      //  1.获取gridEl和children
      // 获取gridView DOM元素
      let gridEl = this.$refs.gridView
      // 获取gridView DOM元素下的所有子元素，`[children 属性返回元素的子元素节点的集合]`
      let children = gridEl.children

      // 2.设置gridEl的内边距
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px`

      // 3,计算item的宽度 父元素的宽度- 左右边距-列中间的间隔宽度（2列就1个宽度，3列就2个宽度）/ 列数
      let itemWidth = (gridEl.clientWidth - 2 * this.hMargin - (this.cols - 1) * this.itemSpace) / this.cols;

      // 4,循环children里的每个元素
      for (let i = 0; i < children.length; i++) {
        let item = children[i];
        item.style.width = itemWidth + 'px';
        // 自动设置子元素之间的间隔
        if ((i + 1) % this.cols !== 0) {
          item.style.marginRight = this.itemSpace + 'px'
        }
        // 换行后自动设置上下间隔
        if (i >= this.cols) {
          item.style.marginTop = this.lineSpace + 'px'
        }
      }
    }
  },
}
</script>

<style scoped>
.grid-view {
  display: flex;
  /* 规定灵活的项目在必要的时候拆行或拆列。 */
  flex-wrap: wrap;
}
</style>
