<template>
  <el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" :append-to-body="true">
    <div class="p20">
      <el-row class="flex flex-center mb10">
        <div class="my-label">姓名</div>
        <div>{{row.nickName}}</div>
      </el-row>
      <el-row class="flex flex-center mb10">
        <div class="my-label">国家/地区</div>
        <div>{{row.nation}}</div>
      </el-row>
      <el-row class="flex flex-center mb10">
        <div class="my-label">联系电话</div>
        <div>{{row.phonenumber}}</div>
      </el-row>
      <el-row class="flex flex-center mb10">
        <div>已开通账号，不能删除。</div>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
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
  .p20 {
    padding: 20px;
  }
  .my-label {
    width: 120px;
  }
</style>
