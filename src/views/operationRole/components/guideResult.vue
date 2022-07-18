<template>
  <el-dialog title="引导成果" width="900px" :visible.sync="isOpen" append-to-body destroy-on-close @close="beforeClose">
    <div style="padding-bottom: 68px;position: relative;">
      <el-table :data="oldUserList" border style="width: 100%;margin-bottom: 20px;">
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
      </el-table>
      <el-row class="flex flex-center mb10">
        <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchVal" @keyup.enter.native="search"
          style="width: 200px;margin-right: 20px;" @clear="search">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
        </el-input>
        <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
      </el-row>
      <el-table :data="guideList" border style="width: 100%;margin-bottom: 40px;">
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="领取日期" align="center">
        </el-table-column>
        <el-table-column prop="outComeNum" label="数量" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="toDetail(scope.row)" type="text" size="small">用户间接成果详情</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
    </div>


    <el-dialog title="用户间接成果详情" width="900px" :visible.sync="isDetail" append-to-body destroy-on-close
      @close="beforeCloseDetail">
      <el-table :data="userResultList" border style="width: 100%;margin-bottom: 20px;">
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
      </el-table>
      <el-row style="padding-bottom: 40px;">
        <el-table :data="resultDetailList" border style="width: 100%;">
          <el-table-column prop="orderDate" label="统计月份" align="center">
          </el-table-column>
          <el-table-column prop="count" label="月份成果" align="center">
            <template
              slot-scope="scope">{{parseInt(scope.row.demandCount) + parseInt(scope.row.supplyCount)}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="toResultDetail(scope.row)" type="text" size="small">用户月份间接成果详情</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-dialog title="用户月份间接成果详情" width="900px" :visible.sync="isResultDetail" append-to-body destroy-on-close
        @close="beforeCloseResultDetail">
        <el-descriptions :column="1" border style="padding-bottom: 40px;">
          <el-descriptions-item label="统计月份" :labelStyle="{'text-align': 'center'}"
            :contentStyle="{'text-align': 'center'}">
            {{userOrderResult.month || '2021-10'}}
          </el-descriptions-item>
          <el-descriptions-item label="月份成果" :labelStyle="{'text-align': 'center'}"
            :contentStyle="{'text-align': 'center'}">
            {{userOrderResult.total || '60单'}}
          </el-descriptions-item>
          <el-descriptions-item label="采购成果" :labelStyle="{'text-align': 'center'}"
            :contentStyle="{'text-align': 'center'}">
            <el-button type="text" @click="openPurchaseDetail">{{userOrderResult.demandCount || '40单'}}</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="供应成果" :labelStyle="{'text-align': 'center'}"
            :contentStyle="{'text-align': 'center'}">
            <el-button type="text" @click="openSupplyDetail">{{userOrderResult.supplyCount || '20单'}}</el-button>
          </el-descriptions-item>
        </el-descriptions>
        <el-dialog title="用户月份采购成果详情" width="900px" :visible.sync="isPurchaseDetail" append-to-body destroy-on-close
          @close="beforeClosePurchaseDetail">
          <div style="width: 100%;padding-bottom: 40px;">
            <el-table :data="purchaseDetailList" border style="width: 100%;">
              <el-table-column prop="orderDate" label="订单日期" align="center">
              </el-table-column>
              <el-table-column prop="categoryName" label="品类名称" align="center">
              </el-table-column>
              <el-table-column prop="orderNo" label="采购编号" align="center">
              </el-table-column>
              <el-table-column label="采购情况" align="center">
                <template slot-scope="scope">
                  <el-row>
                    <el-button type="text" size="small" @click="openOrderDetail(scope.row,'demand')">采购订单详情</el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <orderDetail v-if="isOrder" @close="closeOrderDetail" :openRow="openRow" :orderType="orderType"></orderDetail>
        </el-dialog>
        <el-dialog title="用户月份供应成果详情" width="900px" :visible.sync="isSupplyDetail" append-to-body destroy-on-close
          @close="beforeCloseSupplyDetail">
          <div style="width: 100%;padding-bottom: 40px;">
            <el-table :data="supplyDetailList" border style="width: 100%;">
              <el-table-column prop="orderDate" label="订单日期" align="center">
              </el-table-column>
              <el-table-column prop="categoryName" label="品类名称" align="center">
              </el-table-column>
              <el-table-column prop="orderNo" label="供应编号" align="center">
              </el-table-column>
              <el-table-column label="供应情况" align="center">
                <template slot-scope="scope">
                  <el-row>
                    <el-button type="text" size="small" @click="openOrderDetail(scope.row,'supply')">供应订单详情</el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <orderDetail v-if="isOrder" @close="closeOrderDetail" :openRow="openRow" :orderType="orderType"></orderDetail>
        </el-dialog>
      </el-dialog>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import {
    getOutComeNumList,
    getOutComeCountByMonth,
    getUserOrderCountByDate,
    getOutComeDetail,
    getOrderStatisticMonth,
    getOrderDemandMonthList,
    getOrderSupplyMonthList
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  import pages from '@/views/components/common/pages.vue'
  import orderDetail from '@/views/components/common/orderDetail.vue'
  export default {
    name: "index",
    components: {
      pages,
      orderDetail
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
        isDetail: false,
        isResultDetail: false,
        isPurchaseDetail: false,
        isSupplyDetail: false,
        isOrder: false, // 供应订单信息
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        resultRow: [], // 用户间接引导对象
        oldUserList: [],
        guideList: [],
        resultDetailList: [],
        userOrderResult: {}, // 用户间接--用户间接
        purchaseDetailList: [],
        supplyDetailList: [],
        userResultList: [], // 老数据
        page: 1,
        pageTotal: 0,
        openRow: {},
        orderType: 'demand'
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
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getOutComeNumList()
      },
      changePage(page) {
        this.page = page
        this.getOutComeNumList()
      },
      openOrderDetail(row,type) {
        this.openRow = row
        this.orderType = type
        this.isOrder = true
      },
      closeOrderDetail() {
        this.isOrder = false
      },
      toDetail(row) {
        this.userResultList = []
        this.userResultList.push(row)
        this.isDetail = true
        // this.getOutComeCountByMonth() // 旧
        this.getOrderStatisticMonth() // 新
      },
      closeDetail() {
        this.isDetail = false
      },
      beforeCloseDetail() {
        this.closeDetail()
      },
      toResultDetail(row) {
        this.isResultDetail = true
        // this.getUserOrderCountByDate(row) // 旧
        let data = row
        data.month = row.orderDate
        data.total = parseInt(row.demandCount) + parseInt(row.supplyCount)
        this.userOrderResult = data
      },
      closeResultDetail() {
        this.isResultDetail = false
      },
      beforeCloseResultDetail() {
        this.closeResultDetail()
      },
      openPurchaseDetail(row) {
        this.isPurchaseDetail = true
        this.getOrderDemandMonthList()
        // getOutComeDetail({
        //   guidedUserId: this.userResultList[0].userId,
        //   type: 2, // 采购传2
        //   month: row.month
        // }).then(res => {
        //   console.log(res);
        //   this.purchaseDetailList = res.Tag[0].Table
        // }) // 旧
      },
      // 用户采购成果详情-月份详情
      async getOrderDemandMonthList() {
        await getOrderDemandMonthList({
          recordLogGuid:this.userResultList[0].recordLogGuid,
          month: this.userOrderResult.month
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.purchaseDetailList = data
          } else {
            this.purchaseDetailList = []
          }
        })
      },
      closePurchaseDetail() {
        this.isPurchaseDetail = false
      },
      beforeClosePurchaseDetail() {
        this.closePurchaseDetail()
      },
      openSupplyDetail() {
        this.isSupplyDetail = true
        // getOutComeDetail({
        //   guidedUserId: this.userResultList[0].userId,
        //   type: 3, // 采购传3
        //   month: row.month
        // }).then(res => {
        //   console.log(res);
        //   this.supplyDetailList = res.Tag[0].Table
        // })  // 旧
        this.getOrderSupplyMonthList()
      },
      // 用户供应成果详情-月份详情
      async getOrderSupplyMonthList() {
        await getOrderSupplyMonthList({
          userId: this.userResultList[0].guidedUserId,
          month: this.userOrderResult.month
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.supplyDetailList = data
          } else {
            this.supplyDetailList = []
          }
        })
      },
      closeSupplyDetail() {
        this.isSupplyDetail = false
      },
      beforeCloseSupplyDetail() {
        this.closeSupplyDetail()
      },
      // 引导结果
      async getOutComeNumList() {
        await getOutComeNumList({
          userId: this.row.userId,
          phonenumber: this.searchVal || '',
          page: this.page,
          size: '20'
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.guideList = res.Tag[0].Table
          } else {
            this.guideList = []
          }
          this.pageTotal = this.guideList.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
            20 + 1
          this.searchResult = this.guideList.length
        })
      },
      // 引导成果统计 -- 用户间接成果详情
      async getOutComeCountByMonth() {
        await getOutComeCountByMonth({
          recordLogGuid: this.userResultList[0].recordLogGuid,
          type: 1
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.resultDetailList = res.Tag[0].Table
          } else {
            this.resultDetailList = []
          }

        })
      },
      // 用户间接成果详情-月份统计
      async getOrderStatisticMonth() {
        await getOrderStatisticMonth({
          recordLogGuid: this.userResultList[0].recordLogGuid
        }).then(res => {
          console.log(res);

          if (res.Tag.length) {
            this.resultDetailList = res.Tag[0].Table
          } else {
            this.resultDetailList = []
          }
        })
      },
      // 引导成果统计 -- 用户月份间接成果详情 -- 用户月份间接成果详情
      async getUserOrderCountByDate(row) {
        console.log(row);
        await getUserOrderCountByDate({
          recordLogGuid: this.userResultList[0].recordLogGuid,
          date: row.month
        }).then(res => {
          console.log(res);

          if (res.Tag.length) {
            let data = res.Tag[0].Table[0]
            data.month = row.month
            data.total = row.count
            this.userOrderResult = data
          } else {
            this.userOrderResult = []
          }

        })
      }
      //
      // async getOutComeDetail(type) {
      //   await getOutComeDetail({
      //     guidedUserId: this.userResultList[0].id,
      //     type: type
      //   }).then(res => {
      //     console.log(res);
      //   })
      // }
    },
    mounted() {
      this.oldUserList.push(this.row)
      this.getOutComeNumList()
    }
  };
</script>

<style lang="scss" scoped>

</style>
