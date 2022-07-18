<template>
  <el-dialog title="结算管理" :visible.sync="isOpen" width="900px" @close="beforeClose">
    <el-row class="mb20 flex flex-center">
      <div class="bold label">年份</div>
      <div>{{row.year}}</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">裁决结果月份</div>
      <div>{{row.month}}</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">应结笔数</div>
      <div>{{ parseFloat(row.waitPayNum) + parseFloat(row.hadPayNum)}}</div>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未结算" name="first">
        <el-row class="flex flex-center mb10">
          <el-input placeholder="请输入你要找的采购编号" clearable v-model="searchVal" @keyup.enter.native="search"
            style="width: 200px;margin-right: 20px;" @clear="clearSearch">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
          </el-input>
          <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
        </el-row>
        <el-row style="padding-bottom: 60px;">
          <el-table v-loading="loading" :data="tableData" border height="50vh">
            <el-table-column prop="judgeTime" label="裁决结果日期" align="center" width="120">
            </el-table-column>
            <el-table-column prop="categoryName" label="品类名称" align="center" width="120">
            </el-table-column>
            <el-table-column prop="cattypeName" label="品类类型" align="center" width="120">
            </el-table-column>
            <el-table-column prop="orderNo" label="采购编号" align="center" width="120">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="userPhonenumber" label="联系电话" align="center" width="120">
            </el-table-column>
            <el-table-column prop="refundFee" label="结算金额" align="center" width="120">
            </el-table-column>
            <el-table-column label="采购情况" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openAccountNumber(scope.row,'demand')">采购账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row,'demand')">采购订单详情</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openCollect(scope.row)">收款账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openRefundProve(scope.row)">查看退货证明</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="裁决情况" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="findingDetail(scope.row)">裁决结果信息</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="退货验收结果" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <el-row v-if="scope.row.supplyAccept == '2'">验收不通过</el-row>
                <el-row v-if="scope.row.supplyAccept == '1'">验收通过</el-row>
                <el-row v-if="scope.row.supplyAccept == '0' || scope.row.supplyAccept == '2'">
                  <el-button type="text" @click="openCheckAccept(scope.row)">验收通过</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="供应情况" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openAccountNumber(scope.row,'supply')">供应账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row,'supply')">供应订单详情</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openRefundVerify(scope.row)">退货验收详情</el-button>
                </el-row>
              </template>
            </el-table-column>
            <!-- <el-table-column label="结算操作" align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="submitPayProve(scope.row)">提交付款证明</el-button>
                </el-row>
              </template>
            </el-table-column> -->
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="已结算" name="second">
        <el-row class="flex flex-center mb10">
          <el-input placeholder="请输入你要找的采购编号" clearable v-model="searchVal" @keyup.enter.native="search"
            style="width: 200px;margin-right: 20px;" @clear="clearSearch">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
          </el-input>
          <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
        </el-row>
        <el-row style="padding-bottom: 60px;">
          <el-table v-loading="loading" :data="tableData" border height="50vh">
            <el-table-column prop="refundPayTime" label="退款日期" align="center">
            </el-table-column>
            <!-- <el-table-column prop="confirmRefundPayProveTime" label="提交付款证明日期" align="center">
            </el-table-column> -->
            <el-table-column prop="supplayAcceptTime" label="退货验收通过日期" align="center" width="120">
            </el-table-column>
            <el-table-column prop="categoryName" label="品类名称" align="center" width="120">
            </el-table-column>
            <el-table-column prop="cattypeName" label="品类类型" align="center" width="120">
            </el-table-column>
            <el-table-column prop="orderNo" label="采购编号" align="center" width="120">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="userPhonenumber" label="联系电话" align="center" width="120">
            </el-table-column>
            <el-table-column prop="refundFee" label="结算金额" align="center" width="120">
            </el-table-column>
            <el-table-column label="采购情况" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openAccountNumber(scope.row,'demand')">采购账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row,'demand')">采购订单详情</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openCollect(scope.row)">收款账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openRefundProve(scope.row)">查看退货证明</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="裁决情况" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="findingDetail(scope.row)">裁决结果信息</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="供应情况" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openAccountNumber(scope.row,'supply')">供应账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row,'supply')">供应订单详情</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openRefundVerify(scope.row)">退货验收详情</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="结算操作" align="center" width="120" fixed="right">
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

    <!-- 申请账号信息 -->
    <userMessage v-if="isUserMessage" @close="closeAccountNumber" :row="openRow" :userId="orderType=='demand'?openRow.demandUserId:openRow.supplyUserId"></userMessage>
    <!-- 申请账号信息 end -->
    <orderDetail v-if="isOrder" @close="closeOrderDetail" :openRow="openRow" :orderType="orderType"></orderDetail>
    <submitPayProve v-if="isSubmit" @close="closeSubmit" :row="openRow"></submitPayProve>
    <findingResult v-if="isFinding" @close="closeFindingDetail" :row="openRow"></findingResult>
    <collectionInformation v-if="isCollect" @close="closeCollect" :row="openRow"></collectionInformation>
    <checkPayProve v-if="isCheckPay" @close="closePayProve" :row="openRow"></checkPayProve>

    <checkAcceptPop v-if="isCheckAccept" @close="closeCheckAccept" :row="openRow" @refresh="getUnPayListByMonth">
    </checkAcceptPop>
    <refundProve v-if="isRefund" @close="closeRefundProve" :row="openRow"></refundProve>
    <refundVerify v-if="isVerify" @close="closeRefundVerify" :row="openRow"></refundVerify>
    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
  </el-dialog>
