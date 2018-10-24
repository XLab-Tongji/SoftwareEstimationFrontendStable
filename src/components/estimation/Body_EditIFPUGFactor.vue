<!--管理员编辑IFPUG调整因子-->
  <template>
    <div class="container" style="background: #FFFFFF;">
      <!--编辑按钮-->
      <el-row style="margin-bottom: 0;min-width: 100%">
        <el-col :span="22"><div class="grid-content bg-white"></div></el-col>
        <el-col :span="2"><div class="grid-content bg-white">
          <!--<el-button type="text" v-on:click="editDialogVisible = true">编辑</el-button>-->
          <el-button type="text" disabled="">编辑</el-button>
        </div></el-col>
      </el-row>

      <hr class="style-two" width=100% style="margin-top: 0">
      <el-row></el-row>
      <!--开发类型、开发平台、开发语言、是否使用数据库-->
      <div v-for="radio in radios" :key="radio.name">
        <el-row :gutter="20" style="min-width: 100%">
          <el-col :span="3"><div class="grid-content bg-white">
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-white">
            <span>{{radio.name}}</span>
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-white">
            <el-radio-group v-model="radio.val" v-for="t in radio.vals" :key="t.value">
              <el-radio :label=t.value></el-radio>
            </el-radio-group>
          </div></el-col>
        </el-row>
      </div>

      <!--软件可靠性要求、产品复杂度、执行时间约束、要求的开发进度-->
      <div v-for="selection in selections" :key="selection.name">
        <el-row :gutter="20" style="min-width: 100%">
          <el-col :span="3"><div class="grid-content bg-white">
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-white">
            <span>{{selection.name}}</span>
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-white">
            <el-select v-model="selection.val" placeholder="请选择">
              <el-option
                      v-for="item in selection.vals"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
              </el-option>
            </el-select>
          </div></el-col>
        </el-row>
      </div>

      <!--生产率、人力成本-->
      <div v-for="item in inputs" :key="item.name">
        <el-row :gutter="20" style="min-width: 100%">
          <el-col :span="3"><div class="grid-content bg-white">
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-white">
            <span>{{item.name}}</span>
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-white">
            <el-input v-model="item.val" placeholder="请输入数字" style="width: 50%"></el-input>
            <span>{{item.unit}}</span>
          </div></el-col>
        </el-row>
      </div>


      <el-row></el-row>
      <el-row type="flex" class="row-bg" justify="space-between" style="min-width: 100%">
        <el-col :span="6"><div class="grid-content bg-white"></div></el-col>
       <el-col :span="6">
          <div class="grid-content bg-white">
            <el-button type="primary" @click="toManagerStepTwo" style="margin: auto;">返回</el-button>
            <el-button  @click="Next">保存</el-button>
            <!--<el-button  @click="sendMessage">传值</el-button>-->
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-white"></div></el-col>
      </el-row>

    </div>
  </template>


<script>
    import server from '../../../config/index';
//    import Body_CheckIFPUGFactor from "./Body_CheckIFPUGFactor.vue"

    //数据个数
    var dataNum=10;
    //记录原始数据
    var originalData=[];
