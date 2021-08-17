<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-top">
      <div class="comment">用户评价</div>
      <div class="more">更多<i class="arr-right"></i></div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <div>{{ commentInfo.user.uname }}</div>
    </div>
    <p>{{ commentInfo.content }}</p>
    <div>
      <span>{{ commentInfo.created | showDate }}</span>
      <span>{{ commentInfo.style }}</span>
    </div>
    <div class="commtent-img">
      <img :src="item" v-for="item in commentInfo.images" :key="item" />
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils";

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    showDate (value) {
      let date = new Date(value * 1000);
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-top {
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.info-top .comment {
  font-size: 15px;
  float: left;
}
.info-top .more {
  float: right;
  font-size: 13px;
  margin-right: 12px;
}
.info-user {
  box-sizing: border-box;
  height: 42px;
  margin: 10px 0;
}
.info-user img {
  display: block;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  float: left;
}
.info-user div {
  font-size: 15px;
  float: left;
  line-height: 42px;
  margin-left: 10px;
  /* position: relative;
  top: 15px; */
}
.comment-info p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.comment-info div span {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
  margin-right: 5px;
}

.commtent-img img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
  margin-top: 10px;
}
</style>
