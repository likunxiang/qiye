<template>
  <el-dialog title="查看服务专员服务详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 60px;">
      <el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="年份">{{row.year}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="月份">{{row.month}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="日期">{{secRow.day}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="账号名称">{{thrRow.userName}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="账号开通日期">{{thrRow.registerTime}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="姓名">{{thrRow.nickName}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="国家/区号">{{thrRow.nation}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="联系电话">{{thrRow.phonenumber}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="所在地点">{{thrRow.location}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="新增注册对象数量" v-if="pageStatus == '1'">{{thrRow.registerNum}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="采购验收通过订单数量" v-if="pageStatus == '2'">{{thrRow.demandAcceptOkNum}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="供应验收通过订单数量" v-if="pageStatus == '3'">{{thrRow.supplyAcceptOkNum}}
        </el-descriptions-item>
      </el-descriptions>
      <el-divider></el-divider>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构或者联系电话' v-if="pageStatus!='1'"></searchCom>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册日期" align="center" v-if="pageStatus == '1'"></el-table-column>
        <el-table-column prop="nickName" label="采购需求成交订单数量" align="center" v-if="pageStatus == '2'">
          <template slot-scope="scope">
            <el-button style="text-decoration: underline;" type="text" @click="openOrderList(scope.row)">{{scope.row.demandAcceptOkNum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="供应验收通过订单数量" align="center" v-if="pageStatus == '3'">
          <template slot-scope="scope">
            <el-button style="text-decoration: underline;" type="text" @click="openOrderList(scope.row)">{{scope.row.supplyAcceptOkNum}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
      <orderList v-if="isOrderList" @close="closeOrderList" :row="row" :secRow="secRow" :thrRow="openRow" :fourRow="openRow" :pageStatus="pageStatus"></orderList>
    </div>
  </el-dialog>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import orderList from '@/views/serviceGovernor/serviceProgress/components/orderList'
  import {
    statisticGetDayRegDetailListByIntroUserId,
    statisticGetDayDeOrderOkDetailListByIntroUserId,
    statisticGetDaySuOrderOkDetailListByIntroUserId
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom,
      orderList
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
      },
      thrRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      pageStatus: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        isOpen: true,
        loading: false,
        tableData: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isOrderList: false,
        openRow: {}
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
      changePage(page) {
        this.page = page
        this.getData()
        //
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getData()
        //
      },
      openOrderList(row) {
        this.openRow = row
        this.isOrderList = true
      },
      closeOrderList() {
        this.isOrderList = false
      },
      getData() {
        let pageStatus = this.pageStatus
        console.log(pageStatus);
        if (pageStatus == '1') {
          this.statisticGetDayRegDetailListByIntroUserId()
        } else if (pageStatus == '2') {
          this.statisticGetDayDeOrderOkDetailListByIntroUserId()
        } else {
          this.statisticGetDaySuOrderOkDetailListByIntroUserId()
        }

      },
      // 注册数量
      async statisticGetDayRegDetailListByIntroUserId() {
        this.loading = true
        await statisticGetDayRegDetailListByIntroUserId({
          queryFields: this.searchVal,
          day: this.row.year + '-' + this.row.month + '-' + this.secRow.day.replace('日',''),
          introducerUserId: this.thrRow.introducerUserId,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {

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
      },
      // 采购数量
      async statisticGetDayDeOrderOkDetailListByIntroUserId() {
        this.loading = true
        await statisticGetDayDeOrderOkDetailListByIntroUserId({
          queryFields: this.searchVal,
          day: this.row.year + '-' + this.row.month + '-' + this.secRow.day.replace('日',''),
          introducerUserId: this.thrRow.introducerUserId,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {

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
      },
      // 供应数量
      async statisticGetDaySuOrderOkDetailListByIntroUserId() {
        this.loading = true
        await statisticGetDaySuOrderOkDetailListByIntroUserId({
          queryFields: this.searchVal,
          day: this.row.year + '-' + this.row.month + '-' + this.secRow.day.replace('日',''),
          introducerUserId: this.thrRow.introducerUserId,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {

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
    }
  };
</script>

<style lang="scss" scoped>
</style>
