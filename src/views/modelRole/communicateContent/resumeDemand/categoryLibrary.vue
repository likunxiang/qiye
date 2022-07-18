<template>
  <div class="app-container">
    <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal" @keyup.enter.native="search"
        style="width: 200px;margin-right: 20px;" @clear="search">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类名称" align="center">
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import {
    getNameListOfType1
  } from '@/api/modelRoleApi/communicateContent.js'
  export default {
    name: "index",
    components: {
      pages
    },
    data() {
      return {
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        tableData: [],
        page: 1,
        pageTotal: 0,
      };
    },
    methods: {
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getNameListOfType1()
      },
      changePage(page) {
        this.page = page
        this.getNameListOfType1()
      },
      async getNameListOfType1() {
        await getNameListOfType1({
          page: this.page,
          size: '20',
          categoryName: this.searchVal
        }).then(res => {
          let data = []
          if (res.Tag.length) {
            data = res.Tag[0].Table
          }
          this.tableData = data
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          this.searchResult = this.tableData.length
        })
      }
    },
    created() {
      this.getNameListOfType1()
    }
  }
</script>

<style scoped lang="scss">
</style>
