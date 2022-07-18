<template>
  <el-dialog title="型号管理" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 60px;" v-loading="loading">
      <el-table :data="tableDataFirst" border>
        <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册日期" align="center"></el-table-column>
        <el-table-column prop="addCatTime" label="品类添加日期" align="center"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类类型</div>
        <div>{{openRow.cattypeName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类名称</div>
        <div>{{openRow.categoryName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">收取范围</div>
        <div>按型号名称</div>
      </el-row>
      <el-divider></el-divider>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的型号名称'></searchCom>
      <el-table :data="tableData" border>
        <el-table-column prop="modelName" label="型号名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openPricing(scope.row)">服务费用设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <severFreeSetting v-if="isSetting" @close="closePricing" :openRow="row" :categoryRow="openRow" :modelRow='modelRow'></severFreeSetting>
  </el-dialog>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import severFreeSetting from '@/views/pricingRole/pricingManagement/components/severFreeSetting.vue'
  import {
    getSupplierModelList
  } from '@/api/pricingRoleApi/pricingManagement.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        tableData: [],
        tableDataFirst: [],
        isSetting: false,
        loading: false,
        row: {}
      };
    },
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      modelRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    components: {
      searchCom,
      pages,
      severFreeSetting
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      openPricing(row) {
        this.row = row
        this.isSetting = true
      },
      closePricing() {
        this.isSetting = false
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getSupplierModelList()
        //
      },
      changePage(page) {
        this.page = page
        this.getSupplierModelList()
      },
      async getSupplierModelList() {
        this.loading = true
        await getSupplierModelList({
          supplierGuid: this.modelRow.supplierGuid,
          modelName: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              this.tableData = []
            }
            this.searchResult = this.tableData.length
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      this.tableDataFirst.push(this.modelRow)
      this.getSupplierModelList()
    }
  };
</script>

<style lang="scss" scoped>
</style>
