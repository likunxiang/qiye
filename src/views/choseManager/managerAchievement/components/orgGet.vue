<template>
  <el-dialog title="查看机构被领取数量" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="name" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="date" label="机构创建日期" align="center"></el-table-column>
      </el-table>
    </div>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </el-dialog>
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
        isOpen: true,
        loading: false,
        tableData: [{
          name: '福建省华夏信融数据服务有限公司',
          date: '2022-04-06  12：12'
        }],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
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
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
