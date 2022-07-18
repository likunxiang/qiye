<template>
  <el-dialog title="查看月份详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-table :data="menuData" border>
      <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
      <el-table-column prop="orderMonth" label="月份" align="center"></el-table-column>
      <el-table-column prop="orderCount" label="订单数量" align="center"></el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="padding-bottom: 68px;">
      <searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的采购编号'></searchCom>
      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="orderDate" label="采购日期" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="采购编号" align="center"></el-table-column>
        <el-table-column label="采购情况" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="text" @click="openAccountNumber(scope.row,'demand')">个人账号信息</el-button>
            </el-row>
            <el-row>
              <el-button type="text" @click="orderDetail(scope.row,'demand')">采购订单详情</el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="供应情况" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="text" @click="openAccountNumber(scope.row,'supply')">个人账号信息</el-button>
            </el-row>
            <el-row>
              <el-button type="text" @click="orderDetail(scope.row,'supply')">供应订单详情</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <orderDetail v-if="isOrder" @close="closeOrderDetail" :openRow="openRow" :orderType="orderType"></orderDetail>
      <userMessage v-if="isUserMessage" @close="closeAccountNumber" :row="openRow"></userMessage>
      <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import orderDetail from '@/views/components/common/orderDetail.vue'
  import userMessage from '@/views/components/common/userMessage'
  import {
    getOneCatOrderDetailMonth
  } from '@/api/operationRoleApi/catDealManagement.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom,
      orderDetail,
      userMessage
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      },
      year: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isOpen: true,
        menuData: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
		searchVal: '',
        tableData: [],
        openRow: {},
        yearMonth: '', // 订单年月，前端自己拼
        isOrder: false,
        isUserMessage: false,
        orderType: 'demand',
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
      orderDetail(row,type) {
        this.openRow = row
        this.openRow.categoryGuid = this.row.categoryGuid
        this.openRow.categoryName = this.row.categoryName
        this.orderType = type
        this.isOrder = true
      },
      closeOrderDetail() {
        this.isOrder = false
      },
      openAccountNumber(row,type) {
        this.openRow = row
        this.openRow.categoryGuid = this.row.categoryGuid
        this.openRow.categoryName = this.row.categoryName
        if (type == 'demand') {
          this.openRow.userId = row.demandUserId
        } else {
          this.openRow.userId = row.supplyUserId
        }
        this.isUserMessage = true
      },
      closeAccountNumber() {
        this.isUserMessage = false
      },
      changePage(page) {
        this.page = page
        this.getOneCatOrderDetailMonth()
      },
      searchData(data) {
        this.searchVal = data
		this.page = 1
        this.getOneCatOrderDetailMonth()
      },
      async getOneCatOrderDetailMonth() {
		this.loading = true
        await getOneCatOrderDetailMonth({
          categoryGuid: this.row.categoryGuid,
          orderMonth: this.yearMonth,
          orderNo: this.searchVal || '',
          page: this.page,
          size: '20'
        }).then(res => {
		  this.loading = false
          console.log(res);
          let data = []
          if(res.Tag.length) {
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
      this.menuData.push(this.row)
      // this.yearMonth = this.year + '-' + this.row.orderMonth
      this.yearMonth = this.row.orderMonth
      this.getOneCatOrderDetailMonth()
    }
  };
</script>

<style lang="scss" scoped>
</style>
