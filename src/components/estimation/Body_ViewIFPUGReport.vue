<!--查看IFPUG报告-->
<template>
    <div>
    <div class="container" style="background: #FFFFFF;">
        <h1 style="font-family: 'PingFang SC';text-align: center">IFPUG报告</h1>
        <el-table
                id="table1"
                :data="tableData1"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="逻辑文件名称">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="逻辑文件类型">
            </el-table-column>
            <el-table-column
                    prop="RET"
                    label="RET">
            </el-table-column>
            <el-table-column
                    prop="DET"
                    label="DET">
            </el-table-column>
            <el-table-column
                    prop="complexity"
                    label="复杂度">
            </el-table-column>
            <el-table-column
                    prop="UFP"
                    label="UFP">
            </el-table-column>
        </el-table>

        <el-row></el-row>
        <el-row></el-row>
        <el-table
                id="table2"
                :data="tableData2"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="事务名称">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="事务类型">
            </el-table-column>
            <el-table-column
                    prop="file"
                    label="逻辑文件">
            </el-table-column>
            <el-table-column
                    prop="DET"
                    label="DET">
            </el-table-column>
            <el-table-column
                    prop="complexity"
                    label="复杂度">
            </el-table-column>
            <el-table-column
                    prop="UFP"
                    label="UFP">
            </el-table-column>
        </el-table>

        <el-row></el-row>
        <el-row></el-row>

        <div>
            <hr class="style-two"style="margin-top: 0%">
            <el-row>
                <span class="ps">估算人员调整后的估算因子，用蓝色标注</span>
            </el-row>
        </div>
        <el-row></el-row>
        <el-row :gutter="20">

            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>开发类型</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tType}}</span>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>软件可靠性要求</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tReliability}}</span>
            </div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>开发平台</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tPlatform}}</span>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>产品复杂度</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tComplexity}}</span>
            </div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>开发语言</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tLanguage}}</span>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>执行时间约束</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tTime}}</span>
            </div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>是否使用数据库</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tDB}}</span>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>要求的开发进度</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tSchedule}}</span>
            </div></el-col>
        </el-row>


        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>生产率</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tProductivity}}</span>
                <span>小时／FP</span>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>人力成本</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{tLabor}}</span>
                <span>元／人月</span>
            </div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>AFP</span>
            </div></el-col>
            <el-col :span="16"><div class="grid-content bg-white">
                <span>{{AFP}}</span>
            </div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>项目工期</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{projectDuration}}</span>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-white">
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>项目成本</span>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white">
                <span>{{projectCost}}</span>
            </div></el-col>
        </el-row>
        <el-row style="text-align: center">
            <el-button type="primary" v-on:click="prev" >返回</el-button>
        </el-row>
        <div style="height: 50px;"></div>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import server from '../../../config/index';
    import ElRow from "element-ui/packages/row/src/row";

    var trans;
    export default {
        components: {ElRow},
        name:'Body_ViewIFPUGReport',
        methods: {
        prev(){
          this.$router.push({path:'/mver'})
        }
      },
        mounted:function () {
            this.$http.get(this.url + '/getRequirement/' + this.$route.params.rId).then(response=>{
                console.log(response.body.vaf);
                trans=response.body.newVAF;
                console.log(trans.sced);
                this.tType=trans.developmentType;
                this.tPlatform=trans.developmentPlatform;
                this.tLanguage=trans.languageType;
                this.tDB=trans.dbms_Used;
                this.tReliability=trans.rely;
                this.tComplexity=trans.cplx;
                this.tTime=trans.time;
                this.tSchedule=trans.sced;
                this.tProductivity=trans.productivity;
                this.tLabor=trans.cost;
            },response=>{
                alert("error!")
            })
        },
        data() {
            return {
                tableData1: [{
                    name: '',
                    type: 'EIF',
                    RET: '',
                    DET: '',
                    complexity:'高',
                    UFP:''
                },{
                    name: '',
                    type: 'IIF',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: '',
                    RET: '',
                    DET: '',
                    complexity:'中',
                    UFP:''
                },{
                    name: '',
                    type: '',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                }],
                tableData2: [{
                    name: '',
                    type: 'EI',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: '',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: 'EQ',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: '',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: '',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: 'EQ',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: 'EQ',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                },{
                    name: '',
                    type: '',
                    RET: '',
                    DET: '',
                    complexity:'',
                    UFP:''
                }],
                tType:'',
                tPlatform:'',
                tLanguage:'',
                tDB:'',

                tReliability: '',
                tComplexity: '',
                tTime: '',
                tSchedule: '',

                tProductivity: '',
                tLabor: '',
                AFP:23.556,
                projectDuration:'',
                projectCost:'',

                url: server.estimation + 'estimation'
            };
        }
    }
</script>


<style scoped>
    .container {
        font-size: 13px;
        font-family: 'Microsoft YaHei';
        width: 80%;
        height: auto;
        margin: auto;
        padding: 0px 0 40px 0;
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
    .ps{
        font-size: 13px;
        color: #878D99;
    }

</style>
