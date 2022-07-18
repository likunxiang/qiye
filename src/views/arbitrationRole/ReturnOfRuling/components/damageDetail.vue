<template>
  <el-dialog title="赔偿金额明细" :visible.sync="isOpen" width="400px" @close="beforeClose" append-to-body>
    <div style="padding: 40px 20px;">
      <el-input type="textarea" :rows="4" placeholder="请告知赔偿金额明细" v-model="contentChild" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!contentChild.trim()">保 存</el-button>
    </span>
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
        contentChild: '',
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
      submit() {
        let data = this.contentChild
        this.$emit('getContent',data)
        this.close()
      }
    },
    created() {
      this.contentChild = this.content
    }
  };
</script>

<style lang="scss" scoped>
</style>
