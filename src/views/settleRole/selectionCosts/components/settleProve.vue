<template>
  <el-dialog title="查看结算证明" :visible.sync="isOpen" width="700px" @close="beforeClose">
      <div class="p20">
        <el-descriptions :colon="false" class="margin-top" :column="1">
          <el-descriptions-item label-class-name="my-label" label="年度">2020</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="计酬月份">12</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="新签机构数量">20</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="续签机构数量">10</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="验收通过订单数量">200</el-descriptions-item>
        </el-descriptions>
        <div>上传结算证明</div>
        <template v-if="ruleForm.imgUrl[0].length > 0">
          <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + img" fit="fit"
            v-for="(img,index) in ruleForm.imgUrl" :key="index"></el-image>
        </template>
        <template v-else>
          <div>无</div>
        </template>
        <div>结算证明上传日期</div>
        <div>2022-04-02   12：12</div>
      </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        ruleForm: {
          explain: '',
          date: '',
          imgUrl: [''],
        },
        imgBasicUrl: this.$store.state.basics.img_url_set_acc
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
</style>
