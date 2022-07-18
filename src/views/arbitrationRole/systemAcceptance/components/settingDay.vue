<template>
  <el-dialog title="期限设置" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row>
      <div class="flex mb20 flex-center">
        <div class="my-label bold">品类名称</div>
        <div>{{row.category_name}}</div>
      </div>
			<div class="flex mb20 flex-center">
			  <div class="my-label bold">品类类型</div>
			  <div>{{row.cattypeName}}</div>
			</div>
      <div class="flex mb20 flex-center">
        <div class="my-label bold">验收期限</div>
        <div class="flex flex-center">
          <el-input style="width: 80px;margin-right: 10px;" v-model="appointDay" placeholder="请填写"></el-input>小时
        </div>
      </div>
    </el-row>
    <el-row>
      自订单的供方全部处理完成后开始计时
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import { insertDeadline } from "@/api/arbitrationRoleApi/systemAcceptance.js"
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
        appointDay: '',
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
        this.$confirm('【'+this.row.category_name+'】\n期限为'+this.appointDay+'小时，请确认保存', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.insertDeadline()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      // 提交
      async insertDeadline() {
        await insertDeadline({
          category_guid: this.row.category_guid,
          day: this.appointDay
        }).then(res => {
          console.log(res);
          if(res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.$emit('refresh')
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            });
          }
        })
      }
    },
    mounted() {

    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 120px;
  }
</style>
