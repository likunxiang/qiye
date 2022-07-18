<template>
  <el-dialog title="查看业绩信息" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="p20">
      <el-descriptions :colon="false" class="margin-top" :column="1">
        <el-descriptions-item label-class-name="my-label" label="年度">2020</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="计酬月份">12</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="新签机构数量">20</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="续签机构数量">10</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="验收通过订单数量">200</el-descriptions-item>
      </el-descriptions>
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
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }
  
  .my-label {
    width: 120px;
    font-weight: bold;
  }
</style>