<template>
  <el-dialog title="查看付款证明" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row style="padding-bottom: 20px;">
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px" label-position="top">
        <el-form-item label="提交日期" prop="imgUrl">
          <span>{{ruleForm.date}}</span>
        </el-form-item>
        <el-form-item label="付款证明" prop="imgUrl">
		  <template v-if="ruleForm.imgUrl[0].length > 0">
			  <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + img" fit="fit" v-for="(img,index) in ruleForm.imgUrl" :key="index"></el-image>
		  </template>
          <template v-else>
			  <div>无</div>
		  </template>
        </el-form-item>
      </el-form>
      <div class="title-bg mb10">适用规则</div>
      <div>{{ruleForm.bizRuleName}}</div>
    </el-row>
  </el-dialog>
</template>

<script>
  import { getPayDetail } from '@/api/settleRoleApi/supplierSupplySettlement/supplyBadPunish.js'
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
          date: '',
          imgUrl: [''],
          bizRuleName: '',
          bizRuleGuid: ''
        },
        imgBasicUrl: this.$store.state.basics.img_url_set_dis
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
      async getPayDetail() {
        await getPayDetail({
          judgeFeeGuid: this.row.judgeFeeGuid,
        }).then(res => {
          console.log(res);
          let data = res.Tag[0].Table[0]
          this.ruleForm.date = data.payTime
          this.ruleForm.bizRuleName = data.bizRuleName
          this.ruleForm.bizRuleGuid = data.bizRuleGuid
          this.ruleForm.imgUrl = data.payProve.split(',')
        })
      }
    },
    created() {
		this.getPayDetail()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
    font-weight: bold;
  }
</style>
