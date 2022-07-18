<template>
  <div class="app-container">
    <div class="flex flex-center mb20">
      <el-input placeholder="请输入品类名称" clearable v-model="searchVal"
        @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
		<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类名称" align="center">
      </el-table-column>
      <el-table-column prop="cattypeName" label="品类类型" align="center">
      </el-table-column>
      <el-table-column prop="supplyTypeName" label="申请数量" align="center">
        <template slot-scope="scope">
          {{parseFloat(scope.row.approveFlag0) + parseFloat(scope.row.approveFlag1)}}
        </template>
      </el-table-column>
      <el-table-column prop="approveFlag0" label="未审批" align="center">
      </el-table-column>
      <el-table-column prop="approveFlag1" label="审批" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="toManage(scope.row)" type="text" size="small">采购资质管理</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
  </div>
</template>

<script>
  import {
    getApproveList
  } from '@/api/operationRoleApi/catDealManagement.js'
  import pages from '@/views/components/common/pages.vue'
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
        if(this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
		this.page = 1
        this.getApproveList()
      },
      toManage(row) {
        let obj = row
        this.$router.push({
          path: "purchaseManage",
          query: obj,
        });
      },
      changePage(page) {
        this.page = page
        this.getApproveList()
      },
      // 获取列表数据
      async getApproveList() {
		this.loading = true
        await getApproveList({
          categoryName: this.searchVal,
          page: this.page,
          size: '20'
        }).then(res => {
		  this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      }
    },
    created() {
      this.getApproveList()
    }
  }
</script>

<style scoped lang="scss">
</style>
