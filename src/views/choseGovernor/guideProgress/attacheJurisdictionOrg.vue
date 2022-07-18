<template>
  <div class="app-container">
    <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="cattypeName" label="权限机构数量" align="center">
        <template slot-scope="scope">
          {{parseInt(scope.row.noSignOrgNum) + parseInt(scope.row.signOrgNum)}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row)">查看权限机构数量详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import {
    getValidStaffList
  } from '@/api/choseGovernorApi/choseGovernorCom.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages
    },
    data() {
      return {
        loading: true,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
      };
    },
    methods: {
      openDetail(row) {
        this.openRow = row
        this.$router.push({
          path: "toOrgAchievement",
          query: row,
        });
      },
      closeDetail() {
        this.isDetail = false
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getValidStaffList()
      },
      changePage(page) {
        this.page = page
        this.getValidStaffList()
      },
      async getValidStaffList() {
        this.loading = true
        await getValidStaffList({
          phonenumber: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

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
      this.getValidStaffList()
    }
  }
</script>

<style scoped lang="scss">
</style>
