<template>
  <el-dialog title="新建服务对象" :visible.sync="isOpen" width="700px" @close="beforeClose">
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
      <el-input placeholder="请填写" v-model="phonenumber" clearable></el-input>
    </el-row>
    <el-row class="mt10 pb20 flex flex-center">
      <div style="flex-shrink: 0;margin-right: 20px;width: 60px;">任职机构</div>
      <el-input placeholder="请填写" v-model="employedOrgName" clearable></el-input>
    </el-row>
    <el-row class="mb10">
      关联对象路径
    </el-row>
    <orgPathTree @getPathOrg="getPathOrg"></orgPathTree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitNew" :disabled="!nickName.trim() || !phonenumber.trim() || !employedOrgName.trim()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import orgPathTree from '@/views/serviceManager/agencyInformation/components/orgPathTree'
  import {
    namelistInsert,
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  export default {
    name: "index",
    components: {
      orgPathTree
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
      async namelistInsert() {
        await namelistInsert({
          nickName: this.nickName,
          nation: this.nation,
          phonenumber: this.phonenumber,
          employedOrgName: this.employedOrgName,
          userPathGuid: this.userPathGuid,
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
                message: '手机号码或者名字重复!'
              });
            }

          }
        })
      },
      submitNew() {
        this.namelistInsert()
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
