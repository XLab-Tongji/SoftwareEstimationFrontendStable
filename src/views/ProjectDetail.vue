<!--单个需求详情-->
<template>
  <div>
    <div class="project_detail">
      <head-bar-light style="z-index: 1" v-show="isLogin"></head-bar-light>
      <head-bar-light2 style="z-index: 1" v-show="!isLogin"></head-bar-light2>

      <div class="single_requirement">
        <div style="background: #FFFFFF">
          <div class="requirement_summary">

            <div style="margin-left: 30px; padding-top: 25px;">
              <el-row>
                <el-col class="requirement_name">{{form.name}}<span class="requirement_state">{{form.state}}</span>
                </el-col>
              </el-row>
            </div>

            <div style="margin-left: 30px; padding-top: 15px;">
              <el-row :gutter="0" type="flex" justify="left" align="middle">
                <el-col :span="2" class="summary_content">
                  <span style="background-color: #8796A8; color: #FFFFFF;">No.{{projectId}}</span>
                </el-col>
                <el-col :span="5" class="summary_content">需要项目经理：{{form.need_manager ? "是" : "否"}}</el-col>
              </el-row>
            </div>

            <div style="margin-left: 30px; padding-top: 30px;">
              <el-row :gutter="20" type="flex" justify="left" align="middle">
                <el-col :span="4" class="summary_content"><span style="color: #979FA8">金额：</span>¥0</el-col>
                <el-col :span="4" class="summary_content"><span style="color: #979FA8">类型：</span>{{form.type}}</el-col>
                <el-col :span="6" class="summary_content"><span
                  style="color: #979FA8">开始时间：</span>{{new Date(form.date1).toLocaleString().replace(/\D{2}\d{1,2}:\d{1,2}:\d{1,2}/, '')}}
                </el-col>
                <el-col :span="6" class="summary_content"><span
                  style="color: #979FA8">结束时间：</span>{{new Date(form.date2).toLocaleString().replace(/\D{2}\d{1,2}:\d{1,2}:\d{1,2}/, '')}}
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" @click="participateProject()" style="float: right; margin-right: 30px;"
                             plain v-bind:disabled="!isAble"  v-show="!isEnroll">参与项目
                  </el-button>
                  <el-button type="primary" @click="participateProject()" style="float: right; margin-right: 30px;"
                             plain v-bind:disabled="true" v-show="isEnroll">已参与
                  </el-button>
                </el-col>
              </el-row>
            </div>

            <div style="margin-left: 30px; margin-right: 30px; padding-top: 40px;">

              <el-row :gutter="20" type="flex" justify="left" align="middle" style="border-top:1px solid #979FA8;">
                <div style="height:8px">
                </div>
              </el-row>

              <el-row :gutter="20" type="flex" justify="left" align="middle">
                <el-col :span="4">
                  <el-button type="text" icon="el-icon-picture" class="summary_choice">
                    <i class="el-icon-picture"></i> 钱太少   count
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" icon="el-icon-picture" class="summary_choice">
                    <i class="el-icon-picture"></i> 时间紧   count
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" icon="el-icon-picture" class="summary_choice">
                    <i class="el-icon-picture"></i> 不可行   count
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" icon="el-icon-picture" class="summary_choice">
                    <i class="el-icon-picture"></i> 技术难   count
                  </el-button>
                </el-col>
                <el-col :span="10">
                  <div class="summary_choice" style="float: right">报名人数  count</div>
                </el-col>
              </el-row>

              <el-row :gutter="20" type="flex" justify="left" align="middle" style="border-bottom:1px solid #979FA8;">
                <div style="height:8px">
                </div>
              </el-row>

            </div>
          </div>

          <div class="requirement_info">
            <div style="margin-left: 30px; padding-top: 60px;">
              <el-row class="info_title">项目描述</el-row>
              <div style="height:10px"></div>
              <el-row>
                <el-col class="info_detail">{{form.description}}</el-col>
              </el-row>
              <div style="height:10px"></div>
            </div>
          </div>

          <div class="developer" v-show=true>
            <el-row class="info_title">已报名开发者</el-row>
            <div style="height:10px"></div>
            <el-table :data="tableData" style="width: 100%"
                      @row-click="checkWorker">
              <el-table-column prop="username" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" width="180">
              </el-table-column>
              <el-table-column prop="mobile" label="电话号码">
              </el-table-column>
            </el-table>
            <div style="height:10px"></div>
          </div>

        </div>
        <div style="height: 80px"></div>
      </div>
    </div>

    <div class="detail_footer">
      同济大学 XLab
    </div>
  </div>
</template>

