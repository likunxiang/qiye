<template>
  <el-dialog title="新建品类名称" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="input-box">
      <div class="flex flex-center">
        <div class="input-text">品类名称</div>
        <el-input type="text" v-model="newName" placeholder="请输入" />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="closeNew">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "newClassName",
    props: {

    },
    data() {
      return {
        newName: '',
        isNew: true
      };
    },
    methods: {
      // 新建类名
      closeNew() {
        this.isNew = false
        this.$emit('closeNew')
      },
      beforeClose() {
        console.log(999);
        this.$emit('closeNew')
      }
    },
    onLoad() {},
  };
</script>

<style lang="scss">
</style>
