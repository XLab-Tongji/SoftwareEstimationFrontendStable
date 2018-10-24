<template>
  <div class="workers">
    <HeadBarLight style="z-index: 10;"></HeadBarLight>
    <div class="worker_content">
      <div class="worker_theme">
        <el-breadcrumb separator="/" class="breadcrumb_size">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/workers' }">用户信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="worker_menu">
          <el-menu class="side_bar" mode="vertical" default-active="1" style="margin-left:20px">
            <el-menu-item-group title="账户信息">
              <el-menu-item index="1"><i class="el-icon-information"></i>他的个人信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="开发者信息">
              <el-menu-item index="2"><i class="el-icon-star-on"></i>他的项目经历</el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </div>
        <div class="worker_detail">
          <div>
            <el-card class="worker_header">
              <div><img src="../assets/coder.png" class="worker_image" style="margin-left:0px;"></div>
              <div style="padding:0.5rem 1.5rem; font-size: 20px">
                <span>{{this.$route.query.name}}</span>
              </div>
            </el-card>
            <div class="worker_info">
              <div style="margin-top: 2rem">
                <span style="margin-right:5rem;">工作邮箱</span>
                <span>{{this.$route.query.email}}</span>
              </div>
              <div style="margin-top: 2rem">
                <span style="margin-right:5rem;">工作手机</span>
                <span>{{this.$route.query.mobile}}</span>
              </div>
            </div>
          </div>
          <div style="margin-top: 2rem; padding-left: 2rem">
            <span style="margin-right:5rem; padding-top: 10rem">项目经历</span>
          </div>
          <el-table stripe :data="tableData" class="worker_table">
            <el-table-column prop="projectName" class="projectName" label="项目名称" width="100px">
            </el-table-column>
            <el-table-column prop="projectRegion" label="项目类型" width="100px">
            </el-table-column>
            <el-table-column prop="projectAddress" label="项目地址" width="100px">
            </el-table-column>
            <el-table-column prop="projectText" label="项目描述" width="370px">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination class="el_pagination_experience" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[15, 30, 45, 60]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="totolCount">
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      同济大学 XLab
    </div>
  </div>


</template>

<script>
  import HeadBarLight from "../components/head/HeadBarLight.vue"
  import server from '../../config/index';
  import axios from '../axios/http';
  import swal from "sweetalert"

  export default {
    name: "Workers",
    components: {
      HeadBarLight,
    },
    data() {
      return {
        isCollapse: true,
        workerName: "",
        workerEmail: "",
        workerMobile: "",
        tableData: [],
        items: [],
        currentPage: 1,
        pageSize: 15,
        totolCount: 0,
        url: server.url + '/api/accountAndExperience'
      };
    },
    created() {
      this.workerName = this.$route.query.name;
      this.workerEmail = this.$route.query.email;
      this.workerMobile = this.$route.query.mobile;
      this.getExperience();
    },
    methods: {
      getExperience: function () {
        axios(
          {
            url: this.url,
            method: 'GET',
            params: {
              username: this.$route.query.name
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          }
        ).then(response => {
          if (response.data.status == 200) {
          }
          else
            throw response;
          if (response.data.status == "200") {
            this.items = response.data.result.projectExperiences;
            this.totolCount = response.data.result.projectExperiences.length;
            this.loadData(this.currentPage, this.pageSize, this.totolCount);
          }
        }).catch(function (error) {
            if (error.data.status == "400") {
              swal("Error", "此用户不存在！", "error");
            }
            else if (error.status == 500) {
              swal("Error", "服务器错误！", "error");
            }
          }
        );
      },
      loadData: function (currentPage, pageSize, totolCount) {
        this.tableData = [];
        var count = 0;
        if (pageSize < totolCount) {
          for (count = 0; count < pageSize; count++) {
            if (pageSize * (currentPage - 1) + count < totolCount) {
              this.tableData.push(this.items[pageSize * (currentPage - 1) + count]);
            }
          }
        } else if (pageSize >= totolCount) {
          for (count = 0; count < totolCount; count++) {
            if (pageSize * (currentPage - 1) + count < totolCount) {
              this.tableData.push(this.items[pageSize * (currentPage - 1) + count]);
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
      },
    }
  };

</script>


<style>
  .workers {
    min-height: 100%;
    position: relative;
    overflow: hidden;
  }

  .worker_content {
    padding-top: 80px;
    min-height: 900px;
    margin-left: auto;
    margin-right: auto;

    background: #EFF2F7;
  }

  .worker_theme {
    max-width: 50%;
    min-width: 1000px;
    margin: 0 auto;
  }

  .breadcrumb_size {
    padding: 35px 0px 20px 0px;
  }

  .worker_menu {
    width: 220px;
    float: left;
  }

  .worker_table {
    padding-left: 50px;
    padding-right: 50px;
    margin-top: 20px;
    width: 100%;
  }

  .side_bar {
    border-color: #000000;
    border: 2px;
    background: #D3DCE6;
    margin-left: 30px;
    padding-top: 20px;
  }

  .worker_detail {
    margin-left: 230px;
    min-height: 800px;
    box-shadow: 0 1px 2px rgba(183, 195, 192, .95);
    font-size: 14px;
    background-color: #FFFFFF;
    overflow: hidden;
  }

  .footer {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 40px;
    color: #8a8a8a;
  }

  .worker_header {
    margin: 3rem 4rem 0;
    height: 10rem;
    position: relative;
  }

  .worker_image {
    width: 8rem;
    height: 8rem;
    float: left;
    border: 1px;
    border-radius: 6px;
  }

  .worker_info {
    font-size: 14px;
    margin: 2rem 4rem 0;
    position: relative;
  }

  .el_pagination_experience {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 10px;
  }
</style>
