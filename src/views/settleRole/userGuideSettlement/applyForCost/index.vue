<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="year" label="年份" align="center">
      </el-table-column>
      <el-table-column prop="supplyMonth" label="申请提现月份" align="center">
      </el-table-column>
      <el-table-column prop="earnings" label="申请提现费用" align="center">
        <template slot-scope="scope">
          {{towNumber(Number(scope.row.earnings)/100)}}
        </template>
      </el-table-column>
      <el-table-column prop="count" label="申请笔数" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="openSettle(scope.row)">结算管理</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <settleManagement v-if="isSettle" @close="closeSettle" :row="openRow"></settleManagement>
    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
  </div>
</template>

<script>
  import settleManagement from '@/views/settleRole/userGuideSettlement/applyForCost/components/settleManagement'
  import { applyWithdrawList } from '@/api/settleRoleApi/userGuideSettlement.js'
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      settleManagement,
      pages
    },
    data() {
      return {
        loading: true,
        isSettle: false,
        tableData: [],
        page: 1,
        pageTotal: 0,
      };
    },
    methods: {
      changePage(page) {
        this.page = page
        this.applyWithdrawList()
      },
      openSettle(row) {
        this.openRow = row
        this.isSettle = true
      },
      closeSettle() {
        this.isSettle = false
      },
      towNumber(val) {
       return val.toFixed(2)
      },
      async applyWithdrawList() {
        this.loading = true
        await applyWithdrawList({
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
        })
      }
    },
    created() {
      this.applyWithdrawList()
    }
  }
</script>

<style scoped lang="scss">
</style>
