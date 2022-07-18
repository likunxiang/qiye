<template>
  <el-dialog title="采购成果（用户自己直接使用）" width="900px" :visible.sync="isOpen" append-to-body destroy-on-close
    @close="beforeClose">
    <el-table :data="tableData2" border style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="username" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="nation" label="区号" align="center">
      </el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center">
      </el-table-column>
    </el-table>
    <el-row style="padding-bottom: 40px;">
      <el-table v-loading="loading" :data="tableData3" border style="width: 100%;">
        <el-table-column prop="createTime" label="统计月份" align="center">
        </el-table-column>
        <el-table-column prop="orderNum" label="月份成果" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="toResultDetail(scope.row)" type="text" size="small">用户月份采购成果详情</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="用户月份采购成果详情" width="900px" :visible.sync="isResultDetail" append-to-body destroy-on-close
      @close="beforeCloseResultDetail">
      <div style="width: 100%;padding-bottom: 40px;">
        <el-table v-loading="loading" :data="supplyDetailList" border style="width: 100%;">
          <el-table-column prop="createTime" label="订单日期" align="center">
          </el-table-column>
          <el-table-column prop="categoryName" label="品类名称" align="center">
          </el-table-column>
          <el-table-column prop="orderNo" label="采购编号" align="center">
          </el-table-column>
          <el-table-column label="采购情况" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button type="text" size="small" @click="openMessage(scope.row)">采购账号信息</el-button>
              </el-row>
              <el-row>
                <el-button type="text" size="small" @click="openOrderDetail(scope.row)">采购订单详情</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <orderDetail v-if="isOrder" @close="closeOrderDetail" :openRow="openRow" orderType="demand"></orderDetail>
      <userMessage v-if="isUserMsg" @close="closeMessage" :row="openRow"></userMessage>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import orderDetail from '@/views/components/common/orderDetail.vue'
  import userMessage from '@/views/components/common/userMessage'
  import {
    getOutComeCountByMonth,
    getOrderDemandMonthList,
    getUserSelfDeOrderStatiList,
    getUserSelfDeOrderList
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  export default {
    name: "index",
    components: {
      orderDetail,
      userMessage
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
        isResultDetail: false,
        isUserMsg: false,
        isOrder: false,
        tableData2: [],
        tableData3: [],
        supplyDetailList: [],
        openRow: {},
        loading: true,
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.$emit('close')
      },
      submit() {
        this.$emit('close')
      },
      toResultDetail(row) {
        this.isResultDetail = true
        let month = row.createTime
        this.getUserSelfDeOrderList(month)
      },
      closeResultDetail() {
        this.isResultDetail = false
      },
      beforeCloseResultDetail() {
        this.closeResultDetail()
      },
      openMessage(row) {
        this.openRow = row
        this.isUserMsg = true
      },
      closeMessage() {
        this.isUserMsg = false
      },
      openOrderDetail(row) {
        this.openRow = row
        this.isOrder = true
      },
      closeOrderDetail() {
        this.isOrder = false
      },
      // 引导成果统计 -- 用户间接成果详情
      async getUserSelfDeOrderStatiList() {
        this.loading = true
        await getUserSelfDeOrderStatiList({
          userId: this.row.userId,
          size: '200',
          page: 1,
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            this.tableData3 = res.Tag[0].Table
          } else {
            this.tableData3 = []
          }
        })
      },
      async getUserSelfDeOrderList(month) {
        this.loading = true
        await getUserSelfDeOrderList({
          userId: this.row.userId,
          createTime: month
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            this.supplyDetailList = res.Tag[0].Table
          } else {
            this.supplyDetailList = []
          }
        })
      }
    },
    created() {
      this.tableData2.push(this.row)
      this.getUserSelfDeOrderStatiList()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }

  .my-label {
    width: 120px;
    font-weight: bold;
  }
</style>
