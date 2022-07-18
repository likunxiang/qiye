<template>
  <el-dialog title="退货事由" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 40px;">
      <div class="flex flex-center jsb mb10">
        <div style="width: 100%;" class="flex flex-center jsb">
          <div class="flex">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + orderObj.categoryImg" :fit="fit"></el-image>
            <div>
              <div>{{orderObj.categoryName}}</div>
              <div>{{orderObj.categoryAlias}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex jsb">
        <div>采购编号：{{orderObj.orderNo}}</div>
        <div>日期：{{orderObj.orderDate}}</div>
      </div>
      <div class="title-bg mb10 mt10">申请内容</div>
      <div class="mb20">
        <div class="mb10 bold">申请日期</div>
        <div class="mb10">{{orderObj.applyDate}}</div>
      </div>
      <div class="mb20">
        <div class="mb10 bold">{{type=='1'?'取消订单':'退货'}}事由</div>
        <div class="mb10">{{orderObj.reason}}</div>
      </div>
      <div class="mb20" v-if="type==='2'">
        <div class="mb10 bold">证据证明</div>
        <div class="flex" style="flex-wrap: wrap;">
          <el-image :preview-src-list="imgsList" class="mr10 mb10" style="width: 100px; height: 100px" :src="item" fit="fit" v-for="(item,index) in imgsList" :key='index'></el-image>
        </div>
      </div>
      <div class="title-bg mb10 mt10">申请规则</div>
      <div class="mb10" v-if="type==='1'">{{orderObj.bizRuleType1Name}}</div>
      <div class="mb10">{{orderObj.bizRuleType21Name}}</div>
    </div>
  </el-dialog>
</template>

<script>
  import { getCancelOrderDetail,getRefundOrderDetail } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
  export default {
    name: "index",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      type: {
        type: String,
        default: '1'
      },
    },
    data() {
      return {
        isOpen: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.qjimage.com%2Fchineseview046%2Fhigh%2Feast-ep-a81-1118208.jpg&refer=http%3A%2F%2Fpic.qjimage.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641710877&t=3feb0470230efd79f8569600c4795dbb',
        fit: 'fit',
        orderObj: {},
        imgsList: [],
        imgBasicUrl: this.$store.state.basics.img_url_cat,
        imgBasicUrl_ord: this.$store.state.basics.img_url_ord,
      };
    },
    methods: {
      // 取消订单数据
      async getCancelOrderDetail() {
        await getCancelOrderDetail({
          orderGuid: this.openRow.orderGuid
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.orderObj = data
        })
      },
      // 退单数据
      async getRefundOrderDetail() {
        await getRefundOrderDetail({
          orderGuid: this.openRow.orderGuid
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.orderObj = data
          this.imgsList = data.refundProveImgs.split(',')
          this.imgsList = this.imgsList.map(item => this.imgBasicUrl_ord + item)
        })
      },
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
    },
    created() {
      this.type = this.openRow.applyType
      if (this.type === '1') {
        this.getCancelOrderDetail()
      } else {
        this.getRefundOrderDetail()
      }
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
