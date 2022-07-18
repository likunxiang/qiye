<template>
  <el-dialog title="导入成果" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div class="content">计划导入{{result[0]}}，实际导入成功{{result[1]}}，不成功{{result[0]-result[1]}}</div>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    props: {
      result: {
        type: Array,
        default: () => {
          return []
        }
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
        this.$emit('refresh')
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
  .content {
    padding: 20px 0 40px;
  }
</style>
