<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="puser-icon">
        <svg class="privateImage-svg left" fill="#DCDCDC">
          <use xlink:href="#icon-touxiang"></use>
        </svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg class="icon-mobile" fill="#fff">
              <use xlink:href="#icon-shouji"></use>
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg class="arrow-svg right" fill="#fff">
        <use xlink:href="#icon-you-"></use>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {

    }
  },
}
</script>
<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}
#user-info .privateImage-svg {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
}
.left {
  float: left;
}

#user-info .arrow-svg {
  width: 20px;
  height: 20px;
  margin-top: 18px;
}
#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}
#user-info .login-info .phone {
  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;

  position: relative;
}
#user-info .login-info .phone .icon-mobile {
  position: absolute;
  width: 18px;
  height: 18px;

  left: -18px;
  top: -1px;
}
</style>
