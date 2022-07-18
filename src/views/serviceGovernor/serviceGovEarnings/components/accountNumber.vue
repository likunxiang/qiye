<template>
  <el-dialog title="提现账号设置" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div v-if="step == '1'">
      <div class="title-bg1 mb10">提现账号设置</div>
      <div class="flex flex-center mb10">
        <div class="my-label">提现方式</div>
        <div>支付宝</div>
      </div>
      <div class="flex flex-center mb10">
        <div class="my-label">国家/区号</div>
        <div>中国大陆（+86）</div>
      </div>
      <div class="flex flex-center mb10">
        <div class="my-label">收款姓名</div>
        <el-input v-model="name" placeholder="请输入收款姓名"></el-input>
      </div>
      <div class="flex flex-center mb10">
        <div class="my-label">手机号码</div>
        <el-input v-model="phone" placeholder="请输入该提现方式的绑定手机号码"></el-input>
      </div>
    </div>
    <div v-if="step == '2'">
      <div class="title-bg1 mb10">提现账号验证确认</div>
      <div class="flex flex-center mb10">
        <div class="my-label">提现方式</div>
        <div>支付宝</div>
      </div>
      <div class="flex flex-center mb10">
        <div class="my-label">中国大陆（+86）</div>
        <div>{{phone}}</div>
      </div>
      <div class="flex flex-center mb10">
        <el-input style="width: 300px;margin-right: 20px;" v-model="code" placeholder="请输入该手机号收到的验证码"></el-input>
        <el-button type="button" class="yan" :disabled="disabled" @click="getMyCode()">{{codeText}}</el-button>

      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="nextStep" v-if="step =='1'" :disabled="!phone">下一步</el-button>
      <el-button type="primary" @click="submit" v-if="step =='2'">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    account_insert
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  import {
    web_SMS_Send,
    web_SMS_validCode
  } from '@/api/commonApi.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        name: '',
        phone: '',
        disabled: false,
        codeText: "获取验证码",
        code: '',
        step: '1'
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
      nextStep() {
        this.step = '2'
      },
      submit() {

        this.checkCode()
      },
      //获取验证码
      getMyCode() {
        if (this.phone == "" || this.name == '') {
          this.$message.error("手机号或收款姓名不得为空");
        } else {
          let maxNum = 60;
          let oldCodeText = this.codeText;
          this.codeText = `${maxNum}s重新发送`; //初始显示倒计时
          this.disabled = true;
          this.sendCode()
          let codeCountDown = setInterval(() => {

            let countDownNum = maxNum--;
            this.codeText = `${countDownNum}s重新发送`;
            if (countDownNum == 0) {
              //倒计时结束
              this.codeText = oldCodeText;
              clearInterval(codeCountDown);
              this.disabled = false;
            }
          }, 1000);
        }
      },
      // 发送验证码
      async sendCode() {
        let phone = this.phone
        let type = '4'
        await web_SMS_Send(phone,type).then(res => {
          console.log(res);
        })
      },
      // 校验验证码是否正确
      async checkCode() {
        let phonenumber = this.phone
        let code = this.code
        await web_SMS_validCode(phonenumber,code).then(res => {
          console.log(res);
          if(res.OK == 'True') {
            if (res.Tag > 0) {
              this.account_insert()
            } else {
              this.$message({
                message: '验证码错误',
                type: 'error'
              });
            }
          }
        })
      },
      // 最后一步
      async account_insert() {
        await account_insert({
          accountNo: this.phone,
          accountName: this.name,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {
            if (res.Tag[0] > 0) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              // this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                message: '操作失败',
                type: 'error'
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
