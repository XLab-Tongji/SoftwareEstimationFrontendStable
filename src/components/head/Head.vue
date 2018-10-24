<!-- 头部组件 -->
<template>
  <div class="head_home">
    <!-- <router-link to='/'>智码</router-link>
    <router-link to="/projects">项目</router-link> -->
    <router-link to="/ver">估算</router-link>
    <!-- <a class="a1" href="http://172.16.101.90:8080" title="测试" target="_blank">代码托管</a>
    <a>帮助</a>
    <div class="head_center"> -->
      <a><router-link to="/register">注册</router-link></a>
      <a><router-link to="/login">登录</router-link></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  mounted: function() {
    //窗口滚动事件
    var beforeScroll = {
      'background-color': 'transparent',
      'color': '#ffffff',
      'border': 'none'
    };
    var afterScroll = {
      'background-color': '#ffffff',
      'color': '#323A45',
      'height': '50px',
      'border-bottom': '1px solid #DDD'
    }
    $(window).bind('scroll', function() {
      var topValue = $(window).scrollTop();
      if (topValue >= 390) {
        $('.head_home').fadeIn('slow');
        $('.head_home').css(afterScroll);
        $('.head_center > a').css({ 'color': '#323A45' });
      }
      else if (topValue < 400 && topValue > 10) {
        $('.head_home').fadeOut('slow');
      }
      else {
        $('.head_home').fadeIn('slow');
        $('.head_home').css(beforeScroll);
        $('.head_center > a').css({ 'color': '#ffffff' });
      }
    })
  }
}
</script>

<style>
.head_home{
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 3;
  color: #ffffff;
  padding-top: 30px;
  padding-bottom:50px;
}

.head_home>a {
  margin-left: 30px;
  cursor: pointer;
  color: inherit;
}

.head_home :last-child {
  /* display: inline; */
  float: right;
  margin-right: 10px;
  color: inherit;
}

</style>

