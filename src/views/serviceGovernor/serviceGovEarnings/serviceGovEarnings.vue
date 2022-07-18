<template>
  <div class="app-container">
    <div class="flex flex-center mb20 jsb">
      <div class="flex flex-center">
        <div class="mr10">年份</div>
        <el-date-picker v-model="year" value-format="yyyy" type="year" placeholder="选择年份" @change="web_getYearEarningsByDirUserId">
        </el-date-picker>
      </div>
      <el-button type="primary" @click="openRules">分配标准说明</el-button>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="year" label="年份" align="center"></el-table-column>
      <el-table-column prop="month" label="计酬月份" align="center"></el-table-column>
      <el-table-column prop="earnings" label="收益" align="center"></el-table-column>
      <el-table-column prop="withDrawStatusStr" label="状态" align="center"></el-table-column>
      <el-table-column prop="nickName" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row)" :disabled="!scope.row.earningsGuid">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->
    <ruleDistribution v-if="isRules" @close="closeRules"></ruleDistribution>
    <earningsDetail v-if="isDetail" @close="closeDetail" :row="openRow"></earningsDetail>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import ruleDistribution from '@/views/serviceGovernor/serviceGovEarnings/components/ruleDistribution'
  import earningsDetail from '@/views/serviceGovernor/serviceGovEarnings/components/earningsDetail'
  import { web_getYearEarningsByDirUserId } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      pages,
      ruleDistribution,
      earningsDetail
    },
    data() {
      return {
        loading: false,
        tableData: [{
          year: '2022',
          mouth: '08',
          objNumber: '10',
          demandNumber: '20',
          supplyNumber: '30'
        }],
        page: 1,
        pageTotal: 0,
        year: '2022',
        openRow: {},
        isRules: false,
        isDetail: false,
      };
    },
    methods: {
      getYear() {
        let data = new Date()
        this.year = data.getFullYear().toString()
        this.web_getYearEarningsByDirUserId()
      },
      changePage(page) {
        this.page = page
        this.web_getYearEarningsByDirUserId()
        //
      },
      openRules() {
        this.isRules = true
      },
      closeRules() {
        this.isRules = false
      },
      openDetail(row) {
        this.openRow = row
        this.isDetail = true
      },
      closeDetail() {
        this.isDetail = false
      },
      async web_getYearEarningsByDirUserId() {
        this.loading = true
        await web_getYearEarningsByDirUserId({
          dirUserId: this.$store.state.user.adminId,
          year: this.year,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {
            if(res.OK == 'True') {

              console.log(res);
              if (res.Tag.length > 0) {
                let data = res.Tag
                this.tableData = data
              } else {
                this.tableData = []
              }
              this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
            }
          }
        })
      }
    },
    created() {
      this.getYear()

    }
  }
</script>

<style scoped lang="scss">
</style>
