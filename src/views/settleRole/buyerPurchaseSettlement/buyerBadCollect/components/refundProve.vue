<template>
  <el-dialog title="查看退货证明" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
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
      <div class="flex jsb mb10">
        <div>采购编号：20210000000000</div>
        <div>日期：2021-09-18</div>
      </div>
      <div class="title-bg mb10">证明内容</div>
      <div class="mb10 bold">提交日期</div>
      <div class="mb10">2021-10-12</div>
      <div class="title-bg mb10">需方退货信息</div>
      <div class="mb10 flex">
        <div class="bold">退货物流单子</div>
        <div>（本订单货物发还给供方的物流编号或者供方当面签收书面证明）</div>
      </div>
      <div class="flex flex-center mb10" style="flex-wrap: wrap;">
        <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="url" fit="fit" v-for="(item,index) in 5" :key="index"></el-image>
      </div>
      <div class="title-bg mb10">需方退货信息</div>
      <div class="mb10 bold">签收日期</div>
      <div class="mb10">2021-10-12</div>
      <el-divider></el-divider>
      <div class="mb10 flex">
        <div class="bold">签收证明</div>
        <div>（如物流回单证明或者供方当面签收书面证明）</div>
      </div>
      <div class="flex flex-center mb10" style="flex-wrap: wrap;">
        <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="url" fit="fit" v-for="(item,index) in 5" :key="index"></el-image>
      </div>
      <div class="title-bg mb10">适用规则</div>
      <div class="mb10">《实物退货退款规则》</div>
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
    padding: 10px;
    font-weight: bold;
  }

  .my-label {
    width: 120px;
    font-weight: bold;
  }
</style>
