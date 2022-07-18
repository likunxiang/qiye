<template>
  <el-dialog title="退货验收情况" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 40px;">
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
        <div>日期：{{refundObj.orderTime}}</div>
      </div>
      <div class="title-bg mb10">结果内容</div>
      <div class="mb10 bold">验收日期</div>
      <div class="mb10">{{refundObj.supplyAcceptTime}}</div>
      <el-divider></el-divider>
      <div class="mb10 bold">验收方式</div>
      <div class="mb10">{{refundObj.supplyAcceptWay == '0'?'未验收':(refundObj.supplyAcceptWay=='1'?'手动验收':'系统验收')}}</div>
      <el-divider></el-divider>
      <div class="mb10 bold">验收结果</div>
      <div class="flex flex-center jsb mb10">
        <div>{{refundObj.supplyAccept == '0'?'未验收':(refundObj.supplyAccept=='1'?'验收通过':'验收不通过')}}</div>
        <el-button v-if="refundObj.supplyAccept=='2'" @click="openReason">查看事由</el-button>
      </div>
      <div class="title-bg mb10">适用规则</div>
      <div class="mb10">{{refundObj.applyRuleName}}</div>
    </div>

    <!-- 不通过理由 -->
    <el-dialog title="查看事由" :visible.sync="isReason" width="700px" append-to-body>
      <div style="padding-bottom: 40px;">
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
          <div>日期：{{refundObj.orderTime}}</div>
        </div>
        <div class="title-bg mb10">结果内容</div>
        <div class="mb10 bold">退货验收不通过理由</div>
        <div class="mb10">{{refundObj.supplyNotAcceptReason}}</div>
        <el-divider></el-divider>
        <div class="mb10 bold">证据说明</div>
        <div class="flex flex-center mb10" style="flex-wrap: wrap;">
          <el-image :preview-src-list="accepProveImg" class="mr10 mb10" style="width: 100px; height: 100px" :src="img" fit="fit" v-for="(img,index) in accepProveImg" :key="index"></el-image>
        </div>
        <div class="title-bg mb10">适用规则</div>
        <div class="mb10">{{refundObj.applyRuleName}}</div>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import { getSupplyAcceptDetail } from '@/api/settleRoleApi/buyerPurchaseSettlement/buyerRefundPay.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.qjimage.com%2Fchineseview046%2Fhigh%2Feast-ep-a81-1118208.jpg&refer=http%3A%2F%2Fpic.qjimage.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641710877&t=3feb0470230efd79f8569600c4795dbb',
        loading: false,
        refundObj: {},
        imgBasicUrl: this.$store.state.basics.img_url_cat,
        isReason: false,
        imgBasicUrl_ord: this.$store.state.basics.img_url_ord,
        accepProveImg: [], //退货供方验收证明图片
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
      openReason() {
        this.isReason = true
      },
      closeReason() {
        this.isReason = false
      },
      async getSupplyAcceptDetail() {
        await getSupplyAcceptDetail({
          refundGuid: this.row.refundGuid
        }).then(res => {
          console.log(res);
          this.loading = true
          let data = res.Tag[0].Table[0]
          this.refundObj = data
          let accepProveImg = data.supplyAccepProve.split(',')
          this.accepProveImg  = accepProveImg.map(item => this.imgBasicUrl_ord + item)
        })
      }
    },
    created() {
      this.getSupplyAcceptDetail()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
    font-weight: bold;
  }
</style>
