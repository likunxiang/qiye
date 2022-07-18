<template>
  <el-dialog title="提交付款证明" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row style="padding-bottom: 20px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="top">
        <el-form-item label="付款证明" prop="imgUrl">
          <el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
            :on-change="preUploadImg"
            :http-request="uploadImg"

            :multiple="true"
            :on-success="handleAvatarSuccess">
            <div class="flex" style="flex-wrap: wrap;">
              <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img" v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
              <div class="flex flex-center non-image">
                <div class="el-icon-plus" style="font-size: 36px;"></div>
              </div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="付款说明" prop="explain">
          <el-input type="textarea" placeholder="感谢每一份努力" v-model="ruleForm.explain"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
  import { submitPayProve } from '@/api/settleRoleApi/supplierSupplySettlement/buyerCompensation.js'
  import {
    upLoadImgApi
  } from '@/api/commonApi.js'
  import { uploadImgToBase64 } from '@/utils/base64.js' // 导入本地图片转base64的方法
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
        ruleForm: {
          explain: '',
          imgUrl: '',
        },
        imgList: [], // 图片储存
        imgListShow: [], // 展示列表
        uploadUrl: '',
        step: 0, // 用于判断图片是否传完
        rules: {
          explain: [{
            required: true,
            message: '付款说明',
            trigger: 'blur'
          }],
          imgUrl: [
            {
              required: true,
              message: '必填',
              trigger: 'blur'
            }
          ]
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
            this.$refs.upload.submit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async submitPayProve() {
        await submitPayProve({
          judgeFeeGuid: this.row.judgeFeeGuid,
          prove: this.uploadUrl,
          remark: this.ruleForm.explain,
          payType: '3'
        }).then(res => {
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
        })
      },


      // 图片上传相关
      handleAvatarSuccess(res, file) {
      },
      preUploadImg(file, fileList) {
        this.imgList = fileList
        let imgList = fileList
        let arr = imgList.map(item => URL.createObjectURL(item.raw))
        let uploadUrl = imgList.map(item => item.name).join(',')
        this.uploadUrl = uploadUrl
        this.ruleForm.imgUrl = uploadUrl
        console.log(arr,uploadUrl);
        this.imgListShow = arr
      },
      // 正经上传图片
      async uploadImg(item) {
        console.log(item);
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        let FileName = item.file.name
        let FilePath = 'settlement\\obey\\images'
        let data = base64File
        upLoadImgApi(data,FileName,FilePath).then(res => {
          if(res.OK=='True') {
            this.step ++
            if(this.step == this.imgListShow.length) {
              this.submitPayProve()
            }

          }
        })
      },
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
