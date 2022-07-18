<template>
  <div class="app-container">
    <el-table :data="tableList" border v-loading="loading">
      <el-table-column prop="userName" label="账号名称" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center">
      </el-table-column>
      <el-table-column label="账号开启设置" align="center">
        <template slot-scope="scope">
          <el-row>
            {{scope.row.accountStatus == 0?'开启':'关闭'}}
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="openSwitchSetting(scope.row)">账号启用设置</el-button>
          </el-row>
          <el-row>
            <el-button type="text" @click="openPasswordSetting(scope.row)">账号密码设置</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>

    <passwordSetting v-if="isPasswordSet" @close="closePasswordSetting" @upData="getRoleList" :roleMsg="settingObj"></passwordSetting>
    <switchSetting v-if="isSwitch" @close="closeSwitchSetting" @upData="getRoleList" :roleMsg="settingObj"></switchSetting>
  </div>
</template>

<script>
  import passwordSetting from '@/views/operationRole/userManagement/components/passwordSetting.vue'
  import switchSetting from '@/views/operationRole/userManagement/components/switchSetting.vue'
  import pages from '@/views/components/common/pages'
  import { getRoleUserList } from "@/api/operationRoleApi/userManagement.js"
  export default {
    name: "index",
    components: {
      passwordSetting,
      switchSetting,
      pages
    },
    data() {
      return {
        loading: true,
        tableList: [],
        page: 1,
        pageTotal: 0,
        isPasswordSet: false,
        isSwitch: false,
        settingObj: {}
      };
    },
    methods: {
      changePage(page) {
        this.page = page
        this.getRoleList()
      },
      openPasswordSetting(row) {
        this.settingObj = row
        this.isPasswordSet = true
      },
      closePasswordSetting() {
        this.isPasswordSet = false
      },
      openSwitchSetting(row) {
        this.settingObj = row
        this.isSwitch = true
      },
      closeSwitchSetting() {
        this.isSwitch = false
      },
      async getRoleList() {
        this.loading = true
        await getRoleUserList({
          page: this.page,
          size: '20',
          roleKey: 'settleRole',
		  phonenumber: '',
        }).then((res) => {
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableList = data
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableList = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      this.getRoleList()
    }
  };
</script>

<style lang="scss">

</style>
