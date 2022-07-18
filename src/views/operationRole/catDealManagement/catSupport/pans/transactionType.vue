<template>
  <div style="min-height: 83vh;position: relative;padding-bottom: 60px;">
    <searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
    <el-table :data="tableData" border v-loading="loading" >
      <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
      <el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
      <el-table-column prop="cattypeName" label="交易规则是否发布" align="center">
        <template slot-scope="scope">
          {{scope.row.dealRulePublishFlag == 1?'是':''}}
        </template>
      </el-table-column>
      <el-table-column prop="cattypeName" label="供需需求信息是否发布" align="center">
        <template slot-scope="scope">
          {{scope.row.dealModePublishFlag == 2?'是':''}}
        </template>
      </el-table-column>
      <el-table-column prop="cattypeName" label="供应报价信息是否发布" align="center">
        <template slot-scope="scope">
          {{scope.row.supplyPricePublishFlag == 2?'是':''}}
        </template>
      </el-table-column>
      <el-table-column prop="cattypeName" label="是否已经有服务定价信息" align="center">
        <template slot-scope="scope">
          {{scope.row.hasServiceFee == 1?'是':''}}
        </template>
      </el-table-column>
      <el-table-column prop="cattypeName" label="是否已经有验收期限信息" align="center">
        <template slot-scope="scope">
          {{scope.row.hasDeadline == 1?'是':''}}
        </template>
      </el-table-column>
    </el-table>
    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {
    getPublishFlagList,
    getPublishStatisticList
  } from '@/api/operationRoleApi/catDealManagement.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom
    },
    data() {
      return {
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        tableData: [],
		searchVal: '',
		loading: true,
      };
    },
    methods: {
      changePage(page) {
        this.page = page
        this.getPublishStatisticList()
      },
      searchData(data) {
        this.searchVal = data
		this.page = 1
        this.getPublishStatisticList()
      },
      async getPublishStatisticList() {
		this.loading = true
        await getPublishStatisticList({
          categoryName: this.searchVal || '',
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
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      }
    },
    created() {
      this.getPublishStatisticList()
    }
  }
</script>

<style scoped lang="scss">
</style>
