<template>
  <div class="app-container">
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
      <div>
        <el-button type="primary" @click="openNew">新建账号</el-button>
      </div>
    </div>
    <el-table :data="tableList" border v-loading="loading">
      <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="toManage(scope.row)">账号信息管理</el-button>
          </el-row>
          <!-- <el-row>
            <el-button type="text" @click="toSuccess(scope.row)">引导经理成果</el-button>
          </el-row> -->
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <newGov v-if="isNew" @close="closeNew" :pageStatus="pageStatus" :row="openRow" @refresh="getList"></newGov>
    <accountMessage v-if="isManage" @close="closeManage" :row="openRow" @refresh="getList"></accountMessage>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import newGov from '@/views/operationRole/userManagement/guideManager/components/newGov'
  import accountMessage from '@/views/operationRole/userManagement/guideManager/components/accountMessage'
  import {
    getRoleUserList
  } from "@/api/operationRoleApi/userManagement.js"
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      newGov,
      accountMessage,
    },
    data() {
      return {
        loading: false,
        tableList: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isNew: false,
        pageStatus: '1',
        openRow: {},
        isManage: false,
        isSuccess: false,
      };
    },
    methods: {
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getList()
        //
      },
      changePage(page) {
        this.page = page
        this.getList()
        //
      },
      openNew() {
        this.isNew = true
      },
      closeNew() {
        this.isNew = false
      },
      toManage(row) {
        this.isManage = true
        this.openRow = row
      },
      closeManage() {
        this.isManage = false
      },
      toSuccess(row) {
        this.isSuccess = true
        this.openRow = row
      },
      closeSuccess() {
        this.isSuccess = false
      },
      getList() {
        this.getRoleUserList()
      },
      async getRoleUserList() {
        this.loading = true
        await getRoleUserList({
          page: this.page,
          size: '20',
          roleKey: 'selectManagerRole',
          phonenumber: this.searchVal,
        }).then((res) => {
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableList = data
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableList = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
</style>
