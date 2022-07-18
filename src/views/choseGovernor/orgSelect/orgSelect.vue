<template>
  <div class="app-container">
    <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="cattypeName" label="机构名称" align="center"></el-table-column>
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
  export default {
    name: "index",
    components: {
      searchCom,
      pages
    },
    data() {
      return {
        loading: false,
        tableData: [{
          cattypeName: '中国建设银行股份有限公司福建分公司'
        }],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
      };
    },
    methods: {
      openDetail(row) {
        this.openRow = row
        this.isDetail = true
      },
      closeDetail() {
        this.isDetail = false
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        //
      },
      changePage(page) {
        this.page = page
        //
      },
      getOrg(row) {
        if (true) {
          this.$message({
            type: 'success',
            message: '领取成功!'
          });
        } else {
          this.$confirm(
            '<p align="left">【机构名称】<br>已经被领取，请重新领取。</p>',
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
      },
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
</style>
