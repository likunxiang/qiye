<template>
  <div class="app-container">
    <el-row>
      <span class="bold">品类名称：</span>
      <span class="ml10">{{openRow.categoryName}}</span>
    </el-row>
    <el-row class="mt20 mb20">
      <el-button @click="newClass">新建类型</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="plateTypeName" label="板块类型" align="center">
        </el-table-column>
        <el-table-column prop="plateTypeAlias" label="板块类型别名" align="center">
        </el-table-column>
        <el-table-column prop="plateName" label="板块名称关联" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editClass(scope.row,scope.$index)" type="text" size="small">编辑板块类型别名</el-button>
            <el-button @click="delClass(scope.row,scope.$index)" type="text" size="small">删除板块类型</el-button>
            <el-button @click="relevanceClass(scope.row,scope.$index)" type="text" size="small">关联板块名称</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog title="新建类型" width="700px" :visible.sync="isNew" destroy-on-close>

      <el-row class="mt20 pb20">
        <el-input placeholder="请输入板块类型" v-model="inputClass" clearable></el-input>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeNew">取 消</el-button>
        <el-button type="primary" @click="submitNew" :disabled="!inputClass.trim()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="关联板块名称" width="700px" :visible.sync="isRelevance" destroy-on-close>
      <el-row>
        <div class="flex flex-center mt10">
          <div class="bold input-text">板块类型</div>
          <div class="">{{oldRow.plateTypeName}}</div>
        </div>
      </el-row>
      <el-row class="mt20 pb20">
        <el-radio-group v-model="radio">
          <el-row class="mb10" v-for="(item,index) in plate" :key="index">
            <el-radio :label="item.plateGuid">{{item.plateName}}</el-radio>
          </el-row>

        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRelevance">取 消</el-button>
        <el-button type="primary" @click="submitRelevance" :disabled="!radio">确 定</el-button>
      </span>
    </el-dialog>
    <editClassName v-if="isEdit" :editRow="oldRow" @close="closeEditClass" @refresh="getPlateTypes"></editClassName>
  </div>
</template>

<script>
  import {
    getPlateTypes,
    insertPlateTypes,
    existPlateType,
    deletePlateType,
    relatePlateType,
    getPlates
  } from '@/api/modelRoleApi/tradingContent.js'
  import editClassName from '@/views/modelRole/tradingContent/components/editClassName.vue'
  export default {
    name: "index",
    components: {
      editClassName
    },
    data() {
      return {
        openRow: {},
        tableData: [],
        newTable: [],
        isNew: false,
        isEdit: false,
        inputClass: '',
        isRelevance: false,
        oldRow: {},
        plate: [],
        radio: 0,
      };
    },
    methods: {
      delClass(row, index) {
        this.$confirm('请确认要删除' + row.plateTypeName, '', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.deletePlateType(row.plateTypeGuid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      editClass(row) {
        this.oldRow = row
        this.isEdit = true
      },
      closeEditClass() {
        this.isEdit = false
      },
      relevanceClass(row, index) {
        this.isRelevance = true
        this.radio = 0
        this.oldRow = row
        this.getPlates()
      },
      closeRelevance() {
        this.isRelevance = false
      },
      submitRelevance() {
        this.relatePlateType()
      },
      newClass() {
        this.inputClass = ''
        this.isNew = true
      },
      closeNew() {
        this.isNew = false
      },
      submitNew() {
        this.existPlateType()
      },
      async relatePlateType() {
        await relatePlateType({
          plateTypeGuid: this.oldRow.plateTypeGuid,
          plateGuid: this.radio
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              message: '关联成功',
              type: 'success'
            })
          }
          this.closeRelevance()
          this.getPlateTypes()
        })
      },
      async getPlates() {
        await getPlates({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
          fixedDataBizType: '2',
          plateTypeGuid: this.oldRow.plateTypeGuid
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
      // 删除
      async deletePlateType(id) {
        await deletePlateType({
          plateTypeGuid: id
        }).then(res => {
          console.log(res);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPlateTypes()
        })
      },
      // 新建板块类型
      async insertPlateTypes() {
        await insertPlateTypes({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
          plateTypeName: this.inputClass.trim()
        }).then(res => {
          console.log(res);
          if(res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.isNew = false
            this.getPlateTypes()
          } else {
            this.$message({
              message: '操作失败!',
              type: 'error'
            })
          }
        })
      },
      // 判断板块类型是否已添加
      async existPlateType() {
        await existPlateType({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
          plateTypeName: this.inputClass.trim()
        }).then(res => {
          console.log(res);
          if (res.Tag[0].Table[0].existFlag > 0) {
            this.$message({
              message: '已添加，不可以重复添加',
              type: 'info'
            })
          } else {
            this.insertPlateTypes()
          }
        })
      },
      async getPlateTypes() {
        await getPlateTypes({
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
          plateFieldGuid: ''
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
        })
      }
    },
    mounted() {
      this.openRow = this.$route.query
      this.getPlateTypes()
    }
  };
</script>

<style lang="scss">
  .input-text {
    width: 100px;
    flex-shrink: 0;
  }
</style>
