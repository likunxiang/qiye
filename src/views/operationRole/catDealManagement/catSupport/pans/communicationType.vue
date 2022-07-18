<template>
  <div style="min-height: 83vh;position: relative;padding-bottom: 60px;">
    <searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
      <el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
      <el-table-column prop="chatModeRulePubFlag" label="沟通规则是否发布" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.chatModeRulePubFlag == 2?'是':''}} -->
          是
        </template>
      </el-table-column>
      <el-table-column prop="publishFlag" label="供需需求信息是否发布" align="center">
        <template slot-scope="scope">
          {{scope.row.chatModePublishFlag == 2?'是':''}}
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
		searchVal: '',
        tableData: [],
		loading: true,
      };
    },
    methods: {
      changePage(page) {
        this.page = page
        this.getPublishFlagList()
      },
      searchData(data) {
        this.searchVal = data
		this.page = 1
        this.getPublishFlagList()
      },
      async getPublishFlagList() {
		this.loading = true
        await getPublishFlagList({
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
      this.getPublishFlagList()
    }
  }
</script>

<style scoped lang="scss">
</style>
