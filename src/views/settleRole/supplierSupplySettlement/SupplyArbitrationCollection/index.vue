<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="year" label="年份" align="center">
      </el-table-column>
      <el-table-column prop="month" label="裁决结果月份" align="center">
      </el-table-column>
      <el-table-column prop="cost" label="应结费用" align="center">
      </el-table-column>
      <el-table-column prop="number" label="未结费用" align="center">
      </el-table-column>
      <el-table-column prop="number" label="已结费用" align="center">
      </el-table-column>
      <el-table-column prop="number" label="应结笔数" align="center">
      </el-table-column>
      <el-table-column prop="number" label="未结笔数" align="center">
      </el-table-column>
      <el-table-column prop="number" label="已结笔数" align="center">
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
  import settleManagement from '@/views/settleRole/supplierSupplySettlement/supplyBadPunish/components/settleManagement'
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      settleManagement,
      pages
    },
    data() {
      return {
        loading: false,
        isSettle: false,
        tableData: [
          {
            year: '2021',
            month: '10',
            cost: '8800.00',
            number: '1000'
          }
        ],
        page: 0,
        pageTotal: 20,
      };
    },
    methods: {
      changePage(data) {
        this.page = page
      },
      openSettle(row) {
        this.openRow = row
        this.isSettle = true
      },
      closeSettle() {
        this.isSettle = false
      },
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
</style>
