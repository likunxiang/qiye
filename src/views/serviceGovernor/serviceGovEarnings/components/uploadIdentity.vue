<template>
  <el-dialog title="个人身份信息" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div v-loading="loading">
      <div class="title-bg1 mb10">个人身份信息</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="110px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请与证件上一致"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          中华人民共和国居民身份证
        </el-form-item>
        <el-form-item label="证件号码" prop="number">
          <el-input v-model="form.number" placeholder="请与证件上一致"></el-input>
        </el-form-item>
        <el-form-item label="证件生效日期" prop="date1">
          <el-date-picker type="date" placeholder="请与证件上一致" v-model="form.date1" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="证件失效日期" prop="date2">
          <el-date-picker type="date" placeholder="请与证件上一致" v-model="form.date2" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="签发机关" prop="jiguang">
          <el-input v-model="form.jiguang" placeholder="请与证件上一致"></el-input>
        </el-form-item>
        <el-form-item label="" prop="prove">
          <div>

            <el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
              :on-change="preUploadImg" :http-request="uploadImg" :limit="2" :multiple="true" :on-success="handleAvatarSuccess">
              <el-button class="mb20" type="primary">证件证明</el-button>
            </el-upload>
            <div class="flex" style="flex-wrap: wrap;">
              <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
                v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
              <div class="flex flex-center non-image">
                <div class="el-icon-plus" style="font-size: 36px;"></div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    upLoadImgApi,
  } from '@/api/commonApi.js'
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  import {
    isIdNumberExists,
    ucertification_insert
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        imgList: [], // 图片储存
        imgListShow: [], // 展示列表
        url: '',
        uploadUrl: '',
        step: 0, // 用于判断图片是否传完
        form: {
          // name: '',
          // number: '',
          // date1: '',
          // date2: '',
          // jiguang: '',
          // prove: ''
        },
        rules: {
          name: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          number: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          date1: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          date2: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          jiguang: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          prove: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }]
        },
        loading: false


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
            this.$confirm('提交后不可修改，请确认提交。', '', {
              confirmButtonText: '保存',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              this.isIdNumberExists()
            }).catch(() => {

            });

          } else {
            this.$message({
              type: 'error',
              message: '有信息没填或填写错误!'
            });
            return false;
          }
        });
      },
      submit() {
        if (true) {
          this.$refs.upload.submit();

        } else {
          this.$message({
            type: 'error',
            message: '有信息没填或填写错误!'
          });
        }
      },
      // 先走这个接口，判断是否身份证已被使用
      async isIdNumberExists() {
        await isIdNumberExists({
          IdNumber: this.form.number,
          idType: '1',
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {
            let data = res.Tag[0].Table[0].isExists
            if (data > 0) {
              this.$message({
                message: '该身份证已被认证过了',
                type: 'error'
              });
              this.loading = false
            } else {
              // 走提交
              this.$refs.upload.submit();
            }
          }
        })
      },
      // 提交数据
      async ucertification_insert() {
        await ucertification_insert({
          realname: this.form.name,
          idType: '1',
          idNumber: this.form.number,
          effectiveStartDate: this.form.date1,
          effectiveEndDate: this.form.date2,
          issuanceOrgan: this.form.jiguang,
          imgs: this.form.prove,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {
            if(res.Tag[0] > 0) {
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
              this.$refs.upload.clearFiles()
              this.imgList = []
              this.imgListShow = []
              this.form.prove = ''
            }
          } else {
            this.$refs.upload.clearFiles()
            this.imgList = []
            this.imgListShow = []
            this.form.prove = ''
          }
        })
      },


      // 图片上传相关
      handleAvatarSuccess(res, file) {},
      preUploadImg(file, fileList) {
        this.imgList = fileList
        let imgList = fileList
        let arr = imgList.map(item => URL.createObjectURL(item.raw))
        let uploadUrl = imgList.map(item => item.name).join(',')
        this.uploadUrl = uploadUrl
        console.log(arr, uploadUrl);
        this.imgListShow = arr
        this.form.prove = uploadUrl
      },
      // 正经上传图片
      async uploadImg(item) {
        console.log(item);
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        let FileName = item.file.name
        let FilePath = 'webuser\\idcard'
        let data = base64File
        upLoadImgApi(data, FileName, FilePath).then(res => {
          if (res.OK == 'True') {
            this.step++
            if (this.step == this.imgList.length) {
              // TODO
              this.ucertification_insert()
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
  .title-bg1 {
    background-color: #F2F2F2;
    padding: 10px 0;
  }

  .non-image {
    width: 100px;
    height: 100px;
    justify-content: center;
    background-color: #F5F7FA;
  }
</style>
