<template>
  <!-- TODO -->
  <el-dialog title="编辑品类图片" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="input-box">
      <div class="flex flex-center">
        <div class="input-text">品类名称</div>
        <div>{{editRow.categoryName}}</div>
      </div>
      <div class="flex flex-center mt20">
        <div class="input-text">品类图片</div>
        <!-- <el-image style="width: 100px; height: 100px" :src="editRow.img" fit="fill"></el-image> -->
        <el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
          :on-change="preUploadImg"
          :http-request="uploadImg"
          list-type="picture"
          :on-success="handleAvatarSuccess">
          <img style="width: 100px; height: 100px" :src="imageUrl || basicImgUrl + editRow.img" class="avatar">
        </el-upload>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    updateImgByCGuid
  } from '@/api/categoryRole/giveClass.js'
  import {
    upLoadImgApi
  } from '@/api/commonApi.js'
  import { uploadImgToBase64 } from '@/utils/base64.js' // 导入本地图片转base64的方法
  export default {
    name: "editImage",
    props: {
      editRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isNew: true,
        imageUrl: '',
        fileObj: {},
        basicImgUrl: this.$store.state.basics.img_url_cat
      };
    },
    methods: {
      closeNew() {
        this.isNew = false
        this.$emit('closeNew')
      },
      submit() {
        this.$refs.upload.submit();
      },
      updateImgByCGuid(FileName) {
        updateImgByCGuid({
          categoryGuid: this.editRow.guid,
          img: FileName
        }).then(res => {
          console.log(res);
          this.$emit('closeNew')
          this.$emit('refresh')
        })
      },
      handleAvatarSuccess(res, file) {
      },
      preUploadImg(file, fileList) {
        console.log(file);
        this.fileObj = file
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      // 正经上传图片
      async uploadImg(item) {
        console.log(item);
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        let FileName = item.file.name
        let FilePath = 'category\\images'
        let data = base64File
        upLoadImgApi(data,FileName,FilePath).then(res => {
          if(res.OK=='True') {
            this.$message({
              type: 'success',
              message: res.Message
            });
            this.updateImgByCGuid(FileName)
          }
        })
      },
      beforeClose() {
        console.log(999);
        this.$emit('closeNew')
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss">
</style>
