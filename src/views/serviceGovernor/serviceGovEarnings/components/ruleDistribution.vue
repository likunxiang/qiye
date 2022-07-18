<template>
  <el-dialog title="分配标准说明" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="pb20">
      <div class="mb10">
        <div class="title-bg1">一、服务收入来源</div>
        <div>服务对象每成交一笔业务，公司收取一笔采购服务费用（工作岗位免费）。服务收入来源于采购服务费用的分成。</div>
      </div>
      <div class="mb10">
        <div class="title-bg1">二、收入组成</div>
        <div class="mb10">
          <div class="mb10">1、服务对象采购服务收益</div>
          <div>公司授权你的服务专员，服务专员的服务对象通过APP采购商品或者服务，您可以获得该笔采购服务费用的【7.5%】</div>
        </div>
        <div class="mb10">
          <div class="mb10">2、服务对象供应服务收益</div>
          <div>公司授权你的服务专员，服务专员的服务对象通过APP供应商品或者服务，您可以获得该笔采购服务费用的【7.5%】</div>
        </div>
      </div>
      <div class="mb10">
        <div class="title-bg1">一、服务收入来源</div>
        <div class="mb10">1、每月1号可提现上个月的服务收入</div>
        <div class="mb10">2、系统为每个服务主管代扣代缴此项引导收入个税</div>
        <div class="mb10">3、点【服务主管收益管理】查看税后应得收益和提现。</div>
        <div class="mb10">4、提现时需大家提交个人有效身份证用于个税办理</div>
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
  .title-bg1 {
    background-color: #F2F2F2;
    padding: 10px 0;
    margin-bottom: 20px;
  }
</style>
