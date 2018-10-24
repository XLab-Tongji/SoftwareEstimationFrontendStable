<!-- 头部组件样式2 -->

<template>
<div class="headerLight" >
  <div class="sitetitle" style="padding-top:30px; margin-left: 30px; float:left; padding-bottom:30px;">
    <router-link to="/" style="color: black;">智码</router-link>
    <router-link to="/projects" style="color: black; padding-left:30px;">项目</router-link>
    <router-link to="/ver" style="color: black; padding-left:30px;">估算</router-link>
    <a style="color: black; padding-left:30px;" href="http://172.16.101.90:8080" title="测试" target="_blank">代码托管</a>
    <a style="color: black; padding-left:30px;">帮助</a>
  </div>

    <el-dropdown class="head_menu">
      <span class="el-dropdown-link">
        <el-row :gutter="20" type="flex" align="middle" style="margin-top:5px;float:right">

          <el-col :span="12"><span class="user_name">你好,{{this.username}}</span></el-col>
          <el-col :span="6">
            <img src="../../assets/coder.png" class="header_image" style="margin-left:0px;height: 40px; width: 40px">
          </el-col>
          <el-col :span="2">
            <i class="el-icon-caret-bottom el-icon--right" style="padding-top:8px"></i>
          </el-col>
        </el-row>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><router-link to="/center" style="color: black">个人中心</router-link></el-dropdown-item>
        <el-dropdown-item><router-link to="/center" style="color: black">我的项目</router-link></el-dropdown-item>
        <el-dropdown-item><router-link to="/center" style="color: black">我的报价单</router-link></el-dropdown-item>
        <el-dropdown-item>代码托管</el-dropdown-item>
        <el-dropdown-item divided><a @click ="logout" style="color: black">退出</a></el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>

</div>



</template>

<script>

export default {
  name: "HeadBarLight",
  computed:{
    username(){
      return this.$store.state.user.username
    }
  },
  methods:{
    logout:function(){
      this.$store.commit("reset");
      sessionStorage.removeItem("tokenid");
      this.$router.push( '/' );
    }
  }
};
</script>

<style>
.headerLight {
  position: fixed;
  top: 0px;
  width: 100%;
  color: #323a45;
  border-bottom: 1px solid #ddd;
  background: #EEF1F5;
  z-index: 1;
}

.user_name{
  float:right;
}

.headbar{
  background-color: #EEF1F5;
  padding-top:50px;
}

.headbar>el-menu-item{
  background-color: #323a45;
  active-text-color: #000000;
}

.head_menu{
  float:right;
  margin-right: 30px;
  padding-top: 15px;
}
</style>

