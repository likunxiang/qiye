<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="toGuideGovRecruit(scope.row)">引导主管招募成果</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <guideGovRecruit v-if="isRecruit" @close="closeGuideGovRecruit" :row="openRow"></guideGovRecruit>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import guideGovRecruit from '@/views/choseGovernor/guideSuccess/components/guideGovRecruit'
  import {
    getUserDetail
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    components: {
      pages,
      guideGovRecruit
    },
    data() {
      return {
        loading: false,
        isRecruit: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
      };
    },
    methods: {
      toGuideGovRecruit(row) {
        this.openRow = row
        this.isRecruit = true
      },
      closeGuideGovRecruit() {
        this.isRecruit = false
      },
      changePage(page) {
        this.page = page
        //
      },
      async getUserDetail() {
        this.loading = true
        getUserDetail({
          userId: this.$store.state.user.adminId,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);
          this.loading = false
          let data = res.Tag[0].Table[0]
          this.userInfo = data
          this.tableData.push(this.userInfo)
        })
      }
    },
    created() {
      this.getUserDetail()
    }
  }
</script>

<style scoped lang="scss">
</style>
