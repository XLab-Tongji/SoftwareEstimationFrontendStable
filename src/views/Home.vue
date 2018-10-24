<template>
    <div class="home">

      <!-- 头部 -->
      <div v-show="!isLogin"><Head></Head>
      </div>
      <div v-show="isLogin"><Head2></Head2>
      </div>
        <!-- 轮播 -->
        <div class="picshow">
        <el-carousel :interval="5000" arrow="always" :autoplay="false">
            <el-carousel-item :key="1">
                <img src="../assets/projectbackground.jpg" style="width: 100%; height: 100%">
                    <div class="brand">智码<span>基于人工智能的软件开发平台</span></div>
                    <div class="button_group">
                        <el-button><router-link to="/center">发布需求</router-link></el-button>
                        <el-button><router-link to="/projects">查看需求</router-link></el-button>
                    </div>
                </img>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <img src="../assets/projectbackground.jpg" style="width: 100%; height: 100%">
                </img>
            </el-carousel-item>
        </el-carousel>
        </div>

        <!-- 详细 -->
        <div class="home_status">
            <el-row :gutter="24" type="flex" justify="center" class="status_row">
                <el-col :span="8" class="status_col">
                    <div style="display:block">项目总数</div>
                    <div style="display:block">88888</div>
                </el-col>
                <el-col :span="8" class="status_col">
                    <div style="display:block">注册开发者</div>
                    <div style="display:block">88888</div>
                </el-col>
                <el-col :span="8" class="status_col">
                    <div style="display:block">已完成项目</div>
                    <div style="display:block">88888</div>
                </el-col>
            </el-row>
        </div>

        <div class="main_content">
            <div class="home_flow_left">
                <el-row :gutter="24" type="flex" justify="center">
                    <el-col :span="12" class="content_left">
                    需求市场 + 权威估价
                        <div class="content_child_left">
                            提供了需求项目发布平台，和迄今为止最权威的项目估价系统
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img class="img_icon_left" src="../assets/app.png">
                    </el-col>
                </el-row>
                <div style="height: 30px;"></div>
            </div>

            <div class="home_flow_right">
                <el-row :gutter="24" type="flex" justify="center">
                    <el-col :span="12">
                        <img class="img_icon_right" src="../assets/coder.png">
                    </el-col>
                    <el-col :span="12" class="content_right">
                    高质量开发者
                        <div class="content_child_right">
                            以高校学生为依托，为您提供高水准的开发人选
                        </div>
                    </el-col>
                </el-row>
                <div style="height: 30px;"></div>
            </div>

            <div class="home_flow_left">
                <el-row :gutter="24" type="flex" justify="center">
                    <el-col :span="12" class="content_left">
                    科学开发管理
                        <div class="content_child_left">
                            规范化，透明的软件开发管理平台
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img class="img_icon_left" src="../assets/monitor.png">
                    </el-col>
                </el-row>
                <div style="height: 30px;"></div>
            </div>

            <div class="home_flow_right">
                <el-row :gutter="24" type="flex" justify="center">
                    <el-col :span="12">
                        <img class="img_icon_right" src="../assets/security.png">
                    </el-col>
                    <el-col :span="12" class="content_right">
                    高校质保
                        <div class="content_child_right">
                            高校实验室最新代码质量检测服务，确保交付质量
                        </div>
                    </el-col>
                </el-row>
                <div style="height: 30px;"></div>
            </div>
        </div>

        <!-- footer -->
        <div class="footer">
            同济大学 XLab
        </div>
    </div>
</template>

<script>
  import Head from "../components/head/Head.vue"
  import Head2 from "../components/head/Head2.vue"

export default {
    name: 'Home',
    components:{
      Head,
      Head2
    },
    data() {
        return {
          isLogin:false,
          logo: "../static/headPic.jpg"
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
      }
    }
}

</script>


<style>
.brand {
    font-size: 50px;
    color:#fff;
    position: absolute;
    left: 43%;
    top: 35%;
}
.brand > span {
    font-size: 13px;
    margin-left: 10px;
}
.home{
    overflow: hidden;
 }

.footer {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 40px;
    color: #8a8a8a;
}

.status_row{
    padding-top: 20px;
    height: 100px;
    border-bottom: 1px solid #DDD;
    font-size: 1.5em;
    color: #657182;
}

.status_col{
    text-align:center;
}



.home_flow_left{
    border-bottom: 1px solid #DDD;
    padding-top: 30px;
    padding-left: 200px;
}

.content_left{
    padding-top: 60px;
    font-size: 1.5em;
    font-weight: bold;
    color: #8a8a8a;
    text-align:right;
    float: right;
}

.content_child_left{
    font-size: 15px;
    color: #667182;
    margin-top: 30px;
}

.img_icon_left{
    padding-left: 30px;
}

.home_flow_right{
        border-bottom: 1px solid #DDD;
    padding-top: 30px;
    padding-right: 200px;
}

.content_right{
    padding-top: 60px;
    font-size: 1.5em;
    font-weight: bold;
    color: #8a8a8a;
    text-align:left;
    float: left;
}

.content_child_right{
    font-size: 15px;
    color: #667182;
    margin-top: 30px;
}

.img_icon_right{
    padding-right: 30px;
    float: right;
}

.el-carousel-item {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: -1;
}
.picshow .el-carousel__container {
    height: 400px;
}

.el-carousel__item .button_group {
    text-align: center;
    margin-top: 300px;
}

.button_group{
    position: fixed;
    z-index: 1;
    top: 0px;
    width: 100%;
}

.button_group>.el-button {
    background-color: transparent;
    border-color: #ffffff;
    color: #ffffff;
    display: inline-block;
    width: 10%;
}
</style>
