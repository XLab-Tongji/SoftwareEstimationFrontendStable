<template>
  <div class="need">
    <el-row class="content-title">我的需求</el-row>
    <hr>
    <el-row class="add_requirement">
      <el-button type="text" @click="dialogFormVisible = true, projectId=''">+新建需求</el-button>
      <el-dialog title="" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
                 class="demo-ruleForm" style="margin-right: 30px">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择具体类型">
              <el-option label="Web 网站" value="Web 网站"></el-option>
              <el-option label="APP 开发" value="APP 开发"></el-option>
              <el-option label="微信平台开发" value="微信平台开发"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起止时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">——</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-date-picker type="date" placeholder="选择结束时间" v-model="ruleForm.date2"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="需要项目经理" prop="need_manager">
            <el-switch v-model="ruleForm.need_manager"></el-switch>
          </el-form-item>
          <el-form-item label="项目描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="修改项目状态" prop="state" v-show = "isModify">
            <el-select v-model="ruleForm.state" placeholder="请选择项目状态">
              <el-option label="招募中" value = 0></el-option>
              <el-option label="开发中" value = 1></el-option>
              <el-option label="已完成" value = 2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>

    <div style="height: 20px;"></div>

    <el-table stripe :data="tableData" style="width: 100%" @row-dblclick="check">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <!--<el-table-column prop="requirement_id" class="projectId" label="需求ID" width="100">-->
      <!--</el-table-column>-->
      <el-table-column prop="requirement_name" label="需求名称" width="150">
      </el-table-column>
      <el-table-column prop="requirement_type" label="需求类型" width="150">
      </el-table-column>
      <el-table-column prop="requirement_state" label="需求状态">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editRequirement(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>
          </el-button>
          <el-button @click="deleteRequirement(scope.row)" type="text" size="small"><i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination class="el_pagination_myNeeds" @size-change="handleSizeChange" @current-change="handleCurrentChange"
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
      this.getRequirement();
    },
    data: function () {
      return {
        currentPage: 1,
        pageSize: 15,
        totolCount: 0,
        items: [],
        tableData: [],
        ruleForm: {
          name: '',
          type: '',
          date1: '',
          date2: '',
          need_manager: false,
          description: '',
          state: 0,
          //file: null
        },
        rules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择种类', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择开始时间', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择结束时间', trigger: 'change'}
          ],
          description: [
            {required: true, message: '请填写描述', trigger: 'blur'}
          ],
        },
        dialogFormVisible: false,
        isModify: false,
        projectId: '',
        newProjectId: 0,
        url: server.url + '/api/requirement'
      }
    },
    methods: {
      //获取需求列表
      getRequirement: function () {
        axios.get(this.url, {}).then(response => {
          if (response.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.items = response.data.result;
            this.items.forEach(function (item, index) {
              if (item.requirement_state == 0) {
                item.requirement_state = "招募中";
              }
              else if (item.requirement_state == 1) {
                item.requirement_state = "开发中";
              }
              else if (item.requirement_state == 2) {
                item.requirement_state = "已完成";
              }
            });
            this.totolCount = response.data.result.length;
            this.loadData(this.currentPage, this.pageSize, this.totolCount);
          }
        }).catch(function (error) {
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
        });
      },

      //删除需求
      deleteRequirement(row) {
        axios.delete(this.url + '/' + row.requirement_id).then(function (response) {
          if (response.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.$message({
              message: '删除需求成功',
              type: 'success'
            });
            this.getRequirement();
          }
        }.bind(this)).catch(function (error) {
          switch (error.response.status) {
            case 400:
              alert('删除需求失败');
              break;
            case 401:
              alert('权限不足');
              break;
            case 404:
              alert('目标需求不存在');
              break;
            case 500:
              alert('服务器错误');
              break;
          }
        });
      },

      editRequirement(row) {
        this.isModify = true;
        this.projectId = row.requirement_id.toString();
        this.$store.commit('setProjectId', row.requirement_id.toString());
        this.dialogFormVisible = true;
        this.getProject();
        //to edit
      },

      //提交表格
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.projectId == "") {
              this.createProject();
            }
            else if (this.projectId != "") {
              this.onUpdate();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //重置表格
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },

      //获取单个需求信息
      getProject() {
        axios.get(server.url + '/api/requirement/' + this.projectId.toString(), {}).then(response => {
          if (response.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.ruleForm.name = response.data.result.requirement.requirementName;
            this.ruleForm.type = response.data.result.requirement.requirementType;

            this.ruleForm.date1 = new Date(response.data.result.requirement.startTime);
            this.ruleForm.date2 = new Date(response.data.result.requirement.endTime);

            this.ruleForm.need_manager = response.data.result.requirement.needManager == 1 ? true : false;
            this.ruleForm.description = response.data.result.requirement.requirementDetail;
            this.ruleForm.state = response.data.result.requirement.requirementState;
            if( this.ruleForm.state == 0){
              this.ruleForm.state = "招募中";
            }else if(this.ruleForm.state == 1){
              this.ruleForm.state = "开发中";
            }else if(this.ruleForm.state == 2){
              this.ruleForm.state = "已完成";
            }

          }
        }).catch(function (error) {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                alert('获取需求内容失败');
                break;
              case 401:
                alert('查询权限不足');
                break;
              case 404:
                alert('目标需求不存在');
                break;
              case 500:
                alert('服务器错误');
                break;
              default:
                alert(error);
            }
          }
        });
      },

      //新建需求
      onSubmit() {
        axios({
          url: this.url,
          method: 'POST',
          data: {
            project_id: this.newProjectId,
            requirement_name: this.ruleForm.name,
            requirement_type: this.ruleForm.type,
            start_time: this.format(new Date(this.ruleForm.date1)),
            end_time: this.format(new Date(this.ruleForm.date2)),
            need_manager: Number(this.ruleForm.need_manager),
            requirement_detail: this.ruleForm.description
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
        }).then(function (response) {
          if (response.data.status == 201) {
          }
          else
            throw response;
          if (response.data.status == 201) {
            this.$message({
              message: '发布需求成功',
              type: 'success'
            });
            this.getRequirement();
            this.resetForm('ruleForm');
          }
        }.bind(this))
          .catch(function (error) {
            if (error.response) {
              switch (error.response.status) {
                case 400:
                  alert('发布需求失败');
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

      //更新需求
      onUpdate() {
        if( this.ruleForm.state == "招募中"){
          this.ruleForm.state = 1;
        }else if(this.ruleForm.state == "开发中"){
          this.ruleForm.state = 2;
        }else if(this.ruleForm.state == "已完成") {
          this.ruleForm.state = 3;
        }
        axios({
          url: server.url + '/api/updateRequirement/' + this.projectId.toString(),
          method: 'POST',
          data: {
            requirement_name: this.ruleForm.name,
            requirement_type: this.ruleForm.type,
            start_time: this.format(new Date(this.ruleForm.date1)),
            end_time: this.format(new Date(this.ruleForm.date2)),
            need_manager: Number(this.ruleForm.need_manager),
            requirement_detail: this.ruleForm.description,
            requirement_state: this.ruleForm.state
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
        }).then(function (response) {
          if (response.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.$message({
              message: '更新需求成功',
              type: 'success'
            });
            this.getRequirement();
            this.resetForm('ruleForm')
            this.isModify = false;
          }
        }.bind(this))
          .catch(function (error) {
            if (error.response) {
              switch (error.response.status) {
                case 400:
                  alert('更新需求失败');
                  break;
                case 401:
                  alert('权限不足');
                  break;
                case 404:
                  alert('目标需求不存在');
                  break;
                case 500:
                  alert('服务器错误');
                  break;
              }
            }
          });
      },

      //新建项目
      createProject() {
        axios({
          url: server.url + '/api/project/add',
          method: 'POST',
          data: {
            project_name: this.ruleForm.name,
            project_type: this.ruleForm.type,
            cost: 0,
            delivery_cycle: 5,
            warranty_cycle: 10,
            address: '上海',
            description: this.ruleForm.description,
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
        }).then(function (response) {
          if (response.data.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.$message({
              message: '新建项目' +
              '成功',
              type: 'success'
            });
            this.newProjectId = response.data.result;
            this.onSubmit();
            this.resetForm('ruleForm');
            this.isModify = true;
          }
        }.bind(this))
          .catch(function (error) {
            if (error.response) {
              switch (error.response.status) {
                case 400:
                  alert('发布需求失败');
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

      //分页
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
      //日期格式转换
      format(fmt) {
        var year = fmt.getFullYear();
        var month = fmt.getMonth() + 1 < 10 ? "0" + (fmt.getMonth() + 1) : fmt.getMonth() + 1;
        var day = fmt.getDate() < 10 ? "0" + fmt.getDate() : fmt.getDate();
        var dateStr = year + "-" + month + "-" + day;
        return dateStr;
      },

      //查看详情页面
      check(row) {
        this.$router.push({path:'/projectDetail', query:{id: row.requirement_id}});
      }
    }
  }
</script>

<style>
  .need {
    padding-left: 50px;
    padding-right: 50px;
    margin-top: 40px;
  }

  .content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }

  .add_requirement {
    float: right;
    margin-right: 20px;
  }

  .el_pagination_myNeeds {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 10px;
  }
</style>

