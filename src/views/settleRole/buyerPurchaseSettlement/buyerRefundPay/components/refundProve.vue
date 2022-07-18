<template>
  <el-dialog title="查看退货证明" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 40px;" v-if="loading">
      <div class="flex flex-center jsb mb10">
        <div style="width: 100%;" class="flex flex-center jsb">
          <div class="flex">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + refundObj.categoryImg" fit="fit"></el-image>
            <div>
              <div>{{refundObj.categoryName}}</div>
              <div>{{refundObj.categoryAlias}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex jsb mb10">
        <div>采购编号：{{refundObj.orderNo}}</div>
        <div>日期：{{refundObj.orderDate}}</div>
      </div>
      <div class="title-bg mb10">证明内容</div>
      <div class="mb10 bold">提交日期</div>
      <div class="mb10">{{refundObj.refundTime}}</div>
      <div class="title-bg mb10">需方退货信息</div>
      <div class="mb10 flex">
        <div class="bold">退货物流单子</div>
        <div>（本订单货物发还给供方的物流编号或者供方当面签收书面证明）</div>
      </div>
      <div class="flex flex-center mb10" style="flex-wrap: wrap;">
        <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="imgBasicUrl_ord + img" fit="img" v-for="(img,index) in logisticsImgs" :key="index"></el-image>
      </div>
      <div class="title-bg mb10">需方退货信息</div>
      <div class="mb10 bold">签收日期</div>
      <div class="mb10">{{refundObj.supplyAcceptTime}}</div>
      <el-divider></el-divider>
      <div class="mb10 flex">
        <div class="bold">签收证明</div>
        <div>（如物流回单证明或者供方当面签收书面证明）</div>
      </div>
      <div class="flex flex-center mb10" style="flex-wrap: wrap;">
        <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="imgBasicUrl_ord + img" fit="fit" v-for="(img,index) in signForImgs" :key="index"></el-image>
      </div>
      <div class="title-bg mb10">适用规则</div>
      <div class="mb10">{{refundObj.applyRuleName}}</div>
    </div>
  </el-dialog>
</template>

<script>
  import { getRefundDetail } from '@/api/settleRoleApi/buyerPurchaseSettlement/buyerRefundPay.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        loading: false,
        refundObj: {},
        logisticsImgs: [], // 物流图片数组
        signForImgs: [], // 签收证明数组
        imgBasicUrl: this.$store.state.basics.img_url_cat,
        imgBasicUrl_ord: this.$store.state.basics.img_url_ord,
      };
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      async getRefundDetail() {
        await getRefundDetail({
          refundGuid: this.row.refundGuid
        }).then(res => {
          console.log(res);
          this.loading = true
          let data = res.Tag[0].Table[0]
          this.refundObj = data
          this.logisticsImgs = data.refundProveImg.split(',')
          this.signForImgs = data.supplyAcceptImg.split(',')
        })
      }
    },
    created() {
      this.getRefundDetail()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
    font-weight: bold;
  }

  .my-label {
    width: 120px;
    font-weight: bold;
  }
</style>
