<!--用户查看IFPUG报告-->
<template>

  <div class="container" style="background: #FFFFFF;">
    <div style="width: 85%; margin: auto">
    <div>
      <el-row type="flex" class="row-bg" style="margin-bottom: 0; min-width: 100%">
        <el-col :span="22"><div class="grid-content bg-white"></div></el-col>
        <el-col :span="2"><div class="grid-content bg-white">
          <el-button @click="export2Excel">导出报告</el-button>
        </div></el-col>
      </el-row>
    </div>

    <h1 style="font-family: 'PingFang SC';text-align: center">IFPUG报告</h1>

    <el-collapse v-model="reportMenu">
      <el-collapse-item title="数据功能表格" name="1">
        <el-row style="margin-bottom: 0">
          <el-col :span="2"><div class="grid-content bg-white"></div></el-col>
          <el-col :span="22"><div class="grid-content bg-white">
            <el-card class="box-card" style="width: 90%">
              <!--数据功能表格-->
              <el-table id="table1" :data="tableData1" border stripe style="width: 100%">
                <el-table-column prop="name" label="逻辑文件名称"></el-table-column>
                <el-table-column prop="type" label="逻辑文件类型"></el-table-column>
                <el-table-column prop="RET" label="RET"></el-table-column>
                <el-table-column prop="RETNum" label="RET数量"></el-table-column>
                <el-table-column prop="DET" label="DET"></el-table-column>
                <el-table-column prop="DETNum" label="DET数量"></el-table-column>
                <el-table-column prop="complexity" label="复杂度"></el-table-column>
                <el-table-column prop="UFP" label="DFP"></el-table-column>
              </el-table>
            </el-card>
          </div></el-col>
          <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="事务功能表格" name="2">
        <el-row style="margin-bottom: 0">
          <el-col :span="2"><div class="grid-content bg-white"></div></el-col>
          <el-col :span="22"><div class="grid-content bg-white">
            <el-card class="box-card" style="width: 90%">
              <!--事务功能表格-->
              <el-table id="table2" :data="tableData2" border stripe style="width: 100%">
                <el-table-column prop="name" label="事务名称"></el-table-column>
                <el-table-column prop="type" label="事务类型"></el-table-column>
                <el-table-column prop="file" label="逻辑文件"></el-table-column>
                <el-table-column prop="fileNum" label="逻辑文件数量"></el-table-column>
                <el-table-column prop="DET" label="DET"></el-table-column>
                <el-table-column prop="DETNum" label="DET数量"></el-table-column>
                <el-table-column prop="complexity" label="复杂度"></el-table-column>
                <el-table-column prop="UFP" label="TFP"></el-table-column>
              </el-table>
            </el-card>
          </div></el-col>
          <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="调整因子表格" name="3">
        <el-row style="margin-bottom: 0">
          <el-col :span="2"><div class="grid-content bg-white"></div></el-col>
          <el-col :span="22"><div class="grid-content bg-white">
            <el-card class="box-card" style="width: 90%">
              <!--调整因子表格-->
              <span class="ps">估算人员调整后的估算因子，用蓝色标注</span>
              <el-table :data="tableData3" border stripe style="width: 100%; margin: auto" :cell-class-name="setClassName">
                <el-table-column prop="developmentType" label="开发类型" width="155"></el-table-column>
                <el-table-column prop="developmentPlatform" label="开发平台" width="155"></el-table-column>
                <el-table-column prop="languageType" label="开发语言" width="145"></el-table-column>
                <el-table-column prop="dbms_Used" label="是否使用数据库" width="145"></el-table-column>
                <el-table-column prop="rely" label="软件可靠性要求" width="145"></el-table-column>
                <el-table-column prop="cplx" label="产品复杂度" width="145"></el-table-column>
                <el-table-column prop="time" label="执行时间约束" width="145"></el-table-column>
                <el-table-column prop="sced" label="要求的开发进度" width="145"></el-table-column>
                <el-table-column prop="productivity" label="生产率" width="145"></el-table-column>
                <el-table-column prop="cost" label="人力成本"width="145" ></el-table-column>
              </el-table>
            </el-card>
          </div></el-col>
          <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="估算结果表格" name="4">
        <el-row style="margin-bottom: 0">
          <el-col :span="2"><div class="grid-content bg-white"></div></el-col>
          <el-col :span="22"><div class="grid-content bg-white">
            <el-card class="box-card" style="width: 90%">
              <!--估算结果表格-->
              <div>
                <el-table :data="tableData4" border stripe style="width: 100%; margin: auto" >
                  <el-table-column prop="UFP" label="UFP" ></el-table-column>
                  <el-table-column prop="AFP" label="AFP" ></el-table-column>
                  <el-table-column prop="projectDuration" label="项目工期"></el-table-column>
                  <el-table-column prop="projectCost" label="项目成本"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </div></el-col>
          <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div style="height: 50px;"></div>
    </div>
  </div>

