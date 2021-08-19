<template>
  <div id="list">
    <div v-for="item in listData" :key="item.icon" class="item">
      <span class="icon">
        <svg :fill="item.iconColor">
          <use :xlink:href="item.icon"></use>
        </svg>
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    listData: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
}
#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}
.icon svg {
  width: 18px;
  height: 18px;
}
.item .icon svg {
  margin-top: 10px;
  position: absolute;
  left: 20px;
  top: 1.5px;
}
.item .info {
  margin-left: 40px;
  padding-left: 15px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.item:last-child .info {
  border-bottom: none;
}
</style>
