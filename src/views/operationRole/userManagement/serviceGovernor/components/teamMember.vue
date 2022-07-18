<template>
  <el-dialog title="服务主管团队成员" :visible.sync="isOpen" width="800px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 60px;">
      <el-table :data="tableDataFirst" border class="mb20">
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      </el-table>
      <div class="flex flex-center mb20">
        <div class="title-bg1">服务主管团队成员</div>
        <div class="ml0">统计该主管公司授权管辖的服务专员名单</div>
      </div>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>
      <el-table :data="tableData" v-loading="loading" border>
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="location" label="所在地区" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {
    introducerGetRegisteredListByDirIdOfM
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
        this.introducerGetRegisteredListByDirIdOfM()
      },
      // 总的招募名单
      async introducerGetRegisteredListByDirIdOfM() {
        this.loading = true
        await introducerGetRegisteredListByDirIdOfM({
          phonenumber: this.searchVal,
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
