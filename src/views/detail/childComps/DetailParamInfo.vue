<template>
  <!-- Object.keys(obj) 该方法用于遍历对象，参数是obj -->
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">
    <!-- 这里使用了多层嵌套for in  -->
    <table v-for="(items1, index1) in paramInfo.sizes" :key="index1">
      <tr v-for="(tr, index2) in items1" :key="index2">
        <td v-for="(td, index3) in tr" :key="index3">{{ td }}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(items2, index4) in paramInfo.infos" :key="index4">
        <td class="info-param-key">{{ items2.key }}</td>
        <td class="info-param-value">{{ items2.value }}</td>
      </tr>
    </table>
    <!-- 因为有的没有图片image，所以先判断是否有图片，再决定后面的工作，提高性能 -->
    <div v-if="paramInfo.image.length !== 0" class="info-img">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    paramInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.info-param-key {
  width: 75px;
}
.info-param-value {
  color: #eb4868;
}
.info-img {
  width: 100%;
}
</style>
