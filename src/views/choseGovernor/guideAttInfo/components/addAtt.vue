<template>
  <el-dialog title="添加引导专员" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-top: 20px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="国家/地区">
              中国大陆（+86）
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    introducerAdd
  } from '@/api/choseGovernorApi/choseGovernorCom.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        ruleForm: {
          name: '',
          phone: ''
        },
        rules: {
          name: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          phone: [{
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }],
        }

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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.introducerAdd()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async introducerAdd() {
        await introducerAdd({
          nickName: this.ruleForm.name,
          phonenumber: this.ruleForm.phone,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if(res.OK == 'True') {

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
                message: '账号名称或联系电话已存在!'
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
</style>
