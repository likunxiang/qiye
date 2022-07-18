<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="year" label="年份" align="center">
      </el-table-column>
      <el-table-column prop="month" label="验收通过月份" align="center">
      </el-table-column>
      <el-table-column prop="cost" label="应结费用" align="center">
        <template slot-scope="scope">{{ parseFloat(scope.row.waitPayFee) + parseFloat(scope.row.hadPayFee)}}</template>
      </el-table-column>
      <el-table-column prop="waitPayFee" label="未结费用" align="center">
      </el-table-column>
      <el-table-column prop="hadPayFee" label="已结费用" align="center">
      </el-table-column>
      <el-table-column prop="number" label="应结笔数" align="center">
        <template slot-scope="scope">{{parseFloat(scope.row.waitPayNum) + parseFloat(scope.row.hadPayNum)}}</template>
      </el-table-column>
      <el-table-column prop="waitPayNum" label="未结笔数" align="center">
      </el-table-column>
      <el-table-column prop="hadPayNum" label="已结笔数" align="center">
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
  import settleManagement from '@/views/settleRole/supplierSupplySettlement/passCheck/components/settleManagement'
  import pages from '@/views/components/common/pages'
  import { getDoneList } from '@/api/settleRoleApi/supplierSupplySettlement/passCheck.js'
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
        openRow: {},
        tableData: [],
        page: 1,
        pageTotal: 0,
      };
    },
    methods: {
      changePage(data) {
        this.page = page
        this.getDoneList()
      },
      openSettle(row) {
        this.openRow = row
        this.isSettle = true
      },
      closeSettle() {
        this.isSettle = false

      },
      async getDoneList() {
        this.loading = true
        await getDoneList({
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
        })
      }
    },
    created() {
      this.getDoneList()
    }
  }
</script>

<style scoped lang="scss">
</style>
