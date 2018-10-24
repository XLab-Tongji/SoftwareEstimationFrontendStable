<!--查看估算记录表格-->
  <template>
    <div class="container-list">
      <div class="filter" style="background: #FFFFFF;">
        <div class="search" >
          <el-select v-model="search_select"  placeholder="请选择">
            <el-option label="所有" value="1" @click.native.prevent="inputSearch"></el-option>
            <el-option label="状态" value="2" @click.native.prevent="stateSearch"></el-option>
            <el-option label="时间" value="3" @click.native.prevent="dateSearch"></el-option>
          </el-select>
          <div id="selectInput" style="width: 60%">
            <el-input placeholder="请输入搜索内容" @input="search"  class="input-with-select" ></el-input>
          </div>

          <div id="selectState" style="display: none">
            <el-select v-model="stateValue" placeholder="请选择状态" class="state-with-select">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      @click.native.prevent=" SSearch">
              </el-option>
            </el-select>
          </div>
          <div id="selectDate" style="display: none" >
            <el-date-picker
                    type="date"
                    v-model="sTime"
                    @change="getSTime"
                    format="yyyy-MM-dd"
                    placeholder="选择日期"
                    class="date-with-select">
            </el-date-picker>
          </div>
        </div>
        <div class="create" >
          <el-button  type="primary"  @click="goCreate" >创建估算 <i class="el-icon-plus"></i></el-button>
        </div>
      </div>
      <div class="box" style="background: #FFFFFF;">
        <div class="table">
          <el-table :data="tableData4" align="center" style="width: 100%;margin: auto;max-width: 960px" height=400>
            <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
            <el-table-column align="center" prop="proName" label="项目名称" width="100"></el-table-column>
            <el-table-column align="center" prop="proIntro" label="项目简介" width="130"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" width="120"></el-table-column>
            <el-table-column align="center" prop="state" label="状态" width="80"></el-table-column>
            <el-table-column align="center" prop="method" label="估算方法" width="80"></el-table-column>
            <el-table-column align="center" label="操作" width="180">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">移除</el-button>
                <el-button v-show="scope.row.state ==='待修改'" @click.native.prevent="modify(scope.$index)" type="text" size="small">修改</el-button>
                <el-button v-show="scope.row.state==='完成'" type="text" size="small" @click.native.prevent="goReport(scope.$index)">查看报告</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="remark" label="备注" width="150"></el-table-column>
          </el-table>
        </div>
      </div>
      <div style="height: 50px;"></div>
    </div>
  </template>
