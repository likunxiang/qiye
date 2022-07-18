<template>
  <el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div class="pb20">
      <div class="flex flex-center mb10" style="width: 80%;">
        <div class="my-label">金额</div>
        <div >支付宝</div>
      </div>
      <div class="flex flex-center mb10" style="width: 80%;">
        <div class="my-label">提现方式</div>
        <div>支付宝</div>
      </div>
      <div class="flex flex-center mb10" style="width: 80%;">
        <div class="my-label">国家/区号</div>
        <div>支付宝</div>
      </div>
      <div class="flex flex-center mb10" style="width: 80%;">
        <div class="my-label">手机号</div>
        <div>支付宝</div>
      </div>
      <div class="flex mb10" style="width: 80%;">
        <div class="my-label">备注说明</div>
        <div>请关注提现方式的到账情况，每家到账时间略有不同，具体到账时间以各提现方式为准；若有异常，请通过APP【反馈】中的【工具使用建议】进行反馈。</div>
      </div>
      <el-divider></el-divider>
      <div style="width: 100%;">
        <div class="flex" style="margin: auto;justify-content: center;">提现申请提交成功</div>
        <div class="el-icon-check flex" style="margin: auto;justify-content: center;font-size: 30px;font-weight: bold;"></div>
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
  .my-label {
    width: 150px;
    margin-right: 20px;
    text-align: right;
    flex-shrink: 0;
  }
</style>
