<!-- 注册 -->
<template>
  <div class="register_section">
  <HeadBarLight2></HeadBarLight2>

  <div class="register_content">
    <p>
      注册
    </p>
    <el-input  placeholder="请输入用户名" v-model="account"></el-input>
    <el-input  placeholder="请输入密码" type="password" v-model="pwd"></el-input>
    <el-input  placeholder="请再次输入密码" type="password" v-model="pwd_rep"></el-input>
    <el-input  placeholder="请输入邮箱" type="email" v-model="email"></el-input>
    <el-checkbox style="margin-left: 5px; padding-top: 5px; float: left" v-model="checked">我已同意相关协议</el-checkbox>
  <el-button class="login_button" type="primary" @click="regist">提交</el-button>
  </div>
</div>

</template>

<script>
import HeadBarLight2 from "../components/head/HeadBarLight2.vue";
import server from '../../config/index';
import axios from '../axios/http';

export default {
  name: "Register",
  components: { HeadBarLight2 },
  data(){
    return{
      account:'',
      pwd:'',
      pwd_rep:'',
      email:'',
      error:'',
      checked: false,
      url: server.estimation + '/account/register',
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods:{
    changeChecked:function () {
      this.checked = !this.checked;
    },
    regist:function () {
      if(this.pwd != this.pwd_rep){
        this.$message({
          message: '请确认两次输入的密码相同',
          type: 'warning'
        });
        this.pwd_rep= '';
        this.pwd= '';
      }
      else if(this.account == ""){
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        });
      }
      else if(this.pwd == ""){
        this.$message({
          message: '请输入密码',
          type: 'warning'
        });
      }
      else if(this.pwd_rep == ""){
        this.$message({
          message: '请再次输入密码',
          type: 'warning'
        });
      }
      else if(this.checked == false){
        this.$message({
          message: '请阅读相关协议并勾选同意以继续',
          type: 'warning'
        });
      }
      else{
        axios.post(this.url, {"username": this.account, "email": this.email, "password": this.pwd}).then(function (response){
          if(response.status == 200) {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.account='';
            this.pwd= '';
            this.pwd_rep= '';
            this.$router.push('/center');
          }
        }.bind(this)).catch(function(error){
          if(error.response){
            switch (error.response.status) {
                  case 400:
                    alert('注册失败');
                    break;
                  case 500:
                    alert('服务器错误');
                    break;
            }
          }
        });
      }
    }
  }
};
</script>

<style>
.register_content {
  text-align: center;
  margin-top: 200px;
  width: 20%;
  margin-left: auto;
  margin-right: auto;
}

.register_content > .el-input {
  margin: 5px;
}

.register_content > .el-button {
  margin: 8px 5px;
}

.header {
  position: fixed;
  top: 0px;
  width: 100%;
  color: #323a45;
}

.no_account{
  float: right;
  cursor: pointer;
  font-size: 12px;
}
</style>

