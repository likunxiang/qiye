<template>
  <el-dialog title="服务定价设置" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div v-loading="loading">
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类名称</div>
        <div>{{openRow.categoryName}}</div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">收取范围</div>
        <div>{{collectType==0?'按品类':collectType==1?'按供方型号':'按我方型号'}}</div>
      </el-row>
      <div class="flex flex-center mb20 jsb">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的供方姓名' :isMb20="false"></searchCom>
        <!-- 弹出窗 -->
        <el-popover placement="bottom-end" width="400" trigger="click" @show="getSuppliers" @hide="saveSupplier">
          <el-row class="mb20">选择供方账号名称</el-row>
          <searchCom @toSearch='searchSup' :searchResult='searchSupResult' placeholderText='请输入你要找的供方'></searchCom>
          <template v-if="radioSupplierList.length">
            <el-radio-group v-model="radioSup">
              <el-row class="mb10" v-for="(item,index) in radioSupplierList" :key="index">
                <el-radio :label="item.supplierGuId" @change="chooseSupplier">{{item.userName}} {{item.nation}}
                  {{item.phonenumber}}
                </el-radio>
              </el-row>
      
            </el-radio-group>
          </template>
          <template v-else>
            <el-row>没有内容。</el-row>
      
          </template>
          <el-button slot="reference">添加供方</el-button>
        </el-popover>
      
      </div>
      <el-row>
        <el-table :data="supplyList" border style="width: 100%">
          <el-table-column prop="userName" label="供方姓名" align="center">
          </el-table-column>
          <el-table-column prop="phonenumber" label="绑定手机号" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="delPricing(scope.row)" type="text" size="small">删除供方</el-button>
              </el-row>
              <el-row>
                <el-button @click="openVersion(scope.row)" type="text" size="small">型号管理</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="supplyList.length <= 0">
        <p>请添加供方</p>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
    <modelManage v-if="isModel" @close="closeVersion" :openRow="openRow" :supplyObj="supplyObj"
      @refresh="getAddedSuppliersOfType2"></modelManage>
  </el-dialog>
</template>

<script>
  import {
    getAddedSuppliersOfType2,
    getSuppliers,
    deleteSuppliers,
    updateRatioOfType2,
    addSupplier
  } from '@/api/pricingRoleApi/pricingManagement.js'
  import modelManage from '@/views/pricingRole/pricingManagement/components/modelManage.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  export default {
    name: "index",
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
    },
    components: {
      modelManage,
      searchCom
    },
    data() {
      return {
        isOpen: true,
		searchVal: '',
        searchResult: 0,
		searchSupVal: '',
        searchSupResult: 0,
        supplyList: [], // 供方列表
        radioSupplyObj: {}, // 单选中的供方对象
        radioSupplierList: [],
        isModel: false,
        supplyObj: {},
        radioSup: 0,
        loading: true,
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
		this.close()
	  },
      delPricing(row) {
        this.deleteSuppliers(row.supplierGuId)
      },
      // web-删除已经添加的供方
      async deleteSuppliers(id) {
        await deleteSuppliers({
          supplierGuId: id
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.isAssign = false
            this.getAddedSuppliersOfType2()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      },
      openVersion(row) {
        this.supplyObj = row
        this.isModel = true
      },
      closeVersion() {
        this.isModel = false
      },
      // 组件里得搜索
      search(data) {
		this.searchVal = data
		this.page = 1
        this.getAddedSuppliersOfType2()
      },
      searchSup(data) {
		this.searchSupVal
		this.page = 1
        this.getSuppliers()
      },
      // 查询可添加的供方列表
      async getSuppliers() {
        this.radioSupplyObj = {}
        await getSuppliers({
          categoryGuid: this.openRow.categoryGuid,
          userName: this.searchSupVal || ''
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.radioSupplierList = data
          } else {
            this.radioSupplierList = []
          }
          this.searchSupResult = this.radioSupplierList.length
        })
      },
      saveSupplier() {
        if (this.radioSupplyObj.supplierGuId) {
          this.supplyList.push(this.radioSupplyObj)
          this.addSupplier(this.radioSupplyObj.supplierGuId)
        } else {
          return
        }
      },
      // web-添加供方-按供方型号
      async addSupplier(id) {
        await addSupplier({
          categoryGuid: this.openRow.categoryGuid,
          supplierGuId: id
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.isAssign = false
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      },
      // 按供方型号
      async getAddedSuppliersOfType2() {
        await getAddedSuppliersOfType2({
          categoryGuid: this.openRow.categoryGuid,
          phonenumber: this.searchVal || ''
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.supplyList = data
          } else {
            this.supplyList = []
          }
          this.searchResult = this.supplyList.length
        })
      },
      chooseSupplier(e) {
        console.log(e);
        for (let i in this.radioSupplierList) {
          if (e === this.radioSupplierList[i].supplierGuId) {
            this.radioSupplyObj = this.radioSupplierList[i]
          }
        }
      },
    },
    created() {
      this.getAddedSuppliersOfType2()
    }
  };
</script>

<style lang="scss" scoped>
</style>
