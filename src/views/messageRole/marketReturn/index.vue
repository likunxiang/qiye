<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未回复" name="first">
        <div class="flex flex-center mb20">
          <el-input placeholder="请输入你要找的内容" clearable v-model="searchVal" @keyup.enter.native="search"
            style="width: 200px;margin-right: 20px;" @clear="search">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
          </el-input>
          <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
        </div>
        <el-table v-loading="loading" :data="tableData" border style="width: 100%">
          <el-table-column prop="createTime" label="反馈日期" align="center">
            <template slot-scope="scope">
              <div class="red-round" v-if="scope.row.contentReadFlag == 0"></div>
              <div>{{scope.row.createTime}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="content" :show-overflow-tooltip="true" label="内容" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="toReturn(scope.row)" type="text" size="small">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已回复" name="second">
        <el-table v-loading="loading" :data="tableData" border style="width: 100%">
          <el-table-column prop="replyTime" label="回复日期" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="反馈日期" align="center">
          </el-table-column>
          <el-table-column prop="content" :show-overflow-tooltip="true" label="内容" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="toReturnDetail(scope.row)" type="text" size="small">查看回复详情</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <detail v-if="isDetail" :openRow="openRow" @close="closeDetail"></detail>
    <returnPop v-if="isReturn" :openRow="openRow" @close="closeReturn" @refresh="getList"></returnPop>
    <returnDetail v-if="isDetailReturn" :openRow="openRow" @close="closeReturnDetail"></returnDetail>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import detail from '@/views/messageRole/marketReturn/components/detail.vue'
  import returnPop from '@/views/messageRole/marketReturn/components/return.vue'
  import returnDetail from '@/views/messageRole/marketReturn/components/returnDetail.vue'
  import {
    getList,
    getDetail
  } from '@/api/messageRoleApi/marketReturn.js'
  export default {
    name: "index",
    components: {
      pages,
      detail,
      returnPop,
      returnDetail
    },
    data() {
      return {
        isDetail: false,
        isReturn: false,
        isDetailReturn: false,
        activeName: 'first',
        tableData: [],
        openRow: {}, // 选中的对象
        page: 1,
        pageTotal: 0,
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
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
        this.getList()
      },
      handleClick(tab, event) {
        this.getList()
      },
      toDetail(row) {
        this.isDetail = true
        this.openRow = row
      },
      closeDetail() {
        this.isDetail = false
      },
      toReturn(row) {
        this.isReturn = true
        this.openRow = row
      },
      closeReturn() {
        this.isReturn = false
      },
      toReturnDetail(row) {
        this.isDetailReturn = true
        this.openRow = row
      },
      closeReturnDetail() {
        this.isDetailReturn = false
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      async getList() {
        this.loading = true
        await getList({
          replyFlag: this.activeName === 'first' ? 0 : 1,
          content: this.searchVal,
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
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  .red-round {
    position: absolute;
    top: 20px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
  }
</style>
