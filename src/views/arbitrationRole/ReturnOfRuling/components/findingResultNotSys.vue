<template>
  <!-- 裁决结果批复 -->
  <el-dialog title="裁决结果批复" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 40px;">
      <div class="flex flex-center jsb mb10">
        <div style="width: 100%;" class="flex flex-center jsb">
          <div class="flex">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl_cat + row.categoryImg" fit="fit">
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
        <el-radio-group class="flex" v-model="radioResult" @change="chooseResult">
          <div class="flex1">
            <el-radio :label="1">需方违约，支持退款</el-radio>

          </div>
          <div class="flex1">
            <el-radio :label="2">供方违约，支持退款</el-radio>

          </div>
          <div class="flex1">
            <el-radio :label="3">交易正常，维持交易</el-radio>

          </div>

        </el-radio-group>
        <div class="flex mt10">
          <div class="flex1" style="padding-left: 22px;">
            <div>适用范围：</div>
            <div>需方取消订单</div>
          </div>
          <div class="flex1" style="padding-left: 22px;">
            <div>适用范围：</div>
            <div>供方取消订单货不对板</div>
          </div>
          <div class="flex1" style="padding-left: 22px;">
            <div>适用范围：</div>
            <div>符合需求信息</div>
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
            <el-input v-model="damageFree" placeholder="请填写" style="width: 80px;"></el-input>
          </div>
          <div class="flex flex-center">
            <div class="bold" style="width: 120px;">收取对象</div>
            <el-radio-group class="flex" v-model="radioColloct" :disabled="true">
              <el-radio :label="1">需方</el-radio>
              <el-radio :label="2">供方</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button @click="openDedit">违约费用明细</el-button>
      </div>
      <el-divider></el-divider>
      <div class="mb20 flex flex-center jsb">
        <div>
          <div class="flex flex-center mb20">
            <div class="bold" style="width: 120px;">守约方赔偿金额</div>
            <el-input v-model="punishFree" placeholder="请填写" style="width: 80px;"></el-input>
          </div>
          <div class="flex flex-center">
            <div class="bold" style="width: 120px;">赔偿对象</div>
            <el-radio-group class="flex" v-model="radioWin" :disabled="true">
              <el-radio :label="1">需方</el-radio>
              <el-radio :label="2">供方</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button @click="openDamage">赔偿金额明细</el-button>
      </div>


      <!-- 违约费用明细弹窗 -->
      <deditDetail v-if="isDedit" :content="disobeyFeeRemark" @close="closeDedit" @getContent="getDedit"></deditDetail>

      <damageDetail v-if="isDamage" :content="obeyFeeRemark" @close="closeDamage" @getContent="getDamage">
      </damageDetail>


    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    SysMakeJudge,
  } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
  import deditDetail from '@/views/arbitrationRole/ReturnOfRuling/components/deditDetail.vue'
  import damageDetail from '@/views/arbitrationRole/ReturnOfRuling/components/damageDetail.vue'
  import {
    upLoadImgApi,
    GetfeeNo
  } from '@/api/commonApi.js'
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  export default {
    name: "index",
    components: {
      deditDetail,
      damageDetail
    },
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
        fingdingReason: '',
        punishFree: '', // 赔偿金，
        damageFree: '', // 违约金
        radioResult: 0,
        radioColloct: 0, // 收取对象
        radioWin: 0, // 赔付对象
        isDedit: false,
        isDamage: false,
        disobeyFeeRemark: '', // 违约费用说明
        obeyFeeRemark: '', // 赔偿金说明,
        step: 0, // 用于判断图片是否传完
        feeNo1: '', // 仲裁账单类型1编号
        feeNo2: '', // 仲裁账单类型2编号
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
      openDedit() {
        this.isDedit = true
      },
      closeDedit() {
        this.isDedit = false
      },
      openDamage() {
        this.isDamage = true
      },
      closeDamage() {
        this.isDamage = false
      },
      getDedit(data) {
        this.disobeyFeeRemark = data
      },
      getDamage(data) {
        this.obeyFeeRemark = data
      },
      // 选择裁决结果
      chooseResult(val) {
        if (val == 1) { // 需方违约
          this.radioColloct = 1
          this.radioWin = 2
        } else if (val == 2) { // 供方违约
          this.radioColloct = 2
          this.radioWin = 1
        } else {
          this.radioColloct = 0
          this.radioWin = 0
        }
      },
      submit() {
        if (this.fingdingReason && this.radioResult > 0 && parseFloat(this.damageFree) * 100 >= 0 && parseFloat(this.punishFree) * 100 >= 0) {
          if(this.imgList.length > 0) {
            console.log(999999);
            this.$refs.upload.submit();
          } else {
            this.SysMakeJudge()
          }

        } else {
          this.$message({
            type: 'error',
            message: '有信息没填或填写错误!'
          });
        }
      },
      async SysMakeJudge() {
        await SysMakeJudge({
          orderGuid: this.row.orderGuid,
          judgeGuid: this.row.judgeGuid,
          reason: this.fingdingReason,
          result: this.radioResult,
          thirdReports: this.uploadUrl, // TODO
          disobeyFee: parseFloat(this.damageFree) * 100,
          obeyFee: parseFloat(this.punishFree) * 100,
          disobeyFeeRemark: this.disobeyFeeRemark,
          obeyFeeRemark: this.obeyFeeRemark,
          feeNo1: this.feeNo1,
          feeNo2: this.feeNo2
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
            this.$refs.upload.clearFiles()
            this.imgList = []
            this.imgListShow = []
            // this.uploadUrl = []
          }
        })
      },
      // 获取仲裁账单类型
      async GetfeeNo1() {
        await GetfeeNo().then(res => {
          this.feeNo1 = res
          this.GetfeeNo2()
        })
      },
      // 获取仲裁账单类型
      async GetfeeNo2() {
        await GetfeeNo().then(res => {
          this.feeNo2 = res
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
              this.SysMakeJudge()
            }

          }
        })
      },
    },
    created() {
      this.GetfeeNo1()
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
