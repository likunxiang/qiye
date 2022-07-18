<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="createTime" label="领取日期" align="center"></el-table-column>
      <el-table-column prop="collectNum" label="领取数量" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openCollectDetail(scope.row)">查看领取详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <collectDetail v-if="isCollect" :row="openRow" @close="closeCollectDetail"></collectDetail>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import collectDetail from '@/views/choseAttache/guideJurisdictionMessage/components/collectDetail'
  import {
    getCollectList
  } from '@/api/choseAttacheApi/choseAttacheCom.js'
  export default {
    name: "index",
    components: {
      pages,
      collectDetail
    },
    data() {
      return {
        loading: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        isCollect: false,
      };
    },
    methods: {
      openCollectDetail(row) {
        this.openRow = row
        this.isCollect = true
      },
      closeCollectDetail() {
        this.isCollect = false
      },
      changePage(page) {
        this.page = page
        this.getCollectList()
        //
      },

      async getCollectList() {
        this.loading = true
        await getCollectList({
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
      this.getCollectList()
    }
  }
</script>

<style scoped lang="scss">
</style>
