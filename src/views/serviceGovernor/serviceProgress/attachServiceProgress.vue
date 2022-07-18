<template>
  <div class="app-container">
    <div class="flex flex-center mb20">
      <div class="mr10">年份</div>
      <el-date-picker v-model="year" type="year" value-format="yyyy" placeholder="选择年份" @change="statisticGetYearByDirId">
      </el-date-picker>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="year" label="年份" align="center"></el-table-column>
      <el-table-column prop="month" label="月份" align="center"></el-table-column>
      <el-table-column prop="registerNum" label="新增注册对象数量" align="center">
        <template slot-scope="scope">
          <el-button style="text-decoration: underline;" type="text" @click="openRegisterDetail(scope.row)" :disabled="!scope.row.registerNum >= 0">{{scope.row.registerNum}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="demandAcceptOkNum" label="采购验收通过订单数量" align="center">
        <template slot-scope="scope">
          <el-button style="text-decoration: underline;" type="text" @click="openDemandOrder(scope.row)" :disabled="!scope.row.demandAcceptOkNum >= 0">{{scope.row.demandAcceptOkNum}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="supplyAcceptOkNum" label="供应验收通过订单数量" align="center">
        <template slot-scope="scope">
          <el-button style="text-decoration: underline;" type="text" @click="openSupplyOrder(scope.row)" :disabled="!scope.row.supplyAcceptOkNum >= 0">{{scope.row.supplyAcceptOkNum}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->
    <addRegisterObj v-if="isRegister" @close="closeRegisterDetail" :row="openRow"></addRegisterObj>
    <demandCheckOrder v-if="isDemand" @close="closeDemandOrder" :row="openRow"></demandCheckOrder>
    <supplyCheckOrder v-if="isSupply" @close="closeSupplyOrder" :row="openRow"></supplyCheckOrder>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import addRegisterObj from '@/views/serviceGovernor/serviceProgress/components/addRegisterObj'
  import demandCheckOrder from '@/views/serviceGovernor/serviceProgress/components/demandCheckOrder'
  import supplyCheckOrder from '@/views/serviceGovernor/serviceProgress/components/supplyCheckOrder'
  import {
    statisticGetYearByDirId
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      pages,
      addRegisterObj,
      demandCheckOrder,
      supplyCheckOrder
    },
    data() {
      return {
        loading: false,
        tableData: [{
          year: '2022',
          mouth: '08',
          objNumber: '10',
          demandNumber: '20',
          supplyNumber: '30'
        }],
        page: 1,
        pageTotal: 0,
        year: '2022',
        openRow: {},
        isRegister: false,
        isDemand: false,
        isSupply: false,
      };
    },
    methods: {
      getYear() {
        let data = new Date()
        this.year = data.getFullYear().toString()
      },
      changePage(page) {
        this.page = page
        this.statisticGetYearByDirId()
        //
      },
      openRegisterDetail(row) {
        this.openRow = row
        this.isRegister = true
      },
      closeRegisterDetail(row) {
        this.isRegister = false
      },
      openDemandOrder(row) {
        this.isDemand = true
        this.openRow = row
      },
      closeDemandOrder() {
        this.isDemand = false
      },
      openSupplyOrder(row) {
        this.isSupply = true
        this.openRow = row
      },
      closeSupplyOrder() {
        this.isSupply = false
      },
      async statisticGetYearByDirId() {
        this.loading = true
        await statisticGetYearByDirId({
          year: this.year,
          curUserId: this.$store.state.user.adminId,
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
    beforeCreate() {

    },
    created() {
      this.getYear()
      this.statisticGetYearByDirId()
    }
  }
</script>

<style scoped lang="scss">
</style>
