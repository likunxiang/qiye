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
        <el-input type="textarea" :rows="4" placeholder="请输入裁决理由" v-model="fingdingReason">
        </el-input>
      </div>
      <div class="mb20">
        <div class="mb10 bold">裁决结果</div>
        <el-radio-group class="flex" v-model="radioResult">
          <div class="flex1">
            <el-radio :label="3">需方违约，支持退款</el-radio>

          </div>
          <div class="flex1">
            <el-radio :label="3">供方违约，支持退款</el-radio>

          </div>
          <div class="flex1">
            <el-radio :label="9">交易正常，维持交易</el-radio>

          </div>

        </el-radio-group>
        <div class="flex mt10">
          <div class="flex1" style="padding-left: 22px;">
            <div>适用范围：</div>
            <div>需方取消订单</div>
          </div>
          <div class="flex1" style="padding-left: 22px;">
            <div>适用范围：</div>
            <div>供方取消订单货不对板</div>
          </div>
          <div class="flex1" style="padding-left: 22px;">
            <div>适用范围：</div>
            <div>符合需求信息</div>
          </div>
        </div>
      </div>
      <div class="mb20">
        <div class="mb10 bold">第三方报告</div>
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
      </div>
      <div class="title-bg mb10 mt10">违约金及相关费用说明</div>
      <div class="mb20 flex flex-center jsb">
        <div>
          <div class="flex flex-center mb20">
            <div class="bold" style="width: 120px;">违约方违约费用</div>
            <el-input v-model="damageFree" placeholder="请填写" style="width: 80px;"></el-input>
          </div>
          <div class="flex flex-center">
            <div class="bold" style="width: 120px;">收取对象</div>
            <el-radio-group class="flex" v-model="radioObject" :disabled="!thirdPartyFree">
                <el-radio :label="1">需方支付</el-radio>
                <el-radio :label="2">供方支付</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button>违约费用明细</el-button>
      </div>
      <el-divider></el-divider>
      <div class="mb20 flex flex-center jsb">
        <div>
          <div class="flex flex-center mb20">
            <div class="bold" style="width: 120px;">守约方赔偿金额</div>
            <el-input v-model="damageFree" placeholder="请填写" style="width: 80px;"></el-input>
          </div>
          <div class="flex flex-center">
            <div class="bold" style="width: 120px;">赔偿对象</div>
            <el-radio-group class="flex" v-model="radioObject" :disabled="!thirdPartyFree">
                <el-radio :label="1">需方支付</el-radio>
                <el-radio :label="2">供方支付</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button>赔偿金额明细</el-button>
      </div>
     <!-- <div class="mb20">
        <div class="mb10 bold">第三方报告费用</div>
        <div class="flex flex-center mb10">
          <div class="mr10">金额:</div>
          <el-input v-model="thirdPartyFree" placeholder="0.00" style="width: 58px;"></el-input>
          <div>元</div>
        </div>
        <div class="flex flex-center">
          <div class="mr10">对象:</div>
          <el-radio-group class="flex" v-model="radioObject" :disabled="!thirdPartyFree">
              <el-radio :label="1">需方支付</el-radio>
              <el-radio :label="2">供方支付</el-radio>
          </el-radio-group>
        </div>

      </div> -->
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
        fingdingReason: '',
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