<script>

  import server from '../../../config/index';
  import swal from 'sweetalert';

  export default {
    name:'ReportTable',
    methods: {
        inputSearch(){
            var iDiv=document.getElementById("selectInput");
            var sDiv=document.getElementById("selectState");
            var dDiv=document.getElementById("selectDate");
            iDiv.style.display="block";
            sDiv.style.display="none";
            dDiv.style.display="none";
            this.search();
        },
        stateSearch(){
            var iDiv=document.getElementById("selectInput");
            var sDiv=document.getElementById("selectState");
            var dDiv=document.getElementById("selectDate");
            iDiv.style.display="none";
            sDiv.style.display="block";
            dDiv.style.display="none";
            this.SSearch();
        },
        dateSearch(){
            var iDiv=document.getElementById("selectInput");
            var sDiv=document.getElementById("selectState");
            var dDiv=document.getElementById("selectDate");
            iDiv.style.display="none";
            sDiv.style.display="none";
            dDiv.style.display="block";
            this.getSTime();
        },
        getSTime(val) {
            console.log(val)
            var a = /^(\d{4})-(\d{2})-(\d{2})$/;
            if(!a.test(val)){
                if(val!=null){
                    if((val.getMonth()+1)<10){
                        if(val.getDate()<10){
                            this.sTime=val.getFullYear()+'-'+'0'+(val.getMonth()+1)+'-'+'0'+val.getDate();//这个sTime是在data中声明的，也就是v-model绑定的值
                            //console.log(val.getFullYear()+'-'+'0'+(val.getMonth()+1)+'-'+'0'+val.getDate())
                        }
                        else{
                            this.sTime=val.getFullYear()+'-'+'0'+(val.getMonth()+1)+'-'+val.getDate();//这个sTime是在data中声明的，也就是v-model绑定的值
                           // console.log(val.getFullYear()+'-'+'0'+(val.getMonth()+1)+'-'+val.getDate())
                        }
                    }
                    else{
                        this.sTime=val.getFullYear()+'-'+(val.getMonth()+1)+'-'+val.getDate();//这个sTime是在data中声明的，也就是v-model绑定的值
                        //console.log(val.getFullYear()+'-'+(val.getMonth()+1)+'-'+val.getDate())
                    }
                }
                else{
                    this.sTime = "";
                }
            }
            else{
                this.sTime = val;
            }
            var v = new RegExp(this.sTime);
            this.tableData4.splice(0,this.tableData4.length);

            for(var j=0;j<this.allData.length;j++) {
                if (v.test(this.allData[j].createTime)) {
                    var temp = {
                        "rId": '',
                        "proName": '',
                        "proIntro": '',
                        "createTime": '',
                        "state": '',
                        "method": '',
                        "remark": ''
                    }
                    temp.rId = this.allData[j].rId;
                    temp.proName = this.allData[j].proName;
                    temp.proIntro = this.allData[j].proIntro;
                    temp.createTime = this.allData[j].createTime;
                    temp.state = this.allData[j].state;
                    temp.method = this.allData[j].method;
                    temp.remark = this.allData[j].remark;
                    this.tableData4.push(temp);
                }
            }

        },
          goReport:function (index) {
//              global_.ID=this.tableData4[index].rId
            this.$router.push( {name:'StepFour', params : {rId : this.tableData4[index].rId}})
          },

      indexMethod(index) {
        return index +1;
      },
      goCreate:function () {
//          console.log(global_.ID);
        if (sessionStorage.tokenid) {

          this.$http.post(this.url + '/addRequirement',{"username": sessionStorage.getItem("username")}).then(response => {
            console.log('get success')
            var id = response.body
            this.$router.push({name: 'StepOne', params: {rId: id}})
          }, response => {
            console.log('fail')
            alert('fail')
          })
        }else {
          swal("Error", "请先登录", "error");
        }
      },
      deleteRow(index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$http.post(this.url + '/deleteRequirement/' + this.tableData4[index].rId, {"username": sessionStorage.getItem("username")}).then(res=>{
                rows.splice(index, 1);
            this.$message(
            {
              type: 'success',
             message: '删除成功!'
           }
          );
            },res=>{
              this.$message({
                type: 'info',
                message:'删除失败!'
              });
            })
        })
//          .catch(() => {
//          this.$message({
//            type: 'info',
//            message:'已取消删除!'
//          });
//        });
      },
      modify(index){
        var s="待修改";
        var e="待审核"
        var est=[];
        est = this.tableData4[index].state;
        if(est == s|| est==e )
        {
//          global_.ID = this.tableData4[index].rId
//          console.log(global_.ID)
          this.$router.push( {name:'StepOne', params : {rId : this.tableData4[index].rId}})

        }
        else{
          this.$alert('只能对待修改状态项目进行编辑', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message:'请选择待修改项目进行编辑'
              });
            }
          })
        }
      },
        init(){
            console.log(this.url + '/getAllRequirements')
            this.$http.post(this.url + '/getAllRequirementsByUser',{"username": sessionStorage.getItem("username")}).then(res=>{
                for(var i = 0; i < res.body.length; i++){
                    var temp = {
                        "rId" : '',
                        "proName" : '',
                        "proIntro" : '',
                        "createTime" : '',
                        "state" : '',
                        "method" : '',
                        "remark" : ''
                    }
                    temp.rId = res.body[i].id;
                    temp.proName = res.body[i].description.projectName;
                    temp.proIntro = res.body[i].description.projectDescription;
                    temp.createTime = res.body[i].createTime.split('T')[0];
                    temp.state = res.body[i].state;
                    temp.method = res.body[i].description.estimationMethod;
                    temp.remark = res.body[i].remark;
                    this.tableData4.push(temp);
                    this.allData.push(temp);
                }
                console.log(this.tableData4)
            },res=>{
                console.log('fail');
            })
        },
      search(e) {
          this.tableData4.length = 0;
          console.log(e);
          var v = new RegExp(e);
          for(var j=0;j<this.allData.length;j++){
            if(v.test(this.allData[j].proName)||
                v.test(this.allData[j].proIntro)||
                v.test(this.allData[j].state)||
                v.test(this.allData[j].method)){
                var temp = {
                    "rId" : '',
                    "proName" : '',
                    "proIntro" : '',
                    "createTime" : '',
                    "state" : '',
                    "method" : '',
                    "remark" : ''
                }
                temp.rId = this.allData[j].rId;
                temp.proName=this.allData[j].proName;
                temp.proIntro = this.allData[j].proIntro;
                temp.createTime = this.allData[j].createTime;
                temp.state = this.allData[j].state;
                temp.method = this.allData[j].method;
                temp.remark = this.allData[j].remark;
                this.tableData4.push(temp);
            }
            console.log(v.test(this.allData[j].proName))

          }
      },
        SSearch(){
            console.log(this.stateValue)
            this.tableData4.splice(0,this.tableData4.length);
            var v = new RegExp(this.stateValue);
            for(var j=0;j<this.allData.length;j++){
                if(v.test(this.allData[j].state)){
                    var temp = {
                        "rId" : '',
                        "proName" : '',
                        "proIntro" : '',
                        "createTime" : '',
                        "state" : '',
                        "method" : '',
                        "remark" : ''
                    }
                    temp.rId = this.allData[j].rId;
                    temp.proName=this.allData[j].proName;
                    temp.proIntro = this.allData[j].proIntro;
                    temp.createTime = this.allData[j].createTime;
                    temp.state = this.allData[j].state;
                    temp.method = this.allData[j].method;
                    temp.remark = this.allData[j].remark;
                    this.tableData4.push(temp);
                }
            }
            console.log(this.tableData4);
        }
    },
    data() {
      return {
        tableData4: [],
          allData: [],
          options: [{
              value: '待审核',
              label: '待审核'
          }, {
              value: '估算中',
              label: '估算中'
          }, {
              value: '待修改',
              label: '待修改'
          }, {
              value: '完成',
              label: '完成'
          }],
          search_select:'',
          stateValue:'',
          stateVisible:false,
          inputVisible:true,
          dateVisible:false,
          sTime:'',

          url: server.estimation + '/estimation'
      }
    },
    mounted() {
        this.$http.post(this.url + '/identity',{"username": sessionStorage.getItem("username")}).then(res=>{
            var code = res.body.code;
            if(code === 0){
                this.$router.push("/mver")
            }
            else if(code === 200){
                this.$router.push("/login")
            }
            else if(code === 500){
                alert("服务端错误")
            }

        },res=>{

        });

            this.init();
    }
  }
