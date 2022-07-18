<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="createTime" label="回收日期" align="center"></el-table-column>
      <el-table-column prop="takebackNum" label="回收数量" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openRecycleDetail(scope.row)">查看回收详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <recycleDetail v-if="isRecycle" :row="openRow" @close="closeRecycleDetail"></recycleDetail>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import recycleDetail from '@/views/choseAttache/guideJurisdictionMessage/components/recycleDetail'
  import {
    getTakebackList
  } from '@/api/choseAttacheApi/choseAttacheCom.js'
  export default {
    name: "index",
    components: {
      pages,
      recycleDetail
    },
    data() {
      return {
        loading: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        isRecycle: false,
      };
    },
    methods: {
      openRecycleDetail(row) {
        this.openRow = row
        this.isRecycle = true
      },
      closeRecycleDetail() {
        this.isRecycle = false
      },
      changePage(page) {
        this.page = page
        this.getTakebackList()
        //
      },

      async getTakebackList() {
        this.loading = true
        await getTakebackList({
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
      }
    },
    created() {
      this.getTakebackList()
    }
  }
</script>

<style scoped lang="scss">
</style>
