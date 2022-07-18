<template>
  <el-dialog title="查看付款证明" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row style="padding-bottom: 40px;">

      <div>{{returnPayMsg?returnPayMsg:'无'}}</div>
    </el-row>
  </el-dialog>
</template>

<script>
  import { getReturnPaidProve } from '@/api/settleRoleApi/buyerPurchaseSettlement/buyerRefundPay.js'
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
        returnPayMsg: ''
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
      async getReturnPaidProve() {
        await getReturnPaidProve({
          refundGuid: this.row.refundGuid,
        }).then(res => {
          console.log(res);
          let data = res.Tag[0].Table[0]
          this.returnPayMsg = data.returnPayMsg
        })
      }
    },
    created() {
      this.getReturnPaidProve()
    }
  };
</script>

<style lang="scss" scoped>
</style>