</script>


<style scoped>
  .el-select  {
    width: 130px;
  }
  .input-with-select {
    background-color: #fff;
    height: 40px;
    margin-left: 20px;
  }
  .state-with-select {
    background-color: #fff;
    height: 40px;
    margin-left: 20px;
    width: 200px;
  }
  .date-with-select {
    background-color: #fff;
    height: 40px;
    margin-left: 20px;
    width: 200px;
  }
  .container-list {
    font-size: 13px;
    font-family: 'Microsoft YaHei';
    width: 80%;
    height: auto;
    margin-left: 10%;
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .container-list.filter{
    width: 100%;
    height: 70px;
    margin: auto;
  }
  .container-list .filter .quick-search {
    width: 250px;
    height: 40px;
    border: solid rgba(71, 72, 69, 0.4) 1px;
  display: flex;
  float:left  ;
  margin-left: 0;}
  .container-list .filter .quick-search input {
    color: #474845; }
  .container-list .filter .quick-search input::placeholder {
    color: rgba(71, 72, 69, 0.4); }
  .filter{
    width: 100%;
    margin: auto;
    height: 70px;
    border: solid rgba(71,72,69,0.4) 1px;
  }
  .box{
    width: 100%;
    border-top: 0;
    margin: auto;
    border-bottom: solid rgba(71,72,69,0.4) 1px;
    border-left: solid rgba(71,72,69,0.4) 1px;
    border-right: solid rgba(71,72,69,0.4) 1px;
  }
  .quick-search {
    margin: 10px 5%;
    position: relative;
    display: flex;
    float:left;
    background: rgba(255, 255, 255, 0.3);
    transition: all .2s;
    border-radius: 5px; }
  .quick-search:hover {
    background: rgba(255, 255, 255, 0.4); }
  .quick-search input{
    border: none;
    height: 28px;
    margin: 0;
    background: transparent;
    color: white;
    letter-spacing: 1px; }
  .quick-search input {
    border-radius: 5px 0 0 5px;
    font: 14px bold;
    padding: 0 10px;
    width: 250px; }
  .quick-search input::placeholder {
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0; }
  .table {
    padding: 0;
    border-collapse: collapse;
    table-layout: fixed;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 40px;
    width: 90%;
  }
  .create{
    margin-top:15px;
    display: flex;
    float: right;
    margin-right: 5%;
  }
  .search{
    margin-top: 15px;
    width: 70%;
    display: flex;
    position: relative;
    float: left;
    margin-left: 5%;
  }
  .el-input__inner{
    height: 40px;
  }
  .el-button{
    height: 40px;
  }
</style>
