<!-- 登陆文件 -->
<template>
<div>
  <div class="functiondiv_section" style="background: #EEF1F5;">
    <HeadBarLight v-show="isLogin"></HeadBarLight>
    <HeadBarLight2 v-show="!isLogin"></HeadBarLight2>

    <div class="header1">
      <div class="page-header1">
        <div class="header1-container">
          <div class="avatar">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509041832135&di=abc5c99b8048b0c600049e68cdb64602&imgtype=0&src=http%3A%2F%2Fimglf1.ph.126.net%2FnMbQAfw2LAJG4ahCYE_XJA%3D%3D%2F3886606478520925399.jpg">
          </div>
          <div class="person-info">
            <div class="name">管理员估算--计算未调整功能点</div>
            <div class="info">{{this.$store.state.user.username}}<br></div>
          </div>
        </div>
      </div>
    </div>

    <div class="functiondiv_content">

      <div id="mydirectory">
        <div class="tree_btn">
          <el-button size="small" id="btn1" type="primary " @click="expand_all()">展开
          </el-button>

          <el-button size="small" id="btn2" @click="collapse_all()">收起
          </el-button>
        </div>

        <div id="div_tree" class="tree"></div>
      </div>


      <div id="default-right" style="margin-left: 20px;display: block" class="mycontent" v-if="defaultBtn">

      <div class='typora-export'>
        <div id='write' class='is-mac show-fences-line-number' style="width: 100%">
          <h1>使用说明
          </h1>
          <h3>1.选择功能</h3>
          <p>双击左侧的任一功能</p>
          <h3>2.填写事务功能</h3>
          <p>根据用户提供等信息，填写EI、EO、EQ等相关信息</p>
            <h3>2.填写数据功能</h3>
            <p>根据用户提供等信息，填写ILF、EIF等相关信息</p>

            <br>


        </div>
      </div>

      <div class="style-bottom-btn" style="width:100%;" >

        <el-button class="bottom-btn1" v-on:click="toStepOne">上一步</el-button>
        <el-button class="bottom-btn3" type="primary" v-on:click="defaultToStepThree">下一步</el-button>

      </div>
      </div>

      <div id="rightform" class="mycontent" :model="dynamicForm" :ref="dynamicForm">

        <!--<div class="form-input">-->
          <!--<div class="form-input-item1">-->
            <!--<p size="mini" v-model="ilfStr"><B>内部逻辑文件： </B>{{ilfStr}}</p>-->
          <!--</div>-->

          <!--<div class="form-input-item2">-->
            <!--<p size="mini" v-model="eifStr"><B>外部接口文件： </B>{{eifStr}}</p>-->
          <!--</div>-->
        <!--</div>-->


        <div class="step-box">

          <div class="step-set-list">
            <el-collapse  class="step-set" v-for="(step, indexout) in dynamicForm.steps" :key="step.key"
                         :prop="'steps.'+indexout+'.value'">


              <el-collapse-item>
                <template slot="title">
                  <div class="input-box">
                    <p v-model="step.name" class="step-input"><B>Step{{indexout}}： </B>{{step.name}}
                    </p>

                  </div>

                </template>


                <div class="out-in">
                  <div ref="dynamicForm" style="order: 1;" class="demo-dynamic file-type"
                       :label-position="labelPosition">


                    <div class="step-set-list-1" style="order: 1"
                         v-for="(ilf, indexmid) in step.ilfs"
                         :key="ilf.key"
                         :prop="'ilfs.' + indexmid + '.value'">
                      <div style="order: 1">
                        <p size="mini" v-model="ilf.name"><B>内部逻辑文件：</B>{{ilf.name}}
                        </p>
                      </div>

                      <div style="order: 2; margin-left: 20px">
                        <B>数据字段：</B>


                        <div class="data-input"
                             v-for="(dataField, indexin) in ilf.dataFields"
                             :key="dataField.key"
                             :prop="'dataFields.' + indexin + '.value'">
                          <p size="mini" v-model="dataField.value"
                          >{{dataField.value}} &nbsp</p>

                        </div>

                      </div>

                    </div>


                  </div>


                  <div ref="dynamicForm" style="order: 2" class="demo-dynamic file-type"
                       :label-position="labelPosition">


                    <div class="step-set-list-1" style="order: 1" :inline="true"
                         v-for="(eif, indexmid) in step.eifs"
                         :key="eif.key"
                         :prop="'eifs.' + indexmid + '.value'">
                      <div>

                        <p size="mini" v-model="eif.name"><B>外部接口文件：</B>
                          {{eif.name}}</p>
                      </div>

                      <div style="order: 2; margin-left: 20px;">
                        <B>数据字段：</B>

                        <div class="data-input"
                             v-for="(dataField, indexin) in eif.dataFields"
                             :key="dataField.key"
                             :prop="'dataFields.' + indexin + '.value'">


                          <p size="mini" v-model="dataField.value"
                          >{{dataField.value}}&nbsp</p>

                        </div>
                      </div>


                    </div>


                  </div>

                </div>

              </el-collapse-item>


            </el-collapse>
          </div>
        </div>


        <div style="margin-top: 50px ;font-size: 13px;width: 100%;min-width:500px">


          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="事务功能"  name="first"></el-tab-pane>
            <el-tab-pane label="数据功能" name="second"></el-tab-pane>

          </el-tabs>

          <div style="width: 100%;margin-bottom: 10px">



          </div>

                <v-table v-if="tab"
                  is-horizontal-resize
                  style="width:100%"
                  :columns="columns1"
                  :table-data="tableData1"
                  row-hover-color="#eee"
                  row-click-color="#edf7ff"
                  :cell-edit-done="cellEditDone1"
                         @on-custom-comp="customCompFunc1"

                ></v-table>





                <v-table v-else
                  is-horizontal-resize
                   style="width:100%"
                  :columns="columns2"
                  :table-data="tableData2"
                  row-hover-color="#eee"
                  row-click-color="#edf7ff"
                  :cell-edit-done="cellEditDone2"
                         @on-custom-comp="customCompFunc2"
                ></v-table>


          <div style="margin-top: 20px">
            <el-button type="primary " size="small"
                       @click.prevent="addRow">
              <i class="el-icon-plus"></i>
            </el-button>


          </div>



          <div class="style-bottom-btn">

            <el-button class="bottom-btn1" v-on:click="toStepOne">上一步</el-button>
            <el-button class="bottom-btn2" type="primary" v-on:click="saveTable">保存</el-button>
            <el-button class="bottom-btn3" type="primary" v-on:click="toStepThree">下一步</el-button>

          </div>
          <div style="height: 50px;"></div>

        </div>
      </div>


    </div>
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
  //  import '../../../config/Aimara'
  //    import MessageBox from 'MessageBox'

  import Vue from 'vue';
  import server from '../../../config/index';
  // 自定义列组件
  Vue.component('table-operation',{
    template:`<span>
        <!--<a href="" @click.stop.prevent="update(rowData,index)" style="color:#409EFF">编辑</a>&nbsp;-->
        <a href="" @click.stop.prevent="deleteRow(rowData,index)" style="color:#409EFF">删除</a>
        </span>`,
    props:{
      rowData:{
        type:Object
      },
      field:{
        type:String
      },
      index:{
        type:Number
      }
    },
    methods:{
      update(){

        // 参数根据业务场景随意构造
        let params = {type:'edit',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      },

      deleteRow(){

        // 参数根据业务场景随意构造
        let params = {type:'delete',index:this.index};
        this.$emit('on-custom-comp',params);

      }
    }
  })



  export default {
    name: "FunctionDiv",
    components: {
      HeadBarLight,
      HeadBarLight2
    },
    data: function () {
      return {
        treeMsg: {},
        activeName: 'first',
          isModify:false,
        tab:true,
          defaultBtn:true,

        columns1: [
          {
            field: 'name', title: '事务名称', width: 65, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'transactionType', title: '事务类型', width: 60, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'logicalFile', title: '逻辑文件', width: 90, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'fileNum', title: 'FTR数量', width: 60, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },
          {
            field: 'DET', title: 'DET', width: 90, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'detNum', title: 'DET数量', width: 60, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },
          {
            field: 'complex', title: '复杂度', width: 50, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },
          {
            field: 'ufp', title: 'UFP', width: 40, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },

          {field: 'custome-adv', title: '',width: 50, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}


        ],


        columns2: [
          {
            field: 'name', title: '文件名称', width: 65, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'fileType', title: '文件类型', width: 60, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'RET', title: 'RET', width: 90, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'retNum', title: 'RET数量', width: 60, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },
          {
            field: 'DET', title: 'DET', width: 90, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            isResize: true
          },
          {
            field: 'detNum', title: 'DET数量', width: 60, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },
          {
            field: 'complex', title: '复杂度', width: 50, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },
          {
            field: 'ufp', title: 'UFP', width: 40, titleAlign: 'center', columnAlign: 'center', isEdit: false,
            isResize: true
          },
          {field: 'custome-adv', title: '',width: 50, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}




        ],



        tableData1: [{
          name: '',
          transactionType: '',
          logicalFile: '',
          DET: '',
          fileNum: '',
          detNum: '',
          complex: '',
          ufp: '',
        }],



        tableData2: [{
          name: '',
          fileType: '',
          RET: '',
          DET: '',
          retNum: '',
          detNum: '',
          complex: '',
          ufp: '',
        }],


        labelPosition: 'right',
        tree: {},
        v_tree: {},
        node: {},
        rightnode: {},
        length: length,
        step_num: 1,
        cur: {
          id: '',
          name: '',
        },

        ilfStr: '',
        eifStr: '',
        cutNode: {},

        dynamicForm: {
          steps: [{
            name: '',
            ilfs: [{
              name: '',
              dataFields: [{
                value: ''
              }],
            }],
            eifs: [{
              name: '',
              dataFields: [{
                value: ''
              }],
            }]
          }]

        },
        url: server.estimation + '/estimation'
      }
    },

    mounted() {
      this.initTree()
//      document.getElementById("btn-transaction").className += " is-disabled";


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
      },




      customCompFunc1(params){

        console.log(params);

        if (params.type === 'delete'){ // do delete operation

          this.$delete(this.tableData1,params.index);

        }else if (params.type === 'edit'){ // do edit operation

          alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
        }

      },

      customCompFunc2(params){

        console.log(params);

        if (params.type === 'delete'){ // do delete operation

          this.$delete(this.tableData2,params.index);

        }else if (params.type === 'edit'){ // do edit operation

          alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
        }

      },


      addRow(){
        if(this.activeName ==='first'){
          this.tableData1.push({
            name: '',
            transactionType: '',
            logicalFile: '',
            DET: '',
            fileNum: 0,
            detNum: 0,
            complex: '',
            ufp: '',
          });


        }
        else {

          this.tableData2.push({
            name: '',
            fileType: '',
            RET: '',
            DET: '',
            retNum: 0,
            detNum: 0,
            complex: '',
            ufp: '',
          });

        }

      },

      handleClick(tab, event) {
        if(this.activeName==='first')
          this.tab=true;
        else
          this.tab=false;
      },

      // 单元格编辑回调
      cellEditDone1(newValue, oldValue, rowIndex, rowData, field) {

        this.tableData1[rowIndex][field] = newValue;

        if(field==='transactionType'){
          if(newValue!='EI'&&newValue!='EO'&&newValue!='EQ'){

            this.$message({
              type: 'warning',
              message: '请输入 EI, EO 或EQ'
            });


            this.tableData1[rowIndex][field] =oldValue;

          }

        }
        if(field==='logicalFile'){

          if(newValue===''){
            this.tableData1[rowIndex]['fileNum']=0;
          }
          else {

            this.tableData1[rowIndex]['fileNum'] = newValue.trim().split(' ').length;
          }

        }
        else if(field==='DET'){
          if(newValue===''){
            this.tableData1[rowIndex]['detNum']=0;
          }
          else {
            this.tableData1[rowIndex]['detNum'] = newValue.trim().split(' ').length;
          }
        }



      },


      cellEditDone2(newValue, oldValue, rowIndex, rowData, field) {

        this.tableData2[rowIndex][field] = newValue;

        if(field==='fileType'){
          if(newValue!='ILF'&&newValue!='EIF'){

            this.$message({
              type: 'warning',
              message: '请输入 ILF 或 EIF'
            });


            this.tableData2[rowIndex][field] =oldValue;

          }

        }

        if(field==='RET'){
          if(newValue===''){
            this.tableData2[rowIndex]['retNum']=0;
          }
          else {
            this.tableData2[rowIndex]['retNum']=newValue.trim().split(' ').length;

          }

        }
        else if(field==='DET'){
            if(newValue===''){
              this.tableData2[rowIndex]['detNum']=0;
          }
          else {
              this.tableData2[rowIndex]['detNum']=newValue.trim().split(' ').length;

            }
        }

      },

      dataFun() {

        var btn1 = document.getElementById("btn-transaction");
        var btn2 = document.getElementById("btn-data");

        btn1.className = "el-button el-button--primary";
        btn2.className += " is-disabled";


//        this.columns[3].title='sfda';

      },


      transactionFun() {

        var btn1 = document.getElementById("btn-transaction");
        var btn2 = document.getElementById("btn-data");

        btn2.className = "el-button el-button--primary";
        btn1.className += " is-disabled";




      },


      getFile(originalNode) {
        return {
          "name": originalNode.text,
          "id": originalNode.id,
        }
      }
      ,

      updateTreeRecursion(res) {
        var tem = {};
        tem.childFolders = [];
        tem.childFiles = [];
        tem.name = res.text;


        tem.id = res.id;
        for (var i = 0; i < res.childNodes.length; i++) {


          if (res.childNodes[i].type == 'file') {

            tem.childFiles.push(this.getFile(res.childNodes[i]));
          }
          else {
            tem.childFolders.push(this.updateTreeRecursion(res.childNodes[i]));
          }
        }
        return tem;
      }
      ,


      toStepOne() {

        this.$router.push({path: '/mver'});
      }
      ,
        toStepThree() {
            this.saveTable();
            this.$router.push({name: 'ManagerStepTwo', params : {rId : this.$route.params.rId}});
        },

        defaultToStepThree() {

            this.$router.push({name: 'ManagerStepTwo', params : {rId : this.$route.params.rId}});
        },




      checkTable(){
        for(var i=0;i<this.tableData1.length;i++){
          if(this.tableData1[i]['name']===''||this.tableData1[i]['transactionType']===''||this.tableData1[i]['logicalFile']===''||
          this.tableData1[i]['DET']===''||this.tableData1[i]['fileNum']===''||this.tableData1[i]['detNum']===''){

            return false;
          }
        }

        for(var i=0;i<this.tableData2.length;i++){
          if(this.tableData2[i]['name']===''||this.tableData2[i]['fileType']===''||this.tableData2[i]['RET']===''||
            this.tableData2[i]['DET']===''||this.tableData2[i]['retNum']===''||this.tableData2[i]['detNum']===''){

            return false;
          }
        }

        return true;

      },



      saveTable() {

      if(this.checkTable()) {


        var msg = {

          "tId": this.rightnode.id,
          "eFDs": this.tableData2,
          "eTDs": this.tableData1
        }
//                console.log(msg)
        this.$http.post(this.url + '/updateResult/' + this.$route.params.rId, msg).then(res => {
          this.$message({
            type: 'success' +
            '',
            message: '保存成功'
          });



          this.tableData1.length = 0;
          this.tableData2.length = 0;

          for (var i = 0; i < res.body.estimationTransactionDatas.length; i++) {
            this.tableData1.push({
              "name": res.body.estimationTransactionDatas[i].name,
              "transactionType": res.body.estimationTransactionDatas[i].transactionType,
              "logicalFile": res.body.estimationTransactionDatas[i].logicalFile,
              "DET": res.body.estimationTransactionDatas[i].DET,
              "fileNum": res.body.estimationTransactionDatas[i].fileNum,
              "detNum": res.body.estimationTransactionDatas[i].DETNum,
              "complex": res.body.estimationTransactionDatas[i].complexity,
              "ufp": res.body.estimationTransactionDatas[i].UFP
            })
          }

          for (var i = 0; i < res.body.estimationFileDatas.length; i++) {
            console.log("updateResult");
            console.log(res.body.estimationFileDatas[i]);
            this.tableData2.push({
              "name": res.body.estimationFileDatas[i].name,
              "fileType": res.body.estimationFileDatas[i].fileType,
              "RET": res.body.estimationFileDatas[i].RET,
              "retNum": res.body.estimationFileDatas[i].RETNum,
              "DET": res.body.estimationFileDatas[i].DET,
              "detNum": res.body.estimationFileDatas[i].DETNum,
              "complex": res.body.estimationFileDatas[i].complexity,
              "ufp": res.body.estimationFileDatas[i].UFP
            })
          }


        }, res => {
          this.$message({
            type: 'info',
            message: '保存失败'
          });
        })

      }

      else {

        this.$message({
          type: 'warning',
          message: '请完善表格后再提交'
        });


      }



      }
      ,


      push(owner, element) {

        owner.childNodes[++owner.top] = element;
      }
      ,

      //返回栈顶元素，同时top的位置减1
      pop(owner, vue) {
        return owner[--this.top];
      }
      ,


      //Create a HTML element specified by parameter 'p_type'
      createSimpleElement(p_type, p_id, p_class) {
        var element = document.createElement(p_type);
        if (p_id != undefined)
          element.id = p_id;
        if (p_class != undefined)
          element.className = p_class;
        return element;
      }
      ,
      ///// Creating the tree component
      // p_div: ID of the div where the tree will be rendered;
      // p_backColor: Background color of the region where the tree is being rendered;
      // p_contextMenu: Object containing all the context menus. Set null for no context menu;
      createTre(vue, p_div, p_backColor, p_contextMenu, p_id = null) {

        var tempTreeId = (p_id === null) ? Date.now() : p_id;

        var tree = {
          name: 'tree',
          text: 'tree',
          div: p_div,
          ulElement: null,
          childNodes: [],
          backcolor: p_backColor,
//          contextMenu: p_contextMenu,
          selectedNode: null,
          nodeCounter: 0,
//          contextMenuDiv: null,
          rendered: false,
          top: -1,
          id: tempTreeId,


          ///// Creating a new node
          // p_text: Text displayed on the node;
          // p_expanded: True or false, indicating wether the node starts expanded or not;
          // p_icon: Relative path to the icon displayed with the node. Set null if the node has no icon;
          // p_parentNode: Reference to the parent node. Set null to create the node on the root;
          // p_tag: Tag is used to store additional information on the node. All node attributes are visible when programming events and context menu actions;
          // p_contextmenu: Name of the context menu, which is one of the attributes of the p_contextMenu object created with the tree;
          createNode(vue, p_text, p_expanded, p_icon, p_parentNode, p_tag, p_contextmenu, p_id = null, p_type) {
            vue.v_tree = this;
            var tempId = (p_id === null) ? Date.now() : p_id;

            vue.node = {
              type: p_type,
              id: tempId,
              text: p_text,
              icon: p_icon,
              parent: p_parentNode,
              expanded: p_expanded,
              childNodes: [],
              tag: p_tag,
//              contextMenu: p_contextmenu,
              elementLi: null,
              top: -1,

              ///// Removing the node and all its children
              removeNode(vue) {
                vue.v_tree.removeNode(this);
              },
              ///// Expanding or collapsing the node, depending on the expanded value
              toggleNode(p_event) {
                vue.v_tree.toggleNode(this);
              },
              ///// Expanding the node
              expandNode(p_event) {
                vue.v_tree.expandNode(this);
              },
              ///// Expanding the node and its children recursively
              expandSubtree() {
                vue.v_tree.expandSubtree(this);
              },
              ///// Changing the node text
              // p_text: New text;
              setText(p_text) {
                vue.v_tree.setText(this, p_text);
              },
              ///// Collapsing the node
              collapseNode() {
                vue.v_tree.collapseNode(this);
              },
              ///// Collapsing the node and its children recursively
              collapseSubtree() {
                vue.v_tree.collapseSubtree(this);
              },
              ///// Deleting all child nodes
              removeChildNodes() {
                vue.v_tree.removeChildNodes(this);
              },
              ///// Creating a new child node;
              // p_text: Text displayed;
              // p_expanded: True or false, indicating wether the node starts expanded or not;
              // p_icon: Icon;
              // p_tag: Tag;
              // p_contextmenu: Context Menu;
              createChildNode(vue, p_text, p_expanded, p_icon, p_tag, p_contextmenu, p_id, p_type) {

                return vue.v_tree.createNode(vue, p_text, p_expanded, p_icon, this, p_tag, p_contextmenu, p_id, p_type);


              }
            }

            vue.tree.nodeCounter++;

            if (this.rendered) {
              if (p_parentNode == undefined) {
                this.drawNode(vue, this.ulElement, vue.node);
                this.adjustLines(this.ulElement, false);
              }
              else {
                var v_ul = p_parentNode.elementLi.getElementsByTagName("ul")[0];
                if (p_parentNode.childNodes.length == 0) {

                  if (p_parentNode.expanded) {
                    p_parentNode.elementLi.getElementsByTagName("ul")[0].style.display = 'block';
                    var v_img = p_parentNode.elementLi.getElementsByTagName("i")[0];
                    v_img.style.visibility = "visible";
                    v_img.className = 'menu_img el-icon-caret-bottom';
                    v_img.id = 'toggle_off';
                  }
                  else {

//                    //交换父子节点的ID
//                    var tempId=p_parentNode.id;
////                    var tempName=p_parentNode.text;
//
//                    p_parentNode.id=vue.node.id;
////                    p_parentNode.text=vue.node.text;
//
//                    vue.node.id=tempId;
////                    vue.node.text=tempName;


                    p_parentNode.elementLi.getElementsByTagName("ul")[0].style.display = 'none';
                    var v_img = p_parentNode.elementLi.getElementsByTagName("i")[0];
                    v_img.style.visibility = "visible";
                    v_img.className = 'menu_img el-icon-caret-right';
                    v_img.id = 'toggle_on';
                  }
                }
                this.drawNode(vue, v_ul, vue.node);
                this.adjustLines(v_ul, false);
              }
            }

            if (p_parentNode == undefined) {
              vue.push(this, vue.node);
              vue.node.parent = this;
            }
            else
              vue.push(p_parentNode, vue.node);


            return vue.node;
          },


          //Create img element
          createImgElement(p_id, p_class) {
            var element = document.createElement('i');
            if (p_id != undefined)
              element.id = p_id;
            if (p_class != undefined)
              element.className = p_class;
            // if (p_src!=undefined)
            //     element.src = p_src;
            return element;
          },


          createSimpleElement(p_type, p_id, p_class) {
            var element = document.createElement(p_type);
            if (p_id != undefined)
              element.id = p_id;
            if (p_class != undefined)
              element.className = p_class;
            return element;
          },

          ///// Render the tree;
          drawTree(vue) {

            this.rendered = true;
            var div_tree = document.getElementById(this.div);
            div_tree.innerHTML = '';

            var ulElement = this.createSimpleElement('ul', this.name, 'tree');

            this.ulElement = ulElement;

            for (var i = 0; i < this.childNodes.length; i++) {
              this.drawNode(vue, ulElement, this.childNodes[i]);
            }

            div_tree.appendChild(ulElement);

            this.adjustLines(document.getElementById(this.name), true);

          },
          ///// Drawing the node. This function is used when drawing the Tree and should not be called directly;
          // p_ulElement: Reference to the UL tag element where the node should be created;
          // p_node: Reference to the node object;
          drawNode(vue, p_ulElement, p_node) {

            vue.v_tree = this;

            var v_icon = null;

            if (p_node.icon != null)
              v_icon = vue.createImgElement(null, 'icon_tree ' + p_node.icon.className);

            var v_li = document.createElement('li');
            p_node.elementLi = v_li;

            var v_span = vue.createSimpleElement('span', null, 'node');

            var v_exp_col = null;

            if (p_node.type === 'file') {
              v_exp_col = vue.createImgElement('toggle_off', 'exp_col ' + 'el-icon-caret-bottom');
              v_exp_col.style.visibility = "hidden";
            }
            else {
              if (p_node.expanded) {
                v_exp_col = vue.createImgElement('toggle_off', 'exp_col ' + 'el-icon-caret-bottom');
              }
              else {
                v_exp_col = vue.createImgElement('toggle_on', 'exp_col ' + 'el-icon-caret-right');
              }
            }

            v_span.ondblclick = function () {
              vue.v_tree.doubleClickNode(p_node);
            };

            v_exp_col.onclick = function () {
              vue.v_tree.toggleNode(p_node);
            };

            v_span.onclick = function () {
              vue.v_tree.selectNode(p_node);
            };

//            v_span.oncontextmenu = function (e) {
//              vue.v_tree.selectNode(p_node);
//              vue.v_tree.nodeContextMenu(vue, e, p_node);
//            };

            if (v_icon != undefined)
              v_span.appendChild(v_icon);
/////////////////////////////////////////
            var v_a = vue.createSimpleElement('a', null, null);
            v_a.innerHTML = p_node.text;
            v_span.appendChild(v_a);
            v_li.appendChild(v_exp_col);
            v_li.appendChild(v_span);

            p_ulElement.appendChild(v_li);

            var v_ul = vue.createSimpleElement('ul', 'ul_' + p_node.id, null);
            v_li.appendChild(v_ul);

            if (p_node.childNodes.length > 0) {

              if (!p_node.expanded)
                v_ul.style.display = 'none';

              for (var i = 0; i < p_node.childNodes.length; i++) {
                this.drawNode(vue, v_ul, p_node.childNodes[i]);
              }
            }
          },
          ///// Changing node text
          // p_node: Reference to the node that will have its text updated;
          // p_text: New text;
          setText(p_node, p_text) {
            p_node.elementLi.getElementsByTagName('span')[0].lastChild.innerHTML = p_text;
            p_node.text = p_text;
          },
          ///// Expanding all tree nodes
          expandTree() {
            for (var i = 0; i < this.childNodes.length; i++) {
              if (this.childNodes[i].type==='folder') {
                this.expandSubtree(this.childNodes[i]);
              }
            }
          },
          ///// Expanding all nodes inside the subtree that have parameter 'p_node' as root
          // p_node: Subtree root;
          expandSubtree(p_node) {
            this.expandNode(p_node);
            for (var i = 0; i < p_node.childNodes.length; i++) {
              if (p_node.childNodes[i].type==='folder') {
                this.expandSubtree(p_node.childNodes[i]);
              }
            }
          },
          ///// Collapsing all tree nodes
          collapseTree() {
            for (var i = 0; i < this.childNodes.length; i++) {
              if (this.childNodes[i].type==='folder') {
                this.collapseSubtree(this.childNodes[i]);
              }
            }
          },
          ///// Collapsing all nodes inside the subtree that have parameter 'p_node' as root
          // p_node: Subtree root;
          collapseSubtree(p_node) {
            this.collapseNode(p_node);
            for (var i = 0; i < p_node.childNodes.length; i++) {
              if (p_node.childNodes[i].type==='folder') {
                this.collapseSubtree(p_node.childNodes[i]);
              }
            }
          },
          ///// Expanding node
          // p_node: Reference to the node;
          expandNode(p_node) {
            if (p_node.type === 'folder' && p_node.expanded == false) {
              if (this.nodeBeforeOpenEvent != undefined)
                this.nodeBeforeOpenEvent(p_node);

              var img = p_node.elementLi.getElementsByTagName("i")[0];

              p_node.expanded = true;

              img.id = "toggle_off";
              img.className = 'el-icon-caret-bottom';
              var elem_ul = img.parentElement.getElementsByTagName("ul")[0];
              elem_ul.style.display = 'block';

              if (this.nodeAfterOpenEvent != undefined)
                this.nodeAfterOpenEvent(p_node);
            }
          },
          ///// Collapsing node
          // p_node: Reference to the node;
          collapseNode(p_node) {
            if (p_node.type === 'folder' && p_node.expanded == true) {
              var img = p_node.elementLi.getElementsByTagName("i")[0];

              p_node.expanded = false;
              if (this.nodeBeforeCloseEvent != undefined)
                this.nodeBeforeCloseEvent(p_node);

              img.id = "toggle_on";
              img.className = 'el-icon-caret-right';
              var elem_ul = img.parentElement.getElementsByTagName("ul")[0];
              elem_ul.style.display = 'none';

            }
          },
          ///// Toggling node
          // p_node: Reference to the node;
          toggleNode(p_node) {
            if (p_node.type === 'folder') {
              if (p_node.expanded)
                p_node.collapseNode();
              else
                p_node.expandNode();
            }
          },
          ///// Double clicking node
          // p_node: Reference to the node;

          doubleClickNode(p_node) {

            if (p_node.type == 'folder') {
              this.toggleNode(p_node);
            }
            else if (p_node.id == vue.cur.id) {
              return;
            }
            else if (vue.cur.id !== null) {


              ///////////////////////////////////////
              vue.$confirm('是否保存当前内容?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

                  var msg = {

                    "tId" : vue.rightnode.id,
                    "eFDs" :vue.tableData2,
                    "eTDs" :vue.tableData1
                  }
//                console.log(msg)
                  vue.$http.post(vue.url + '/updateResult/' + vue.$route.params.rId, msg).then(res => {
                    vue.$message({
                      type: 'success',
                      message: '保存成功'
                    });



                    vue.tableData1.length=0;
                    for(var i=0;i<res.body.estimationTransactionDatas.length;i++){
                      vue.tableData1.push({
                        "name": res.body.estimationTransactionDatas[i].name,
                        "transactionType": res.body.estimationTransactionDatas[i].transactionType,
                        "logicalFile": res.body.estimationTransactionDatas[i].logicalFile,
                        "DET": res.body.estimationTransactionDatas[i].DET,
                        "fileNum": res.body.estimationTransactionDatas[i].fileNum,
                        "detNum": res.body.estimationTransactionDatas[i].DETNum,
                        "complex" : res.body.estimationTransactionDatas[i].complexity,
                        "ufp" : res.body.estimationTransactionDatas[i].UFP
                      })
                    }

                    if (res.body.estimationFileDatas.length > 0){
                        vue.tableData2.length=0;
                        for(var i=0;i<res.body.estimationFileDatas.length;i++){
                        console.log("updateResult");
                        console.log(res.body.estimationFileDatas[i]);
                        vue.tableData2.push({
                          "name": res.body.estimationFileDatas[i].name,
                          "fileType": res.body.estimationFileDatas[i].fileType,
                          "RET": res.body.estimationFileDatas[i].RET,
                          "retNum": res.body.estimationFileDatas[i].RETNum,
                          "DET": res.body.estimationFileDatas[i].DET,
                          "detNum": res.body.estimationFileDatas[i].DETNum,
                          "complex" : res.body.estimationFileDatas[i].complexity,
                          "ufp" : res.body.estimationFileDatas[i].UFP
                        })
                      }
                    }
                    

                    vue.cur.id = p_node.id;
                    vue.rightnode = p_node;
                    vue.cur.name = p_node.text;

                    var msg = {
                      "tId": vue.cur.id
                    }

                    vue.$http.post(vue.url + '/getTransaction/' + vue.$route.params.rId, msg).then(res => {
                      //alert("success")
                      vue.dynamicForm.steps.length = 0;
                      vue.ilfStr = res.body.nameOfILF;
                      vue.eifStr = res.body.nameOfEIF;



                      vue.tableData1.length=0;
                      for(var i=0;i<res.body.estimationTransactionDatas.length;i++){
                        // console.log(res.body.estimationTransactionDatas[i]);
                        vue.tableData1.push({
                          "name": res.body.estimationTransactionDatas[i].name,
                          "transactionType": res.body.estimationTransactionDatas[i].transactionType,
                          "logicalFile": res.body.estimationTransactionDatas[i].logicalFile,
                          "DET": res.body.estimationTransactionDatas[i].DET,
                          "fileNum": res.body.estimationTransactionDatas[i].fileNum,
                          "detNum": res.body.estimationTransactionDatas[i].DETNum,
                          "complex" : res.body.estimationTransactionDatas[i].complexity,
                          "ufp" : res.body.estimationTransactionDatas[i].UFP
                        })
                      }

                      if (!(res.body.estimationFileDatas.length == 1 && res.body.estimationFileDatas[0].name == "")){
                          vue.tableData2.length=0;
                          for(var i=0;i<res.body.estimationFileDatas.length;i++){
                            console.log("getTransaction0");
                            console.log(res.body.estimationFileDatas[i]);
                            vue.tableData2.push({
                              "name": res.body.estimationFileDatas[i].name,
                              "fileType": res.body.estimationFileDatas[i].fileType,
                              "RET": res.body.estimationFileDatas[i].RET,
                              "retNum": res.body.estimationFileDatas[i].RETNum,
                              "DET": res.body.estimationFileDatas[i].DET,
                              "detNum": res.body.estimationFileDatas[i].DETNum,
                              "complex" : res.body.estimationFileDatas[i].complexity,
                              "ufp" : res.body.estimationFileDatas[i].UFP
                            })
                        }
                      }
                      




                      if (res.body.steps.length === 0) {
                        vue.addStep();
                      }
                      for (var i = 0; i < res.body.steps.length; i++) {
                        vue.dynamicForm.steps.push({
                          "name": res.body.steps[i].stepName,
                          "ilfs": [],
                          "eifs": []
                        });
                        for (var j = 0; j < res.body.steps[i].ilfDataSets.length; j++) {
                          vue.dynamicForm.steps[i].ilfs.push({
                            "name": res.body.steps[i].ilfDataSets[j].innerlogicalFileName,
                            "dataFields": []
                          });
                          for (var k = 0; k < res.body.steps[i].ilfDataSets[j].DET.length; k++) {
                            vue.dynamicForm.steps[i].ilfs[j].dataFields.push({
                              "value": res.body.steps[i].ilfDataSets[j].DET[k]
                            });
                          }
                        }

                        for (var j = 0; j < res.body.steps[i].eifDataSets.length; j++) {
                          vue.dynamicForm.steps[i].eifs.push({
                            "name": res.body.steps[i].eifDataSets[j].externalInterfaceFileName,
                            "dataFields": []
                          });
                          for (var k = 0; k < res.body.steps[i].eifDataSets[j].DET.length; k++) {
                            vue.dynamicForm.steps[i].eifs[j].dataFields.push({
                              "value": res.body.steps[i].eifDataSets[j].DET[k]
                            });
                          }
                        }

                      }


                    }, res => {
                      //alert("fail000")
                    })




                  }, res => {
                    vue.$message({
                      type: 'info',
                      message: '保存失败'
                    });




                    vue.cur.id = p_node.id;
                    vue.rightnode = p_node;
                    vue.cur.name = p_node.text;

                    if (vue.rightnode !== null) {
                      vue.tree.selectNode(vue.rightnode);
                    }

                    var msg = {
                      "tId": vue.cur.id
                    }

                    vue.$http.post(vue.url + '/getTransaction/' + vue.$route.params.rId, msg).then(res => {
                      //alert("success")
                      vue.dynamicForm.steps.length = 0;
                      vue.ilfStr = res.body.nameOfILF;
                      vue.eifStr = res.body.nameOfEIF;




                      vue.tableData1.length=0;
                      for(var i=0;i<res.body.estimationTransactionDatas.length;i++){
                        vue.tableData1.push({
                          "name": res.body.estimationTransactionDatas[i].name,
                          "transactionType": res.body.estimationTransactionDatas[i].transactionType,
                          "logicalFile": res.body.estimationTransactionDatas[i].logicalFile,
                          "DET": res.body.estimationTransactionDatas[i].DET,
                          "fileNum": res.body.estimationTransactionDatas[i].fileNum,
                          "detNum": res.body.estimationTransactionDatas[i].DETnum,
                          "complex" : res.body.estimationTransactionDatas[i].complexity,
                          "ufp" : res.body.estimationTransactionDatas[i].ufp
                        })
                      }

                      if (!(res.body.estimationFileDatas.length == 1 && res.body.estimationFileDatas[0].name == "")){
                          vue.tableData2.length=0;
                          for(var i=0;i<res.body.estimationFileDatas.length;i++){
                            console.log("getTransaction1");
                            console.log(res.body.estimationFileDatas[i]);
                            vue.tableData2.push({
                              "name": res.body.estimationFileDatas[i].name,
                              "fileType": res.body.estimationFileDatas[i].fileType,
                              "RET": res.body.estimationFileDatas[i].ret,
                              "retNum": res.body.estimationFileDatas[i].retnum,
                              "DET": res.body.estimationFileDatas[i].det,
                              "detNum": res.body.estimationFileDatas[i].detnum,
                              "complex" : res.body.estimationFileDatas[i].complexity,
                              "ufp" : res.body.estimationFileDatas[i].ufp
                            })
                        }
                      }
                      




                      if (res.body.steps.length === 0) {
                        vue.addStep();
                      }
                      for (var i = 0; i < res.body.steps.length; i++) {
                        vue.dynamicForm.steps.push({
                          "name": res.body.steps[i].stepName,
                          "ilfs": [],
                          "eifs": []
                        });
                        for (var j = 0; j < res.body.steps[i].ilfDataSets.length; j++) {
                          vue.dynamicForm.steps[i].ilfs.push({
                            "name": res.body.steps[i].ilfDataSets[j].innerlogicalFileName,
                            "dataFields": []
                          });
                          for (var k = 0; k < res.body.steps[i].ilfDataSets[j].DET.length; k++) {
                            vue.dynamicForm.steps[i].ilfs[j].dataFields.push({
                              "value": res.body.steps[i].ilfDataSets[j].DET[k]
                            });
                          }
                        }

                        for (var j = 0; j < res.body.steps[i].eifDataSets.length; j++) {
                          vue.dynamicForm.steps[i].eifs.push({
                            "name": res.body.steps[i].eifDataSets[j].externalInterfaceFileName,
                            "dataFields": []
                          });
                          for (var k = 0; k < res.body.steps[i].eifDataSets[j].DET.length; k++) {
                            vue.dynamicForm.steps[i].eifs[j].dataFields.push({
                              "value": res.body.steps[i].eifDataSets[j].DET[k]
                            });
                          }
                        }

                      }


                    }, res => {
                      //alert("fail000")
                    })






                  })













              })
//                .catch(() => {
//
//                  if (vue.rightnode !== null) {
//                    vue.tree.selectNode(vue.rightnode);
//                  }
//                });


            }

            else {

                vue.defaultBtn=false;
              vue.cur.id = p_node.id;
              vue.rightnode = p_node;
              vue.cur.name = p_node.text;
              document.getElementById('rightform').style.visibility = 'visible';

              var msg = {
                "tId": vue.cur.id
              }


              vue.$http.post(vue.url + '/getTransaction/' + vue.$route.params.rId, msg).then(res => {
                //alert("success")
                  console.log(res.body);
                  vue.dynamicForm.steps.length = 0;
                vue.ilfStr = res.body.nameOfILF;
                vue.eifStr = res.body.nameOfEIF;


                vue.tableData1.length=0;
                  for(var i=0;i<res.body.estimationTransactionDatas.length;i++){
                    vue.tableData1.push({
                      "name": res.body.estimationTransactionDatas[i].name,
                      "transactionType": res.body.estimationTransactionDatas[i].transactionType,
                      "logicalFile": res.body.estimationTransactionDatas[i].logicalFile,
                      "DET": res.body.estimationTransactionDatas[i].DET,
                      "fileNum": res.body.estimationTransactionDatas[i].fileNum,
                      "detNum": res.body.estimationTransactionDatas[i].DETNum,
                      "complex" : res.body.estimationTransactionDatas[i].complexity,
                      "ufp" : res.body.estimationTransactionDatas[i].UFP
                    })
                  }

                if (!(res.body.estimationFileDatas.length == 1 && res.body.estimationFileDatas[0].name == "")){
                  vue.tableData2.length=0;
                  for(var i=0;i<res.body.estimationFileDatas.length;i++){
                    console.log("getTransaction2");
                    console.log(res.body.estimationFileDatas[i]);
                    vue.tableData2.push({
                      "name": res.body.estimationFileDatas[i].name,
                      "fileType": res.body.estimationFileDatas[i].fileType,
                      "RET": res.body.estimationFileDatas[i].RET,
                      "retNum": res.body.estimationFileDatas[i].RETNum,
                      "DET": res.body.estimationFileDatas[i].DET,
                      "detNum": res.body.estimationFileDatas[i].DETNum,
                      "complex" : res.body.estimationFileDatas[i].complexity,
                      "ufp" : res.body.estimationFileDatas[i].UFP
                    })
                  }
                }
                
                  

                if (res.body.steps.length === 0) {
                  vue.addStep();
                }
                for (var i = 0; i < res.body.steps.length; i++) {
                  vue.dynamicForm.steps.push({
                    "name": res.body.steps[i].stepName,
                    "ilfs": [],
                    "eifs": []
                  });
                  for (var j = 0; j < res.body.steps[i].ilfDataSets.length; j++) {
                    vue.dynamicForm.steps[i].ilfs.push({
                      "name": res.body.steps[i].ilfDataSets[j].innerlogicalFileName,
                      "dataFields": []
                    });
                    for (var k = 0; k < res.body.steps[i].ilfDataSets[j].DET.length; k++) {
                      vue.dynamicForm.steps[i].ilfs[j].dataFields.push({
                        "value": res.body.steps[i].ilfDataSets[j].DET[k]
                      });
                    }
                  }

                  for (var j = 0; j < res.body.steps[i].eifDataSets.length; j++) {
                    vue.dynamicForm.steps[i].eifs.push({
                      "name": res.body.steps[i].eifDataSets[j].externalInterfaceFileName,
                      "dataFields": []
                    });
                    for (var k = 0; k < res.body.steps[i].eifDataSets[j].DET.length; k++) {
                      vue.dynamicForm.steps[i].eifs[j].dataFields.push({
                        "value": res.body.steps[i].eifDataSets[j].DET[k]
                      });
                    }
                  }

                }


              }, res => {
                //alert("fail000")
              })


            }
          },


          ///// Selecting node
          // p_node: Reference to the node;
          selectNode(p_node) {
            var span = p_node.elementLi.getElementsByTagName("span")[0];
            span.className = 'node_selected';
            if (this.selectedNode != null && this.selectedNode != p_node)
              this.selectedNode.elementLi.getElementsByTagName("span")[0].className = 'node';
            this.selectedNode = p_node;
          },
          ///// Deleting node
          // p_node: Reference to the node;
          removeNode(p_node) {
            var index = p_node.parent.childNodes.indexOf(p_node);

            if (p_node.elementLi.className == "last" && index != 0) {
              p_node.parent.childNodes[index - 1].elementLi.className += "last";
              p_node.parent.childNodes[index - 1].elementLi.style.backgroundColor = this.backcolor;
            }

            p_node.elementLi.parentNode.removeChild(p_node.elementLi);
            p_node.parent.childNodes.splice(index, 1);

            if (p_node.parent.childNodes.length == 0) {
              var v_img = p_node.parent.elementLi.getElementsByTagName("i")[0];
              v_img.style.visibility = "hidden";
            }

          },
          ///// Deleting all node children
          // p_node: Reference to the node;
          removeChildNodes(p_node) {

            if (p_node.childNodes.length > 0) {
              var v_ul = p_node.elementLi.getElementsByTagName("ul")[0];

              var v_img = p_node.elementLi.getElementsByTagName("i")[0];
              v_img.style.visibility = "hidden";

              p_node.childNodes = [];
              v_ul.innerHTML = "";
            }
          },


          ///// Adjusting tree dotted lines. This function should not be called directly
          // p_node: Reference to the node;
          adjustLines(p_ul, p_recursive) {
            var tree = p_ul;

            var lists = [];

            if (tree.childNodes.length > 0) {
              lists = [tree];

              if (p_recursive) {
                for (var i = 0; i < tree.getElementsByTagName("ul").length; i++) {
                  var check_ul = tree.getElementsByTagName("ul")[i];
                  if (check_ul.childNodes.length != 0)
                    lists[lists.length] = check_ul;
                }
              }

            }

            for (var i = 0; i < lists.length; i++) {
              var item = lists[i].lastChild;

              while (!item.tagName || item.tagName.toLowerCase() != "li") {
                item = item.previousSibling;
              }

              item.className += "last";
              item.style.backgroundColor = this.backcolor;

              item = item.previousSibling;

              if (item != null)
                if (item.tagName.toLowerCase() == "li") {
                  item.className = "";
                  item.style.backgroundColor = 'transparent';
                }
            }
          }
        }

//        window.onclick = function () {
//          if (tree.contextMenuDiv != null)
//            tree.contextMenuDiv.style.display = 'none';
//        }

        return tree;
      }
      ,

      // Helper Functions


      //Create img element
      createImgElement(p_id, p_class) {
        var element = document.createElement('i');
        if (p_id != undefined)
          element.id = p_id;
        if (p_class != undefined)
          element.className = p_class;
        // if (p_src!=undefined)
        //     element.src = p_src;
        return element;
      }
      ,


      initTree() {

        //存放剪切node
        var cutNode = [];

        //Initializing Tree


        // Creating the tree
        this.tree = this.createTre(this, 'div_tree', '', null);

        var treeMsg;
        this.$http.post(this.url + '/getTree/' + this.$route.params.rId, {"username": sessionStorage.getItem("username")}).then(res => {

//          this.$set('treeMsg',treeMsg);
          treeMsg = res.body;
//          console.log(treeMsg)
          for (var i = 0; i < treeMsg.childFolders.length; i++) {
            var node1 = this.tree.createNode(this, treeMsg.childFolders[i].name, false, ' el-icon-close', null, null, 'context1', treeMsg.childFolders[i].id, 'folder');

            treeRecursion(this, node1, treeMsg.childFolders[i]);


          }
          for (var i = 0; i < treeMsg.childFiles.length; i++) {
            var node1 = this.tree.createNode(this, treeMsg.childFiles[i].name, false, ' el-icon-close', null, null, 'context1', treeMsg.childFiles[i].id, 'file');
//            if(i===treeMsg.childFiles.length - 1){
//              this.cur.id=node1.id;
//              this.cur.name=node1.text;
//              this.tree.selectNode(node1);
//            }
          }

          // init elf and ilf
          console.log("init elf and ilf");
          this.tableData2.length = 0;
          for (var i = 0; i < treeMsg.ilfTable.length; i++) {
            console.log("treeMsg.ilfTable.length:", treeMsg.ilfTable.length);
            this.tableData2.push({
                        "name": treeMsg.ilfTable[i].fileName,
                        "fileType": "ILF",
                        "RET": treeMsg.ilfTable[i].fileName,
                        "retNum": 1,
                        "DET": treeMsg.ilfTable[i].allDET,
                        "detNum": treeMsg.ilfTable[i].allDET.trim().split(' ').length,
                        "complex" : 0,
                        "ufp" : 0
                      })

          }

          for (var i = 0; i < treeMsg.eifTable.length; i++) {
            console.log("treeMsg.eifTable.length:", );
            this.tableData2.push({
                        "name": treeMsg.eifTable[i].fileName,
                        "fileType": "EIF",
                        "RET": treeMsg.eifTable[i].fileName,
                        "retNum": 1,
                        "DET": treeMsg.eifTable[i].allDET,
                        "detNum": treeMsg.eifTable[i].allDET.trim().split(' ').length,
                        "complex" : 0,
                        "ufp" : 0
                      })
          }
          console.log(this.tableData2);

        }, res => {
          //alert("fail");
        });


        function treeRecursion(vue, fatherNode, curNode) {

          for (var i = 0; i < curNode.childFolders.length; i++) {
            var node2 = fatherNode.createChildNode(vue, curNode.childFolders[i].name, false, ' el-icon-close', null, 'context1', curNode.childFolders[i].id, 'folder');
            treeRecursion(vue, node2, curNode.childFolders[i]);
          }

          for (var i = 0; i < curNode.childFiles.length; i++) {
            var node2 = fatherNode.createChildNode(vue, curNode.childFiles[i].name, false, ' el-icon-close', null, 'context1', curNode.childFiles[i].id, 'file');
//            if(i===curNode.childFiles.length - 1){
//              vue.cur.id=node2.id;
//              vue.cur.name=node2.text;
//              vue.tree.selectNode(node2);
//            }
          }

        }


//Rendering the tree
        this.tree.drawTree(this);

        this.cur.id = null;
        this.rightnode = null;


      }
      ,


      expand_all() {
        this.tree.expandTree();
      }
      ,


      collapse_all() {
        this.tree.collapseTree();
      }
      ,


      //使用数组dataStore保存站内元素，构造函数将其初始化为一个空数组。
      //变量top定义栈顶的位置，构造时初始化为0，表示栈的起始位置为0


      //peek()方法返回数组的第top-1个位置的元素，即栈顶元素
      peek(vue) {
        return vue.dataStore[vue.top - 1];
      }
      ,

      //将top的值设置0，即清空一个栈
      clear(vue) {
        vue.top = 0;
      }
      ,


    }


  }
  ;


