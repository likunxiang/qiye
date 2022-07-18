<template>
  <el-dialog title="结算管理" :visible.sync="isOpen" width="900px" @close="beforeClose">
    <el-row class="mb20 flex flex-center">
      <div class="bold label">年份</div>
      <div>2021</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">裁决结果月份</div>
      <div>06</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">应结笔数</div>
      <div>10000</div>
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
        <el-row style="padding-bottom: 40px;">
          <el-table :data="tableData" border height="50vh">
            <el-table-column prop="name" label="裁决结果日期" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="品类名称" align="center" width="100">
            </el-table-column>
            <el-table-column prop="cattypeName" label="品类类型" align="center" width="120">
            </el-table-column>
            <el-table-column prop="name" label="采购编号" align="center" width="120">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center" width="100">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" align="center" width="120">
            </el-table-column>
            <el-table-column prop="settle" label="结算金额" align="center" width="100">
            </el-table-column>
            <el-table-column label="采购情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row)">采购订单详情</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="裁决情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="findingDetail(scope.row)">裁决结果信息</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="供应情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openAccountNumber(scope.row)">供应账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openCollect(scope.row)">收款账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="checkPayProve(scope.row)">查看付款证明</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="结算操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="confirmPenalty(scope.row)"> 确认费用收取</el-button>
                </el-row>
              </template>
            </el-table-column>
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
        <el-row style="padding-bottom: 40px;">
          <el-table :data="tableData" border height="50vh">
            <el-table-column prop="name" label="提交付款证明日期" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="裁决结果日期" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="品类名称" align="center" width="100">
            </el-table-column>
            <el-table-column prop="cattypeName" label="品类类型" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="采购编号" align="center" width="120">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center" width="100">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" align="center" width="120">
            </el-table-column>
            <el-table-column prop="settle" label="结算金额" align="center" width="100">
            </el-table-column>
            <el-table-column label="采购情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="orderDetail(scope.row)">采购订单详情</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="裁决情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="findingDetail(scope.row)">裁决结果信息</el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="供应情况" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openSupply(scope.row)">供应账号信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="checkPayProve(scope.row)">查看付款证明</el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <orderDetail v-if="isOrder" @close="closeOrder"></orderDetail>
    <findingResult v-if="isFinding" @close="closeFindingDetail" :row='openRow'></findingResult>
    <collectionInformation v-if="isCollect" @close="closeCollect"></collectionInformation>
    <checkPayProve v-if="isCheckPay" @close="closePayProve" :row="openRow"></checkPayProve>
    <!-- 申请账号信息 -->
    <userMessage v-if="isUserMessage" @close="closeAccountNumber" :row="openRow"></userMessage>
    <!-- 申请账号信息 end -->
    <confirmPenaltyPop v-if="isConfirm" @close="closeConfirmPenalty" :row="openRow"></confirmPenaltyPop>
  </el-dialog>
</template>

<script>
  import userMessage from '@/views/components/common/userMessage'
  import checkPayProve from '@/views/settleRole/supplierSupplySettlement/supplyBadPunish/components/checkPayProve'
  import orderDetail from '@/views/components/common/orderDetail.vue'
  import findingResult from '@/views/components/common/findingResult.vue'
  import collectionInformation from '@/views/settleRole/supplierSupplySettlement/buyerCompensation/components/collectionInformation'
  import confirmPenaltyPop from '@/views/settleRole/supplierSupplySettlement/supplyBadPunish/components/confirmPenaltyPop'
  export default {
    name: "index",
    components: {
      userMessage,
      orderDetail,
      checkPayProve,
      findingResult,
      collectionInformation,
      confirmPenaltyPop
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
        openRow: {}, // 选中内容对象
        activeName: "first",
        tableData: [],
        contentFromObj: {
          year: '0',
          month: '0',
          purchase: '0',
          supply: '0',
          guide: '0',
          total: '0'
        }
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
        console.log(tab, event);
      },
      search() {
        this.searchResult = 1
      },
      clearSearch() {
        this.searchVal = ''
        this.search()
      },
      openAccountNumber(row) {
        this.isUserMessage = true
      },
      closeAccountNumber() {
        this.isUserMessage = false
      },
      orderDetail() {
        this.isOrder = true
      },
      closeOrderDetail() {
        this.isOrder = false
      },
      // 查看付款证明
      checkPayProve() {
        this.isCheckPay = true
      },
      closePayProve() {
        this.isCheckPay = false
      },
      // 裁决结果批复
      findingDetail() {
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
      confirmPenalty(row) {
        this.isConfirm = true
      },
      closeConfirmPenalty() {
        this.isConfirm = false
      }
    },
    created() {

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
