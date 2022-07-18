<template>
  <el-dialog title="收款账号信息" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row style="padding-bottom: 40px;">
      <el-descriptions border column="1" size="medium">
        <el-descriptions-item label="账户名称" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.bankUserName}}</el-descriptions-item>
        <el-descriptions-item label="开户银行" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.bankName}}</el-descriptions-item>
        <el-descriptions-item label="银行账号" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.bankAccount}}</el-descriptions-item>
        <el-descriptions-item label="银行地址" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.bankAddr}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
  </el-dialog>
</template>

<script>
  import {
    getSupplyBankInfo
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
        collectionObj: {
          name: '林都',
          yinhan: '中国建设银行股份有限公司福州支行',
          zhanghao: '6222  3718  6677  9988  256',
          address: '银行地址'
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
      async getSupplyBankInfo() {
        await getSupplyBankInfo({
          judgeFeeGuid: this.row.judgeFeeGuid
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.collectionObj = res.Tag[0].Table[0]
          } else {
            this.collectionObj = {}
          }
        })
      }
    },
    created() {
      this.getSupplyBankInfo()
    }
  };
</script>

<style lang="scss" scoped>
</style>
