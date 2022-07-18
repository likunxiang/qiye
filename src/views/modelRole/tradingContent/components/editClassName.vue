<template>
  <el-dialog title="编辑类型别名" width="700px" :visible.sync="isOpen" destroy-on-close>
  	<el-row>
  		<div class="flex flex-center mt10">
  			<div class="bold input-text">板块类型</div>
  			<div class="">{{editRow.plateTypeName}}</div>
  		</div>
  	</el-row>
  	<el-row class="mt20 pb20">
  		<div class="flex flex-center mb10">
  			<div class="input-text">板块类型别名</div>
  			<el-input placeholder="请输入" v-model="editName"></el-input>
  		</div>
  	</el-row>
  	<span slot="footer" class="dialog-footer">
  		<el-button @click="close">取 消</el-button>
  		<el-button type="primary" @click="submit" :disabled="!editName">确 定</el-button>
  	</span>
  </el-dialog>
</template>

<script>
  import { updatePlateTypeAlias_1_0_1 } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
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
        isOpen: true,
        editName: ''
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
        this.updatePlateTypeAlias_1_0_1()
      },
      updatePlateTypeAlias_1_0_1() {
        updatePlateTypeAlias_1_0_1({
          plateTypeGuid: this.editRow.plateTypeGuid,
          plateTypeAlias: this.editName
        }).then(res => {
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
    created() {
      this.editName = this.editRow.plateTypeName
    }
  };
</script>

<style lang="scss" scoped>
	.input-text {
		width: 90px;
	}
</style>
