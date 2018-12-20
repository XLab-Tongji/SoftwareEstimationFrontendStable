<!-- 登陆文件 -->
<template>
<div>
    <div class="stepone_section" style="background: #EEF1F5;">
        <HeadBarLight v-show="isLogin"></HeadBarLight>
        <HeadBarLight2 v-show="!isLogin"></HeadBarLight2>
        <div class="header1">
            <div class="page-header1">
                <div class="header1-container">
                    <div class="avatar">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509041832135&di=abc5c99b8048b0c600049e68cdb64602&imgtype=0&src=http%3A%2F%2Fimglf1.ph.126.net%2FnMbQAfw2LAJG4ahCYE_XJA%3D%3D%2F3886606478520925399.jpg">
                    </div>
                    <div class="person-info">
                        <div class="name">用户创建估算--项目说明</div>
                        <div class="info">{{this.$store.state.user.username}}<br>填写估算项目的详细信息</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepone_content" style="background: #FFFFFF;">
            <el-form class="stepone_form"  v-model="form" status-icon  ref="form" :rules="rules" label-position="left" label-width="100px" :model="form">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="form.projectName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目简介" prop="projectDescription">
                    <el-input type="textarea" v-model="form.projectDescription" placeholder="项目简介"></el-input>
                </el-form-item>

                <el-form-item label="项目负责人" prop="projectLeader">
                    <el-input v-model="form.projectLeader" placeholder="项目负责人"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="projectContact">
                    <el-input v-model="form.projectContact" placeholder="联系方式"></el-input>
                </el-form-item>

                <el-form-item label="估算方式" prop="estimationMethod">
                    <el-select style="padding-right:70%;min-width: 100px" v-model="form.estimationMethod" placeholder="请选择估算方式">
                        <el-option disabled value="">请选择</el-option>
                        <el-option label="IFPUG" value="IFPUG"></el-option>
                        <!-- <el-option label="COSMIC" value="COSMIC"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-top:50px">
                    <el-button v-on:click="toReport('form')">返回</el-button>
                    <el-button type="primary" v-on:click="toStepTwo('form')" style="margin-right: 10%">下一步</el-button>
                </el-form-item>
            </el-form>


        </div>
        <!--<div style="height: 50px;"></div>-->
    </div>
    <!-- footer -->
    <div class="footer">
      同济大学 XLab
    </div>
</div>
</template>

<script>
    import HeadBarLight from "../../components/head/HeadBarLight.vue";
    import HeadBarLight2 from "../../components/head/HeadBarLight2.vue";
    import server from '../../../config/index';

    export default {
        name: "StepOne",
        components: {
            HeadBarLight,
            HeadBarLight2
        },
        mounted: function () {
            this.$http.post(this.url + '/getRequirement/' + this.$route.params.rId,{"username": sessionStorage.getItem("username")}).then(response => {
                    console.log('save success');
                    console.log(response.body);
                    this.form.projectName = response.body.description.projectName;
                    this.form.projectDescription = response.body.description.projectDescription;
                    this.form.projectLeader = response.body.description.projectLeader;
                    this.form.projectContact = response.body.description.projectContact;
                    this.form.estimationMethod = response.body.description.estimationMethod;
                }, response => {
                    console.log('fail')
                    alert('fail')
                }
            )
        },
        data: function () {
            return {
                form: {
                    projectName: '',
                    projectDescription: '',
                    projectLeader: '',
                    projectContact: '',
                    estimationMethod: ''
                },
                msg: 'Welcome to Your Vue.js App',

                rules: {
                    projectName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    projectDescription: [
                        {required: true, message: '请输入项目描述', trigger: 'blur'}
                    ],
                    projectLeader: [
                        {required: true, message: '请选择日期', trigger: 'blur'}
                    ],
                    projectContact: [
                        {required: true, message: '请选择时间', trigger: 'blur'}
                    ],
                    estimationMethod: [
                        {required: true, message: '请选择一估算方法', trigger: 'blur'}
                    ],
                },

                url: server.estimation + '/estimation'
            }
        },
        created() {
          this.checkToken();
        },
        methods:{
            checkToken:function () {
                if(sessionStorage.tokenid && this.$store.state.user.tokenid !== '')
                    this.isLogin = true;
                else
                    this.isLogin = false;
            },
            toStepTwo(formName) {
                console.log(this.$refs)
                this.$refs[formName].validate((valid) => {
                    if (valid) {



                        var description = this.form
                        description.username = sessionStorage.getItem("username");
                        this.$http.post(this.url + '/addDescription/' + this.$route.params.rId, description).then(response => {
                                console.log('save success')
                                this.$router.push({name: 'StepTwo', params: {rId: this.$route.params.rId}});
                            }, response => {
                                console.log('fail')
                                alert('fail')
                            }
                        )
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请修改完善表单!'
                        });
                        return false;
                    }
                })

            },
            toReport(formName) {


                this.$refs[formName].validate((valid) => {
                    if (valid) {


                        var description = this.form
                        description.username = sessionStorage.getItem("username");
                        this.$http.post(this.url + '/addDescription/' + this.$route.params.rId, description).then(response => {
                                console.log('save success')
                                this.$router.push({path: '/ver'});
                            }, response => {
                                console.log('fail')
                                alert('fail')
                            }
                        )
                        this.$message({
                            type: 'success',
                            message: '返回前页!'
                        });
                    }
                    else {
                        this.$message({
                            type: 'warning',
                            message: '请修改完善表单!'
                        });
                    }

                })
            }

        }
    }
</script>

<style scoped>
    .footer {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 40px;
    color: #8a8a8a;
    }
    .header1 {
        width: 80%;
        margin-top: 84px;
        margin-left: 10%;
        display: flex;
        flex-direction: row;
        background: rgba(53, 94, 122, 0.7);
    }

    .header1 .page-header1 {
        border-radius: 4px 4px 0 0;
        margin: 0 auto;
        width: 80%;
        max-width: 948px;
        display: block;
    }

    .header1 .page-header1 .header1-container {
        background: rgba(245, 245, 245, 1);
        margin-top: 32px;
        height: 120px;
        position: relative;
        display: flex;
        flex-direction: row;
    }

    .header1 .page-header1 .header1-container .avatar {
        display: inline-block;
    }

    .header1 .page-header1 .header1-container .avatar img {
        width: 120px;
        height: 120px;
    }

    .header1 .page-header1 .header1-container .person-info {
        width: 784px;
        height: 120px;
        display: flex;
        flex-direction: column;
    }

    .header1 .page-header1 .header1-container .person-info .name {
        max-width: 460px;
        padding: 12px;
        font-size: 25px;
    }

    .header1 .page-header1 .header1-container .person-info .info {
        padding: 8px 0 0 24px;
        color: grey;
        font-size: 15px;
        line-height: 24px;
    }

    .stepone_content {
        text-align: center;
        /*margin-top: 40px;*/
        width: 80%;
        margin-left: 10%;
        /*max-width: ;*/
        padding-top: 80px;
        padding-bottom: 50px;
        /*margin-right: auto;*/
    /*. margin-bottom: 40 px;*/
        display: -webkit-flex;
        display: flex;
        display: inline-flex;
        display: -webkit-inline-flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        align-content: flex-start;
    }

    .stepone_content > .el-input {
        margin: 5px;
    }

    .stepone_content > .el-button {
        width: 100%;
        margin: 8px 5px;
    }

    .no_account {
        float: right;
        cursor: pointer;
        font-size: 12px;

    }

    .no_account > a {
        color: #323a45;
    }

    .stepone_form{
        min-width: 70%;
        max-width: 90%;

    }

</style>

