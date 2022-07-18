<template>
  <!-- 裁决结果批复 -->
  <el-dialog title="裁决结果批复" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 40px;">
      <div class="flex flex-center jsb mb10">
        <div style="width: 100%;" class="flex flex-center jsb">
          <div class="flex">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="row.categoryImg" fit="fit">
            </el-image>
            <div>
              <div>{{row.categoryName}}</div>
              <div>{{row.categoryAlias}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex jsb">
        <div>采购编号：{{row.orderNo}}</div>
        <div>日期：{{row.orderTime}}</div>
      </div>
      <div class="title-bg mb10 mt10">结果内容</div>
      <div class="mb20">
        <div class="mb10 bold">裁决理由</div>
        <el-input type="textarea" :rows="4" placeholder="请输入裁决理由" v-model="fingdingReason">
        </el-input>
      </div>
      <div class="mb20">
        <div class="mb10 bold">裁决结果</div>
        <el-radio-group class="flex" v-model="radioResult">
          <div class="flex1">
            <el-radio :label="9">交易取消，支持退款</el-radio>

          </div>

        </el-radio-group>
        <div class="flex mt10">
          <div class="flex1" style="padding-left: 22px;">
            <div>适用范围：</div>
            <div>有关联订单取消，导致本订单取消</div>
          </div>
        </div>
      </div>
      <div class="mb20">
        <div class="mb10 bold">第三方报告</div>
        <template v-if="url.length > 0">

          <el-image class="mr10" style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
        </template>
        <template v-else>
          <el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
            :on-change="preUploadImg" :http-request="uploadImg" :multiple="true" :on-success="handleAvatarSuccess">
            <div class="flex" style="flex-wrap: wrap;">
              <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
                v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
              <div class="flex flex-center non-image">
                <div class="el-icon-plus" style="font-size: 36px;"></div>
              </div>
            </div>
          </el-upload>


        </template>
      </div>
      <div class="title-bg mb10 mt10">违约金及相关费用说明</div>
      <div class="mb20 flex flex-center jsb">
        <div>
          <div class="flex flex-center mb20">
            <div class="bold" style="width: 120px;">违约方违约费用</div>
            <el-input :disabled="true" v-model="damageFree" placeholder="请填写" style="width: 80px;"></el-input>
          </div>
          <div class="flex flex-center">
            <div class="bold" style="width: 120px;">收取对象</div>
            <el-radio-group class="flex" :disabled="true" v-model="radioObject">
                <el-radio :label="1">需方支付</el-radio>
                <el-radio :label="2">供方支付</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button :disabled="true">违约费用明细</el-button>
      </div>
      <el-divider></el-divider>
      <div class="mb20 flex flex-center jsb">
        <div>
          <div class="flex flex-center mb20">
            <div class="bold" style="width: 120px;">守约方赔偿金额</div>
            <el-input :disabled="true" v-model="damageFree" placeholder="请填写" style="width: 80px;"></el-input>
          </div>
          <div class="flex flex-center">
            <div class="bold" style="width: 120px;">赔偿对象</div>
            <el-radio-group :disabled="true" class="flex" v-model="radioObject">
                <el-radio :label="1">需方支付</el-radio>
                <el-radio :label="2">供方支付</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button :disabled="true">赔偿金额明细</el-button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { NonSysMakeJudge } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
  import {
    upLoadImgApi,
    GetfeeNo
  } from '@/api/commonApi.js'
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  export default {
    name: "index",
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    data() {
      return {
        isOpen: true,
        imgList: [], // 图片储存
        imgListShow: [], // 展示列表
        url: '',
        uploadUrl: '',
        step: 0,
        fingdingReason: '',
        punishFree: 0, // 处罚金，
        damageFree: 0, // 赔偿金
        thirdPartyFree: 0, // 第三方费用
        radioResult: 0,
        radioObject: 0,
        imgBasicUrl_cat: this.$store.state.basics.img_url_cat,
        imgBasicUrl: this.$store.state.basics.img_url_jud
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
        if (this.fingdingReason && this.radioResult > 0) {
          if(this.imgList.length > 0) {
            console.log(999999);
            this.$refs.upload.submit();
          } else {
            this.NonSysMakeJudge()
          }

        } else {
          this.$message({
            type: 'error',
            message: '有信息没填!'
          });
        }
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
      },
      // 正经上传图片
      async uploadImg(item) {
        console.log(item);
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        let FileName = item.file.name
        let FilePath = 'judge\\images'
        let data = base64File
        upLoadImgApi(data, FileName, FilePath).then(res => {
          if (res.OK == 'True') {
            this.step++
            if (this.step == this.imgList.length) {
              this.NonSysMakeJudge()
            }

          }
        })
      },
      async NonSysMakeJudge() {
        console.log('row',this.row);
        await NonSysMakeJudge({
          judgeGuid: this.row.judgeGuid,
          reason: this.fingdingReason,
          thirdReports: this.uploadUrl  // TODO
        }).then(res => {
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
        })
      },
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    font-weight: bold;
    padding: 10px;
  }

  .my-label {
    width: 120px;
    font-weight: bold;
  }
  .non-image {
    width: 100px;
    height: 100px;
    justify-content: center;
    background-color: #F5F7FA;
  }
</style>
