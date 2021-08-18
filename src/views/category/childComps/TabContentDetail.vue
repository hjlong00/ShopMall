<template>
  <grid-view>
    <goods-list-item
      v-for="item in categoryDetail"
      :key="item.img"
      :goodsItem="item"
    />
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  components: { GridView, GoodsListItem },
  name: 'TabContentDetail',
  props: {
    categoryDetail: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
</style>
