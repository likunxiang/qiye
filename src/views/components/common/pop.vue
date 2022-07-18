<template>
  <div class="com-contain">
    <el-dialog :title='title' :visible.sync="isShow" width="700px">
      <slot name="popMain"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePop">取 消</el-button>
        <el-button type="primary" @click="closePop">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'pop',
    data() {
      return {

      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closePop() {
        this.$emit('closePop')
      }
    }
  }
</script>

<style lang="scss">
  .el-dialog__body {
    padding: 0 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }
</style>
