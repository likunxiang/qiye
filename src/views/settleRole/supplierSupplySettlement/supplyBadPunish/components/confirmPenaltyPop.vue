<template>
  <el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body style="margin-top: 30vh;">
    <div class="mb10 bold">确认已经收到</div>
    <div class="mb10">{{row.userName}}{{row.userNation}}{{row.userPhonenumber}}</div>
    <div class="mb10">【{{row.categoryName}}】</div>
    <div class="mb10 bold">采购编号({{row.orderNo}})的【供方违约处罚】款项：{{row.disobeyFee}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { confirmPay } from '@/api/settleRoleApi/supplierSupplySettlement/supplyBadPunish.js'
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
        this.confirmPay()

      },
      beforeClose() {
        this.close()
      },
      async confirmPay(){
        await confirmPay({
          judgeFeeGuid: this.row.judgeFeeGuid
        }).then(res => {
          console.log(res);
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.$emit('refresh')
            this.close()
          } else {
            this.$message('操作失败');
          }
        })
      }
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