</template>

<script>
  import server from '../../../config/index';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  var trans;
  var i=0;
  var projectName='';
  export default {
    components: {ElButton},
    name:'Body_IFPUGReport',
    mounted:function () {
      this.$http.post(this.url + '/getReport/' + this.$route.params.rId, {"username": sessionStorage.getItem("username")}).then(response=>{
        console.log(response.body)
        trans=response.body.newVAF;
        projectName=response.body.description.projectName;

        // 调整因子表格数据
//        this.tableData3.length=0;
        this.tableData3[0].developmentType=trans.developmentType;
        this.tableData3[0].rely=trans.RELY;
        this.tableData3[0].developmentPlatform=trans.developmentPlatform;
        this.tableData3[0].cplx=trans.CPLX;
        this.tableData3[0].languageType=trans.languageType;
        this.tableData3[0].time=trans.TIME;
        this.tableData3[0].dbms_Used=trans.DBMS_Used;
        this.tableData3[0].sced=trans.SCED;
        this.tableData3[0].productivity=trans.productivity+"小时／FP";
        this.tableData3[0].cost=trans.cost+"元／人月";

        //调整因子修改状态
        //顺序为：'developmentType', 'developmentPlatform', 'languageType', 'dbms_Used',
        // 'rely', 'cplx', 'time', 'sced', 'productivity', 'cost'

        trans=response.body.vafState;
        this.state.length=0;
        this.state.push(trans.developmentTypeState);
        this.state.push(trans.developmentPlatformState);
        this.state.push(trans.languageTypeState);
        this.state.push(trans.DBMS_UsedState);
        this.state.push(trans.RELYState);
        this.state.push(trans.CPLXState);
        this.state.push(trans.TIMEState);
        this.state.push(trans.SCEDState);
        this.state.push(trans.productivityState);
        this.state.push(trans.costState);


        // 估算结果表格数据
//        this.tableData4.length=0;
        this.tableData4[0].UFP=response.body.UFP;
        this.tableData4[0].AFP=response.body.AFP.toFixed(2);
        this.tableData4[0].projectCost=response.body.workCost.toFixed(2)+"元";
        this.tableData4[0].projectDuration=response.body.workTime.toFixed(2)+"天";


          //数据功能表格数据
          this.tableData1.length=0;
          var dataTemp = response.body.estimationFileDatas;
          for(var j = 0; j < dataTemp.length;j++){
              this.tableData1.push({
                  name : dataTemp[j].name,
                  type : dataTemp[j].fileType,
                  RET : dataTemp[j].RET,
                  RETNum : dataTemp[j].RETNum,
                  DET : dataTemp[j].DET,
                  DETNum : dataTemp[j].DETNum,
                  complexity : dataTemp[j].complexity,
                  UFP : dataTemp[j].UFP,
              })
          }
        var temp = response.body.transactions;
        for(var i=0;i<temp.length;i++){

          //事务功能表格数据
          this.tableData2.length=0;
          var dataTemp2 = temp[i].estimationTransactionDatas;
          for(var j = 0; j < dataTemp2.length;j++){
            this.tableData2.push({
              name : dataTemp2[j].name,
              type : dataTemp2[j].transactionType,
              file : dataTemp2[j].logicalFile,
              fileNum : dataTemp2[j].fileNum,
              DET : dataTemp2[j].DET,
              DETNum: dataTemp2[j].DETNum,
              complexity : dataTemp2[j].complexity,
              UFP : dataTemp2[j].UFP,
            })
          }

        }
      },response=>{
        alert("error!");

      })
    },


    methods: {
      setClassName({row, column, rowIndex, columnIndex}){
        for(var i=0;i<this.state.length;i++){
          if(this.state[i] && i==columnIndex){
            return 'showchange';
          }
        }
      },
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader = ['逻辑文件名称', '逻辑文件类型', 'RET', 'RET数量', 'DET','DET数量', '复杂度', 'DFP']; //对应表格输出的title
          const filterVal = ['name', 'type', 'RET', 'RETNum', 'DET','DETNum', 'complexity', 'UFP']; // 对应表格输出的数据
          const list = this.tableData1;
          const data = this.formatJson(filterVal, list);

          const tHeader2 = ['事务名称', '事务类型', '逻辑文件', '逻辑文件数量', 'DET','DET数量', '复杂度', 'TFP']; //对应表格输出的title
          const filterVal2 = ['name', 'type', 'file', 'fileNum', 'DET','DETNum', 'complexity', 'UFP']; // 对应表格输出的数据
          const list2 = this.tableData2;
          const data2 = this.formatJson(filterVal2, list2);

          const tHeader3 = ['开发类型', '开发平台', '开发语言', '是否使用数据库', '软件可靠性要求', '产品复杂度', '执行时间约束', '要求的开发进度', '生产率', '人力成本']; //对应表格输出的title
          const filterVal3 = ['developmentType', 'developmentPlatform', 'languageType', 'dbms_Used', 'rely', 'cplx', 'time', 'sced', 'productivity', 'cost']; // 对应表格输出的数据
          const list3 = this.tableData3;
          const data3 = this.formatJson(filterVal3, list3);

          const tHeader4 = ['UFP', 'AFP', '项目工期', '项目成本']; //对应表格输出的title
          const filterVal4 = ['UFP', 'AFP', 'projectDuration', 'projectCost']; // 对应表格输出的数据
          const list4 = this.tableData4;
          const data4 = this.formatJson(filterVal4, list4);

          export_json_to_excel(tHeader, data,tHeader2, data2, tHeader3, data3,tHeader4, data4,projectName); //对应下载文件的名字
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    data() {
      return {
        reportMenu: '1',
        tableData1: [{
          name: '',
          type: 'EIF',
          RET: '',
          RETNum: '',
          DET: '',
          DETNum: '',
          complexity:'高',
          UFP:''
        }],
        tableData2: [{
          name: '',
          type: 'EI',
          file: '',
          fileNum: '',
          DET: '',
          DETNum: '',
          complexity:'',
          UFP:''
        }],
        tableData3: [{
          developmentType:'New Development',
          developmentPlatform:'Personal computer',
          languageType:'3GL',
          dbms_Used:'Yes',
          rely:'Very Low',
          cplx:'Very Low',
          time:'Very Low',
          sced:'Very Low',
          productivity:'30',
          cost:'1000',
        }],
        tableData4: [{
          UFP:'23',
          AFP:'30',
          projectDuration:'30',
          projectCost:'1000'
        }],

        state:[],
        url: server.estimation + '/estimation'
      };
    }
  }
</script>


<style scoped>
  .outside {
    width: 100%;
    border-bottom: solid rgba(71, 72, 69, 0.4) 1px;
    border-right: solid rgba(71, 72, 69, 0.4) 1px;
    border-left: solid rgba(71, 72, 69, 0.4) 1px;
    border-top: 0;
    margin: auto;
  }

  .container {
    font-size: 13px;
    font-family: 'Microsoft YaHei';
    width: 80%;
    height: auto;
    margin-top: 50px;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .container.filter{
    width: 100%;
    border: solid rgba(71, 72, 69, 0.4) 1px;
    margin: auto;
  }
  .container .filter .quick-search {
    width: 200px;
    border: solid rgba(71, 72, 69, 0.4) 1px; }
  .container .filter .quick-search input {
    color: #474845; }
  .container .filter .quick-search input::placeholder {
    color: rgba(71, 72, 69, 0.4); }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-white{
    background: #FFFFFF
  }
  .bg-gray{
    background: #474845;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #FFFFFF;
  }
  .container >>> .showchange{
    color: cornflowerblue;
  }
  .ps{
    font-size: 13px;
    color: #878D99;
  }
</style>
