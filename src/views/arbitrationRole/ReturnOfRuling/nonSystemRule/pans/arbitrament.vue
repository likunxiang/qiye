<template>
  <div class="page">
    <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要查找的供应编号" clearable v-model="searchVal"
        @keyup.enter.native="search" style="width: 260px;margin-right: 20px;" @clear="search">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
	  </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="judgeDate" label="裁决日期" align="center">
        </el-table-column>
        <el-table-column prop="applyDate" label="申请日期" align="center">
        </el-table-column>
        <el-table-column prop="categoryName" label="品类名称" align="center">
        </el-table-column>
        <el-table-column prop="cattypeName" label="品类类型" align="center">
        </el-table-column>
        <el-table-column prop="orderNo" label="采购编号" align="center">
        </el-table-column>
        <el-table-column label="申请情况" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="checkAccount(scope.row)" type="text" size="small">申请账号信息</el-button>
            </el-row>
            <el-row>
              <el-button @click="checkArbitration(scope.row)" type="text" size="small">查看仲裁申请</el-button>
            </el-row>
            <el-row>
              <el-button @click="checkResult(scope.row)" type="text" size="small">查看成果接收</el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="采购情况" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="demandAccount(scope.row)" type="text" size="small">采购账号信息</el-button>
            </el-row>
            <el-row>
              <el-button @click="demandOrderDetail(scope.row)" type="text" size="small">采购订单详情</el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="供应情况" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="supplyAccount(scope.row)" type="text" size="small">供应账号信息</el-button>
            </el-row>
            <el-row>
              <el-button @click="supplyOrderDetail(scope.row)" type="text" size="small">供应订单详情</el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="裁决情况" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="findingDetail(scope.row)" type="text" size="small">查看裁决结果</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <orderDetail v-if="isSupplyOrder" @close="closeSupplyOrder" :openRow="openRow" orderType="supply"></orderDetail>
    <orderDetail v-if="isDemandOrder" @close="closeDemandOrder" :openRow="openRow" orderType="demand"></orderDetail>
    <arbitrationApply v-if="isArbitrationApply" @close="closeCheckArbitration" :openRow="openRow" :type="openRow.applyType"></arbitrationApply>
    <findingResult v-if="isFinding" @close="closeFindingDetail" :row="openRow"></findingResult>
    <userMessage v-if="isDemandAccount" @close="closeDemandAccount" :row="openRow" :userId="openRow.demandUserId"></userMessage>
    <userMessage v-if="isApply" @close="closeCheckAccount" :row="openRow" :userId="openRow.applyUserId"></userMessage>
    <userMessage v-if="isSupplyAccount" @close="closeSupplyAccount" :row="openRow" :userId="openRow.supplyUserId"></userMessage>
    <resultManagement v-if="isResult" @close="closeCheckResult" :openRow="openRow"></resultManagement>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import orderDetail from '@/views/components/common/orderDetail.vue'
  import arbitrationApply from '@/views/arbitrationRole/ReturnOfRuling/components/arbitrationApply.vue'
  import findingResult from '@/views/components/common/findingResult.vue'
  import userMessage from '@/views/components/common/userMessage'
  import resultManagement from '@/views/arbitrationRole/ReturnOfRuling/components/resultManagement.vue'
  import { getNonSysJudgeList } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      orderDetail,
      arbitrationApply,
      findingResult,
      userMessage,
      resultManagement,
      pages
    },
    data() {
      return {
		loading: true,
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        tableData: [],
        isApply: false,
        isArbitrationApply: false,
        isResult: false,
        isSupplyAccount: false,
        isSupplyOrder: false,
        isDemandAccount: false,
        isDemandOrder: false,
        isFinding: false,
        openRow: {},
        page: 1,
        pageTotal: 0,
      };
    },
    methods: {
      // 获取数据
      async getNonSysJudgeList() {
		this.loading = true
        await getNonSysJudgeList({
          orderNo: this.searchVal,
          size: '20',
          page: this.page
        }).then(res => {
		  this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
			this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
			this.pageTotal = (this.page - 1) * 20 + 1
          }
          this.searchResult = this.tableData.length
        })
      },
      changePage(page) {
        this.page = page
        this.getNonSysJudgeList()
      },
      search() {
        if(this.searchVal.length > 0) {
			this.isToSearch = true
		} else {
			this.isToSearch = false
		}
		this.page = 1
        this.getNonSysJudgeList()
      },
      // 申请账号信息
      checkAccount(row) {
        this.openRow = row
        this.isApply = true
      },
      closeCheckAccount() {
        this.isApply = false
      },
      // 查看仲裁申请
      checkArbitration(row) {
        this.openRow = row
        this.isArbitrationApply = true
      },
      closeCheckArbitration() {
        this.isArbitrationApply = false
      },
      // 查看成果接收
      checkResult(row) {
        this.openRow = row
        this.isResult = true
      },
      closeCheckResult() {
        this.isResult = false
      },
      // 采购账号信息
      supplyAccount(row) {
        this.openRow = row
        this.isSupplyAccount = true
      },
      closeSupplyAccount() {
        this.isSupplyAccount = false
      },
      // 采购订单详情
      supplyOrderDetail(row) {
        this.openRow = row
        console.log('openRow',this.openRow);
        this.isSupplyOrder = true
      },
      closeSupplyOrder() {
        this.isSupplyOrder = false
      },
      // 供应账号信息
      demandAccount(row) {
        this.openRow = row
        this.isDemandAccount = true
      },
      closeDemandAccount() {
        this.isDemandAccount = false
      },
      // 供应订单详情
      demandOrderDetail(row) {
        this.openRow = row
        this.isDemandOrder = true
      },
      closeDemandOrder() {
        this.isDemandOrder = false
      },
      // 裁决结果批复
      findingDetail(row) {
        this.openRow = row
        this.isFinding = true
      },
      closeFindingDetail() {
        this.isFinding = false
      }
    },
    created() {
      this.getNonSysJudgeList()
    }
  }
</script>

<style scoped lang="scss">
  .page {
    min-height: 82vh;
    padding-bottom: 68px;
  }
</style>
