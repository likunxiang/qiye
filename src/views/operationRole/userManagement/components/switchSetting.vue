<template>
  <el-dialog title="账号启用设置" width="700px" :visible.sync="isOpen" @close="beforeClose">
    <el-table :data="tableList" border>
      <el-table-column prop="userName" label="账号名称">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称">
      </el-table-column>
    </el-table>
    <el-row class="flex flex-center" style="padding: 20px 20px 20px 0px;">
      <div class="bold mr10">账号启用设置</div>
      <div>
        <el-switch v-model="isUse" active-color="#13ce66" inactive-color="#ccc" @change="changeUse">
        </el-switch>
      </div>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    changePassword
  } from "@/api/operationRoleApi/userManagement.js"
  import {  getUser } from "@/api/system/user";
  export default {
    name: "index",
    props: {
      roleMsg: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        isUse: true,
        tableList: [],
        parmas: {}, // 请求参数
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
        this.changePassword()
      },
      changeUse(val) {
        console.log('isUse', val);
      },
      async changePassword() {
        let parmas = this.parmas
        parmas.status = this.isUse? 0 : 1
        parmas.roleIds = [this.parmas.roles[0].roleId]
        await changePassword(parmas).then((res) => {
          console.log(res);
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.close()
          this.$emit('upData')
        })
      }
    },
    created() {
      console.log(this.roleMsg);
      this.tableList.push(this.roleMsg)
      this.isUse = this.roleMsg.accountStatus == 0? true: false
      const userId = this.roleMsg.userId
      getUser(userId).then(response => {
        this.parmas = response.Tag;
      });
    },
  };
</script>

<style lang="scss" scoped>
</style>
