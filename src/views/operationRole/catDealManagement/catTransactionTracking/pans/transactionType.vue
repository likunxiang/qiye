<template>
  <div style="min-height: 83vh;position: relative;padding-bottom: 60px;">
    <searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
      <el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
      <el-table-column prop="cattypeName" label="供方数量" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="numberDetail(scope.row)">{{scope.row.supplierCount}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="demandRequestCount" label="采购需求数量" align="center"></el-table-column>
      <el-table-column prop="demandRequestPriceCount" label="采购需求报价" align="center"></el-table-column>
      <el-table-column prop="cattypeName" label="订单数量" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="orderDetail(scope.row)">{{scope.row.orderCount}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <numberDetailPop v-if="isDetail" @close="closeNumberDetail" :openRow="openRow"></numberDetailPop>
    <orderDetail v-if="isOrder" @close="closeOrderDetail" :row="openRow"></orderDetail>
    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import numberDetailPop from '@/views/operationRole/catDealManagement/catTransactionTracking/pans/numberDetailPop.vue'
  import orderDetail from '@/views/operationRole/catDealManagement/catTransactionTracking/pans/orderDetail.vue'
  import {
    getBriefMode2List
  } from '@/api/operationRoleApi/catDealManagement.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom,
      numberDetailPop,
      orderDetail
    },
    data() {
      return {
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        tableData: [],
        isDetail: false,
        isOrder: false,
        loading: true,
      };
    },
    methods: {
      orderDetail(row) {
        this.openRow = row
        this.isOrder = true
      },
      closeOrderDetail() {
        this.isOrder = false
      },
      numberDetail(row) {
        this.openRow = row
        this.openRow.openType = '2' // 2交易类
        this.isDetail = true
      },
      closeNumberDetail() {
        this.isDetail = false
      },
      changePage(page) {
        this.page = page
        this.getBriefMode2List()
      },
      searchData(data) {
        this.searchVal = data
        this.page = 1
        this.getBriefMode2List(data)
      },
      async getBriefMode2List(data) {
        this.loading = true
        await getBriefMode2List({
          categoryName: this.searchVal || '',
          page: this.page,
          size: '20'
        }).then(res => {
          this.loading = false
          console.log(res);
          let data = []
          if (res.Tag.length) {
            data = res.Tag[0].Table
          } else {
            data = []
          }
          this.tableData = data
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      }
    },
    created() {
      this.getBriefMode2List()
    }
  }
</script>

<style scoped lang="scss">
</style>