</template>

<script>
  import userMessage from '@/views/components/common/userMessage'
  import checkPayProve from '@/views/settleRole/buyerPurchaseSettlement/buyerRefundPay/components/checkPayProve'
  import submitPayProve from '@/views/settleRole/buyerPurchaseSettlement/buyerRefundPay/components/submitPayProve'
  import orderDetail from '@/views/components/common/orderDetail.vue'
  import findingResult from '@/views/components/common/findingResult.vue'
  import collectionInformation from '@/views/settleRole/buyerPurchaseSettlement/buyerRefundPay/components/collectionInformation'
  import checkAcceptPop from '@/views/settleRole/buyerPurchaseSettlement/buyerRefundPay/components/checkAcceptPop'
  import refundProve from '@/views/settleRole/buyerPurchaseSettlement/buyerRefundPay/components/refundProve'
  import refundVerify from '@/views/settleRole/buyerPurchaseSettlement/buyerRefundPay/components/refundVerify'
  import pages from '@/views/components/common/pages'
  import {
    getUnPayListByMonth,
    getPayListByMonth
  } from '@/api/settleRoleApi/buyerPurchaseSettlement/buyerRefundPay.js'
  export default {
    name: "index",
    components: {
      userMessage,
      orderDetail,
      checkPayProve,
      submitPayProve,
      findingResult,
      collectionInformation,
      checkAcceptPop,
      refundProve,
      refundVerify,
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
        isFinding: false, // 查看裁决结果
        isCollect: false, // 收款账号信息
        isConfirm: false, // 确认
        isRefund: false, //
        isVerify: false, // 是否查看验收情况
        isCheckAccept: false, // 验收通过开关
        activeName: "first",
        tableData: [],
        page: 1,
        pageTotal: 20,
        openRow: {},
        loading: true,
        orderType: 'demand'
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
          this.getPayListByMonth()
        }
      },
      search() {
        if (this.activeName === 'first') {
          this.getUnPayListByMonth()
        } else {
          this.getPayListByMonth()
        }
      },
      clearSearch() {
        this.searchVal = ''
        this.search()
      },
      openAccountNumber(row,type) {
        this.openRow = row
        this.orderType = type
        this.isUserMessage = true
      },
      closeAccountNumber() {
        this.isUserMessage = false
      },
      orderDetail(row,type) {
        this.openRow = row
        this.orderType = type
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
      // 裁决结果批复
      findingDetail(row) {
        this.openRow = row
        this.isFinding = true
      },
      closeFindingDetail() {
        this.isFinding = false
      },
      // 收款账号信息
      openCollect(row) {
        this.openRow = row
        this.isCollect = true
      },
      closeCollect() {
        this.isCollect = false
      },
      // 查看退货证明
      openRefundProve(row) {
        this.openRow = row
        this.isRefund = true
      },
      closeRefundProve() {
        this.isRefund = false
      },
      // 查看退货验收情况
      openRefundVerify(row) {
        this.openRow = row
        this.isVerify = true
      },
      closeRefundVerify() {
        this.isVerify = false
      },
      // 验收通过弹窗
      openCheckAccept(row) {
        this.openRow = row
        this.isCheckAccept = true
      },
      closeCheckAccept() {
        this.isCheckAccept = false
      },
      changePage(data) {
        this.page = page
        if (this.activeName === 'first') {
          this.getUnPayListByMonth()
        } else {
          this.getPayListByMonth()
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
      async getPayListByMonth() {
        this.loading = true
        await getPayListByMonth({
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
