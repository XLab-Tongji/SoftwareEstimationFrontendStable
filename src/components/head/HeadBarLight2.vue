<!-- 头部组件样式2 -->

<template>
<div class="headerLight2" >
  <div class="sitetitle" style="padding-top:30px; margin-left: 30px; float:left; padding-bottom:30px;">
    <router-link to="/" style="color: black;">智码</router-link>
    <router-link to="/projects" style="color: black; padding-left:30px;">项目</router-link>
    <router-link to="/ver" style="color: black; padding-left:30px;">估算</router-link>
    <a style="color: black; padding-left:30px;" href="http://172.16.101.90:8080" title="测试" target="_blank">代码托管</a>
    <a style="color: black; padding-left:30px;">帮助</a>
  </div>

  <router-link class="button2" to="/register">注册</router-link>
  <router-link class="button2" to="/login">登录</router-link>
</div>

</template>

<script>
export default {
  name: "HeadBarLight2"
};
</script>

<style>
.headerLight2 {
  position: fixed;
  top: 0px;
  width: 100%;
  color: #323a45;
  border-bottom: 1px solid #ddd;
  background: #EEF1F5;
  z-index: 1;
}

.button2{
  float:right;
  margin-right: 30px;
  padding-top: 30px;
  color: #474b48;
  font-size: 14px;
}
</style>

