<!-- 头部组件样式2 -->
<template>
<div class="head_home">
  <!-- <router-link to='/'>智码</router-link>
  <router-link to="/projects">项目</router-link> -->
  <router-link to="/ver">估算</router-link>
  <!-- <a href="http://172.16.101.90:8080" title="测试" target="_blank">代码托管</a>
  <a>帮助</a> -->

  <div class="head_center">
    <el-dropdown>
      <span class="el-dropdown-link">
        个人中心<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><router-link style="color: #000000" to="/center">个人中心</router-link></el-dropdown-item>
        <el-dropdown-item><router-link style="color: #000000" to="/center">设置</router-link></el-dropdown-item>
        <el-dropdown-item divided><a @click ="logout" style="color: black">退出</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>

</template>

<script>
export default {
  name: "Header2",
  methods:{
    logout:function(){
      this.$store.commit("reset");
      sessionStorage.removeItem("tokenid");
      this.$router.push( '/' );
    }
  }
};
</script>
