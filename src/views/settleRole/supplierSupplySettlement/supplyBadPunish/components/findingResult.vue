<template>
  <!-- 裁决结果批复 -->
  <el-dialog title="裁决结果批复" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 40px;">
      <div class="flex flex-center jsb mb10">
        <div style="width: 100%;" class="flex flex-center jsb">
          <div class="flex">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
            <div>
              <div>品类名称</div>
              <div>别名1、别名2</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex jsb">
        <div>采购编号：2021052412591312346</div>
        <div>日期：2021-05-24</div>
      </div>
      <div class="title-bg mb10 mt10">结果内容</div>
      <div class="mb20">
        <div class="mb10 bold">裁决理由</div>
        <el-input type="textarea" :readonly='true' :rows="4" placeholder="请输入裁决理由" v-model="fingdingReason">
        </el-input>
      </div>
      <div class="mb20">
        <div class="mb10 bold">裁决结果</div>
        <div class="flex flex-center">
          <div class="el-icon-circle-check"></div>
          <div>需方违约，支持退款</div>
        </div>
      </div>
      <div class="mb20">
        <div class="mb10 bold">第三方报告</div>
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
      </div>
      <div class="title-bg mb10 mt10">违约金及相关费用说明</div>
      <div class="mb20">
        <div class="mb10 bold">裁决结果</div>
        <div class="flex flex-center">
          <div class="el-icon-circle-check"></div>
          <div>本笔交易服务费用【80%】作为违约处罚金，其中处罚金的【80%】作为守约方的赔偿金</div>
        </div>
      </div>
      <div class="mb20">
        <div class="mb10 bold">第三方报告费用</div>
        <div class="flex flex-center mb10">
          <div class="el-icon-circle-check"></div>
          <div>需方支付，金额【2000.00】元</div>
        </div>

      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.qjimage.com%2Fchineseview046%2Fhigh%2Feast-ep-a81-1118208.jpg&refer=http%3A%2F%2Fpic.qjimage.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641710877&t=3feb0470230efd79f8569600c4795dbb',
        fingdingReason: '按照退货。。。。',
        punishFree: 0, // 处罚金，
        damageFree: 0, // 赔偿金
        thirdPartyFree: 0, // 第三方费用
        radioResult: 0,
        radioObject: 0,
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
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    font-weight: bold;
    padding: 10px;
  }

  .my-label {
    width: 120px;
    font-weight: bold;
  }
</style>
