<template>
  <el-dialog title="结算管理" :visible.sync="isOpen" width="900px" @close="beforeClose">
    <el-row class="mb20 flex flex-center">
      <div class="bold label">年份</div>
      <div>{{row.year}}</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">验收通过月份</div>
      <div>{{row.month}}</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">应结笔数</div>
      <div>{{ parseFloat(row.waitPayNum) + parseFloat(row.hadPayNum)}}</div>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未结算" name="first">
        <el-row class="flex flex-center mb10">
          <el-input placeholder="请输入你要找的采购编号" clearable v-model="searchVal"
            @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="clearSearch">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
          </el-input>
          <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
        </el-row>
        <el-row style="padding-bottom: 60px;">
          <el-table :data="tableData" border height="50vh" v-loading="loading">
            <el-table-column prop="createTime" label="验收通过日期" align="center">
            </el-table-column>
            <el-table-column prop="categoryName" label="品类名称" align="center">
            </el-table-column>
            <el-table-column prop="cattypeName" label="品类类型" align="center">
            </el-table-column>
            <el-table-column prop="orderNo" label="采购编号" align="center">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="userPhonenumber" label="联系电话" align="center">
            </el-table-column>
            <el-table-column prop="waitPayFee" label="结算金额" align="center">
            </el-table-column>
            <el-table-column label="供应情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openAccountNumber(scope.row)">供应账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row)">供应订单详情</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="结算操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="submitPayProve(scope.row)">提交付款证明</el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="已结算" name="second">
        <el-row class="flex flex-center mb10">
          <el-input placeholder="请输入你要找的采购编号" clearable v-model="searchVal"
            @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="clearSearch">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
          </el-input>
          <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
        </el-row>
        <el-row style="padding-bottom: 60px;">
          <el-table :data="tableData" border height="50vh" v-loading="loading">
            <el-table-column prop="settleTime" label="提交付款证明日期" align="center" width="100">
            </el-table-column>
            <el-table-column prop="createTime" label="验收通过日期" align="center" width="100">
            </el-table-column>
            <el-table-column prop="categoryName" label="品类名称" align="center" width="100">
            </el-table-column>
            <el-table-column prop="cattypeName" label="品类类型" align="center" width="120">
            </el-table-column>
            <el-table-column prop="orderNo" label="采购编号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" align="center" width="100">
            </el-table-column>
            <el-table-column prop="userPhonenumber" label="联系电话" align="center" width="120">
            </el-table-column>
            <el-table-column prop="waitPayFee" label="结算金额" align="center" width="100">
            </el-table-column>
            <el-table-column label="供应情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openAccountNumber(scope.row)">供应账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row)">供应订单详情</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="结算操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="checkPayProve(scope.row)">查看付款证明</el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <orderDetail v-if="isOrder" @close="closeOrderDetail" :openRow="openRow" orderType="supply"></orderDetail>
    <submitPayProve v-if="isSubmit" @close="closeSubmit" :row="openRow" @refresh="search"></submitPayProve>
    <checkPayProve v-if="isCheckPay" @close="closePayProve" :row="openRow"></checkPayProve>
    <!-- 申请账号信息 -->
    <userMessage v-if="isUserMessage" @close="closeAccountNumber" :row="openRow" :userId="openRow.userId"></userMessage>
    <!-- 申请账号信息 end -->
    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>

  </el-dialog>
</template>

<script>
  import userMessage from '@/views/components/common/userMessage'
  import submitPayProve from '@/views/settleRole/supplierSupplySettlement/passCheck/components/submitPayProve'
  import checkPayProve from '@/views/settleRole/supplierSupplySettlement/passCheck/components/checkPayProve'
  import orderDetail from '@/views/components/common/orderDetail.vue'
  import pages from '@/views/components/common/pages'
  import {
    getUnPayListByMonth,
    getPaidListByMonth
  } from '@/api/settleRoleApi/supplierSupplySettlement/passCheck.js'
  export default {
    name: "index",
    components: {
      userMessage,
      orderDetail,
      submitPayProve,
      checkPayProve,
      pages
    },
    props: {
      row: {
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
        isUserMessage: false, // 申请账号信息开关
        isOrder: false, // 供应订单信息
        isSubmit: false, // 提交付款证明开关
        isCheckPay: false, // 查看付款证明开关
        activeName: "first",
        tableData: [],
        page: 1,
        pageTotal: 20,
        loading: true,
        openRow: {}
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
      handleClick(tab, event) {
        console.log('tab', tab);
        let value = tab.paneName
        if (value === 'first') {
          this.getUnPayListByMonth()
        } else {
          this.getPaidListByMonth()
        }
      },
      search() {
        if (this.activeName === 'first') {
          this.getUnPayListByMonth()
        } else {
          this.getPaidListByMonth()
        }
      },
      clearSearch() {
        this.searchVal = ''
        this.search()
      },
      openAccountNumber(row) {
        this.openRow = row
        this.isUserMessage = true
      },
      closeAccountNumber() {
        this.isUserMessage = false
      },
      orderDetail(row) {
        this.openRow = row
        this.isOrder = true
      },
      closeOrderDetail() {
        this.isOrder = false
      },
      // 提交付款证明
      submitPayProve(row) {
        this.openRow = row
        this.isSubmit = true
      },
      closeSubmit() {
        this.isSubmit = false
      },
      // 查看付款证明
      checkPayProve(row) {
        this.openRow = row
        this.isCheckPay = true
      },
      closePayProve() {
        this.isCheckPay = false
      },
      changePage(data) {
        this.page = page
        if (this.activeName === 'first') {
          this.getUnPayListByMonth()
        } else {
          this.getPaidListByMonth()
        }
      },
      async getUnPayListByMonth() {
        this.loading = true
        await getUnPayListByMonth({
          month: this.row.year + '-' + this.row.month,
          orderNo: this.searchVal,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
          this.searchResult = this.tableData.length
        })
      },
      async getPaidListByMonth() {
        this.loading = true
        await getPaidListByMonth({
          month: this.row.year + '-' + this.row.month,
          orderNo: this.searchVal,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
          this.searchResult = this.tableData.length
        })
      }
    },
    created() {
      this.getUnPayListByMonth()
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    width: 120px;
  }

  .my-label {
    text-align: center !important;
    background-color: #1890FF;
  }
</style>
