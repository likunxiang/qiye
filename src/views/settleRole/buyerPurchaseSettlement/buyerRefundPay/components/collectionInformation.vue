<template>
  <el-dialog title="查看收款账号信息" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row style="padding-bottom: 40px;">
      <el-descriptions border column="1" size="medium">
        <el-descriptions-item label="支付类型" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.thirdPayType}}</el-descriptions-item>
        <el-descriptions-item label="支付账号" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.buyerAccount}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
  </el-dialog>
</template>

<script>
  import {
    getPayAccount
  } from '@/api/settleRoleApi/buyerPurchaseSettlement/buyerRefundPay.js'
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
          thirdPayType: '',
          buyerAccount: '',
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
      async getPayAccount() {
        await getPayAccount({
          orderGuid: this.row.orderGuid
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
      this.getPayAccount()
    }
  };
</script>

<style lang="scss" scoped>
</style>
