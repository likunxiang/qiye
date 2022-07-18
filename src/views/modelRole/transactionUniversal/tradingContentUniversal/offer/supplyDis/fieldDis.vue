<template>
  <div class="app-container">
    <el-row>
      <span class="bold">品类类型：</span>
      <span class="ml10">{{openRow.categoryName}}</span>
    </el-row>
    <el-row class="mt20 mb20">
      <el-button @click="addField">添加库字段名称</el-button>
      <el-button @click="newField">新建字段名称</el-button>
      <el-button @click="openBatch">批量新建</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="plateFieldName" label="字段名称" align="center">
        </el-table-column>
        <el-table-column prop="from" label="字段名称来源" align="center">
          <template slot-scope="scope">{{scope.row.source==='1'?'固化':'自建'}}</template>
        </el-table-column>
        <el-table-column prop="plateFieldAlias" label="字段别名" align="center">
        </el-table-column>
        <el-table-column prop="plateTypeName" label="板块类型关联" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="440">
          <template slot-scope="scope">
            <el-button @click="editFieldName(scope.row,scope.$index)" type="text" size="small">编辑字段别名</el-button>
            <el-button @click="delField(scope.row,scope.$index)" type="text" size="small">删除字段名称</el-button>
            <el-button @click="relevanceClass(scope.row,scope.$index)" type="text" size="small">关联板块类型</el-button>
            <el-button @click="disField(scope.row,scope.$index)" type="text" size="small">字段内容配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog title="关联板块类型" width="700px" :visible.sync="isRelevance" destroy-on-close>
      <el-row>
        <div class="flex flex-center mt10">
          <div class="bold input-text">字段名称</div>
          <div class="">{{oldRow.plateFieldName}}</div>
        </div>
      </el-row>
      <el-row class="mt20 pb20">
        <el-radio-group v-model="radio">
          <el-row class="mb10" v-for="(item,index) in plate" :key="index">
            <el-radio :label="item.plateTypeGuid">{{item.plateTypeName}}</el-radio>
          </el-row>

        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRelevance">取 消</el-button>
        <el-button type="primary" @click="submitRelevance" :disabled="!radio">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加库字段名称" width="700px" :visible.sync="isAdd" destroy-on-close>
      <el-row>
        <span class="bold">品类类型：</span>
        <span class="ml10">{{openRow.categoryName}}</span>
      </el-row>
      <el-row class="mt20 flex flex-center">
        <el-input placeholder="请输入你要找的字段名称" clearable v-model="searchVal" @keyup.enter.native="search"
          style="width: 200px;margin-right: 20px;" @clear="search">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
        </el-input>
        <div class="" v-if='isToSearch'>搜索结果：{{searchResult}}</div>
      </el-row>
      <el-row class="mt20 pb20">
        <div class="flex jsb flex-center mb10" v-for="(item,index) in fieldList" :key="index">
          <div>{{item.name}}</div>
          <el-button v-if="item.check">已添加</el-button>
          <el-button v-else type="primary" @click="checkPlate(index,item.fixedDataGuid)">添加</el-button>
        </div>
      </el-row>
    </el-dialog>

    <el-dialog title="新建字段名称" width="700px" :visible.sync="isNewField" destroy-on-close>
      <el-row>
        <div class="flex flex-center mb10 mt20">
          <div class="input-text mr20" style="flex-shrink: 0;">字段名称</div>
          <el-input placeholder="请输入" v-model="newFeildText"></el-input>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeNewField">取 消</el-button>
        <el-button type="primary" @click="submitNewField" :disabled="!newFeildText.trim()">确 定</el-button>
      </span>
    </el-dialog>
    <editField v-if="isEdit" @close="closeEditFieldName" @refresh="getPlateFields" :editRow="oldRow"></editField>
    <newBatchFieldName v-if="isBatch" @close="closeBatch" @refresh="getPlateFields" :openRow="openRow">
    </newBatchFieldName>
  </div>
</template>

