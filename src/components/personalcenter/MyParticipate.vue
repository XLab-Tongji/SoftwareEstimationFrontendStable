<template>
    <div class="participateProject">
      <el-row class="content-title">参与项目</el-row>
      <hr>

      <div style="height: 20px;"></div>

      <el-table stripe :data="tableData" style="width: 100%" >
        <el-table-column type="selection" width="40">
        </el-table-column>
        <!--<el-table-column prop="project_id" class="projectId" label="项目ID" width="100">-->
        <!--</el-table-column>-->
        <el-table-column prop="project_name" label="项目名称" width="150">
        </el-table-column>
        <el-table-column prop="project_type" label="项目类型" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="project_state" label="项目状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="" type="text" size="small" disabled><i class="el-icon-edit"></i></el-button>
            <el-button @click="" type="text" size="small" disabled><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination class="el_pagination_participate" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[15, 30, 45, 60]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="totolCount">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import server from '../../../config/index';
import axios from '../../axios/http';

  export default {
    created() {
      this.getProject();
    },
    data() {
      return {
        currentPage:1,
        pageSize:15,
        totolCount:0,
        tableData: [],
        items:[],
        url: server.url + '/api/project'
      }
    },
    methods:{
      getProject:function () {
        axios.get(this.url, {}).then(response => {
          if(response.status == 200){}
          else
            throw response;
          if(response.data.status == 200){
            this.items = response.data.result;
            this.items.forEach(function (item,index) {
              if(item.project_state == 0){
                item.project_state = "招募中";
              }
              else if(item.project_state == 1){
                item.project_state = "开发中";
              }
              else if(item.project_state == 2){
                item.project_state = "已完成";
              }
            });
            this.totolCount = response.data.result.length;
            this.loadData(this.currentPage,this.pageSize,this.totolCount);
          }
        }).catch(function(error){
          if(error.response){
            switch (error.response.status) {
                  case 400:
                    alert('获取列表失败');
                    break;
                  case 401:
                    alert('权限不足');
                    break;
                  case 500:
                    alert('服务器错误');
                    break;
            }
          }
        });
      },
      loadData:function (currentPage,pageSize,totolCount) {
        this.tableData = [];
        var count = 0;
        if(pageSize < totolCount) {
          for (count = 0; count < pageSize; count++) {
            if (pageSize * (currentPage - 1) + count < totolCount) {
              this.tableData.push(this.items[pageSize * (currentPage - 1) + count]);
            }
          }
        }else if(pageSize >= totolCount){
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
      }
    }
  }
</script>

<style>
.participateProject{
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 40px;
}

.content-title{
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
  .el_pagination_participate{
    text-align: center;
    margin-top: 5px;
    margin-bottom: 10px;
  }
</style>