//    //记录数据改动状态，0未变，1变，初始化置0
//    var changedDataState=[];
//    for(var i=0;i<dataNum;i++){
//        changedDataState[i]=false;
//    }

    function isNumber(val){

        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        if(regPos.test(val)){
            return true;
        }else{
            return false;
        }

    }

    export default {
        name: 'Body_EditIFPUGFactor',
//        components:{
//            Body_CheckIFPUGFactor
//        },
        methods: {
//            sendMessage(event) {
//                this.$emit("tansferUser","hhhhh");
//            },

            //作用：记录数据库传过来的数据
            //被调用：mounted函数中，数据传过来后
            saveOriginalData(){
               for(var i=0;i<dataNum;i++) {
                   if(i<4){
                       originalData[i]=this.radios[i].val;
                   }
                   else if(i>=4&&i<8){
                       originalData[i]=this.selections[i-4].val;
                   }
                   else if(i>=8&&i<10){
                       originalData[i]=this.inputs[i-8].val;
                   }

               }
            },

            //作用：比对当前数据和原始数据，标志修改过的数据，即state置1
            //被调用：Next函数中，数据传过去前
//            setDataState(){
//                for(var i=0;i<dataNum;i++) {
//                    if(i<4){
//                        if(originalData[i]!==this.radios[i].val) changedDataState[i]=true;
//                    }
//                    else if(i>=4&&i<8){
//                        if(originalData[i]!==this.selections[i-4].val) changedDataState[i]=true;
//                    }
//                    else if(i>=8&&i<10){
//                        if(originalData[i]!==this.inputs[i-8].val) changedDataState[i]=true;
//                    }
//
//                }
//            },


            toManagerStepTwo(){
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
                    this.$router.push({name:'ManagerStepTwo', params : {rId : this.$route.params.rId}})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            Next() {
                //标志修改过的数据
//                this.setDataState();
                var trans = {
                    "developmentType": this.radios[0].val,
                    "developmentPlatform": this.radios[1].val,
                    "languageType": this.radios[2].val,
                    "DBMS_Used": this.radios[3].val,
                    "RELY": this.selections[0].val,
                    "CPLX": this.selections[1].val,
                    "TIME": this.selections[2].val,
                    "SCED": this.selections[3].val,
                    "productivity": this.inputs[0].val,
                    "cost": this.inputs[1].val
                };

                console.log("showTransData:");
                console.log(trans);


                if(isNumber(trans.productivity)&&isNumber(trans.cost)) {
                    this.$confirm('是否提交当前信息, 进入下一步骤?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        this.$http.post(this.url + '/changeVAF/' + this.$route.params.rId, trans).then(response => {
                            this.$message({
                                type: 'success',
                                message: '已提交当前信息!'
                            });
                            if (response.body.flag)
                                this.$router.push({name: 'ManagerStepTwo', params: {rId: this.$route.params.rId}});
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
                else {
                    this.$message({
                        type: 'error',
                        message: '请输入数字！'
                    });
                }

            },
        },
        data() {
            return {
                editDialogVisible:false,
                radios:[
                    {
                        name:"开发类型",
                        val:"",
                        vals:[
                            {value:"New Development"},
                            {value:"Enhencement"},
                            {value:"Re-development"}
                        ]
                    },{
                        name:"开发平台",
                        val:"",
                        vals:[
                            {value:"Personal computer"},
                            {value:"Mainframe"},
                            {value:"Mid-range"}
                        ]
                    },{
                        name:"开发语言",
                        val:"",
                        vals:[
                            {value:"3GL"},
                            {value:"4GL"},
                            {value:"ApG"}
                        ]
                    },{
                        name:"是否使用数据库",
                        val:"",
                        vals:[
                            {value:"Yes"},
                            {value:"No"}
                        ]
                    }
                ],
                selections:[
                    {
                        name:"软件可靠性要求",
                        val:"",
                        vals:[
                            {value: 1, label: 'Very Low'
                            }, {value: 2, label: 'Low'
                            }, {value: 3, label: 'Normal'
                            }, {value: 4, label: 'High'
                            }, {value: 5, label: 'Very High'
                            }]
                    },{
                        name:"产品复杂度",
                        val:"",
                        vals:[
                            {value: 1, label: 'Very Low'
                            }, {value: 2, label: 'Low'
                            }, {value: 3, label: 'Normal'
                            }, {value: 4, label: 'High'
                            }, {value: 5, label: 'Very High'
                            }, {value: 6, label: 'Extra High'
                            }]
                    },{
                        name:"执行时间约束",
                        val:"",
                        vals:[
                            {value: 1, label: 'Normal'
                            }, {value: 2, label: 'High'
                            }, {value: 3, label: 'Very High'
                            }, {value: 4, label: 'Extra High'
                            }]
                    },{
                        name:"要求的开发进度",
                        val:"",
                        vals:[
                            {value: 1, label: 'Very Low'
                            }, {value: 2, label: 'Low'
                            }, {value: 3, label: 'Normal'
                            }, {value: 4, label: 'High'
                            }, {value: 5, label: 'Very High'
                            }]
                    }
                ],
                inputs:[
                    {
                        name:"生产率",
                        val:"",
                        unit:"小时／FP",
                        place:'10-30'
                    },{
                        name:"人力成本",
                        val:"",
                        unit:"元／人月",
                        place:"请输入内容"
                    }
                ],
                url: server.estimation + '/estimation'
            };
        },

        mounted(){
//            //测试：模拟数据库数据
//            this.radios[0].val = "Enhencement";
//            this.radios[1].val = "Personal computer";
//            this.radios[2].val = "4GL";
//            this.radios[3].val = "No";
//            this.selections[0].val = 'Normal';
//            this.selections[1].val = 'Very Low';
//            this.selections[2].val = 'High';
//            this.selections[3].val = 'Very High';
//            this.inputs[0].val = 10;
//            this.inputs[1].val = 20;
//
//            //记录数据库传过来的数据
//            this.saveOriginalData();
//            console.log("showOriginalData");
//            console.log(originalData);

            this.$http.get(this.url + '/getRequirement/'+this.$route.params.rId).then(res=>{
                console.log(res.body.vaf);
                this.radios[0].val = res.body.newVAF.developmentType;
                this.radios[1].val = res.body.newVAF.developmentPlatform;
                this.radios[2].val = res.body.newVAF.languageType;
                this.radios[3].val = res.body.newVAF.dbms_Used;
                this.selections[0].val = res.body.newVAF.rely;
                this.selections[1].val = res.body.newVAF.cplx;
                this.selections[2].val = res.body.newVAF.time;
                this.selections[3].val = res.body.newVAF.sced;
                this.inputs[0].val = res.body.newVAF.productivity;
                this.inputs[1].val = res.body.newVAF.cost;

                //记录数据库传过来的数据
                this.saveOriginalData();
                console.log("showOriginalData");
                console.log(originalData);

            },res=>{
                console.log('fail');
            })
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
