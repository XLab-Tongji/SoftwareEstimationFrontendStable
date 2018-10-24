<!-- 查看估算界面 -->
<template>
<div>
  <div class="person_center" style="background: #EEF1F5;">
    <HeadBarLight v-show="isLogin"></HeadBarLight>
    <HeadBarLight2 v-show="!isLogin"></HeadBarLight2>
    <div class="header1">
      <div class="page-header1">
        <div class="header1-container">
          <div class="avatar">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509041832135&di=abc5c99b8048b0c600049e68cdb64602&imgtype=0&src=http%3A%2F%2Fimglf1.ph.126.net%2FnMbQAfw2LAJG4ahCYE_XJA%3D%3D%2F3886606478520925399.jpg">
          </div>
          <div class="person-info">
            <div class="name">管理员--查看估算任务</div>
            <div class="info">{{this.$store.state.user.username}}<br></div>
          </div>
        </div>
      </div>
    </div>
    <ManagerReportTable></ManagerReportTable>
  </div>
  <!-- footer -->
  <div class="footer">
    同济大学 XLab
  </div>
</div>
</template>

<script>
  import HeadBarLight from "../../components/head/HeadBarLight.vue";
  import HeadBarLight2 from "../../components/head/HeadBarLight2"
  import ManagerReportTable from "../../components/estimation/Mtable"
  export default {
    name: "MVER",
    components: {
      HeadBarLight,
      HeadBarLight2,
      ManagerReportTable
    },
    data() {
      return {
        isCollapse: true
      };
    },
    created() {
      this.checkToken();
    },
    methods:{
      checkToken:function () {
        if(sessionStorage.tokenid || this.$store.state.user.tokenid !== '')
          this.isLogin = true;
        else
            this.isLogin = false;
      }
    }
  };

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
    margin-top:84px;
    margin-left:10% ;
    display: flex;
    flex-direction: row;
    background: rgba(53,94,122, 0.8);
  }
  .header1 .page-header1 {
    border-radius: 4px 4px 0 0;
    margin: 0 auto;
    width: 80%;
    max-width: 948px;
    display: block;
  }
  .header1 .page-header1 .header1-container {
    background: rgba(245,245,245, 1);
    margin-top: 32px;
    height: 120px;
    position: relative;
    display: flex;
    flex-direction: row; }
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
    line-height: 24px;}
</style>
