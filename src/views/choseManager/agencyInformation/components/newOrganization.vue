<template>
  <el-dialog title="新建机构名称" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row class="mt20 pb20 flex flex-center">
      <div style="flex-shrink: 0;margin-right: 20px;">机构名称</div>
      <el-input placeholder="请输入机构名称" v-model="inputField" clearable></el-input>
    </el-row>
    <el-row class="mb10">
      关联机构路径
    </el-row>
    <orgPathTree @getPathOrg="getPathOrg"></orgPathTree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitNew" :disabled="!inputField.trim()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import orgPathTree from '@/views/choseManager/agencyInformation/components/orgPathTree'
  import {
    orgInsertOrgName,
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    components: {
      orgPathTree
    },
    data() {
      return {
        isOpen: true,
        inputField: '',
        orgPathGuid: '',
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
      // 获取选中的节点
      getPathOrg(data) {
        this.orgPathGuid = data.orgPathGuid
      },
      async orgInsertOrgName() {
        await orgInsertOrgName({
          orgName: this.inputField,
          orgPathGuid: this.orgPathGuid,
          curUserId: this.$store.state.user.adminId
        }).then(res => {
          if(res.OK == 'True') {

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
                message: '机构名称已存在!'
              });
            }

          }
        })
      },
      submitNew() {
        this.orgInsertOrgName()
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
