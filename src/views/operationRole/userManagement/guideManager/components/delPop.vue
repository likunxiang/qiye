<template>
  <el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">角色类型</div>
        <div>引导经理</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">账号名称</div>
        <div>{{openRow.userName}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">姓名</div>
        <div>{{openRow.nickName}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">国家/地区</div>
        <div>{{openRow.nation}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">联系电话</div>
        <div>{{openRow.phonenumber}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div>确认删除？</div>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    selectDelDirector
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
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
      submit() {
        this.selectDelDirector()
      },
      async selectDelDirector() {
        await selectDelDirector({
          userId: this.openRow.userId,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }

          }
        })
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 120px;
  }
</style>
