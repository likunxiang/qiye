<template>
  <el-dialog title="字段内容管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row>
      <el-descriptions border :column="1" size="medium">
        <el-descriptions-item label="品类名称" v-if="!isUniversal">{{categoryName}}</el-descriptions-item>
        <el-descriptions-item label="品类类型" v-if="isUniversal">{{categoryName}}</el-descriptions-item>
        <el-descriptions-item label="板块名称">{{fieldObj.plateName}}</el-descriptions-item>
        <el-descriptions-item label="板块类型">{{fieldObj.plateTypeName}}</el-descriptions-item>
        <el-descriptions-item label="字段名称">{{fieldObj.plateFieldName}}</el-descriptions-item>
        <el-descriptions-item label="字段名称来源">{{fieldObj.plateFieldSource=="1"?'固化':'自建'}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-row>
      <p><span class="bold mr20">内容来源设置</span>
        <span>{{contentSources}}</span>
      </p>
    </el-row>
    <el-row>
      <el-row v-if="fieldObj.plateFieldContentSource == 0">
        <!-- 未设置 -->
      </el-row>
      <el-row v-else-if="fieldObj.plateFieldContentSource == 1">
        <!-- 固化 -->
        <el-row class="mb10">
          <el-button @click="openAddLib" :disabled="fieldBuildList.length>0">添加库名称</el-button>
          <el-row class="mt10">
            <el-table :data='fieldBuildList' border>
              <el-table-column prop="content" label="字段名称"></el-table-column>
              <el-table-column prop="fieldName" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="delField(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-row>
      </el-row>

      <el-row v-else-if="fieldObj.plateFieldContentSource == 2">
        <!-- 字段来源自建 -->
        <el-row>
          <el-button @click="openNewField">新建字段内容</el-button>
          <el-button @click="openNewBatch">批量新建字段内容</el-button>
        </el-row>
        <el-row class="mt10">
          <el-table :data='fieldBuildList' border>
            <el-table-column prop="content" label="字段内容"></el-table-column>
            <el-table-column prop="fieldName" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delField(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-row>

      <el-row v-else-if="fieldObj.plateFieldContentSource=='3'">
        <el-row v-if="fieldObj.catTreeCode == 'supply'">
          同需方，无需管理
        </el-row>
        <el-row v-else>
          无需管理
        </el-row>
      </el-row>
      <el-row v-else>
        无需管理
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">确 定</el-button>
      <!-- <el-button type="primary" @click="submitFieldMessageObj">确 定</el-button> -->
    </span>
    <addLibName v-if="isAddLib" :fieldObj="fieldObj" :contentSources="contentSources" @close="closeAddLib"
      @getField="getField"></addLibName>
    <newField v-if="isNew" @close="closeNewField" @submitNewField="submitNewField"></newField>
    <newBatch v-if="isBatch" @close="closeNewBatch" @submitNewBatch="submitNewBatch"></newBatch>
  </el-dialog>
</template>

<script>
  import addLibName from '@/views/modelRole/tradingContent/components/addLibName.vue' //
  import batchImport from '@/views/modelRole/tradingContent/components/batchImport.vue' // 批量导入
  import newField from '@/views/modelRole/tradingContent/components/newField.vue' // 批量导入
  import newBatch from '@/views/modelRole/tradingContent/components/newBatch.vue' // 批量新建字段
  import {
    getPlateFieldDetail,
    setPlateFieldContent,
    deletePlateFieldContent
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    components: {
      addLibName,
      batchImport,
      newField,
      newBatch
    },
    props: {
      categoryName: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'demand'
      },
      fieldObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      bizType: {
        type: String,
        default: '1'
      },
      isUniversal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isOpen: true,
        isAddLib: false,
        isNew: false,
        isBatch: false,
        contentSources: '',
        fieldSolidifyList: [], // 将要提交的列表
        fieldBuildList: [], // 字段自建列表
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      // submitFieldMessageObj() {
      //   this.close()
      //   this.setPlateFieldContent()
      // },
      getField(data) {
        console.log('data', data);
        this.setPlateFieldContent(data)
      },
      async getPlateFieldDetail() {
        await getPlateFieldDetail({
          plateFieldGuid: this.fieldObj.plateFieldGuid,
          catTreeCode: this.type
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.fieldBuildList = data
          } else {
            this.fieldBuildList = []
          }
        })
      },
      // 删除已设置字段内容
      async deletePlateFieldContent(id) {
        await deletePlateFieldContent({
          plateFieldContentGuid: id
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
          this.getPlateFieldDetail()
        })
      },
      openAddLib() {
        this.isAddLib = true
      },
      closeAddLib() {
        this.isAddLib = false
      },
      delField(row) {
        this.deletePlateFieldContent(row.plateFieldContentGuid)
      },
      async setPlateFieldContent(data) {
        if (typeof(data) === 'string' || (typeof(data) === 'object' && data.length == null)) {
          var data1 = {}
          data1 = {
            plateFieldGuid: this.fieldObj.plateFieldGuid,
            content: data.fixedDataGuid || data.trim()
          }
        } else {
          var data1 = []
          for (let i in data) {
            if (data[i].trim() === '') {

            } else {
              let obj = {
                plateFieldGuid: this.fieldObj.plateFieldGuid,
                content: data.fixedDataGuid || data[i].trim()
              }
              console.log('datai', data.fixedDataGuid || data[i]);
              data1.push(obj)
            }
          }
        }
        // let arr = []
        // for(let i in this.fieldSolidifyList) {
        //   let obj = {
        //     plateFieldGuid: this.fieldObj.plateFieldGuid,
        //     content: this.fieldSolidifyList[i].fixedDataGuid
        //   }
        //   arr.push(obj)
        // }
        // let obj = {
        //   plateFieldGuid: this.fieldObj.plateFieldGuid,
        //   content: data.fixedDataGuid || data
        // }
        await setPlateFieldContent(JSON.stringify(data1)).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            // this.$message({
            //   type: 'success',
            //   message: '操作成功!'
            // });
            this.getPlateFieldDetail()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }

        })
      },
      // 新建字段模块
      openNewField() {
        this.isNew = true
      },
      closeNewField() {
        this.isNew = false
      },
      submitNewField(data) {
        console.log(data);
        this.setPlateFieldContent(data)
      },
      // 批量新建字段模块
      openNewBatch() {
        this.isBatch = true
      },
      closeNewBatch() {
        this.isBatch = false
      },
      submitNewBatch(data) {
        console.log('数据', data);
        this.setPlateFieldContent(data)
        // for(let i in data) {
        //   if(data[i].length) {
        //     this.setPlateFieldContent(data[i])
        //   }
        // }
      },
    },
    created() {
      if (this.fieldObj.plateFieldContentSource == "0") {
        this.contentSources = '未设置'
      } else if (this.fieldObj.plateFieldContentSource == "1") {
        this.contentSources = '字段内容固化库'
      } else if (this.fieldObj.plateFieldContentSource == "2") {
        this.contentSources = '字段内容自建库'
      } else if (this.fieldObj.plateFieldContentSource == "3") {
        this.contentSources = '需方'
      } else {
        this.contentSources = '供方'
      }
      this.getPlateFieldDetail()
    }
  };
</script>

<style lang="scss" scoped>
</style>
