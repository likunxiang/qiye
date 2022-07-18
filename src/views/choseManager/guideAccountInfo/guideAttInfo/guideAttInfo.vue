<template>
  <div class="app-container">
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
      <div class="mb20">
        <el-button type="primary" @click="openNew">新建引导专员</el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updateInfo(scope.row)">修改</el-button>
          <el-button type="text" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <newAtt v-if="isNew" @close="closeNew" :pageStatus="pageStatus" :row="openRow" @refresh="selectMGgetListByRK"></newAtt>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import newAtt from '@/views/choseManager/guideAccountInfo/guideAttInfo/components/newAtt'
  import pages from '@/views/components/common/pages'
  import {
    selectMGgetListByRK,
    selectDeStaff
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      newAtt
    },
    data() {
      return {
        loading: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isNew: false,
        pageStatus: '1'
      };
    },
    methods: {
      search(data) {
        this.searchVal = data
        this.page = 1
        this.selectMGgetListByRK()
        //
      },
      changePage(page) {
        this.page = page
        this.selectMGgetListByRK()
        //
      },
      openNew() {
        this.isNew = true
        this.pageStatus = '1'
      },
      updateInfo(row) {
        this.isNew = true
        this.openRow = row
        this.pageStatus = '2'
      },
      closeNew() {
        this.isNew = false
      },
      delInfo(row) {
        this.$confirm('<p align="left">账号名称' + row.userName +' </p><p align="left">删除等于不要这个引导主管，其添加的引导专员照样存在。</p><p align="left">确认删除？</p>', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除
          this.selectDeStaff(row.userId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      async selectMGgetListByRK() {
        this.loading = true
        await selectMGgetListByRK({
          phonenumber: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          deptId: this.$store.state.user.deptId,
          roleKey: 'selectStaffRole',
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
      async selectDeStaff(id) {
        await selectDeStaff({
          userId: id,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.selectMGgetListByRK()
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
      this.selectMGgetListByRK()
    }
  }
</script>

<style scoped lang="scss">
</style>
