<template>
  <div class="app-container">
    <div>
      <el-descriptions :colon="false" class="margin-top" :column="1">
        <el-descriptions-item label-class-name="my-label" label="账号名称">2020</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="账号开通日期">12</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="姓名">20</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="国家/区号">10</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="联系电话">200</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="未合作数量">200</el-descriptions-item>
      </el-descriptions>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="flex jsb flex-center">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构'></searchCom>
        <div>
          <el-button type="primary" @click="recycleOrg">收回机构</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="cattypeName" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="cattypeName" label="领取日期" align="center"></el-table-column>
        <el-table-column prop="cattypeName" label="合同终止日期" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        loading: true,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
      };
    },
    methods: {
      recycleOrg() {
        // 回收机构
      },
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
</style>
