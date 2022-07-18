<template>
  <el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body
    style="margin-top: 30vh;">
    <div class="mb10 bold">确认</div>
    <div class="mb10">【{{row.categoryName}}】</div>
    <div class="mb10 bold">采购编号（{{row.orderNo}}）退货供方签收由系统【验收通过】。</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    updateSuAccept
  } from '@/api/settleRoleApi/buyerPurchaseSettlement/buyerRefundPay.js'
  import {
    SysMakeJudge,
    webOrderRefund
  } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'

  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
      };
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      submit() {
        this.updateSuAccept()
      },
      beforeClose() {
        this.close()
      },
      async updateSuAccept() {
        await updateSuAccept({
          refundGuid: this.row.refundGuid
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.close()
            this.webOrderRefund()
            this.$emit('refresh')
          } else {
            this.$message('操作失败');
          }
        })
      },
      // 提交批复后,调用这个接口
      async webOrderRefund() {
        await webOrderRefund({
          judgeGuid: this.row.judgeGuid,
          orderGuid: this.row.orderGuid,
          judgeResult: this.row.judgeResult,
          operationUserId: this.$store.state.user.adminId || 1
        }).then(res => {
          console.log(res);
        })
      },
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .dialog-footer {
    text-align: center;
  }
</style>
