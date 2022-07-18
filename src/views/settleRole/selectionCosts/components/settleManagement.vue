<template>
  <el-dialog title="结算管理" :visible.sync="isOpen" width="900px" @close="beforeClose">
    <el-row class="mb20 flex flex-center">
      <div class="bold label">年份</div>
      <div>{{row.year}}</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">计酬月份</div>
      <div>{{row.month}}</div>
    </el-row>
    <el-row class="mb20 flex">
      <div class="bold label">应结算人数</div>
      <div>{{ parseFloat(row.waitPayNum) + parseFloat(row.hadPayNum)}}</div>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未结算" name="first">
        <el-row class="flex flex-center mb10">
          <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchVal"
            @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
          </el-input>
          <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
        </el-row>
        <el-row style="padding-bottom: 60px;">
          <el-table :data="tableData" border height="50vh" v-loading="loading">
            <el-table-column prop="createTime" label="账号名称" align="center">
            </el-table-column>
            <el-table-column prop="categoryName" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="cattypeName" label="联系电话" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openSuccess(scope.row)">查看业绩信息</el-button>
                </el-row>
                <el-row>
                  <el-button type="text" @click="openSubmit(scope.row)">提交结算证明</el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="已结算" name="second">
        <el-row class="flex flex-center mb10">
          <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchVal"
            @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="clearSearch">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
          </el-input>
          <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
        </el-row>
        <el-row style="padding-bottom: 60px;">
          <el-table :data="tableData" border height="50vh" v-loading="loading">
            <el-table-column prop="settleTime" label="结算证明提交时间" align="center" width="100">
            </el-table-column>
            <el-table-column prop="createTime" label="账号名称" align="center" width="100">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" align="center" width="100">
            </el-table-column>
            <el-table-column prop="userPhonenumber" label="联系电话" align="center" width="120">
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="text" @click="openProve(scope.row)">查看结算证明</el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
    <settleProve :openRow='openRow' v-if="isProve" @close="closeProve"></settleProve>
    <submitSettle :openRow='openRow' v-if="isSubmit" @close="closeSubmit" @refresh=""></submitSettle>
    <successfulMessage :openRow='openRow' v-if="isSuccess" @close="closeSuccess"></successfulMessage>
  </el-dialog>
</template>

<script>
  import settleProve from '../components/settleProve.vue'
  import submitSettle from '../components/submitSettle.vue'
  import successfulMessage from '../components/successfulMessage.vue'
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      pages,
      settleProve, // 查看结算证明
      submitSettle, // 提交结算证明
      successfulMessage // 查看业绩信息
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        searchVal: '',
        searchResult: 0,
        isToSearch: false,
        activeName: "first",
        tableData: [],
        page: 1,
        pageTotal: 20,
        loading: true,
        openRow: {},
        isProve: false,
        isSubmit: false,
        isSuccess: false
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
      handleClick(tab, event) {
        console.log('tab', tab);
        let value = tab.paneName
        if (value === 'first') {
        } else {
        }
      },
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
          if (this.activeName === 'first') {
          } else {
          }
        } else {
          this.isToSearch = false
        }

      },
      openSuccess(row) {
        this.openRow = row
        this.isSuccess = true
      },
      closeSuccess() {
        this.isSuccess = false
      },
      openSubmit(row) {
        this.openRow = row
        this.isSubmit = true
      },
      closeSubmit() {
        this.isSubmit = false
      },
      openProve(row) {
        this.openRow = row
        this.isProve = true
      },
      closeProve() {
        this.isProve = false
      },
      changePage(data) {
        this.page = page
        if (this.activeName === 'first') {
        } else {
        }
      },
    },
    created() {
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    width: 120px;
  }

  .my-label {
    text-align: center !important;
    background-color: #1890FF;
  }
</style>
