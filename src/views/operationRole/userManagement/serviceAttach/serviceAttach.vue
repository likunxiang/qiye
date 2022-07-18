<template>
  <div class="app-container">
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="location" label="所在地点" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="toAffiliation(scope.row)">归属主管管理</el-button>
          </el-row>
          <el-row>
            <el-button type="text" @click="toStatistics(scope.row)">权限对象统计</el-button>
          </el-row>
          <el-row>
            <el-button type="text" @click="toResult(scope.row)">服务专员成果</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <affiliationManage v-if="isAffiliation" :row="openRow" @close="closeAffiliation" @refresh="introducerGetListOfDir"></affiliationManage>
    <jurisdictionObjStatistics v-if="isStatistics" @close="closeStatistics" :row="openRow"></jurisdictionObjStatistics>
    <serviceResults v-if="isResult" @close="closeResult" :row="openRow"></serviceResults>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import affiliationManage from '@/views/operationRole/userManagement/serviceAttach/components/affiliationManage'
  import jurisdictionObjStatistics from '@/views/operationRole/userManagement/serviceAttach/components/jurisdictionObjStatistics'
  import serviceResults from '@/views/operationRole/userManagement/serviceAttach/components/serviceResults'
  import {
    introducerGetListOfDir
  } from "@/api/operationRoleApi/userManagement.js"
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      affiliationManage,
      jurisdictionObjStatistics,
      serviceResults
    },
    data() {
      return {
        loading: false,
        tableData: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        openRow: {},
        isAffiliation: false,
        isStatistics: false,
        isResult: false,
      };
    },
    methods: {
      search(data) {
        this.searchVal = data
        this.page = 1
        this.introducerGetListOfDir()
        //
      },
      changePage(page) {
        this.page = page
        this.introducerGetListOfDir()
        //
      },
      toAffiliation(row) {
        this.isAffiliation = true
        this.openRow = row
      },
      closeAffiliation() {
        this.isAffiliation = false
      },
      toStatistics(row) {
        this.isStatistics = true
        this.openRow = row
      },
      closeStatistics() {
        this.isStatistics = false
      },
      toResult(row) {
        this.isResult = true
        this.openRow = row
      },
      closeResult() {
        this.isResult = false
      },
      async introducerGetListOfDir() {
        this.loading = true
        await introducerGetListOfDir({
          curUserId: this.$store.state.user.adminId,
          phonenumber: this.searchVal,
          page: this.page,
          size: '20',
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            if (res.Tag.length) {
              let data = res.Tag[0].Table
              this.tableData = data
              this.pageTotal = (this.page - 1) * 20 + 21
            } else {
              this.tableData = []
              this.pageTotal = (this.page - 1) * 20 + 1
            }
            this.searchResult = this.tableData.length
          }
        })
      }
    },
    created() {
      this.introducerGetListOfDir()
    }
  }
</script>

<style scoped lang="scss">
</style>
