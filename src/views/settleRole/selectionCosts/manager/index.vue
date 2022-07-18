<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="year" label="年份" align="center">
      </el-table-column>
      <el-table-column prop="month" label="计酬月份" align="center">
      </el-table-column>
      <el-table-column prop="cost" label="应结算人数" align="center">
        <template slot-scope="scope">{{ parseFloat(scope.row.waitPayFee) + parseFloat(scope.row.hadPayFee)}}</template>
      </el-table-column>
      <el-table-column prop="waitPayFee" label="已结算人数" align="center">
      </el-table-column>
      <el-table-column prop="hadPayFee" label="未结算人数" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row v-if="true">
            <el-button type="text" @click="openSettle(scope.row)">结算管理</el-button>
          </el-row>
          <el-row v-else>
            <el-button type="text" :disabled="true">统计中</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      pages
    },
    data() {
      return {
        loading: false,
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
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
</style>
