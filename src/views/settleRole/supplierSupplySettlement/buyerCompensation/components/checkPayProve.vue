<template>
  <el-dialog title="查看付款证明" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row style="padding-bottom: 20px;">
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px" label-position="top">
        <el-form-item label="提交日期" prop="imgUrl">
          <span>{{ruleForm.date}}</span>
        </el-form-item>
        <el-form-item label="付款证明" prop="imgUrl">
          <template v-if="ruleForm.imgUrl[0].length > 0">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + img" fit="fit"
              v-for="(img,index) in ruleForm.imgUrl" :key="index"></el-image>
          </template>
          <template v-else>
            <div>无</div>
          </template>
        </el-form-item>
        <el-form-item label="付款说明" prop="explain">
          <el-input disabled type="textarea" placeholder="无" v-model="ruleForm.explain"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
  import {
    getPaidProve
  } from '@/api/settleRoleApi/supplierSupplySettlement/buyerCompensation.js'
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
          explain: '无',
          date: '',
          imgUrl: [''],
        },
        imgBasicUrl: this.$store.state.basics.img_url_set_obe
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
      async getPaidProve() {
        await getPaidProve({
          judgeFeeGuid: this.row.judgeFeeGuid,
        }).then(res => {
          console.log(res);
          let data = res.Tag[0].Table[0]
          this.ruleForm.explain = data.confirmRefundPayRemark
          this.ruleForm.date = data.confirmRefundPayProveTime
          this.ruleForm.imgUrl = data.confirmRefundPayProve ? data.confirmRefundPayProve.split(',') : []
        })
      }
    },
    created() {
      this.getPaidProve()
    }
  };
</script>

<style lang="scss" scoped>
</style>