</script>

<style scoped>
  .footer {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 40px;
    color: #8a8a8a;
  }

  #rightform {
    visibility: hidden;
    margin-left:1% ;
  }

  .functiondiv_content {
    /*text-align: center;*/
    /*margin-top: 100px;*/
    background-color: white;
    /*width: 30%;*/
    /*margin-left: 50px;*/
    /*margin-right: auto;*/
    /*min-width: 800px;*/
    width: 80%;
    /*max-width: 280px;;*/
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    /*min-width: 1007px;*/
    flex-wrap: wrap;
    /*align-items: flex-start;*/
    /*align-content: flex-start;*/
  }

  .functiondiv_content > .el-input {
    margin: 5px;
  }

  .functiondiv_content > .el-button {
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

  /*aimara.css*/

  ul.tree, ul.tree ul {
    list-style-type: none;
    /*background: url(vline.png) repeat-y;*/
    margin: 0;
    padding: 0;
    padding-left: 7px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: default;
  }

  li.last {
    /*background: url(lastnode.png);*/
    background-repeat: no-repeat;
  }

  ul.tree ul {
    padding-left: 7px;
  }

  ul.tree li {
    margin: 0;
    padding: 0 12px;
    line-height: 22px;
    /*background: url(node.png) no-repeat;*/
  }

  ul.tree li.last {
    /*background: #fff url(lastnode.png) no-repeat;*/
  }

  img.exp_col {
    /*position: absolute;*/
    margin-top: 4px;
    margin-left: -20px;
    vertical-align: sub;
  }

  img.exp_col_empty {
    position: absolute;
    margin-top: 4px;
    margin-left: -20px;
    vertical-align: sub;
    width: 16px;
  }

  img.icon_tree {
    vertical-align: middle;
    padding-left: 3px;
    margin-top: -3px;
  }

  a.node {
    padding: 2px;
  }

  span.node a {
    padding-left: 3px;
  }

  span.node {
    margin-left: -1px;
    padding-right: 3px;

    padding-top: 4px;
    padding-bottom: 4px;
  }

  span.node:hover {
    margin-left: -1px;
    padding-right: 3px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #efefef;
    border-radius: 2px;
  }

  span.node_selected {
    margin-left: -2px;
    padding-right: 3px;

    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #dedede;
    border-radius: 2px;
  }

  span.node_selected a {
    padding-left: 3px;
  }

  .undefined {
    left: 10px;
  }

  /*example.css*/

  body {
    font-family: 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, freesans;

  }

  #directory {
    min-width: 190px;
    min-height: 400px;
    order: 1;
    flex-grow: 3;
    padding: -5px;
    width: 5%;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    overflow: hidden;
    align-content: flex-start;

  }

  #div_tree {
    margin-top: 20px;
    font: 13px Verdana, sans-serif;
    display: inline-block;
    /*width: 100%;*/
    max-width: 180px;
    min-height: 400px;

    /*background-color: #8DD7B5*/
  }

  .el-row {
    margin-bottom: 20px;
    width: 250px;

  }

  .grid-content {
    /*border-radius: 4px;*/
    /*min-height: 26px;*/
  }

  .row-bg {
    /*padding: 5px 0;*/
  }

  #mydirectory {
    /*min-width: 15%;*/
    /*width: 20%;*/
    max-width: 180px;
    /*height: 300px;*/
    order: 1;
    flex-grow: 3;
    min-width: 20%;

    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;

    overflow-y:auto; overflow-x:auto;

  }

  .content {
    order: 2;
    flex-grow: 5;
    max-width: 700px;
    /*margin: 10px;*/
    /*display: block;*/
    /*max-width: 650px;*/

    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    width: 80%;

  }

  .my-drop-menu {
    margin-top: 20px;
    box-shadow: none;
    padding: 10px;
    /*min-width: 600px;*/

  }

  .tree_btn {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
  }

  .tree a {
    color: #3f3f3f;
  }

  .form-input {
    font-size: 13px;
    margin-bottom: 20px;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    /*justify-content: center;*/
  }

  .el-collapse-item__header {
    height: 48px;
  }

  .form-input-item1 {
    /*order: 1;*/
  }

  .step-box {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    align-items: flex-start;
    align-content: flex-start;

       margin-left: 0px;

  }

  .step-box-plus {

    order: 1;
    margin-top: 10px;
    margin-right: 5px;
  }

  .step-set {
    /*min-width:420px;*/
    /*min-height: 60px;*/

    order: 2;
    /*margin: 5px;*/

  }

  .step-set-list {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    /*align-items: center;*/
    align-content: flex-start;
    /*justify-content: space-between;*/

  }

  .form-input-item2 {
    /*order: 2;*/
  }

  .style-bottom-btn {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    /*display: -webkit-inline-flex;*/
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    align-items: center;
    align-content: flex-start;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
  }

  /*.bottom-btn1 {*/
  /*margin: 5px;*/
  /*order: 1;*/
  /*}*/

  /*.bottom-btn1 {*/
  /*margin: 5px;*/
  /*order: 2;*/
  /*}*/

  /*.bottom-btn3 {*/
  /*margin: 5px;*/
  /*order: 3;*/
  /*}*/

  . file-type {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    align-items: flex-start;
    align-content: flex-start;

  }

  .step-box-plus-1 {

    order: 1;
    /*margin-top: 5px;*/
    /*margin-right: 2px;*/
  }

  .step-set-list-1 {
    order: 2;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    /*flex-direction: column;*/
    flex-wrap: wrap;
    /*align-items: center;*/
    /*align-content: flex-start;*/
    /*justify-content: space-between;*/
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  .demo-dynamic {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    max-width: 570px;
    /*justify-content: space-between;*/
  }

  .input-box {
    /*padding: 5px;*/
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    /*min-width: 371px;*/
  }

  .step-input {
    /*min-width: 220px;*/
    /*margin-right: 5px;*/
    margin: 5px;
  }

  .data-input {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: space-between;
  }

  .out-in {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    /*margin-left: 100px;*/

    /*align-items: center;*/
    /*align-content: center;*/
    /*justify-content: space-between;*/
  }

  .cell-edit-color{
    color:#2db7f5;
    font-weight: bold;
  }
  .header1 {
    width: 80%;
    margin-top:84px;
    margin-left:10% ;
    display: flex;
    flex-direction: row;
    background: rgba(53,94,122, 0.7);
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


   .functiondiv_content >>> .mymenu {
     width: 190px;
     position: absolute;
     background: #F1F1F1;
     -webkit-user-select: none; /* Chrome/Safari */
     -moz-user-select: none; /* Firefox */
     -ms-user-select: none; /* IE10+ */
     cursor: default;
     box-shadow: 4px 4px 5px #BDBDBD;
     list-style-type: none;

   }


  .functiondiv_content >>> .mymenu a {
    color: #3f3f3f;
  }


  .functiondiv_content >>> .mymenu {
    margin: 0;
    padding: 0;
    font: 12px Verdana, sans-serif;
  }

  .functiondiv_content >>>.mymenu a {
    text-decoration: none;
    display: inline-block;
    padding: 6px;
    margin-left: 3px;
  }

  .functiondiv_content >>>.mymenu span {
    position: absolute;
    /*background-color: #aeaeae;*/
    width: 100%;
    height: 100%;
  }

  .functiondiv_content >>>.mymenu div {
    position: absolute;
    right: 4px;
    top: 0px;
    padding: 6px;
  }

  .functiondiv_content >>>.mymenu .mymenu_img {
    vertical-align: middle;
    margin-left: 8px;
  }


  .functiondiv_content >>>.mymenu li {
    position: relative;
    background: #efefef;
  }

  .functiondiv_content >>>.mymenu li:hover {
    background: #bfbfbf;
    cursor: pointer;
  }




  .footer {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 40px;
    color: #8a8a8a;
  }
  .header1 {
    width: 80%;
    margin-top: 80px;
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


  .functiondiv_content {
    margin-left: 10%;
    width: 80%;

    padding: 40px;
    /*min-width: 500px;*/

    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    /*justify-content: center;*/
    justify-content: space-around;

  }

  .functiondiv_content .el-input {
    margin: 5px;
  }

  .functiondiv_content  .el-button {
    /*width: 100%;*/
    /*margin: 8px 5px;*/
  }

  .no_account {
    float: right;
    cursor: pointer;
    font-size: 13px;

  }

  .no_account a {
    color: #323a45;
  }

  /*aimara.css*/

  .tree >>> ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-left: 7px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: default;
  }


  .tree >>> li {
    margin: 0;
    padding: 0 12px;
    line-height: 22px;
    width: 180px;

    /*background: url(node.png) no-repeat;*/
  }


  /*a.node {*/
  /*padding: 2px;*/
  /*}*/

  /*span.node  a {*/
  /*padding-left: 3px;*/
  /*}*/

  .tree >>> .node {
    padding-left: 4px;
    padding-right: 3px;

    padding-top: 3px;
    padding-bottom: 3px;
  }

  .tree >>> span:hover {
    /*margin-left: -1px;*/
    padding-right: 4px;
    padding-left: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
    background-color: #efefef;
    border-radius: 2px;
  }

  .tree >>> .node_selected {
    /*margin-left: -2px;*/
    padding-right: 3px;
    padding-left: 7px;

    padding-top: 3px;
    padding-bottom: 3px;
    background-color: #dedede;
    border-radius: 2px;
  }




  /*example.css*/

  body {
    font-family: 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, freesans;

  }

  #div_tree {
    margin-top: 20px;
    font: 13px Verdana, sans-serif;
    display: inline-block;
    /*width: 150px;*/
    overflow-y:auto;
    overflow-y:auto;
    overflow: hidden;
    overflow-x:auto;
    /*padding: 10px;*/
    min-height: 500px;

  }

  .el-row {
    margin-bottom: 20px;
    /*width: 250px;*/

  }

  .grid-content {
    /*border-radius: 4px;*/
    /*min-height: 26px;*/
  }

  .row-bg {
    /*padding: 5px 0;*/
  }


  .mycontent {

    order: 2;
    flex-grow: 5;
    width: 65%;

    /*margin: 10px;*/
    /*display: block;*/
    /*max-width: 650px;*/
    margin-left: 1%;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;

  }

  .my-drop-menu {
    margin-top: 20px;
    box-shadow: none;
    padding: 10px;
    /*min-width: 600px;*/

  }

  .tree_btn {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    align-content: flex-start;
    width:100%;
    max-width: 70px;
  }

  .tree >>> a {
    color: #3f3f3f;
  }

  .form-input {

    width: 100%;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: center;
  }

  .el-collapse-item__header {
    height: 48px;
  }

  .functiondiv_content >>>.form-input-item1 {
    order: 1;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: flex-start;
    justify-content: center;
    margin: 0px 15px 0px 15px;
  }
  .functiondiv_content >>>.form-input-item2 {
    order: 2;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: flex-start;
    justify-content: center;
    margin: 0px 15px 0px 15px;

  }


  .step-box {
    width: 100%;
  }

  .step-box-plus {

    order: 1;
    width:100%;
    margin-bottom: 10px;
    /*margin-right: 5px;*/
  }

  .step-set {

    width: 100%;
    order: 2;
    /*margin: 5px;*/

  }

  .step-set-list {
    width: 100%;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    align-content: flex-start;
    justify-content: space-between;

  }


  .style-bottom-btn {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    position: relative;
    /*display: -webkit-inline-flex;*/
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    align-items: center;
    align-content: flex-start;
    justify-content: center;
    width: 100%;
    margin: 30px;
    /*margin-top: 300px;*/
  }

  /*.bottom-btn1 {*/
  /*margin: 5px;*/
  /*order: 1;*/
  /*}*/

  .bottom-btn1 {
    margin: 5px;
  }

  .bottom-btn3 {
    margin: 5px;
  }

  . file-type {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    align-items: flex-start;
    align-content: flex-start;

  }

  .step-box-plus-1 {

    order: 1;
    padding-top: 5px;
    /*margin-right: 2px;*/
  }

  .step-set-list-1 {
    order: 2;
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 10px;
    /*align-content: flex-start;*/
    /*justify-content: space-between;*/
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  .out-in :first-child{

    margin-top: 0px;
  }



  .out-in {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    padding: 25px 25px 0px 25px;
    /*background-color: #efefef;*/
    /*align-items: center;*/
    /*align-content: center;*/
    /*justify-content: space-between;*/
  }


  h1 {
    padding-bottom: .3em;
    font-size: 2.25em;
    line-height: 1.2;
    border-bottom: 1px solid #eee;
  }
  h2 {
    padding-bottom: .3em;
    font-size: 1.75em;
    line-height: 1.225;
    border-bottom: 1px solid #eee;
  }
  h3 {
    font-size: 1.5em;
    line-height: 1.43;
  }
  h4 {
    font-size: 1.25em;
  }
  h5 {
    font-size: 1em;
  }
  h6 {
    font-size: 1em;
    color: #777;
  }

  .undefined {
    left: 10px;
  }


.functiondiv_section{
  min-width: 960px;
}

</style>

