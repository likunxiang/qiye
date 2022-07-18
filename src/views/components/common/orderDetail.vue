<template>
  <el-dialog width="900px" :visible.sync="isOrderDetail" append-to-body destroy-on-close
    @close="beforeCloseOrderDetail">
    <template slot="title">
      <div class="flex jsb" style="padding-right: 30px;">
        <div>订单详情</div>
        <div @click="openLogistics" v-if="false">查看物流进度</div>
      </div>
    </template>
    <div class="flex flex-center jsb mb10">
      <div style="width: 100%;" class="flex flex-center jsb">
        <div class="flex">
          <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + orderDetailObj.categoryImg" :fit="fit"></el-image>
          <div>
            <div>{{orderDetailObj.categoryName}}</div>
            <div>{{orderDetailObj.categoryAlias}}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-center" style="flex-shrink: 0;" @click="openPurchaseDetail">
        <div>采购详情</div>
        <div class="el-icon-arrow-right" style="font-size: 26px;"></div>
      </div>
    </div>
    <div class="flex jsb">
      <div>采购编号：{{orderDetailObj.orderNo}}</div>
      <div>日期：{{orderDetailObj.orderCreateDate}}</div>
    </div>
    <div class="title-bg mb10 mt10">结算信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label" label="应收金额：">{{orderDetailObj.shouldPayFee}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="优惠金额：">{{orderDetailObj.discountFee}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="实收金额：">{{orderDetailObj.payFee}}</el-descriptions-item>
    </el-descriptions>
    <div class="title-bg mb10 mt10">开票信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label" label="发票类型">{{orderDetailObj.invoiceType==''?'':orderDetailObj.invoiceType=='1'?'普通发票':'增值税专用发票'}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="发票抬头">{{orderDetailObj.invoiceTitle}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="发票单位">{{orderDetailObj.invoiceCompany}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="纳税识别号">{{orderDetailObj.invoiceTaxNumber}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="地址、电话">{{orderDetailObj.invoiceAddrPhone}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="开户行及账号">{{orderDetailObj.invoiceBankAccount}}</el-descriptions-item>
    </el-descriptions>
    <!-- 采购详情 -->
    <el-dialog title="采购详情" width="900px" :visible.sync="isPurchaseDetail" append-to-body destroy-on-close
      @close="beforeClosePurchaseDetail">
      <div class="flex mb10">
        <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + orderTypeDetail.categoryImg" :fit="fit"></el-image>
        <div>
          <div>{{orderTypeDetail.categoryName}}</div>
          <div>{{orderTypeDetail.categoryAlias}}</div>
        </div>
      </div>
      <div class="flex jsb mb10">
        <div>采购编号：{{orderTypeDetail.orderNo}}</div>
        <div>日期：{{orderTypeDetail.orderCreateDate}}</div>
      </div>
      <div class="flex jsb ptb">
        <div class="bold">供应主体</div>
        <div class="flex flex-center" style="flex-shrink: 0;" @click="openMainDetail">
          <div>{{orderTypeDetail.supplyCompanyName}}</div>
          <div class="el-icon-arrow-right" style="font-size: 20px;"></div>
        </div>
      </div>
      <div class="flex jsb ptb">
        <div class="bold">品牌名称</div>
        <div>{{orderTypeDetail.brandName}}</div>
      </div>
      <div class="ptb">
        <div class="bold mb10">采购费用</div>
        <div class="mb10">其中：币种：人民币</div>
        <el-table :data="orderTypeDetailFree" border style="width: 100%;">
          <el-table-column prop="label" label="费用类型" align="center">
          </el-table-column>
          <el-table-column prop="price" label="金额" align="center">
          </el-table-column>
        </el-table>
      </div>
      <!-- 供应主体订单详情 -->
      <el-dialog title="订单详情" width="900px" :visible.sync="isMain" append-to-body destroy-on-close
        @close="beforeClosePurchaseDetail">
        <div class="flex mb10">
          <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + orderTypeDetail.categoryImg" :fit="fit"></el-image>
          <div>
            <div>{{orderTypeDetail.categoryName}}</div>
            <div>{{orderTypeDetail.categoryAlias}}</div>
          </div>
        </div>
        <div class="flex jsb mb10">
          <div>采购编号：{{orderTypeDetail.orderNo}}</div>
          <div>日期：{{orderTypeDetail.orderCreateDate}}</div>
        </div>
        <el-tabs v-model="activeMain" type="card">
            <el-tab-pane label="需求信息" name="first">
              <div class="" style="padding-bottom: 40px;">
                <demandMessage :orderGuid='openRow.orderGuid' v-if="activeMain=='first'"></demandMessage>
              </div>
            </el-tab-pane>
            <el-tab-pane label="供应信息" name="second">
              <div class="" style="padding-bottom: 40px;">
                <supplyMessage :orderGuid='openRow.orderGuid' v-if="activeMain=='second'"></supplyMessage>
              </div>
            </el-tab-pane>
          </el-tabs>
      </el-dialog>
    </el-dialog>
    <!-- 物流进度 -->
    <el-dialog title="物流进度" width="900px" :visible.sync="isLogistics" append-to-body destroy-on-close
      @close="beforeCloseLogistics">
      <div class="flex mb10">
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <div>
          <div>品类名称</div>
          <div>别名1、别名2</div>
        </div>
      </div>
      <div class="flex jsb mb10">
        <div>采购编号：2021052412591312346</div>
        <div>日期：2021-05-24</div>
      </div>
      <div class="title-bg mb10">账号信息</div>
      <el-descriptions :colon="false" class="pb20" :column="1">
        <el-descriptions-item label-class-name="my-label" label="20210906">取货</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="20210913">移到深圳仓储中心</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="20210915">到福州站</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import { getDemandDetail, getSupplyDetail, getOrderDetail,getOrderFeeDemandDetail,getOrderFeeSupplyDetail,getDemandMessage,getSupplydMessage } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
  import demandMessage from '@/views/arbitrationRole/ReturnOfRuling/components/demandMessage.vue'
  import supplyMessage from '@/views/arbitrationRole/ReturnOfRuling/components/supplyMessage.vue'
  export default {
    name: "index",
    components: {
      demandMessage,
      supplyMessage
    },
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      orderType: {
        type: String,
        default: 'demand'  // demand 采购; supply 供应
      }
    },
    data() {
      return {
        isOrderDetail: true,
        isPurchaseDetail: false,
        isLogistics: false,
        isMain: false,
        orderDetailObj: {}, // 订单详情
        orderTypeDetail: {}, // 订单采购/供应详情
        orderTypeDetailFree: [{
          label: '产品费用',
          price: ''
        },{
          label: '服务费用',
          price: ''
        },{
          label: '关税金额',
          price: ''
        },{
          label: '物流费用',
          price: ''
        }],
        supplyDetailList: [{
          orderDate: '2021-03-21',
          name: '茶',
          NO: '2012100000000'
        }],
        purchasePriceList: [
          {
            type: '产品费用',
            price: '20.00'
          },{
            type: '服务费用',
            price: '*'
          },{
            type: '物流费用',
            price: '*'
          }
        ],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit: 'fit',
        activeMain: 'first',
        imgBasicUrl: this.$store.state.basics.img_url_cat

      };
    },
    created() {
      console.log(this.openRow);
      if (this.orderType == 'demand') {
        this.getDemandDetail()
      } else {
        this.getSupplyDetail()
      }

    },
    methods: {
      // 获取订单内容
      async getDemandDetail() {
        await getDemandDetail({
          orderGuid: this.openRow.orderGuid
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.orderDetailObj = data
        })
      },
      // 获取订单内容
      async getSupplyDetail() {
        await getSupplyDetail({
          orderGuid: this.openRow.orderGuid
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.orderDetailObj = data
        })
      },
      // 查看采购详情
      async getOrderFeeDemandDetail() {
        await getOrderFeeDemandDetail({
          orderGuid: this.openRow.orderGuid
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.orderTypeDetail = data
          this.orderTypeDetailFree[0].price = data.categoryFee
          this.orderTypeDetailFree[1].price = data.serviceFee
          this.orderTypeDetailFree[2].price = data.taxFee
          this.orderTypeDetailFree[3].price = data.logisticsFee
        })
      },
      // 查看供应详情
      async getOrderFeeSupplyDetail() {
        await getOrderFeeSupplyDetail({
          orderGuid: this.openRow.orderGuid
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.orderTypeDetail = data
          this.orderTypeDetailFree[0].price = data.categoryFee
          this.orderTypeDetailFree[1].price = data.serviceFee
          this.orderTypeDetailFree[2].price = data.taxFee
          this.orderTypeDetailFree[3].price = data.logisticsFee
        })
      },
      // 需求信息
      async getDemandMessage() {
        await getDemandMessage({
          orderGuid: this.openRow.orderGuid
        }).then(res => {

        })
      },
      // 供应信息
      async getSupplydMessage() {
        await getSupplydMessage({
          orderGuid: this.openRow.orderGuid
        }).then(res => {

        })
      },
      closeOrderDetail() {
        this.isOrderDetail = false
        this.$emit('close')
      },
      beforeCloseOrderDetail() {
        this.closeOrderDetail()
      },
      openPurchaseDetail(row) {
        this.orderRow = row
        this.isPurchaseDetail = true
        if(this.orderType == 'demand') {
          this.getOrderFeeDemandDetail()
        } else {
          this.getOrderFeeSupplyDetail()
        }
      },
      closePurchaseDetail() {
        this.isPurchaseDetail = false
      },
      beforeClosePurchaseDetail() {
        this.closePurchaseDetail()
      },
      openLogistics() {
        this.isLogistics = true
      },
      closeLogistics() {
        this.isLogistics = false
      },
      beforeCloseLogistics() {
        this.closeLogistics()
      },
      openMainDetail() {
        this.isMain = true
      },
      closeMainDetail() {
        this.isMain = false
      },
      beforeCloseMainDetail() {
        this.closeMainDetail()
      },
    },
  };
</script>

<style lang="scss">
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }

  .my-label {
    // width: 120px;
    font-weight: bold;
  }
</style>
