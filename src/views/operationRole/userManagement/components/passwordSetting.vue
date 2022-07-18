<template>
  <el-dialog title="账号密码设置" width="700px" :visible.sync="isOpen" @close="beforeClose">
    <div class="account-msg">
      <div>账户信息</div>
      <div style="padding: 20px;">
        <div class="flex jsb" style="margin-bottom: 20px;">
          <div class="flex">
            <div class="input-text">头像</div>
            <el-avatar shape="square" style='width: 100px;height: 100px;'
              :src="basicImgUrl + userObj.avatar"></el-avatar>
          </div>
          <div class="flex">
            <div class="input-text" style="line-height: 36px;">账号名称</div>
            <el-input type="text" v-model="userObj.userName" disabled />
          </div>
        </div>
        <div class="flex jsb">
          <div class="flex flex-center">
            <div class="input-text">密码</div>
            <el-input :type="isEye?'text':'password'" v-model="password">
              <i class="iconfont icon-yanjing_xianshi" style="line-height: 36px;" slot="suffix"
                @click="changePasswordStatus" v-if="isEye"></i>
              <i class="iconfont icon-yanjing_yincang" style="line-height: 36px;" slot="suffix"
                @click="changePasswordStatus" v-else></i>
            </el-input>
          </div>
          <div class="flex flex-center">
            <div class="input-text">确认密码</div>
            <el-input :type="isEye?'text':'password'" v-model="passwordAgain">
              <i class="iconfont icon-yanjing_xianshi" style="line-height: 36px;" slot="suffix"
                @click="changePasswordStatus" v-if="isEye"></i>
              <i class="iconfont icon-yanjing_yincang" style="line-height: 36px;" slot="suffix"
                @click="changePasswordStatus" v-else></i>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" :disabled="!password || !passwordAgain">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    changePassword,
    getRoleUserDetail
  } from "@/api/operationRoleApi/userManagement.js"
  import {  resetUserPwd } from "@/api/system/user";
  export default {
    name: "index",
    props: {
      roleMsg: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        password: '',
        passwordAgain: '',
        isEye: false,
        userObj: {},
        basicImgUrl: this.$store.state.basics.imgUrl
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
        if (this.password === this.passwordAgain) {
          this.changePassword()
        } else {
          this.$message('两次密码不一致');
        }
      },
      changePasswordStatus() {
        this.isEye = !this.isEye
      },
      async changePassword() {
        const userId = this.roleMsg.userId
        const password = this.password
        await resetUserPwd(userId,password).then((res) => {
          console.log(res);
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.close()
          this.$emit('upData')
        })
      },
      // 获取用户详情
      async getRoleUserDetail() {
        await getRoleUserDetail({
          userId: this.roleMsg.userId
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.userObj = data
        })
      }
    },
    created() {
      console.log('进来的时候',this.roleMsg);
      this.getRoleUserDetail()
    },
  };
</script>

<style lang="scss" scoped>
  .account-msg {
    .input-text {
      width: 85px;
    }
  }

  .role-msg {
    .role-msg-main {
      padding: 20px 0;
    }
  }

  .list {
    list-style: none;

    .drag-move {
      transition: transform 0.3s;
    }

    .list-item {
      cursor: move;
      width: 300px;
      // background: #EA6E59;
      border-radius: 4px;
      color: #333;
      margin-bottom: 6px;
      // height: 50px;
      // line-height: 50px;
      text-align: center;
    }
  }
</style>
