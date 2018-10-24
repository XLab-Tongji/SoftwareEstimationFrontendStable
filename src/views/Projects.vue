<!-- 项目市场 -->
<template>
  <div class="projects">
    <!-- 头部 -->
    <div v-show="!isLogin">
      <Head></Head>
    </div>
    <div v-show="isLogin">
      <Head2></Head2>
    </div>
    <!-- 轮播 -->
    <div>
      <img src="../assets/projectbackground.jpg" style="height: 400px; width: 100%">
    </div>

    <div class="projects_select">
      <el-row :gutter="24" type="flex" justify="center" style="margin-top: 18px;">
        <el-col :span="3" itemscope>
          <el-dropdown style="padding-top: 0px">
            <span class="el-dropdown-link">
              <i class="el-icon-menu"></i>
              所有类型 <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>所有类型</el-dropdown-item>
              <el-dropdown-item>Web 网站</el-dropdown-item>
              <el-dropdown-item>APP 开发</el-dropdown-item>
              <el-dropdown-item>微信平台开发</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="1">|</el-col>

        <el-col :span="3">
          <el-dropdown style="padding-top: 0px">
            <span class="el-dropdown-link">
              所有进度 <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>所有进度</el-dropdown-item>
              <el-dropdown-item>发布中</el-dropdown-item>
              <el-dropdown-item>开发中</el-dropdown-item>
              <el-dropdown-item>已结束</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="3">
          <el-dropdown style="padding-top: 0px">
            <span class="el-dropdown-link">
              所有角色 <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>所有角色</el-dropdown-item>
              <el-dropdown-item>开发</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div class="ProjectsView">
      <el-row>
        <el-col :span="7" v-for="(project, index) in this.items" :key="project.id" :offset=1>
          <div style="height: 50px;"></div>
          <el-card :body-style="{ padding: '0px' }" class="project_view">
            <el-row :gutter="0" type="flex" justify="center" style="background: #FFFFFF; height:150px;">
              <img v-if="project.requirementType=='Web 网站'" class="project_pic" src='../assets/Web.jpg'></img>
              <img v-if="project.requirementType=='APP 开发'" class="project_pic" src='../assets/App.jpg'></img>
              <img v-if="project.requirementType=='微信平台开发'" class="project_pic" src='../assets/WeChat.jpg'></img>
            </el-row>
            <el-row :gutter="0" type="flex" justify="center" style="background: #FFFFFF; height:50px;">
              <el-col class="project_name">No.{{project.id}}    {{project.requirementName}}</el-col>
            </el-row>
            <el-row :gutter="0" type="flex" justify="center" style="background: #FFFFFF; height:48px;">
              <el-col class="project_type"><span class="static_text">类型：</span>{{project.requirementType}}</el-col>
              <el-col class="project_state">
                  <span v-if="project.requirementState==0"
                        style="border: 1px solid #61c279;color: #61c279;border-radius: 2px;padding: 0.36rem;">招募中</span>
                <span v-if="project.requirementState==1"
                      style="border: 1px solid #f68435;color: #f68435;border-radius: 2px;padding: 0.36rem;">开发中</span>
                <span v-if="project.requirementState==2"
                      style="border: 1px solid #8796a8;color: #8796a8;border-radius: 2px;padding: 0.36rem;">已完成</span>
              </el-col>
            </el-row>
            <el-row :gutter="0" type="flex" justify="center" style="background: #FFFFFF; height:40px;">
              <el-col class="project_role">人员需求：开发</el-col>
            </el-row>
            <el-row :gutter="0" type="flex" justify="center"
                    style="background: #FFFFFF; height:30px; border-radius:0px 0px 5px 5px;">
              <el-col class="project_time"><span
                class="static_text">开始时间：</span>{{new Date(project.startTime).toLocaleString().replace(/\D{2}\d{1,2}:\d{1,2}:\d{1,2}/, '')}}
              </el-col>
              <el-col class="project_time"><span
                class="static_text">结束时间：</span>{{new Date(project.endTime).toLocaleString().replace(/\D{2}\d{1,2}:\d{1,2}:\d{1,2}/, '')}}
              </el-col>
            </el-row>
            <el-row>
              <el-button type="primary"
                         style="float: right;margin-right:1rem;margin-top: 0.5rem;margin-bottom: 0.5rem;"
                         @click="setProjectid(project.id)">
                详情
              </el-button>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination class="el_pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[6, 12, 18, 24]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="totolCount">
        </el-pagination>
      </div>
    </div>


    <div class="projects_footer">
      同济大学 XLab
    </div>
  </div>
