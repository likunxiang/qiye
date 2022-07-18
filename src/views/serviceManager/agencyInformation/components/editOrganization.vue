<template>
  <el-dialog title="编辑服务对象" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row class="mt10 pb20 flex flex-center">
      <div style="flex-shrink: 0;margin-right: 20px;width: 60px;">姓名</div>
      <el-input placeholder="请填写" v-model="nickName" clearable></el-input>
    </el-row>
    <el-row class="mt10 pb20 flex flex-center">
      <div style="flex-shrink: 0;margin-right: 20px;width: 60px;">国家/地区</div>
      <div>{{nation}}</div>
    </el-row>
    <el-row class="mt10 pb20 flex flex-center">
      <div style="flex-shrink: 0;margin-right: 20px;width: 60px;">联系电话</div>
      <div>{{phonenumber}}</div>
    </el-row>
    <el-row class="mt10 pb20 flex flex-center">
      <div style="flex-shrink: 0;margin-right: 20px;width: 60px;">任职机构</div>
      <el-input placeholder="请填写" v-model="employedOrgName" clearable></el-input>
    </el-row>
    <el-row class="mb10">
      关联机构路径
    </el-row>
    <orgPathTree @getPathOrg="getPathOrg" type="edit" :allparId="row.userPathAllPid" :pathGuid="row.userPathGuid" :pathParGuid="row.parent_guid"></orgPathTree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitNew" :disabled="!nickName.trim() || !employedOrgName.trim()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    namelistUpdate,
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  import orgPathTree from '@/views/serviceManager/agencyInformation/components/orgPathTree'
  export default {
    name: "index",
    components: {
      orgPathTree
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
        nickName: '',
        phonenumber: '',
        nation: '中国大陆（+86）',
        employedOrgName: '',
        userPathGuid: '-1',
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
        this.userPathGuid = data.pathGuid
      },
      submitNew() {
        this.namelistUpdate()
      },
      async namelistUpdate() {
        await namelistUpdate({
          namelistGuid: this.row.namelistGuid,
          nickName: this.nickName,
          employedOrgName: this.employedOrgName,
          userPathGuid: this.userPathGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res  => {
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
      }
    },
    created() {
      this.nickName = this.row.nickName
      this.phonenumber = this.row.phonenumber
      this.nation = this.row.nation
      this.employedOrgName = this.row.employedOrgName
      this.userPathGuid = this.row.userPathGuid
    }
  };
</script>

<style lang="scss" scoped>
</style>
