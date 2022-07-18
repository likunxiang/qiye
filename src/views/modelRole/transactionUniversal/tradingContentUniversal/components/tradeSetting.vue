<template>
  <el-dialog title="交易节点设置" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="input-box">
      <div class="flex flex-center">
        <div class="input-text mr20">品类名称</div>
        <div class="">{{openRow.name}}</div>
      </div>
      <el-row>
        <h4 class="bold">需求供应节点页面格式设置</h4>
        <el-radio-group v-model="radioPage">
          <el-row class="mb10">
            <el-radio :label="1">沟通版</el-radio>
          </el-row>
          <el-row>
            <el-radio :label="2">交易版（先费用后执行版）</el-radio>
          </el-row>
        </el-radio-group>
      </el-row>
      <el-row>
        <h4 class="title-bg">采购节点设置</h4>
        <h4 class="bold">1报价收集周期规则设置</h4>
        <el-radio-group v-model="radioOffer">
          <el-row class="mb10">
            <el-radio :label="1">按分钟收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2">按小时收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2">按小时收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2">按小时收集供方报价</el-radio>
          </el-row>
        </el-radio-group>
      </el-row>
      <el-row>
        <h4 class="title-bg">供应节点设置</h4>
        <h4 class="bold">1供应需求节点页面格式</h4>
        <el-radio-group v-model="radioSupplyNeed">
          <el-row class="mb10">
            <el-radio :label="1">按分钟收集供方报价</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2">按小时收集供方报价</el-radio>
          </el-row>
        </el-radio-group>
        <h4 class="bold">2供应报价节点页面格式</h4>
        <el-radio-group v-model="radioSupplyOffer">
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
        <el-radio-group v-model="radioService">
          <el-row class="mb10">
            <el-radio :label="1">收费</el-radio>
          </el-row>
          <el-row class="mb10">
            <el-radio :label="2">免费</el-radio>
          </el-row>
        </el-radio-group>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="closeNew">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "tradeSetting",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        newName: '',
        isNew: true,
        radioPage: 0,
        radioOffer: 0,
        radioSupplyNeed: 0,
        radioSupplyOffer: 0,
        radioService: 0,
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
      }
    },
    onLoad() {},
  };
</script>

<style lang="scss">
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }
</style>
