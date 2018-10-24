<!--用户输入IFPUG调整因子-->
  <template>
    <div class="mycontainer" style="background: #FFFFFF;">

      <!--开发类型、开发平台、开发语言、是否使用数据库-->
      <div v-for="radio in radios" :key="radio.name">
        <el-row :gutter="20" style="margin-left: 0;margin-right: 0;margin-top: 40px;margin-bottom: 0px">
          <el-col :span="3"><div class="grid-content bg-white">
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-white">
            <span>{{radio.name}}</span>
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-white">
            <el-radio-group v-model="radio.val" v-for="t in radio.vals" :key="t.value" style="margin-right:10px">
              <el-radio :label=t.value></el-radio>
            </el-radio-group>
          </div></el-col>
        </el-row>
      </div>

      <!--软件可靠性要求、产品复杂度、执行时间约束、要求的开发进度-->
      <div v-for="selection in selections" :key="selection.name">
        <el-row :gutter="20" style="margin-left: 0;margin-right: 0;margin-top: 40px;margin-bottom: 0px">
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
        <el-row :gutter="20" style="margin-left: 0;margin-right: 0;margin-top: 40px;margin-bottom: 0px">
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

      <div class="grid-content bg-white" style="margin: auto">
        <el-row :gutter="20" style="margin-left: 0;margin-right: 0;margin-top: 40px;margin-bottom: 0px">
        <el-button type="primary" @click="toStepTwo" >返回</el-button>
        <el-button type="primary" @click="toVer">提交</el-button>
        </el-row>
      </div>
      <div style="height: 50px;"></div>
    </div>
  </template>


<script>
    import server from '../../../config/index';

    function isNumber(val){

        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        if(regPos.test(val)){
            return true;
        }else{
            return false;
        }

    }

    export default {
        name: 'Body_IFPUGFactor',
        mounted(){
            this.$http.get(this.url + '/getRequirement/'+this.$route.params.rId).then(res=>{
                console.log(res.body.newVAF);
                if(res.body.newVAF!==null) {
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
                }
//                //记录数据库传过来的数据
//                this.aveOriginalData();
//                console.log("showOriginalData");
//                console.log(originalData);

            },res=>{
                console.log('fail');
            })
        },
        methods: {
            toStepTwo() {
                this.$confirm('返回前页将不会保存当前内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$router.push( {name:'StepTwo', params : {rId : this.$route.params.rId}});
                    this.$message({
                        type: 'success',
                        message: '返回前页!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            toVer() {
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
                    // "developmentTypeState": false,
                    // "developmentPlatformState": false,
                    // "languageTypeState": false,
                    // "DBMS_UsedState": false,
                    // "RELYState": false,
                    // "CPLXState": false,
                    // "TIMEState": false,
                    // "SCEDState": false,
                    // "productivityState": false,
                    // "costState": false,
                };
                console.log(trans);

                if(isNumber(trans.productivity)&&isNumber(trans.cost)){
                    this.$confirm('是否提交当前信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        console.log(this.url + '/addVAF/' + this.$route.params.rId)
                        this.$http.post(this.url + '/addVAF/' + this.$route.params.rId, trans).then(response => {
                            this.$message({
                                type: 'success',
                                message: '已提交当前信息!'
                            });
                            this.$router.push( {path:'/ver'});
                        })
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
        }
    }
</script>


<style scoped>
  .mycontainer {
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
  .mycontainer.filter{
    width: 100%;
    border: solid rgba(71, 72, 69, 0.4) 1px;
    margin: auto;
  }
  .mycontainer .filter .quick-search {
    width: 200px;
    border: solid rgba(71, 72, 69, 0.4) 1px; }
  .mycontainer .filter .quick-search input {
    color: #474845; }
  .mycontainer .filter .quick-search input::placeholder {
    color: rgba(71, 72, 69, 0.4); }

  .el-row {
    margin-bottom: 20px;
    width: 100%;
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
</style>