<script>
  import {
    getPlateFields,
    addPlateFieldFromDemand,
    insertPlateField,
    existPlateField,
    relateField2PlateType,
    deletePlateField,
    getPlateFieldRelateFlag,
    getPlateTypes,
  } from '@/api/modelRoleApi/tradingContent.js'
  import {
    getFixedData
  } from '@/api/modelRoleApi/immobilizationContent.js'
  import editField from '@/views/modelRole/tradingContent/components/editFieldName.vue'
  import newBatchFieldName from '@/views/modelRole/tradingContent/components/newBatchFieldName.vue'
  export default {
    name: "index",
    components: {
      editField,
      newBatchFieldName
    },
    data() {
      return {
        tableData: [],
        isRelevance: false,
        openRow: {},
        plate: [],
        fieldList: [],
        radio: 0,
        oldClass: '',
        oldRow: {},
        searchVal: '',
        isToSearch: false,
        isAdd: false,
        searchResult: 0,
        isNewField: false,
        isBatch: false, // 批量新建开关
        newFeildText: '',
        isEdit: false,
        loading: false,
      };
    },
    mounted() {
      this.openRow = this.$route.query
      this.getPlateFields()
    },
    methods: {
      async getPlateFields() {
        await getPlateFields({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
        })
      },
      // 获取已设置的板块类型
      async getPlateTypes() {
        await getPlateTypes({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
          plateFieldGuid: this.oldRow.plateFieldGuid
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            for (let i in data) {
              if (data[i].relatedFlag == '1') {
                this.radio = data[i].plateGuid
              }
            }
            this.plate = data
          } else {
            this.plate = []
          }
        })
      },
      async getFixedData() {
        await getFixedData({
          type: 2,
          name: this.searchVal,
          bizType: '',
          page: 1,
          size: '200'
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.fieldList = data
            this.searchResult = this.fieldList.length
          } else {
            this.fieldList = []
            this.searchResult = this.fieldList.length
          }
        })
      },
      relevanceClass(row, index) {
        this.isRelevance = true
        this.oldRow = row
        this.radio = 0
        this.getPlateTypes()
      },
      closeRelevance() {
        this.isRelevance = false
      },
      submitRelevance(row) {
        this.isRelevance = false
        this.relateField2PlateType()
        // TODO
      },
      // 关联板块类型
      async relateField2PlateType() {
        this.loading = true
        await relateField2PlateType({
          plateFieldGuid: this.oldRow.plateFieldGuid,
          plateTypeGuid: this.radio,
        }).then(res => {
          this.loading = false
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '关联成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '关联失败!'
            });
          }
          this.getPlateFields()
        })
      },
      // 删除字段名称
      async deletePlateField(id) {
        await deletePlateField({
          plateFieldGuid: id
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
          this.getPlateFields()
        })
      },
      editFieldName(row, index) {
        this.oldRow = row
        this.isEdit = true
      },
      closeEditFieldName() {
        this.isEdit = false
      },
      delField(row, index) {
        this.$confirm('请确认要删除' + row.plateFieldName, '', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.deletePlateField(row.plateFieldGuid)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getFixedData()
      },
      addField() {
        this.isAdd = true
        this.getFixedData()
      },
      closeField() {
        this.isAdd = false
      },
      checkPlate(index, id) {
        this.existPlateField(id, index)
      },
      // 添加字段时，先判断是否重复添加
      async existPlateField(id, index) {
        await existPlateField({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          categoryGuid: this.openRow.categoryGuid,
          bizType: this.openRow.bizType,
          plateFieldName: id || this.newFeildText.trim(),
        }).then(res => {
          console.log(res);
          if (res.Tag[0].Table[0].existFlag > 0) {
            this.$message({
              message: '已添加，不可以重复添加',
              type: 'info'
            })
          } else {
            if (id) {
              this.addPlateFieldFromDemand(id, index)
            } else {
              this.insertPlateField()
            }

          }
        })
      },
      async addPlateFieldFromDemand(id, index) {
        await addPlateFieldFromDemand({
          categoryGuid: this.openRow.categoryGuid,
          plateFieldName: id,
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          source: '1',
          bizType: this.openRow.bizType
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.fieldList[index].check = true
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
          console.log(res);
          this.getPlateFields()
        })
      },
      async insertPlateField() {
        await insertPlateField({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
          plateFieldName: this.newFeildText.trim()
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '新建成功'
            })
            this.isNewField = false
          }
          // 新增成功，刷新列表
          this.getPlateFields()
        })
      },
      newField() {
        this.isNewField = true
        this.newFeildText = ''
      },
      closeNewField() {
        this.isNewField = false
      },
      openBatch() {
        this.isBatch = true
      },
      closeBatch() {
        this.isBatch = false
      },
      submitNewField() {
        this.existPlateField()

      },
      disField(row, index) {

        this.getPlateFieldRelateFlag(row)
      },
      // 判断字段名称是否关联完整
      async getPlateFieldRelateFlag(row) {
        let obj = row
        obj.categoryGuid = this.openRow.categoryGuid
        obj.categoryName = this.openRow.categoryName
        await getPlateFieldRelateFlag({
          plateFieldGuid: row.plateFieldGuid,
        }).then(res => {
          if (res.Tag[0].Table[0].plateFieldRelateFlag > 0) {
            this.$router.push({
              path: "fieldSetting",
              query: obj,
            });
          } else {
            this.$message('板块类型未关联')
          }
        })
      }
    },

  };
</script>

<style lang="scss">
</style>
