<template>
  <el-dialog title="编辑字段别名" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="input-box">
      <div class="flex flex-center">
        <div class="input-text">字段名称</div>
        <div class="">{{editRow.plateFieldName}}</div>
      </div>
      <div class="flex mt20">
        <div style="height: 32px;line-height: 32px;flex-shrink: 0;width: 80px;">字段别名</div>
        <el-input class="mr20" style="width: 240px;" type="text" v-model="newName" placeholder="请输入这个字段另外的叫法" />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { updatePlateFieldAlias } from '@/api/commonApi.js'
  export default {
    name: "newClassName",
    props: {
      editRow: {
        type: Object,
        default:() => {
          return {}
        }
      }
    },
    data() {
      return {
        newName: '',
        isNew: true,
      };
    },
    methods: {
      // 新建类名
      closeNew() {
        this.isNew = false
        this.$emit('close')
      },
      submit() {
        this.updatePlateFieldAlias()

      },
      beforeClose() {
        console.log(999);
        this.$emit('closeNew')
      },
      updatePlateFieldAlias() {
        updatePlateFieldAlias({
          plateFieldGuid: this.editRow.plateFieldGuid,
          plateFieldAlias: this.newName
        }).then(res => {
          if(res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.$emit('refresh')
            this.closeNew()
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
      this.newName = this.editRow.plateFieldAlias
    }
  };
</script>

<style lang="scss">
  .input-box {
    padding: 20px;
  }
  .input-text {
    width: 80px;
  }
</style>
