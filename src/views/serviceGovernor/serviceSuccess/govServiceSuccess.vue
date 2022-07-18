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
          <el-row>
            <el-button type="text" @click="toServiceGovRecruit(scope.row)">服务主管招募成果</el-button>
          </el-row>
          <el-row>
            <el-button type="text" @click="toServiceGovService(scope.row)">服务主管服务成果</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <serviceGovRecruit v-if="isRecruit" @close="closeServiceGovRecruit" :row="openRow"></serviceGovRecruit>
    <serviceGovService v-if="isService" @close="closeServiceGovService" :row="openRow"></serviceGovService>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import serviceGovRecruit from '@/views/serviceGovernor/serviceSuccess/components/serviceGovRecruit'
  import serviceGovService from '@/views/serviceGovernor/serviceSuccess/components/serviceGovService'
  import {
    getUserDetail
  } from '@/api/choseManagerApi/choseManagerCom.js'
  import {
    getDetailByIdAndRK
  } from '@/api/commonApi.js'

  export default {
    name: "index",
    components: {
      pages,
      serviceGovRecruit,
      serviceGovService
    },
    data() {
      return {
        loading: false,
        isRecruit: false,
        isService: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
      };
    },
    methods: {
      toServiceGovRecruit(row) {
        this.openRow = row
        this.isRecruit = true
      },
      closeServiceGovRecruit() {
        this.isRecruit = false
      },
      toServiceGovService(row) {
        this.openRow = row
        this.isService = true
      },
      closeServiceGovService() {
        this.isService = false
      },
      changePage(page) {
        this.page = page
        //
      },
      async getDetailByIdAndRK() {
        this.loading = true
        getDetailByIdAndRK({
          roleKey: 'serveDirectorRole',
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);
          this.loading = false
          if(res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.userInfo = data
            this.tableData.push(this.userInfo)
          } else {
            this.tableData = []
          }
        })
      }
    },
    created() {
      this.getDetailByIdAndRK()
    }
  }
</script>

<style scoped lang="scss">
</style>
