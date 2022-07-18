<template>
  <el-dialog title="服务主管服务成果" :visible.sync="isOpen" width="1000px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <el-table :data="tableDataFirst" border class="mb20">
        <el-table-column prop="nickName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      </el-table>
      <div class="flex flex-center mb20">
        <div class="title-bg1">服务主管服务成果</div>
        <div class="ml0">统计主管自账号开具以来的成果。</div>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="服务对象注册数量" name="first">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称或者联系电话'></searchCom>
          <el-table :data="tableData" border v-loading="loading">
            <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
            <el-table-column prop="registerTime" label="注册日期" align="center"></el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="采购验收通过订单数量" name="second">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称或者联系电话'></searchCom>
          <el-table :data="tableData" border v-loading="loading">
            <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
            <el-table-column prop="demandAcceptOkNum" label="采购验收通过订单数量" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="供应验收通过订单数量" name="third">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称或者联系电话'></searchCom>
          <el-table :data="tableData" border v-loading="loading">
            <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
            <el-table-column prop="supplyAcceptOkNum" label="供应验收通过订单数量" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {
    statisticGetAllBelongRegDetailListByDirUserId, // 注册
    statisticGetAllBeloDeOrderOkNumDetailListByDirUserId, // 采购
    statisticGetAllBeloSuOrderOkNumDetailListByDirUserId // 供应
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom,
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
        loading: false,
        tableData: [],
        tableDataFirst: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        activeName: 'first'
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
      handleClick(tab, event) {
        this.getData()
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getData()
        //
      },
      changePage(page) {
        this.page = page
        this.getData()
        //
      },
      getData() {
        if(this.activeName == 'first') {
          this.statisticGetAllBelongRegDetailListByDirUserId()
        } else if (this.activeName == 'second'){
          this.statisticGetAllBeloDeOrderOkNumDetailListByDirUserId()
        } else {
          this.statisticGetAllBeloSuOrderOkNumDetailListByDirUserId()
        }
      },
      // 注册
      async statisticGetAllBelongRegDetailListByDirUserId() {
        this.loading = true
        await statisticGetAllBelongRegDetailListByDirUserId({
          queryFields: this.searchVal,
          dirUserId: this.row.userId,
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
      },
      // 采购
      async statisticGetAllBeloSuOrderOkNumDetailListByDirUserId() {
        this.loading = true
        await statisticGetAllBeloSuOrderOkNumDetailListByDirUserId({
          queryFields: this.searchVal,
          dirUserId: this.row.userId,
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
      },
      // 供应
      async statisticGetAllBeloDeOrderOkNumDetailListByDirUserId() {
        this.loading = true
        await statisticGetAllBeloDeOrderOkNumDetailListByDirUserId({
          queryFields: this.searchVal,
          dirUserId: this.row.userId,
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
      },
    },
    created() {
      this.tableDataFirst.push(this.row)
      this.getData()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg1 {
    width: 150px;
    padding: 10px 0;
    background-color: #D7D7D7;
  }
</style>
