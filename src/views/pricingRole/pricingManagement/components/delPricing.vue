<template>
  <el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">创建日期</div>
        <div>{{openRow.createTime}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">收取对象</div>
        <div>{{openRow.targetObject}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">收取方式</div>
        <div>{{openRow.chargeType}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">收取数值</div>
        <div>{{openRow.chargeValue}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">起始时间</div>
        <div>{{openRow.startDate}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div class="my-label">终止时间</div>
        <div>{{openRow.endDate}}</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div>若是在执行期，被删除后，则按照其他方式收取服务费？请确认与该供方线下的合约保持一致。</div>
      </el-row>
      <el-row class="flex mb10 flex-center">
        <div>确认删除？</div>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    deleteMn
  } from '@/api/pricingRoleApi/pricingManagement.js'
  export default {
    name: "index",
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
        isOpen: true,
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
      submit() {
        this.deleteMn()
      },
      async deleteMn() {
        await deleteMn({
          serviceFeeMnGuid: this.openRow.serviceFeeMnGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }

          }
        })
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 120px;
  }
</style>
