<template>
  <div class="app-container">
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="nickName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/ 地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="delInfo(scope.row)">删除</el-button>
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
      pages,
    },
    data() {
      return {
        loading: false,
        tableData: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
      };
    },
    methods: {
      search(data) {
        this.searchVal = data
        this.page = 1
        //
      },
      changePage(page) {
        this.page = page
        //
      },
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
</style>