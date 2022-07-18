<template>
  <el-dialog title="服务主管成果" :visible.sync="isOpen" width="1000px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="text" @click="toRecruitingSuccess(scope.row)">服务主管招募成果</el-button>
            </el-row>
            <el-row>
              <el-button type="text" @click="toTeamMember(scope.row)">服务主管团队成员</el-button>
            </el-row>
            <el-row>
              <el-button type="text" @click="toServiceSuccess(scope.row)">服务主管服务成果</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <recruitingResults v-if="isRecruiting" @close="closeRecruitingSuccess" :row="openRow"></recruitingResults>
      <teamMember v-if="isTeam" @close="closeTeamMember" :row="openRow"></teamMember>
      <serviceResults v-if="isService" @close="closeServiceSuccess" :row="openRow"></serviceResults>
    </div>
  </el-dialog>
</template>

<script>
  import recruitingResults from '@/views/operationRole/userManagement/serviceGovernor/components/recruitingResults'
  import teamMember from '@/views/operationRole/userManagement/serviceGovernor/components/teamMember'
  import serviceResults from '@/views/operationRole/userManagement/serviceGovernor/components/serviceResults'
  export default {
    name: "index",
    components: {
      recruitingResults,
      teamMember,
      serviceResults
    },
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
        tableData: [],
        loading: false,
        openRow: {},
        isRecruiting: false,
        isTeam: false,
        isService: false
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
      toRecruitingSuccess(row) {
        this.isRecruiting = true
        this.openRow = row
      },
      closeRecruitingSuccess() {
        this.isRecruiting = false
      },
      toTeamMember(row) {
        this.isTeam = true
        this.openRow = row
      },
      closeTeamMember() {
        this.isTeam = false
      },
      toServiceSuccess(row) {
        this.isService = true
        this.openRow = row
      },
      closeServiceSuccess() {
        this.isService = false
      },
    },
    created() {
      this.tableData.push(this.row)
    }
  };
</script>

<style lang="scss" scoped>
</style>
