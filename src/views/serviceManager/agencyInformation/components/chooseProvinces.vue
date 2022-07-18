<template>
  <el-dialog title="服务区域选择" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="overflow-y: auto; height: 500px">
      <provincesTree @save="getProvinces"></provincesTree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="provincesObj.level!='4'">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import provincesTree from '@/views/components/common/provincesTree.vue'
  export default {
    name: "index",
    components: {
      provincesTree
    },
    data() {
      return {
        isOpen: true,
        provincesObj: {}
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
        let data = this.provincesObj
        if (data.level != '4') {
          this.$message({
            message: '只能选择最后一级',
            type: 'error'
          });
        } else {
          this.$emit('getProvinces',data)
          this.close()
        }
      },
      getProvinces(data) {
        this.provincesObj = data
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
