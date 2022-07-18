<template>
  <el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body style="margin-top: 30vh;">
    <div class="mb10 bold">确认已经收到</div>
    <div class="mb10">林都（+86）18650767213</div>
    <div class="mb10">【品类名称】</div>
    <div class="mb10 bold">采购编号（2021091807122288888）的【供方违约处罚】款项：2000.00</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
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
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      submit() {
        this.close()
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
  .dialog-footer {
    text-align: center;
  }
</style>
