<template>
  <div class="app-container">
    <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要找的库名称" clearable v-model="searchVal"
        @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
		<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 500px">
      <el-table-column prop="name" label="库名称" align="center">
      </el-table-column>
    </el-table>

    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import {
    getFixedData
  } from '@/api/modelRoleApi/immobilizationContent.js'
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
		loading: true
      };
    },
    methods: {
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.getFixedData()
      },
      changePage(page) {
        this.page = page
        this.getFixedData()
      },
      async getFixedData() {
		this.loading = true
        await getFixedData({
          type: 3,
          name: this.searchVal,
          page: this.page,
          size: '20',
          bizType: ''
        }).then(res => {
		  this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
          this.searchResult = this.tableData.length
        })
      }
    },
    mounted() {
      this.getFixedData()
    }
  };
</script>

<style lang="scss">
  .pageBox {
    height: 48px;

    .pageMain {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }

  }
</style>
