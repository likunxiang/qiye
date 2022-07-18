<template>
  <el-dialog title="问号标识说明" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 20px;">
        <span>机构首次注册接单管理系统前，需要该合同中的【机构名称】+【联系电话】作为身份验证。请确保内容正确，以免身份验证不成功，导致注册不了。</span>
        <el-divider></el-divider>
        <span>机构注册后，该标识就收起了。</span>
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
</style>
