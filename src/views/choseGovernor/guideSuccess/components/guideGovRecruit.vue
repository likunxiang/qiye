<template>
  <el-dialog title="引导主管招募成果" :visible.sync="isOpen" width="800px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <el-table :data="tableDataFirst" border class="mb20">
        <el-table-column prop="nickName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="createTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      </el-table>
      <div class="flex flex-center mb20">
        <div class="title-bg">引导主管招募成果</div>
        <div class="ml0">统计该引导主管当前招募情况以及方便引导主管查阅当前招募名单的账号状态便于快速开账号</div>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="专员招募名单" name="first">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
          <el-table :data="tableData" border v-loading="loading">
            <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="createTime" label="添加日期" align="center"></el-table-column>
            <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="未开通账号" name="second">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
          <el-table :data="tableData" border v-loading="loading">
            <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="createTime" label="添加日期" align="center"></el-table-column>
            <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已开通账号" name="third">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
          <el-table :data="tableData" border v-loading="loading">
            <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="createTime" label="添加日期" align="center"></el-table-column>
            <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
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
  import { introducerGetList } from '@/api/choseManagerApi/choseManagerCom.js'
  import {
    introducerGetRegisteredList,
    introducerGetUnRegisteredList
  } from '@/api/choseGovernorApi/choseGovernorCom.js'
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
          this.introducerGetList()
        } else if (this.activeName == 'second'){
          this.introducerGetUnRegisteredList()
        } else {
          this.introducerGetRegisteredList()
        }
      },
      // 总的招募名单
      async introducerGetList() {
        this.loading = true
        await introducerGetList({
          phonenumber: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          source: '2',
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
      // 已开通
      async introducerGetRegisteredList() {
        this.loading = true
        await introducerGetRegisteredList({
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
      },
      // 未开通
      async introducerGetUnRegisteredList() {
        this.loading = true
        await introducerGetUnRegisteredList({
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
      },
    },
    created() {
      this.tableDataFirst.push(this.row)
      this.getData()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    width: 150px;
    padding: 10px 0;
    background-color: #D7D7D7;
  }
</style>
