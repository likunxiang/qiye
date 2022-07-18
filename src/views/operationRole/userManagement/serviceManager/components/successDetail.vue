<template>
  <el-dialog title="  " :visible.sync="isOpen" width="1000px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 60px;padding-top: 20px; ">
      <el-table :data="tableDataFirst" border class="mb20">
        <el-table-column prop="nickName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      </el-table>
      <div class="title-bg1 mb20">服务经理服务成果</div>
      <serviceArea @getProvinces="getProvinces" @toSearch="toSearch"></serviceArea>
      <chooseByteTitle @getByteGuid="getByteGuid" @toSearch="toSearch" @getLastGuid='getLastGuid'></chooseByteTitle>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import chooseByteTitle from '@/views/serviceManager/agencyInformation/components/chooseByteTitle.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import serviceArea from '@/views/serviceManager/agencyInformation/components/serviceArea.vue'
  import {
    namelistGetList
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  export default {
    name: "index",
    components: {
      chooseByteTitle,
      serviceArea,
      searchCom,
      pages
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
        tableDataFirst: [],
        tableData: [],
        loading: false,
        guidList: [],
        lastOrgPathContentGuid: '0', // 最大层级机构字节内容guid
        cityCodeId: '0', //
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
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
      // 获取选择的省市区
      getProvinces(data) {
        this.provincesObj = data
        console.log('provincesObj',this.provincesObj);
      },
      getByteGuid(data) {
        this.guidList = data
      },
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
      getLastGuid(data) {
        console.log('1112', data);
        this.lastOrgPathContentGuid = data
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
      this.tableDataFirst.push(this.row)
      this.namelistGetList()
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
