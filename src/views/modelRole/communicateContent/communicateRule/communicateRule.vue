<template>
  <div class="app-container left">
    <div class="">
      <div class="flex flex-center">
        <div class="input-text mr20 bold">品类类型</div>
        <div class="">人力资源需求</div>
      </div>
      <div class="flex flex-center mt10">
        <div class="input-text mr20 bold">交易类型</div>
        <div class="">{{model==1?'沟通模式':'交易模式'}}</div>
      </div>
      <el-row>
        <h4 class="title-bg">采购节点设置</h4>
        <h4 class="bold">需求供应节点页面格式设置</h4>
        <el-radio-group v-model="demandPageMode">
          <el-row class="mb10">
            <el-radio :label="1" :disabled="model==2">沟通模式版</el-radio>
          </el-row>
          <el-row>
            <el-radio :label="2" :disabled="model==1">交易模式版</el-radio>
          </el-row>
        </el-radio-group>
        <h4 class="bold">1报价收集周期规则设置</h4>
        <el-radio-group v-model="demandPriceType" :disabled="model==1">
          <el-row class="mb10">
            <el-radio :label="1">按分钟收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2">按小时收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="3">按天收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="4">按月收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="5">按年收集供方报价</el-radio>
          </el-row>
        </el-radio-group>
      </el-row>
      <el-row>
        <h4 class="title-bg">供应节点设置</h4>
        <h4 class="bold">1供应管理页面格式</h4>
        <el-radio-group v-model="supplyManagePage">
          <el-row class="mb10">
            <el-radio :label="1" :disabled="model==2">沟通模式版</el-radio>
          </el-row>
          <el-row>
            <el-radio :label="2" :disabled="model==1">交易模式版</el-radio>
          </el-row>
        </el-radio-group>
        <h4 class="bold">2供应需求节点页面格式</h4>
        <el-radio-group v-model="supplyPageMode">
          <el-row class="mb10">
            <el-radio :label="1" :disabled="model==1">型号报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2" :disabled="model==1">按单报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="3" :disabled="model==2">简历模式</el-radio>
          </el-row>
        </el-radio-group>
        <h4 class="bold">3供应报价节点页面格式</h4>
        <el-radio-group v-model="supplyPriceMode" :disabled="model==1">
          <el-row class="mb10">
            <el-radio :label="1">型号报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2">按单报价</el-radio>
          </el-row>
        </el-radio-group>
      </el-row>
      <el-row>
        <h4 class="title-bg">服务费用设置</h4>
        <h4 class="bold">1服务费用收取与否设置</h4>
        <el-radio-group v-model="serveFeeFlag">
          <el-row class="mb10">
            <el-radio :label="1" :disabled="model==1">收费</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="0">免费</el-radio>
          </el-row>
        </el-radio-group>
      </el-row>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span> -->
  </div>

</template>

<script>
  import {
    updateDealRule,
	getDealRuleByGuid
  } from '@/api/modelRoleApi/transactionRules.js'
  export default {
    name: "tradeSetting",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    data() {
      return {
        newName: '',
        model: 1,
        isNew: true,
        demandPageMode: 1,
        demandPriceType: -1,
        supplyManagePage: 1,
        supplyPageMode: 3,
        supplyPriceMode: -1,
        serveFeeFlag: 0,
      };
    },
    methods: {
      // 新建类名
      closeNew() {
        this.isNew = false
        this.$emit('closeSetting')
      },
      beforeClose() {
        console.log(999);
        this.$emit('closeSetting')
      },
      submit() {
        this.updateDealRule()
      },
      async updateDealRule() {
        await updateDealRule({
          categoryGuid: this.openRow.categoryGuid,
          demandPageMode: this.demandPageMode,
          demandPriceType: this.demandPriceType,
          supplyManagePage: this.supplyManagePage,
          supplyPageMode: this.supplyPageMode,
          supplyPriceMode: this.supplyPriceMode,
          serveFeeFlag: this.serveFeeFlag
        }).then(res => {
          if (res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '设置成功！'
            })
            this.closeNew()
            this.$emit('refresh')
          } else {
            this.$message({
              type: 'error',
              message: '设置失败！'
            })
          }
        })
      },
	  async getDealRuleByGuid() {
		  await getDealRuleByGuid({
			dealRuleGuid: this.openRow.dealRuleGuid,
		  }).then(res => {
			console.log(res);
			let data = res.Tag[0].Table[0]
			this.demandPageMode = parseInt(data.demandPageMode)
			this.demandPriceType = parseInt(data.demandPriceType)
			this.supplyManagePage = parseInt(data.supplyManagePage)
			this.supplyPageMode = parseInt(data.supplyPageMode)
			this.supplyPriceMode = parseInt(data.supplyPriceMode)
			this.serveFeeFlag = parseInt(data.serveFeeFlag)
		  })
	  }
    },
    mounted() {
		this.getDealRuleByGuid()
    }
  };
</script>

<style lang="scss" scoped>
  .left {
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }
</style>
