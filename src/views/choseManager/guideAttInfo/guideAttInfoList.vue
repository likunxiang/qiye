<template>
  <div class="app-container">
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="createTime" label="添加日期" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="sourceStr" label="来源" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <delTips v-if="isTips" :row="openRow" @close="closeDelTips"></delTips>
  </div>
</template>

<script>

  import {
    introducerGetList,
    delIntroducer
  } from '@/api/choseManagerApi/choseManagerCom.js'
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import delTips from '@/views/choseManager/guideAttInfo/components/delTips'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      delTips
    },
    data() {
      return {
        loading: false,
        tableData: [{
          cattypeName: '111'
        }],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isTips: false,
      };
    },
    methods: {
      search(data) {
        this.searchVal = data
        this.page = 1
        this.introducerGetList()
        //
      },
      changePage(page) {
        this.page = page
        this.introducerGetList()
        //
      },
      delInfo(row) {
        if(row.userId) {
          // 已经开通了
          this.openRow = row
          this.isTips = true
        } else {
          // 未开通，走删除
          this.delIntroducer(row.introducerGuid)
        }
      },
      closeDelTips() {
        this.isTips = false
      },
      async introducerGetList() {
        this.loading = true
        await introducerGetList({
          phonenumber: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          source: '',
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
      async delIntroducer(id) {
        await delIntroducer({
          introducerGuid: id,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {
          
            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.introducerGetList()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }
          
          }
        })
      }
    },
    created() {
      this.introducerGetList()
    }
  }
</script>

<style scoped lang="scss">
</style>
