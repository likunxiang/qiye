<template>
  <el-dialog title="查看年份详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-table :data="menuData" border>
      <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
      <el-table-column prop="orderYear" label="年份" align="center"></el-table-column>
      <el-table-column prop="orderCount" label="订单数量" align="center"></el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="padding-bottom: 68px;">
      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="orderMonth" label="月份" align="center"></el-table-column>
        <el-table-column prop="orderCount" label="订单数量" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="monthDetail(scope.row)">查看月份详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
    </div>
    <monthDetailPop v-if="isMonth" @close="closeMonthDetail" :row="openRow" :year="row.orderYear"></monthDetailPop>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import monthDetailPop from '@/views/operationRole/catDealManagement/catTransactionTracking/pans/monthDetailPop.vue'
  import {
    getOneCatOrderCountMonth
  } from '@/api/operationRoleApi/catDealManagement.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom,
      monthDetailPop
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
        menuData: [],
        page: 1,
        pageTotal: 0,
        tableData: [],
        isMonth: false,
        openRow: {},
		loading: true
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
      monthDetail(row) {
        this.openRow = row
        this.openRow.categoryGuid = this.row.categoryGuid
        this.openRow.categoryName = this.row.categoryName
        this.isMonth = true
      },
      closeMonthDetail() {
        this.isMonth = false
      },
      changePage(page) {
        this.page = page
        this.getOneCatOrderCountMonth()
      },
      async getOneCatOrderCountMonth() {
		this.loading = true
        await getOneCatOrderCountMonth({
          categoryGuid: this.row.categoryGuid,
          year: this.row.orderYear,
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
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      }
    },
    created() {
      this.menuData.push(this.row)
      this.getOneCatOrderCountMonth()
    }
  };
</script>

<style lang="scss" scoped>
</style>
