<template>
  <div class="app-container">
    <!-- 字节标题 -->
    <chooseByteTitle @getByteGuid="getByteGuid" @toSearch="toSearch" @getLastGuid='getLastGuid'></chooseByteTitle>
    <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="getOrg(scope.row)">领取</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import chooseByteTitle from '@/views/choseManager/agencyInformation/components/chooseByteTitle.vue'
  import {
    getOrgInfoList,
    collectOrg,
  } from '@/api/choseAttacheApi/choseAttacheCom.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      chooseByteTitle
    },
    data() {
      return {
        loading: false,
        tableData: [],
        openRow: {},
        guidList: [], // 字节内容guid列表
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        lastOrgPathContentGuid: '0',  // 最大层级机构字节内容guid
      };
    },
    methods: {
      getLastGuid(data) {
        console.log('1112',data);
        this.lastOrgPathContentGuid = data
      },
      openDetail(row) {
        this.openRow = row
        this.isDetail = true
      },
      closeDetail() {
        this.isDetail = false
      },
      toSearch() {
        this.page = 1
        this.getOrgInfoList()
      },
      getByteGuid(data) {
        this.guidList = data
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getOrgInfoList()
        //
      },
      changePage(page) {
        this.page = page
        this.getOrgInfoList()
        //
      },
      getOrg(row) {
        collectOrg({
          orgNameGuid: row.orgNameGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if(res.OK == 'True') {
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '领取成功!'
              });
              this.getOrgInfoList()
            } else {
              this.$confirm(
                '<p align="left">【' + row.orgName + '】<br>已经被领取，请重新领取。</p>',
                '', {
                  confirmButtonText: '知道了',
                  dangerouslyUseHTMLString: true,
                  cancelButtonText: '取消',
                  showCancelButton: false,
                  type: 'warning',
                  center: true
                }).then(() => {

              }).catch(() => {});
            }
          }
        })
      },
      async getOrgInfoList() {
        this.loading = true
        await getOrgInfoList({
          orgName: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page,
          orgPathContent1: this.guidList[1] ? this.guidList[1] : '',
          orgPathContent2: this.guidList[2] ? this.guidList[2] : '',
          orgPathContent3: this.guidList[3] ? this.guidList[3] : '',
          orgPathContent4: this.guidList[4] ? this.guidList[4] : '',
          orgPathContent5: this.guidList[5] ? this.guidList[5] : '',
          orgPathContent6: this.guidList[6] ? this.guidList[6] : '',
          orgPathContent7: this.guidList[7] ? this.guidList[7] : '',
          orgPathContent8: this.guidList[8] ? this.guidList[8] : '',
          orgPathContent9: this.guidList[9] ? this.guidList[9] : '',
          orgPathContent10: this.guidList[10] ? this.guidList[10] : '',
          lastOrgPathContentGuid: this.lastOrgPathContentGuid
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
    },
    created() {
      this.getOrgInfoList()
    }
  }
</script>

<style scoped lang="scss">
</style>
