<template>
  <el-dialog title="归属专员管理" :visible.sync="isOpen" width="1000px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <el-table :data="tableDataFirst" border class="mb20">
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册日期" align="center"></el-table-column>
      </el-table>
      <div class="flex flex-center mb20">
        <template v-if="isAllocation">
          <div class="title-bg1">归属专员管理</div>
          <div class="ml0">
            <el-button type="primary" @click="allocation">指定专员</el-button>
          </div>
        </template>
        <template v-else>
          <div class="title-bg1">服务对象归属管理</div>
          <div class="ml0">
            <el-button type="primary" @click="saveAllocation" :disabled="!unitInfo.introducerGuid.length">确定</el-button>
          </div>
        </template>
      </div>
      <div class="flex flex-center mb20" v-if="true">
        <h1 class="mr10">专员信息</h1>
        <div>是指这个服务对象的管理权归哪个服务专员</div>
      </div>
      <div v-else>
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码或者姓名'></searchCom>
      </div>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column width="35px" v-if="!isAllocation">
          <template v-slot="scope">
            <!-- label值要与el-table数据id实现绑定 -->
            <el-radio v-model="unitInfo.introducerUserId" :label="scope.row.introducerUserId"
              @change="handleRowChange(scope.row)" v-if="tableData.length > 0"><i></i>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="location" label="所在地区" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {
    introducerGetCanGrant2NMList,
    introducerGetValidIntroInfoByNMGuid,
    introducerGrant2NM
  } from "@/api/operationRoleApi/affiliationObjectManagement.js"
  export default {
    name: "index",
    components: {
      pages,
      searchCom,
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
        loading: false,
        tableData: [],
        tableDataFirst: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isAllocation: true,
        unitInfo: {
          introducerUserId: '-1',
          introducerGuid: '',
          name: '',
          userName: '',
          nickName: '',
          nation: '',
          phonenumber: '',
          location: ''
        }, // 归属的选中数据
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
      // 单选数据绑定
      handleRowChange(data) {
        if (data) {
          this.unitInfo.introducerUserId = data.introducerUserId
          this.unitInfo.introducerGuid = data.introducerGuid
          this.unitInfo.name = data.nickName
          this.unitInfo.userName = data.userName
          this.unitInfo.nickName = data.nickName
          this.unitInfo.nation = data.nation
          this.unitInfo.phonenumber = data.phonenumber
          this.unitInfo.location = data.location
        }
      },
      // 授权归属
      allocation() {
        this.isAllocation = false
        this.introducerGetCanGrant2NMList()
        this.unitInfo = {
          introducerUserId: '-1',
          introducerGuid: '',
          name: '',
          userName: '',
          nickName: '',
          nation: '',
          phonenumber: '',
          location: '',
        }
      },
      // 确认归属
      saveAllocation() {
        let row = this.unitInfo
        this.$confirm(
          '<p align="left">账号名称：' + row.userName + '</p>' +
          '<p align="left">姓名：' + row.nickName + '</p>' +
          '<p align="left">国家/区号：' + row.nation + '</p>' +
          '<p align="left">联系电话：' + row.phonenumber + '</p>' +
          '<p align="left">所在地点：' + row.location + '</p>' +
          '<p align="left">确定指定给这个专员。这个专员的权限服务对象将新增1个服务对象。</p>',
          '', {
            confirmButtonText: '确认',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
          this.introducerGrant2NM()
        }).catch(() => {});
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getData()
        //
      },
      changePage(page) {
        this.page = page
        this.getData()
        //
      },
      async introducerGetCanGrant2NMList() {
        this.loading = true
        await introducerGetCanGrant2NMList({
          queryFields: this.searchVal,
          namelistGuid: this.row.namelistGuid,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
        })
      },
      async introducerGetValidIntroInfoByNMGuid() {
        this.loading = true
        await introducerGetValidIntroInfoByNMGuid({
          namelistGuid: this.row.namelistGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {
            if (res.Tag.length) {
              let data = res.Tag[0].Table
              this.tableData = data
              this.pageTotal = (this.page - 1) * 20 + 21
            } else {
              this.tableData = []
              this.pageTotal = (this.page - 1) * 20 + 1
            }
          }
        })
      },
      async introducerGrant2NM() {
        await introducerGrant2NM({
          namelistGuid: this.row.namelistGuid,
          namelistUserId: this.row.namelistUserId,
          namelistUserName: this.row.nickName,
          introducerUserId: this.unitInfo.introducerUserId,
          introducerGuid: this.unitInfo.introducerGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('refresh')
              this.introducerGetValidIntroInfoByNMGuid()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }
          }
        })
      }
    },
    created() {
      this.tableDataFirst.push(this.row)
      this.introducerGetValidIntroInfoByNMGuid()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg1 {
    background-color: #F2F2F2;
    padding: 10px;
    width: 200px;
  }
</style>
