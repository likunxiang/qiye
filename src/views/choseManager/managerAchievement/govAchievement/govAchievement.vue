<template>
  <div class="app-container">
    <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'></searchCom>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="name1" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="date" label="账号开通日期" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="toOrgAchievement(scope.row)">查看机构选拔成果管理</el-button>
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
          name1: 'xuanbazhuanyuan1',
          date: '2022-04-06  15：16',
          name: '林都',
          nation: '中国大陆（+86）',
          tel: '18650767213'
        }],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
      };
    },
    methods: {
      toOrgAchievement(row) {
        this.openRow = row
        this.$router.push({
          path: "toOrgAchievement",
          query: row,
        });
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
      closeDetail() {
        this.isDetail = false
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
</style>