<script>
  import HeadBarLight from "../components/head/HeadBarLight";
  import HeadBarLight2 from "../components/head/HeadBarLight2.vue"
  import server from '../../config/index';
  import axios from '../axios/http';
  import swal from 'sweetalert';

  export default {
    name: "ProjectDetail",
    components: {
      HeadBarLight,
      HeadBarLight2,
    },
    data() {
      return {
        isLogin: false,
        isAble: false,
        isEnroll: false,
        username: "",
        form: {
          name: '名称',
          type: '类型',
          state: '状态',
          date1: 0,
          date2: 0,
          need_manager: false,
          description: '描述',
          file: null
        },
        tableData: [{
          username: '',
          email: '',
          mobile: ''
        }],
        url: server.url + '/api/requirement/',
        projectId: ''

      }
    },
    created() {
      this.checkToken();
      //this.projectId = this.$store.state.projectId;
      this.projectId = this.$route.query.id;
      this.getProject();
    },
    methods: {
      checkToken: function () {
        if (sessionStorage.tokenid && this.$store.state.user.tokenid !== '') {
          this.isLogin = true;
          this.username = this.$store.state.user.username;
        } else
          this.isLogin = false;
      },
      getProject() {
        axios.get(this.url + this.projectId.toString(), {}).then(response => {
          if (response.data.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.form.name = response.data.result.requirement.requirementName;
            this.form.type = response.data.result.requirement.requirementType;
            if (response.data.result.requirement.requirementState == 0) {
              this.form.state = '招募中';
              this.isAble = this.isLogin && true;
            }
            else if (response.data.result.requirement.requirementState == 1) {
              this.form.state = '开发中';
              this.isAble = this.isLogin && false;
            }
            else if (response.data.result.requirement.requirementState == 2) {
              this.form.state = '已完成';
              this.isAble = this.isLogin && false;
            }
            //需要转换
            this.form.date1 = new Date(response.data.result.requirement.startTime);
            this.form.date2 = new Date(response.data.result.requirement.endTime);
            this.form.need_manager = response.data.result.requirement.needManager == 1 ? true : false;
            this.form.description = response.data.result.requirement.requirementDetail;
            this.tableData = response.data.result.developerList;
            //swal("Error", this.tableData[0].username, "error");
            //判断用户是否已经在列表中
            var i = 0;
            for (i; i < this.tableData.length; i++) {
              if (this.tableData[i].username == this.username) {
                this.isEnroll = true;
                break;
              }
            }
          }
        }).catch(function (error) {
          if (error) {
            switch (error.status) {
              case "400":
                swal("Error", "获取需求内容失败", "error");
                break;
              case "401":
                swal("Error", "查询权限不足", "error");
                break;
              case "404":
                swal("Error", "目标需求不存在", "error");
            }
            if (error.status == 500) {
              swal("Error", "服务器错误", "error");
            }
          }
        });
      },
      participateProject() {
        axios.post(this.url + this.projectId.toString() + '/enroll', {}).then(response => {
          if (response.data.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.$message({
              message: '报名成功',
              type: 'success'
            });
            this.getProject();
            this.isEnroll = true;
          }
        }).catch(function (error) {
          if (error) {
            switch (error.data.status) {
              case "400":
                swal("失败", "报名失败：不能报名自己建立的需求", "error");
                break;
              case "401":
                swal("失败", "报名失败：你已在该项目中", "error");
                break;
              case "404":
                swal("失败", "报名失败：目标项目不存在", "error");
                break;
            }
            if (error.status == 500) {
              swal("Error", "服务器错误", "error");
            }
          }
        });
      },
      checkWorker(row) {
        if (this.isLogin) {
          this.$router.push({path: '/workers', query: {name: row.username, email: row.email, mobile: row.mobile}});
        } else {
          swal("Error", "请先登录!", "error");
        }
      }
    }

  };

</script>

<style>
  .project_detail {
    background: #EEF1F5;
  }

  .single_requirement {
    margin-left: 200px;
    margin-right: 200px;
    padding-top: 120px;
    background: #EEF1F5;
  }

  .detail_footer {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 20px;
    color: #8a8a8a;
  }

  .requirement_summary {
    background: #F7FAFC;
  }

  .requirement_info {
    background: #FFFFFF;
  }

  .requirement_name {
    font-size: 28px;
    color: #2D3238;
  }

  .requirement_state {
    font-size: 16px;
    float: right;
    padding-top: 10px;
    margin-right: 30px;
  }

  .summary_content {
    font-size: 14px;
  }

  .summary_choice {
    font-size: 14px;
    color: #979FA8;
  }

  .info_title {
    font-size: 28px;
    color: #2D3238;
  }

  .info_detail {
    font-size: 14px;
    color: #2D3238;
  }

  .developer {
    margin-left: 30px;
    margin-right: 30px;
  }
</style>
