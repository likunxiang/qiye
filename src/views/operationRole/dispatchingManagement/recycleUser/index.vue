<template>
  <div class="app-container">
    <div class="flex flex-center mb20 jsb">
      <el-row class="flex flex-center">
        <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal" @keyup.enter.native="search"
          style="width: 200px;margin-right: 20px;" @clear="search">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
        </el-input>
        <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
      </el-row>
      <el-row>
        <el-button type="primary" @click="openStandar">引导合格标准设置</el-button>
      </el-row>
    </div>

    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column prop="categoryName" label="供应品类名称" align="center">
      </el-table-column>
      <el-table-column prop="num" label="数量" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row)" type="text" size="small">详情</el-button>
          <el-button @click="putInLibrary(scope.row)" type="text" size="small">放入可认领库</el-button>
        </template>
      </el-table-column>
    </el-table>


    <pages @changePage="changePage" :page="page" :total="pageTotal" :showTotal="false"></pages>

    <detail v-if="isDetail" @close="closeDetail" :row="openRow"></detail>
    <standardSetting v-if="isStandar" @close="closeStandar"></standardSetting>
  </div>
</template>

<script>
  import detail from '@/views/operationRole/dispatchingManagement/recycleUser/components/detail.vue'
  import standardSetting from '@/views/operationRole/dispatchingManagement/recycleUser/components/standardSetting.vue'
  import pages from '@/views/components/common/pages.vue'
  import {
    getCerterion,
    getCategoryTakeBakeCount,
    unlockUserByCaGuid,
    unlockNoCatUserByCaGuid,
    getCategoryTakeBakeTotalCount_1_0_1
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  export default {
    name: "index",
    components: {
      detail,
      standardSetting,
      pages
    },
    data() {
      return {
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        page: 1,
        pageTotal: 0,
        tableData: [],
        isDetail: false,
        isStandar: false,
        openRow: {},
        loading: true,
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
        this.getCategoryTakeBakeCount()
        this.getCategoryTakeBakeTotalCount_1_0_1()
      },
      changePage(page) {
        this.page = page
        this.getCategoryTakeBakeCount()
      },
      openStandar() {
        this.isStandar = true
      },
      closeStandar() {
        this.isStandar = false
      },

      toDetail(row) {
        this.openRow = row
        this.isDetail = true
      },
      closeDetail() {
        this.isDetail = false
      },

      putInLibrary(row) {
        if (row.categoryGuid.length) {
          this.$confirm('确认将回收的【' + row.categoryName + '】的人力资源放入至可认领库', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.unlockUserByCaGuid(row.categoryGuid)
          }).catch(() => {

          });
        } else {
          this.unlockNoCatUserByCaGuid()
        }

      },

      async getCategoryTakeBakeCount() {
        this.loading = true
        await getCategoryTakeBakeCount({
          categoryName: this.searchVal,
          size: '20',
          page: this.page,
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
          } else {
            this.tableData = []
          }
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
            20 + 1
        })
      },
      // 放入详情
      async unlockUserByCaGuid(id) {
        await unlockUserByCaGuid({
          categoryGuid: id
        }).then(res => {
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getCategoryTakeBakeCount()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      },
      // 放入详情--无品类时
      async unlockNoCatUserByCaGuid() {
        await unlockNoCatUserByCaGuid().then(res => {
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getCategoryTakeBakeCount()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      },
      // 获取总量
      async getCategoryTakeBakeTotalCount_1_0_1() {
        await getCategoryTakeBakeTotalCount_1_0_1({
          categoryName: this.searchVal
        }).then(res => {
          console.log(res);
          this.pageTotal = parseInt(res.Tag[0].Table[0].total)
          this.searchResult = parseInt(res.Tag[0].Table[0].total)
        })
      }
    },
    created() {
      this.getCategoryTakeBakeCount()
      // this.getCategoryTakeBakeTotalCount_1_0_1()
    }
  };
</script>

<style lang="scss">
</style>
