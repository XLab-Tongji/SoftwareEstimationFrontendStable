<template>
  <div>
    <el-card class="header_info">
      <div><img src="../../assets/coder.png" class="header_image" style="margin-left:0px;"></div>
      <div style="padding:0.5rem 1.5rem; font-size: 20px">
        <span>{{this.$store.state.user.username}}</span>
        <el-button type="primary" class="header_button">升级为团队</el-button>
      </div>
    </el-card>
    <div class="detail_info">
      <div>
        <span style="font-size:20px;">账户信息</span>
        <hr>
        <span style="font-size: 10px; opacity: 0.5;">您的个人信息不会透露给第三方</span>
        <div class="bar_type">
          <div style="margin-top: 2rem">
            <el-button type="primary" class="header_button" @click="changeView(message)"><i class="el-icon-edit"
                                                                                            style="margin-right:0.4rem;"></i>{{message}}
            </el-button>
            <div v-show="!edit">
              <span style="margin-right:5rem;">工作邮箱</span>
              <span>{{this.email}}</span>
            </div>
            <div v-show="edit" style="display: flex">
              <span style="margin-right:5rem;">工作邮箱</span>
              <div class="input">
                <el-input placeholder="请输入邮箱"  v-model="newEmail">{{this.email}}</el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="bar_type">
          <div style="margin-top: 2rem">
            <div v-show="!edit">
              <span style="margin-right:5rem;">工作手机</span>
              <span>{{this.phone}}</span>
            </div>
            <div v-show="edit" style="display: flex">
              <span style="margin-right:5rem;">工作手机</span>
              <div class="input">
                <el-input placeholder="请输入手机号"  v-model="newPhone">{{this.phone}}</el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import server from '../../../config/index';
  import axios from '../../axios/http';

  export default {
    name: "Account",
    created() {
      this.getAccount();
    },
    data() {
      return {
        message: "",
        edit: false,
        email: '',
        newEmail: '',
        phone: '',
        newPhone: '',
        name: '',
        url: server.url + '/api/account'
      }
    },
    methods: {
      getAccount() {
        this.message = "修改";
        this.email = this.$store.state.user.email;
        this.phone = this.$store.state.user.mobile;
        this.name = this.$store.state.user.username;
      },
      saveAccount() {
        this.$store.commit('setEmail', this.newEmail);
        this.$store.commit('setMobile', this.newPhone);
        this.$store.commit('setUsername', this.name);
        this.getAccount();
      },
      changeView(message) {
        if (message == "修改") {
          this.message = "保存";
        }
        else if (this.newEmail != null || this.phone != null) {
          this.update();
          this.message = "修改";
        } else {
          this.message = "修改";
        }
        this.edit = !this.edit;
      },
      update() {
        axios(
          {
            url: this.url,
            method: "POST",
            data: {
              email: this.newEmail,
              mobile: this.newPhone,
              name: this.name
            },
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }
        ).then(function (response) {
          if (response.data.status == "200") {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.saveAccount();
          }
        }.bind(this))
          .catch(function (error) {
            if (error.status == 500) {
              alert('服务器错误');
            }
          });
      }
    }
  }
</script>
<style>
  .header_info {
    margin: 3rem 4rem 0;
    height: 10rem;
    position: relative;
  }

  .header_image {
    width: 8rem;
    height: 8rem;
    float: left;
    border: 1px;
    border-radius: 6px;
  }

  .header_button {
    float: right;
    height: 24px;
    font-size: 12px;
    padding: auto;
    padding-top: 6px;
  }

  .detail_info {
    font-size: 14px;
    margin: 2rem 4rem 0;
    position: relative;
  }

  .bar_type {
    margin-top: 2rem;
  }
</style>
