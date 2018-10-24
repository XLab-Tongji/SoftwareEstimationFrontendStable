<template>
    <div>
    <div class="setDet"
         v-for="(dataField, indexin) in dataFields"
         :key="dataField.key"
         :prop="'dataFields.' + indexin + '.value'">

        <el-select size="mini" v-model="dataField.value">
            <el-option disabled value="">请选择</el-option>
            <el-option v-for="ilfDet in ilfDets" :key="ilfDet"
                       :label="ilfDet"
                       :value="ilfDet"></el-option>

        </el-select>


        <el-button style="margin: 3px" size="mini"
                   @click="removeDataField(indexout,indexmid,dataField)">
            <i class="el-icon-minus"></i></el-button>
    </div>
    </div>
</template>

<script>
    export default {
        name: "setDet",
        props: ['type','ilf','tableData1','dataFields','indexout','indexmid','dynamicForm'],

        mounted (){
            if(this.ilf===null)
                this.ilf='';
        },
        computed:{
            ilfDets:function () {
                var set=[];
                for(var i=0;i<this.tableData1.length;i++){
                    if(this.tableData1[i].name===this.ilf){
                        set=this.tableData1[i].DET.trim().split(' ');
                        return set;
                    }
                }
            }
        },

        methods:{
            removeDataField(index_out, index_mid, item) {
                if(this.type==="ilf") {
                    var index = this.dynamicForm.steps[index_out].ilfs[index_mid].dataFields.indexOf(item)
                    if (index !== -1) {
                        this.dynamicForm.steps[index_out].ilfs[index_mid].dataFields.splice(index, 1)
                    }

                }
                else {
                    var index = this.dynamicForm.steps[index_out].eifs[index_mid].dataFields.indexOf(item)
                        if (index !== -1) {
                            this.dynamicForm.steps[index_out].eifs[index_mid].dataFields.splice(index, 1)
                        }
                }
            },
        }
    }
</script>

<style scoped>
    .setDet {
        display: -webkit-flex;
        display: flex;
        display: inline-flex;
        display: -webkit-inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        margin-bottom: 5px;
        margin-right: 10px;

    }
</style>