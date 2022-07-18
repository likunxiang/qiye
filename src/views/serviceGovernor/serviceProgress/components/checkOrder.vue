<template>
  <el-dialog title="查看日采购验收通过订单数量详情" :visible.sync="isOpen" width="700px" @close="beforeClose" :append-to-body="true">
    <div style="padding-bottom: 60px;">
      <el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="年份">{{row.year}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="月份">{{row.month}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="日期">{{secRow.day}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="采购验收通过订单数量">{{secRow.demandAcceptOkNum}}
        </el-descriptions-item>
      </el-descriptions>
      <div class="title-bg1">服务专员列表</div>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="location" label="所在地点" align="center"></el-table-column>
        <el-table-column prop="demandAcceptOkNum" label="采购验收通过订单数量" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openAttDetail(scope.row)">查看服务专员服务详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <serviceAttDetail v-if="isDetail" @close="closeAttDetail" :row="row" :secRow="secRow" :thrRow="openRow" pageStatus="2"></serviceAttDetail>
  </el-dialog>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import serviceAttDetail from '@/views/serviceGovernor/serviceProgress/components/serviceAttDetail'
  import {
    statisticGetDayDeOrderOkNumByDirId
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      serviceAttDetail
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      },
      secRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        loading: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isDetail: false
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
        this.getData()
        //
      },
      changePage(page) {
        this.page = page
        this.getData()
        //
      },
      openAttDetail(row) {
        this.openRow = row
        this.isDetail = true
      },
      closeAttDetail() {
        this.isDetail = false
      },
      getData() {
        this.statisticGetDayDeOrderOkNumByDirId()
      },
      async statisticGetDayDeOrderOkNumByDirId() {
        this.loading = true
        statisticGetDayDeOrderOkNumByDirId({
          phonenumber: this.searchVal,
          day: this.row.year + '-' + this.row.month + '-' + this.secRow.day.replace('日',''),
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              this.tableData = []
            }
            this.searchResult = this.tableData.length
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      this.getData()
      console.log(this.secRow);
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg1 {
    background-color: #F2F2F2;
    padding: 10px;
    margin-bottom: 20px;
  }
</style>
