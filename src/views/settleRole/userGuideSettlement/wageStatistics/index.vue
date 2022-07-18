<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="year" label="年份" align="center">
      </el-table-column>
      <el-table-column prop="month" label="计酬月份" align="center">
      </el-table-column>
      <el-table-column prop="totalEarnings" label="应结费用" align="center">
        <template slot-scope="scope">
          {{ scope.row.totalEarnings || '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="doneEarnings" label="已结算费用" align="center">
        <template slot-scope="scope">
          {{ scope.row.doneEarnings || '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="undoneEarnings" label="未结算费用" align="center">
        <template slot-scope="scope">
          {{ scope.row.undoneEarnings || '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="totalCount" label="应结笔数" align="center">
      </el-table-column>
      <el-table-column prop="undoneCount" label="未结算笔数" align="center">
      </el-table-column>
      <el-table-column prop="doneCount" label="已结算笔数" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="openSettle(scope.row)">结算管理</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
    <settleManagement v-if="isSettle" @close="closeSettle" :row="openRow"></settleManagement>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import settleManagement from '@/views/settleRole/userGuideSettlement/wageStatistics/components/settleManagement'
  import { applyWithdrawDetail } from '@/api/settleRoleApi/userGuideSettlement.js'
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
        this.applyWithdrawDetail()
      },
      openSettle(row) {
        this.openRow = row
        this.isSettle = true
      },
      closeSettle() {
        this.isSettle = false
      },
      //
      async applyWithdrawDetail() {
        this.loading = true
        await applyWithdrawDetail({
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
      this.applyWithdrawDetail()
    }
  }
</script>

<style scoped lang="scss">
</style>
