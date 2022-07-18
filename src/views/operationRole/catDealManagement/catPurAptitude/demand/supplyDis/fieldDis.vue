<template>
  <div class="app-container">
    <el-row>
      <span class="bold">品类名称：</span>
      <span class="ml10">{{openRow.categoryName}}</span>
    </el-row>
    <el-row class="mt20 mb20">
      <el-button @click="addField">添加库字段名称</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="plateFieldName" label="字段名称" align="center">
        </el-table-column>
        <el-table-column prop="from" label="字段名称来源" align="center">
          <template slot-scope="scope">{{scope.row.source==='1'?'固化':'自建'}}</template>
        </el-table-column>
        <el-table-column prop="plateFieldAlias" label="字段别名" align="center">
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
        <span class="bold">品类名称：</span>
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
          <div>{{item.demandName || item.plateFieldName}}</div>
          <el-button v-if="item.check">已添加</el-button>
          <el-button v-else type="primary" @click="checkPlate(index)">添加</el-button>
        </div>
      </el-row>
    </el-dialog>
	<editField v-if="isEdit" @close="closeEditFieldName" @refresh="getPlateFields" :editRow="oldRow"></editField>
  </div>
</template>

<script>
  import {
    getPlateFields,
    getPlateFieldFromDemand,
    addPlateFieldFromDemand,
    getRequireFieldsOfSupply,
    relateField2PlateType,
    deletePlateField,
    getPlateFieldRelateFlag,
    getPlateTypes,
  } from '@/api/modelRoleApi/tradingContent.js'
  import editField from '@/views/modelRole/tradingContent/components/editFieldName.vue'
  export default {
    name: "index",
	components: {
		editField
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
		isEdit: false,
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
      // 查询需方已经添加的字段名称列表
      async getPlateFieldFromDemand() {
        await getPlateFieldFromDemand({
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
          fieldName: this.searchVal
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
		this.radio = 0
		this.oldRow = row
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
        await relateField2PlateType({
          plateFieldGuid: this.oldRow.plateFieldGuid,
          plateTypeGuid: this.radio,
        }).then(res => {
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
        this.getPlateFieldFromDemand()
      },
      addField() {
        this.isAdd = true
        this.getPlateFieldFromDemand()
      },
      closeField() {
        this.isAdd = false
      },
      checkPlate(index) {
        // let obj = this.fieldList[index]
        // let source = this.fieldList[index].source
        // let id = ''
        // if (obj.source == 1) {
        //   id = this.fieldList[index].fixedDataGuid

        //   // 如果字段来源于固化，则先走是否有对应字段
        //   this.getRequireFieldsOfSupply(id, source,index)
        // } else {
        //   id = this.fieldList[index].plateFieldName
        //   // 否则
        //   this.addPlateFieldFromDemand(id, source, index)
        // }
        let code = this.fieldList[index].plateFieldCode
        let source = this.fieldList[index].source
        let id = ''
        if (code.length > 0) {
          // 走匹配
          id = this.fieldList[index].fixedDataGuid
          this.getRequireFieldsOfSupply(id, source, index, code)
        } else {
          id = this.fieldList[index].plateFieldName
          // 否则
          this.addPlateFieldFromDemand(id, source, index)
        }
      },
      async addPlateFieldFromDemand(id, source, index) {
        await addPlateFieldFromDemand({
          categoryGuid: this.openRow.categoryGuid,
          plateFieldName: id,
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          source: source,
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
      // 添加时查询是否拥有对应字段名称
      async getRequireFieldsOfSupply(id, source, index, code) {
        await getRequireFieldsOfSupply({
          categoryGuid: this.openRow.categoryGuid,
          fixedDataGuid: id,
          bizType: this.openRow.bizType
        }, code).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            let showField = data.map(item => item.supplyName).join(',')
            console.log('匹配', data)
            this.$alert('【' + data[0].demandName + '】' + '在供应需求信息中对应的' + '【' + showField + '】,请确认添加', '', {
              confirmButtonText: '添加',
              callback: action => {
                for (let i in data) {
                  this.addPlateFieldFromDemand(data[i].fixedDataGuid, source, index)
                }

              }
            });
          } else {
            this.addPlateFieldFromDemand(id, source, index)
          }
          console.log('是否有对应字段名称', res);
        })
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
