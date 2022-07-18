<template>
  <!-- 查看裁决结果 -->
  <el-dialog title="查看裁决结果" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 40px;">
      <div class="flex flex-center jsb mb10">
        <div style="width: 100%;" class="flex flex-center jsb">
          <div class="flex">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl_cat + refundObj.categoryImg" fit="fit">
            </el-image>
            <div>
              <div>{{refundObj.categoryName}}</div>
              <div>{{refundObj.categoryAlias}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex jsb">
        <div>采购编号：{{refundObj.orderNo}}</div>
        <div>日期：{{refundObj.orderTime}}</div>
      </div>
      <div class="title-bg mb10 mt10">结果内容</div>
      <div class="mb20">
        <div class="mb10 bold">裁决理由</div>
        <el-input type="textarea" :readonly='true' :rows="4" placeholder="无" v-model="fingdingReason">
        </el-input>
      </div>
      <div class="mb20">
        <div class="mb10 bold">裁决结果</div>
        <div class="flex flex-center">
          <div class="el-icon-circle-check"></div>
          <div>{{judgeResult}}</div>
        </div>
      </div>
      <div class="mb20">
        <div class="mb10 bold">第三方报告</div>
        <el-image class="mr10" style="width: 100px; height: 100px" v-for="(img,index) in thirdImgs" :key='index' :src="img" fit="fit"></el-image>
      </div>
      <div class="title-bg mb10 mt10">违约金及相关费用说明</div>
      <!-- 1：需方违约，支持退款 -->
      <template v-if="refundType == '1'">
        <div class="mb20 flex flex-center jsb">
          <div>
            <div class="flex flex-center mb20">
              <div class="bold" style="width: 120px;">违约方违约费用</div>
              <el-input v-model="refundObj.disobeyFee" :readonly='true' style="width: 80px;"></el-input>
            </div>
            <div class="flex flex-center">
              <div class="bold" style="width: 120px;">收取对象</div>
              <div>需方</div>
            </div>
          </div>
          <el-button @click="openDedit">违约费用明细</el-button>
        </div>
        <el-divider></el-divider>
        <div class="mb20 flex flex-center jsb">
          <div>
            <div class="flex flex-center mb20">
              <div class="bold" style="width: 120px;">守约方赔偿金额</div>
              <el-input v-model="refundObj.obeyFee" :readonly='true' style="width: 80px;"></el-input>
            </div>
            <div class="flex flex-center">
              <div class="bold" style="width: 120px;">赔偿对象</div>
              <div>供方</div>
            </div>
          </div>
          <el-button @click="openDamage">赔偿金额明细</el-button>
        </div>
      </template>
      <!-- 2：供方违约，支持退款 -->
      <template v-if="refundType == '2'">
        <div class="mb20 flex flex-center jsb">
          <div>
            <div class="flex flex-center mb20">
              <div class="bold" style="width: 120px;">违约方违约费用</div>
              <el-input v-model="refundObj.disobeyFee" :readonly='true' style="width: 80px;"></el-input>
            </div>
            <div class="flex flex-center">
              <div class="bold" style="width: 120px;">收取对象</div>
              <div>供方</div>
            </div>
          </div>
          <el-button @click="openDedit">违约费用明细</el-button>
        </div>
        <el-divider></el-divider>
        <div class="mb20 flex flex-center jsb">
          <div>
            <div class="flex flex-center mb20">
              <div class="bold" style="width: 120px;">守约方赔偿金额</div>
              <el-input v-model="refundObj.obeyFee" :readonly='true' style="width: 80px;"></el-input>
            </div>
            <div class="flex flex-center">
              <div class="bold" style="width: 120px;">赔偿对象</div>
              <div>需方</div>
            </div>
          </div>
          <el-button @click="openDamage">赔偿金额明细</el-button>
        </div>
      </template>
      <!-- 3：交易正常，维持交易 -->
      <template v-if="refundType == '3' || refundType == '4'">
        <div class="mb20 flex flex-center jsb" style="color: #999">
          <div>
            <div class="flex flex-center mb20">
              <div class="bold" style="width: 120px;">违约方违约费用</div>
              <el-input v-model="refundObj.disobeyFee" placeholder="请填写" :readonly='true' :disabled="true" style="width: 80px;"></el-input>
            </div>
            <div class="flex flex-center">
              <div class="bold" style="width: 120px;">收取对象</div>
              <div>无</div>
            </div>
          </div>
          <el-button :disabled="true" @click="openDedit">违约费用明细</el-button>
        </div>
        <el-divider></el-divider>
        <div class="mb20 flex flex-center jsb">
          <div>
            <div class="flex flex-center mb20">
              <div class="bold" style="width: 120px;">守约方赔偿金额</div>
              <el-input v-model="refundObj.obeyFee" placeholder="请填写" :disabled="true" :readonly='true' style="width: 80px;"></el-input>
            </div>
            <div class="flex flex-center">
              <div class="bold" style="width: 120px;">赔偿对象</div>
              <div>无</div>
            </div>
          </div>
          <el-button :disabled="true" @click="openDamage">赔偿金额明细</el-button>
        </div>

      </template>
    </div>
    <!-- 违约费用明细弹窗 -->
    <deditDetail v-if="isDedit" :content="refundObj.disobeyRemark" @close="closeDedit"></deditDetail>

    <damageDetail v-if="isDamage" :content="refundObj.obeyRemark" @close="closeDamage"></damageDetail>
  </el-dialog>
</template>

<script>
  import {
    getJudgeResult
  } from '@/api/commonApi.js'
  import deditDetail from '@/views/components/common/findingResultPop/deditDetail.vue'
  import damageDetail from '@/views/components/common/findingResultPop/damageDetail.vue'
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
      }
    },
    data() {
      return {
        isOpen: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.qjimage.com%2Fchineseview046%2Fhigh%2Feast-ep-a81-1118208.jpg&refer=http%3A%2F%2Fpic.qjimage.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641710877&t=3feb0470230efd79f8569600c4795dbb',
        fingdingReason: '按照退货。。。。',
        punishFree: 0, // 处罚金，
        damageFree: 0, // 赔偿金
        thirdPartyFree: 0, // 第三方费用
        radioResult: 0,
        radioObject: 0,
        refundObj: {},
        judgeResult: '', // 裁决结果
        thirdImgs: [], // 第三方证明图片
        refundType: '1', // 裁决类型
        isDedit: false,
        isDamage: false,
        imgBasicUrl: this.$store.state.basics.img_url_jud,
        imgBasicUrl_cat: this.$store.state.basics.img_url_cat
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
      async getJudgeResult() {
        await getJudgeResult({
          judgeGuid: this.row.judgeGuid
        }).then(res => {
          console.log(res);
          if(res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.refundObj = data
            this.fingdingReason = data.judgeReason
            this.refundType = data.judgeResult
            if (data.judgeResult == '1') {
              this.judgeResult = '需方违约，支持退款'
            } else if (data.judgeResult == '2') {
              this.judgeResult = '供方违约，支持退款'
            } else if (data.judgeResult == '3') {
              this.judgeResult = '交易正常，维持交易'
            } else if (data.judgeResult == '4') {
              this.judgeResult = '交易取消，支持退款'
            }
            if (data.thirdReports.length > 0) {
              let imgArr = data.thirdReports.split(',')
              let imgArrUrl = imgArr.map(item => this.imgBasicUrl + item)
              this.thirdImgs = imgArrUrl
            } else {
              this.thirdImgs = []
            }
          } else {
            this.refundObj = {}
            this.fingdingReason = ''
            this.refundType = '1'
            this.judgeResult = ''
            this.thirdImgs = []
          }
        })
      }
    },
    created() {
      this.getJudgeResult()
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
</style>
