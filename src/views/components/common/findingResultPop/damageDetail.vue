<template>
  <el-dialog title="赔偿金额明细" :visible.sync="isOpen" width="400px" append-to-body @close="beforeClose">
    <div style="padding: 40px 20px;">{{content}}</div>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    props: {
      content: {
        type: String,
        default: ''
      }
    },
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
