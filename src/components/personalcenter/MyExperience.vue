<template>
  <div class="experience">
    <el-row class="content-title">项目经历</el-row>
    <hr>

    <el-row class="add_experience">
      <el-button type="text" @click="dialogFormVisible = true; isAdd = true">+新增项目经历</el-button>

      <el-dialog title="新增经历" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
                 class="demo-ruleForm" style="margin-right: 30px">
          <el-form-item label="项目名称" prop="project_name">
            <el-input v-model="ruleForm.project_name"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" prop="project_region">
            <el-select v-model="ruleForm.project_region" placeholder="请选择具体类型">
              <el-option label="Web项目" value="Web项目"></el-option>
              <el-option label="IOS应用" value="IOS应用"></el-option>
              <el-option label="Android应用" value="Android应用"></el-option>
              <el-option label="微信小程序" value="微信小程序"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目地址" prop="project_address">
            <el-input type="textarea" v-model="ruleForm.project_address"></el-input>
          </el-form-item>
          <el-form-item label="项目描述" prop="project_text">
            <el-input type="textarea" v-model="ruleForm.project_text"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" v-show="isAdd">确定</el-button>
            <el-button type="primary" @click="update('ruleForm')" v-show="!isAdd">修改</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>

    <div style="height: 20px;"></div>

    <el-table stripe :data="tableData" style="width: 100%;">
      <!--<el-table-column prop="id" width="40" label="项目id">-->
      <!--</el-table-column>-->
      <el-table-column prop="projectName" class="projectName" label="项目名称" width="150">
      </el-table-column>
      <el-table-column prop="projectRegion" label="项目类型" width="100">
      </el-table-column>
      <el-table-column prop="projectAddress" label="项目地址" width="150">
      </el-table-column>
      <el-table-column prop="projectText" label="项目描述">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope" style="z-index: 0;">
          <el-button @click="modify(scope.row)" type="text" size="small"><i class="el-icon-edit"></i></el-button>
          <el-button @click="remove(scope.row)" type="text" size="small"><i class="el-icon-delete"></i></el-button>
        </template>
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
</template>

<script>
  import server from '../../../config/index';
  import axios from '../../axios/http';

  export default {
    created() {
      this.getExperience();
    },
    data() {
      return {
        isAdd: true,
        updateId: 0,
        currentPage: 1,
        pageSize: 15,
        totolCount: 0,
        tableData: [],
        items: [],
        ruleForm: {
          project_name: '',
          project_region: '',
          project_address: '',
          project_text: ''
        },
        rules: {
          project_name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'}
          ],
          project_region: [
            {required: true, message: '请选择种类', trigger: 'change'}
          ],
          project_address: [
            {required: true, message: '请填写地址', trigger: 'blur'}
          ],
          project_text: [
            {required: true, message: '请填写描述', trigger: 'blur'}
          ],
        },
        dialogFormVisible: false,
        url: server.url + '/api/user/projectExperience'
      }
    },
    methods: {
      getExperience: function () {
        axios.get(this.url, {}).then(response => {
          if (response.status == 200) {
          }
          else
            throw response;
          if (response.data.status == 200) {
            this.items = response.data.result;
            this.totolCount = response.data.result.length;
            this.loadData(this.currentPage, this.pageSize, this.totolCount);
          }
        }).catch(function (error) {
          if (error.response) {
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              url: this.url,
              method: 'POST',
              data: this.ruleForm,
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
                  message: '添加经历成功',
                  type: 'success'
                });
                this.getExperience();
                this.resetForm(formName);
              }
            }.bind(this))
              .catch(function (error) {
                if (error.response) {
                  switch (error.response.status) {
                    case 400:
                      alert('添加经历失败');
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
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
      modify(row) {
        this.isAdd = false;
        this.dialogFormVisible = true;
        this.updateId = row.id;
        this.ruleForm.project_name = row.projectName;
        this.ruleForm.project_text = row.projectText;
        this.ruleForm.project_address = row.projectAddress;
        this.ruleForm.project_region = row.projectRegion;
      },
      update(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios(
              {
                url: this.url,
                method: "PUT",
                data: {
                  project_id: this.updateId,
                  project_name: this.ruleForm.project_name,
                  project_region: this.ruleForm.project_region,
                  project_address: this.ruleForm.project_region,
                  project_text: this.ruleForm.project_text
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
              if (response.data.status == "201") {
                this.getExperience();
                this.$message({
                  message: '修改需求成功',
                  type: 'success'
                });
                this.resetForm("ruleForm");
              }
            }.bind(this))
              .catch(function (error) {
                if (error.response) {
                  switch (error.response.status) {
                    case 500:
                      alert('服务器错误');
                      break;
                  }
                }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      remove(row) {
        axios.delete(server.url + '/api/projectExperience/' + row.id).then(function (response) {
          if (response.data.status == "200") {
            this.$message({
              message: '删除需求成功',
              type: 'success'
            });
            this.getExperience();
          }
        }.bind(this)).catch(function (error) {
          if (error.response.status == 500) {
            alert('服务器错误');
          }
        });
      },
    }
  }
</script>

<style>

  .el_pagination_experience {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .experience {
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

  .add_experience {
    float: right;
    margin-right: 20px;
  }
</style>