</template>

<script>
  import Head2 from "../components/head/Head2";
  import Head from "../components/head/Head";
  import server from '../../config/index';
  import axios from '../axios/http';
  import swal from "sweetalert";

  export default {
    name: "Projects",
    components: {
      Head2,
      Head,
    },
    data() {
      return {
        isLogin: false,
        projects: [],
        items: [],
        url: server.url + '/api/requirements',

        currentPage: 1,
        pageSize: 6,
        totolCount: 0,
        count: 0
      }
    },
    created() {
      this.checkToken();
      this.getProjects();
    },
    methods: {
      checkToken: function () {
        if (sessionStorage.tokenid && this.$store.state.user.tokenid !== '')
          this.isLogin = true;
        else
          this.isLogin = false;
      },
      setProjectid(id) {
        this.$router.push({path: '/projectDetail', query: {id: id}});
      },
      getProjects() {
        axios.get(this.url, {}).then(response => {
          if (response.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.projects = response.data.result;
            this.totolCount = response.data.result.length;
            this.loadData(this.currentPage, this.pageSize, this.totolCount);
          }
        }).catch(function (error) {
          swal("Error", "服务器错误", "error");
        });
      },
      loadData: function (currentPage, pageSize, totolCount) {
        this.items = [];
        var count = 0;
        if (pageSize < totolCount) {
          for (count = 0; count < pageSize; count++) {
            if (pageSize * (currentPage - 1) + count < totolCount) {
              this.items.push(this.projects[pageSize * (currentPage - 1) + count]);
            }
          }
        } else if (pageSize >= totolCount) {
          for (count = 0; count < totolCount; count++) {
            if (pageSize * (currentPage - 1) + count < totolCount) {
              this.items.push(this.projects[pageSize * (currentPage - 1) + count]);
            }
          }
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.loadData(this.currentPage, this.pageSize, this.totolCount);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData(this.currentPage, this.pageSize, this.totolCount);
      }
    }
  };
</script>

<style>
  .projects {
    overflow: hidden;
  }

  .projects_footer {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 20px;
    color: #8a8a8a;
  }

  img_background {
    width: 720px;
    height: 400px;
  }

  .head_projects > a {
    margin-left: 30px;
    cursor: pointer;
    color: inherit;
  }

  .head_projects :last-child {
    /* display: inline; */
    float: right;
    margin-right: 10px;
  }

  .head_center > a {
    margin-right: 10px;
    cursor: pointer;
  }

  .projects_select {
    border-bottom: 1px solid #DDD;
    height: 50px;
    color: #657182;
  }

  .el-carousel__item .button_group {
    text-align: center;
    margin-top: 300px;
  }

  .button_group > .el-button {
    background-color: transparent;
    border-color: #ffffff;
    color: #ffffff;
    display: inline-block;
    width: 10%;
  }

  .ProjectsView {
    background: #EEF1F5;
    min-height: 100%;
    padding-top: 50px;
    padding-right: 125px;
    padding-left: 50px;
    padding-bottom: 50px;
  }

  .el_pagination {
    text-align: center;
    margin-top: 3rem;
  }

  .project_view {
    background: #EEF1F5;
    -moz-box-shadow: 0px 0px 5px #000000;
    -webkit-box-shadow: 0px 0px 5px #000000;
    box-shadow: 0px 0px 5px #000000;
    border-radius: 5px;
  }

  .project_pic {
    height: 150px;
    width: 100%;
    border-radius: 5px 5px 0px 0px;
  }

  .project_name {
    color: #273444;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 50px;
    width: fit-content;
  }

  .project_state {
    line-height: 48px;
    color: #273444;
    font-size: 1.0rem;
    text-align: center;
    font-weight: 400;
  }

  .project_role {
    line-height: 40px;
    color: #727f8f;
    font-size: 0.8rem;
    text-align: center;
  }

  .project_type {
    line-height: 48px;
    background: #EEF1F5;
    border-radius: 0px 0px 0px 5px;
    color: #474b48;
    text-align: center;
  }

  .project_time {
    border-radius: 0px 0px 5px 0px;
    color: #474b48;
    font-size: 0.8rem;
    text-align: center;
    line-height: 30px;
  }

  .static_text {
    color: #727f8f;
  }

</style>
