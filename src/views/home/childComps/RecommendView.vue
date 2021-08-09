<template>
  <div id="recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
#recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee ;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 80px;
  height: 80px;
  margin:12px 0;
}
</style>
