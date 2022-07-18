<template>
  <el-dialog title="添加服务专员" :visible.sync="isOpen" width="700px" @close="beforeClose">
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
          <el-col :span="18">
            <el-form-item label="所在地点" prop="region">
              <el-input v-model="ruleForm.region" @focus="openProvinces" placeholder="请选择" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
    <chooseProvinces v-if="isProvinces" @close="closeProvinces" @getProvinces="getProvinces"></chooseProvinces>
  </el-dialog>
</template>

<script>
  import chooseProvinces from '@/views/serviceManager/agencyInformation/components/chooseProvinces.vue'
  import {
    introducerInsert
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      chooseProvinces
    },
    data() {
      return {
        isOpen: true,
        ruleForm: {
          name: '',
          phone: '',
          region: '',
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
          region:  [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
        },
        provincesObj: {},
        isProvinces: false,
        nation: '中国大陆（+86）'
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
      // 选择服务区域
      openProvinces() {
        this.isProvinces = true
      },
      closeProvinces() {
        this.isProvinces = false
      },
      // 获取选择的省市区
      getProvinces(data) {
        this.provincesObj = data
        console.log('provincesObj',this.provincesObj);
        console.log(data.address);
        this.ruleForm.region = data.address

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.introducerInsert()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async introducerInsert() {
        await introducerInsert({
          nickName: this.ruleForm.name,
          nation: this.nation,
          cityCodeId: this.provincesObj.cityId,
          location: this.ruleForm.region,
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
