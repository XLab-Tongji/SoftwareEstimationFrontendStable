<template>

    <div class="adminCenter">
        <!-- 管理员页面 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
            <el-table
    :data="userList"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.username }}</p>
          <p>邮件: {{ scope.row.email }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

        </el-tab-pane>
        <el-tab-pane label="项目管理" name="second">
             <el-table
    :data="projectList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="startTime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="requirementName"
      label="项目名称 "
      width="180">
    </el-table-column>
    <el-table-column
      prop="requirementState"
      label="项目状态" >
    </el-table-column>
  </el-table>

            
        </el-tab-pane>
  </el-tabs>

    </div>
  
</template>

<script>
import server from '../../../config/index';
import axios from '../../axios/http';

export default {
  name: "AdminCenter",
  data() {
    return {
      projectList: '',
      userList: '',
      activeName: "first"
    };
  },
  created() {
      this.getProjectList();
      this.getUserList();
      console.log(this.$store.state.user.tokenid)
  },
  methods: {
    formatProjectList(list) {
      var tempList = list.map (ele => {
        if(ele.requirementState===1) {
          ele.requirementState = '招募中';
        }
        else if (ele.requirementState === 2) {
          ele.requirementState = '开发中';
         
        }
        else if (ele.requirementState === 3) {
          ele.requirementState = '已完成'; 
       }
       　ele.startTime = new Date(ele.startTime).toLocaleDateString();
        return ele;
      });
    },
    formatUserList (list) {
      var tempList = list.map(ele => {
        if(ele.create_time) {
          ele.create_time = new Date(ele.create_time).toLocaleDateString();
        }
        return ele;
      })

    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
     handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getUserList() {
          axios.get(server.url + '/api/all/account', {}).then(response => {
            if(response.data.status === '200') {
              this.userList = response.data.result;
              this.formatUserList(this.userList);
            }
          })

      },
      getProjectList() {
           this.$http.get(server.url + '/api/requirements').then(response=>{
              if(response.status == '200') {
                  this.projectList = response.body.result;
                  this.formatProjectList(this.projectList);
              }
            
          })

      }
  }
};
</script>

<style scoped>
.adminCenter {
  padding: 30px;
}
</style>
