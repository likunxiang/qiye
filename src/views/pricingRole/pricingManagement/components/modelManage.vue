<template>
  <el-dialog title="型号管理" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">品类名称</div>
      <div>{{openRow.categoryName}}</div>
    </el-row>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">收取范围</div>
      <div>{{collectType==0?'按品类':collectType==1?'按供方型号':'按我方型号'}}</div>
    </el-row>
    <el-divider></el-divider>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">供方姓名</div>
      <div>{{supplyObj.userName}}</div>
    </el-row>
    <el-row class="flex mb20 flex-center">
      <div class="bold" style="width: 120px;">手机号</div>
      <div>{{supplyObj.nation}} {{supplyObj.phonenumber}}</div>
    </el-row>
    <el-divider></el-divider>
    <div class="flex flex-center mb20 jsb">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的型号名称' :isMb20="false"></searchCom>


      <!-- 弹出窗 -->
      <el-popover placement="bottom-end" width="400" trigger="click" @show="getVersionList" @hide="saveVersionList">
        <el-row class="mb20">型号选择</el-row>
        <searchCom @toSearch='searchVersionFuc' :searchResult='searchVersionResult' placeholderText='请输入你要找的型号名称'></searchCom>
        <template v-if="radioVersionList.length">
          <el-checkbox-group v-model="checkList">
            <el-row class="mb10" v-for="(item,index) in radioVersionList" :key="index">
              <el-checkbox :label="item.modelGuid" :disabled="item.addedFlag == '1'">{{item.modelName}}</el-checkbox>
            </el-row>
          </el-checkbox-group>
        </template>
        <template v-else>
          <el-row>没有内容。</el-row>

        </template>
        <el-button slot="reference">添加型号</el-button>
      </el-popover>

    </div>
    <el-row>
      <el-table :data="modelList" border style="width: 100%">
        <el-table-column prop="modelName" label="型号名称" align="center">
        </el-table-column>
        <el-table-column prop="targetObject" label="收取对象" align="center">
          <template slot-scope="scope">
            {{scope.row.targetObject=='supply'?'供方':'需方'}}
          </template>
        </el-table-column>
        <el-table-column prop="ratio" label="收取比例" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="delVersion(scope.row)" type="text" size="small">删除型号名称</el-button>
            </el-row>
            <el-row>
              <el-button @click="openPricing(scope.row)" type="text" size="small">服务定价设置</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <modelPricing v-if="isSetting" @close="closePricing" :openRow="openRow" :supplyObj="supplyObj" :modelObj="modelObj" @refresh="getAddedModels"></modelPricing>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    getAddedModels,
    deleteModels,
    getModelsByType2,
    getModelsByType3,
    addModelsByType2
  } from '@/api/pricingRoleApi/pricingManagement.js'
  import modelPricing from '@/views/pricingRole/pricingManagement/components/modelPricing.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  export default {
    name: "index",
    components: {
      modelPricing,
      searchCom
    },
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      /**
       * 收取类型
       * 0 按品类
       * 1 按供方型号
       * 2 按我方型号
       */
      collectType: {
        type: Number,
        default: 1,
      },
      supplyObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        searchVal: '',
        searchResult: 0,
        searchVersion: '',
        searchVersionResult: 0,
        modelList: [], // 已添加型号列表
        radioVersionList: [], // 可添加型号
        checkList: [], // 多选列表
        isSetting: false,
        modelObj: {},
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
      submit() {
        this.$emit('refresh')
        this.close()
      },
      openPricing(row, type) {
        this.modelObj = row
        this.isSetting = true
      },
      closePricing() {
        this.isSetting = false
      },
      search(data) {
		this.searchVal = data
		this.page = 1
        this.getAddedModels(data)
      },
      searchVersionFuc(data) {
		this.searchVersion = data
		this.page = 1
        this.getVersionList()
      },
      getVersionList() {
        let type = this.collectType == '1' ? 2 : 3
        if (type === 2) {
          this.getModelsByType2()
        } else {
          this.getModelsByType3()
        }
      },
      saveVersionList() {
        let list = this.checkList
        let length = list.length
        this.step = 0 // 增加步数
        if(length) {
          for(let i in list) {
            this.addModelsByType2(list[i],length)
          }
        }
      },
      // web-添加型号-按供方型号
      async addModelsByType2(id,length) {
        await addModelsByType2({
          categoryGuid: this.openRow.categoryGuid,
          supplierGuId: this.supplyObj.supplierGuId,
          modelGuId: id
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.step ++
            this.isAssign = false
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
            return
          }
          if(this.step === length) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getAddedModels()
          } else {
          }
        })
      },
      // web-查询可添加的型号列表-按供方型号
      async getModelsByType2() {
        await getModelsByType2({
          categoryGuid: this.openRow.categoryGuid,
          modelName: this.searchVersion || ''
        }).then(res => {
          console.log('可添加型号', res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.radioVersionList = data
          } else {
            this.radioVersionList = []
          }
          this.searchVersionResult = this.radioVersionList.length
        })
      },
      // web-查询可添加的型号列表-按我方型号
      async getModelsByType3() {
        await getModelsByType3({
          categoryGuid: this.openRow.categoryGuid,
          modelName: this.searchVersion || ''
        }).then(res => {
          console.log('可添加型号', res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.radioVersionList = data
          } else {
            this.radioVersionList = []
          }
          this.searchVersionResult = this.radioVersionList.length
        })
      },
      // web-查询服务费设置详情(已添加的型号列表)
      async getAddedModels() {
        await getAddedModels({
          categoryGuid: this.openRow.categoryGuid,
          supplierGuId: this.supplyObj.supplierGuId,
          type: this.collectType == '1' ? 2 : 3,
          modelName: this.searchVal || ''
        }).then(res => {
          console.log('型号列表', res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.modelList = data
          } else {
            this.modelList = []
          }
          this.searchResult = this.modelList.length
        })
      },
      delVersion(row) {
        this.$confirm('确定删除' + row.modelName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteModels(row.modelGuid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 删除已添加型号
      async deleteModels(id) {
        await deleteModels({
          modelGuid: id
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.isAssign = false
            this.getAddedModels()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      }
    },
    created() {
      this.getAddedModels()
    }
  };
</script>

<style lang="scss" scoped>
</style>
