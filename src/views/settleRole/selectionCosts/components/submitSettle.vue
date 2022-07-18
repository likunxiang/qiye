<template>
  <el-dialog title="提交结算证明" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="p20">
      <el-descriptions :colon="false" class="margin-top" :column="1">
        <el-descriptions-item label-class-name="my-label" label="年度">2020</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="计酬月份">12</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="新签机构数量">20</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="续签机构数量">10</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="验收通过订单数量">200</el-descriptions-item>
      </el-descriptions>
      <div>上传结算证明</div>
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
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import {
    upLoadImgApi
  } from '@/api/commonApi.js'
  import { uploadImgToBase64 } from '@/utils/base64.js' // 导入本地图片转base64的方法
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
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
          settleGuid: this.row.settleGuid,
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
        let FilePath = 'settlement\\accept\\images'
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