<template>
  <div>
    <grid-view
      :cols="3"
      :v-margin="20"
      :lineSpace="15"
      v-if="subcategories.list"
    >
      <div class="item" v-for="item in subcategories.list" :key="item.link">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'

export default {
  name: 'TabContentCategory',
  components: { GridView },
  props: {
    subcategories: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
