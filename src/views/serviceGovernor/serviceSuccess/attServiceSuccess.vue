<template>
  <div class="app-container">
    <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="location" label="所在地点" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="toServiceGovService(scope.row)">服务专员服务成果</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <serviceAttService v-if="isService" @close="closeServiceGovService" :row="openRow"></serviceAttService>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import searchCom from '@/views/components/common/searchCom.vue'
  import serviceAttService from '@/views/serviceGovernor/serviceSuccess/components/serviceAttService'
  import {
    introducerGetRegisteredListByDirId
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom,
      serviceAttService
    },
    data() {
      return {
        loading: false,
        isService: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
      };
    },
    methods: {
      toServiceGovService(row) {
        this.openRow = row
        this.isService = true
      },
      closeServiceGovService() {
        this.isService = false
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.introducerGetRegisteredListByDirId()
        //
      },
      changePage(page) {
        this.page = page
        this.introducerGetRegisteredListByDirId()
        //
      },
      async introducerGetRegisteredListByDirId() {
        this.loading = true
        await introducerGetRegisteredListByDirId({
          phonenumber: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              this.tableData = []
            }
            this.searchResult = this.tableData.length
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      this.introducerGetRegisteredListByDirId()
    }
  }
</script>

<style scoped lang="scss">
</style>
