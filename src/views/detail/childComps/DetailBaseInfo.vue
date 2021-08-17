<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount !== ''" class="discount">{{
        goods.discount
      }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 13px;
  color: #999;
  border-bottom: 4px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.info-price .n-price {
  font: size 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 14px;
  margin-left: 8px;
  text-decoration: line-through;
}
.info-price .discount {
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 12px;
  margin-left: 8px;
  border-radius: 5px;
  padding: 2px 5px;

  position: relative;
  top: -6px;
}
.info-other {
  display: flex;
  margin-top: 15px;
  line-height: 30px;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}
.info-service {
  display: flex;
  line-height: 60px;
  justify-content: space-between;
}
.info-service img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 1px;
  margin-right: 3px;
}
.info-service span {
  font-size: 13px;
  color: #999;
}
</style>
