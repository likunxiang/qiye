<template>
  <div class="app-container">
    <serviceArea @getProvinces="getProvinces" @toSearch="toSearch"></serviceArea>
    <chooseByteTitle @getByteGuid="getByteGuid" @toSearch="toSearch" @getLastGuid='getLastGuid'></chooseByteTitle>
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="注册日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="toManage(scope.row)">归属专员管理</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <affiliationAttManage v-if="isManage" @close="closeManage" :row="openRow"></affiliationAttManage>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import chooseByteTitle from '@/views/serviceManager/agencyInformation/components/chooseByteTitle.vue'
  import serviceArea from '@/views/serviceManager/agencyInformation/components/serviceArea.vue'
  import affiliationAttManage from '@/views/operationRole/affiliationObjectManagement/serviceObject/components/affiliationAttManage.vue'
  import {
    namelistGetList
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      chooseByteTitle,
      affiliationAttManage,
      serviceArea
    },
    data() {
      return {
        loading: false,
        tableData: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        guidList: [], // 字节内容guid列表
        lastOrgPathContentGuid: '0',  // 最大层级机构字节内容guid
        openRow: {},
        cityCodeId: '0', //
        isManage: false,
      };
    },
    methods: {
      search(data) {
        this.searchVal = data
        this.page = 1
        this.namelistGetList()
        //
      },
      changePage(page) {
        this.page = page
        this.namelistGetList()
        //
      },
      toSearch() {
        this.page = 1
        this.namelistGetList()
      },
      // 获取选择的省市区
      getProvinces(data) {
        this.provincesObj = data
        console.log('provincesObj',this.provincesObj);
      },
      getByteGuid(data) {
        this.guidList = data
      },
      getLastGuid(data) {
        console.log('1112',data);
        this.lastOrgPathContentGuid = data
      },
      toManage(row) {
        this.isManage = true
        this.openRow = row
      },
      closeManage() {
        this.isManage = false
      },
      async namelistGetList() {
        this.loading = true
        await namelistGetList({
          cityCodeId: this.cityCodeId,
          size: '20',
          page: this.page,
          curUserId: this.$store.state.user.adminId,
          userPathGuid: this.lastOrgPathContentGuid,
          queryFields: this.searchVal
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
      },
    },
    created() {
      this.namelistGetList()
    }
  }
</script>

<style scoped lang="scss">
</style>
