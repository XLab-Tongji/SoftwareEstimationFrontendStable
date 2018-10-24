<!--管理员查看IFPUG调整因子-->
<template>
    <div class="container"  style="background: #FFFFFF;">

        <!--编辑按钮-->
        <el-row style="margin-bottom: 0 ;min-width: 100%">
            <el-col :span="22"><div class="grid-content bg-white"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-white">
                <!--<el-button type="text" v-on:click="editDialogVisible = true">编辑</el-button>-->
                <el-button type="text" v-on:click="toManagerStepThree">编辑</el-button>
            </div></el-col>
        </el-row>
        <!--&lt;!&ndash;编辑弹出框&ndash;&gt;-->
        <!--<el-dialog title="编辑调整因子" :visible.sync="editDialogVisible" width="30%" :before-close="handleClose">-->
            <!--<Body_EditIFPUGFactor @transferUser = "getMsg"></Body_EditIFPUGFactor>-->
            <!--<span slot="footer" class="dialog-footer">-->
                   <!--<el-button @click="closeEdition">取 消</el-button>-->
                   <!--<el-button type="primary" @click="submitEdition">提交</el-button>-->
                <!--</span>-->
        <!--</el-dialog>-->

        <hr class="style-two" width=100% style="margin-top: 0">
        <el-row></el-row>

        <!--前五行调整因子-->
        <div style="min-width: 100%">
            <el-row :gutter="20" v-for="group in displays" :key="group.index" style="min-width: 100%">
                <div v-for="item in group.items" :key="item.name" v-model="item.value">
                    <el-col :span="2"><div class="grid-content bg-white">
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-white">
                        <span>{{item.name}}</span>
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-white">
                        <span>{{item.value}}</span>
                        <span>{{item.unit}}</span>
                    </div></el-col>
                </div>
            </el-row>
        </div>

        <!--提交弹出框-->
        <el-dialog title="提示" :visible.sync="formDialogVisible">
            <el-form :model="form">
                <el-form-item label="修改状态" :label-width="formLabelWidth">
                    <el-select v-model="form.state" placeholder="请选择状态">
                        <el-option label="待修改" value="待修改"></el-option>
                        <el-option label="完成" value="完成"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.desc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Submit">确 定</el-button>
            </div>
        </el-dialog>

        <el-row></el-row>

        <!--提交、返回按钮-->
        <el-row type="flex" class="row-bg" justify="space-between" style="min-width: 100%">
            <el-col :span="5"><div class="grid-content bg-white"></div></el-col>
            <el-col :span="14"><div class="grid-content bg-white" style="text-align: center;">
                <el-button type="primary" @click="toMVER" style="margin: auto;">返回</el-button>
                <el-button type="primary" @click="formDialogVisible = true" style="margin: auto;">提交</el-button>
            </div></el-col>
            <el-col :span="5"><div class="grid-content bg-white"></div></el-col>
        </el-row>

    </div>

</template>


<script>
    import server from '../../../config/index';
//    import Body_EditIFPUGFactor from "./Body_EditIFPUGFactor.vue"

    export default {
        name: 'Body_CheckIFPUGFactor',
//        components: {
//            Body_EditIFPUGFactor
//        },
        methods: {
            init(){
                this.$http.get(this.url + '/getRequirement/'+this.$route.params.rId).then(res=>{
                    console.log(res.body);
                    var trans=res.body.newVAF;
                    this.displays[0].items[0].value=trans.developmentType;
                    this.displays[0].items[1].value=trans.rely;
                    this.displays[1].items[0].value=trans.developmentPlatform;
                    this.displays[1].items[1].value=trans.cplx;
                    this.displays[2].items[0].value=trans.languageType;
                    this.displays[2].items[1].value=trans.time;
                    this.displays[3].items[0].value=trans.dbms_Used;
                    this.displays[3].items[1].value=trans.sced;
                    this.displays[4].items[0].value=trans.productivity;
                    this.displays[4].items[1].value=trans.cost;
                },res=>{
                    console.log('fail');
                })
            },
//            closeEdition() {
//                this.$confirm('返回前页将不会保存当前内容, 是否继续?', '提示', {
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    type: 'warning',
//                    center: true
//                }).then(() => {
//                    this.dialogVisible=false
//                    this.$message({
//                        type: 'success',
//                        message: '已取消编辑'
//                    });
//                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消操作'
//                    });
//                });
//            },
//            submitEdition() {
//                this.editDialogVisible=false;
//                this.init();
//            },
//            handleClose(done) {
//                this.$confirm('确认关闭？')
//                    .then(_ => {
//                        done();
//                    })
//                    .catch(_ => {});
//            },
            toMVER() {
                this.$confirm('是否返回前页', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '返回前页!'
                    });
                    this.$router.push({path:'/mver'})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            toManagerStepThree(){
                this.$router.push({name:'ManagerStepThree', params : {rId : this.$route.params.rId}});
            },
            Submit(){
                var trans={
                    "state": this.form.state,
                    "remark": this.form.desc
                }
                console.log(trans.state);
                if(trans.state) {
                    this.$http.post(this.url + '/changeState/' + this.$route.params.rId, trans).then(response => {
                        this.$message({
                            type: 'success',
                            message: '已提交当前信息!'
                        });
                    })
                    this.$router.push({path: '/mver'});
                    this.dialogFormVisible = false;
                }
                else {
                    this.$message({
                        type: 'error',
                        message: '请输入合适状态!'
                    });
                }
            },
//            getMsg(data) { //msg就是从子组件传递过来的参数msg
//                console.log(data);
//            }
        },
        data() {
            return {
                displays:[
                    {
                        index:1,
                        items:[{
                            name:"开发类型",
                            value:""
                        },{
                            name:"软件可靠性要求",
                            value:""
                        }]
                    },{
                        index:2,
                        items:[{
                            name:"开发平台",
                            value:""
                        },{
                            name:"产品复杂度",
                            value:"",
                        }]
                    },{
                        index:3,
                        items:[{
                            name:"开发语言",
                            value:""
                        },{
                            name:"执行时间约束",
                            value:""
                        }]
                    },{
                        index:4,
                        items:[{
                            name:"是否使用数据库",
                            value:""
                        },{
                            name:"要求的开发进度",
                            value:""
                        }]
                    },{
                        index:5,
                        items:[{
                            name:"生产率",
                            value:"",
                            unit:"小时／FP"
                        },{
                            name:"人力成本",
                            value:"",
                            unit:"元／人月"
                        }]
                    }
                ],
                editDialogVisible: false,
                formDialogVisible: false,
                form: {
                    state: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                url: server.estimation + '/estimation'
            };
        },
        mounted(){
            this.init();
        }
    }
</script>


<style scoped>
    .container {
        font-size: 13px;
        font-family: 'Microsoft YaHei';
        width: 80%;
        height: auto;
        margin-top: 50px;
        margin-left: 10%;
        margin-bottom: 40px;
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
        background: #FFFFFF;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #FFFFFF;
    }

    hr.style-two {
        border: 0;
        height: 1px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25));
    }

</style>
