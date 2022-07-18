<template>
  <el-dialog title="归属主管管理" :visible.sync="isOpen" width="1000px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <el-table :data="tableDataFirst" border class="mb20">
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="location" label="所在地点" align="center"></el-table-column>
      </el-table>
      <div class="flex flex-center mb20">
        <template v-if="isAllocation">
          <div class="title-bg1">归属主管管理</div>
          <div class="ml0">
            <el-button type="primary" @click="allocation">授权归属主管</el-button>
            <el-button type="primary" :disabled="row.directorUserId == '-1'" @click="relieveAllocation">脱离归属主管</el-button>
          </div>
        </template>
        <template v-else>
          <div class="title-bg1">专员归属管理</div>
          <div class="ml0">
            <el-button type="primary" @click="saveAllocation" :disabled="!unitInfo.userId.length">确定</el-button>
          </div>
        </template>
      </div>
      <div class="flex flex-center mb20" v-if="isAllocation">
        <h1 class="mr10">主管信息</h1>
        <div>是指这个服务专员的管理权授权给哪个服务主管</div>
      </div>
      <div v-else>
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码或者姓名'></searchCom>
      </div>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column width="35px" v-if="!isAllocation">
          <template v-slot="scope">
            <!-- label值要与el-table数据id实现绑定 -->
            <el-radio v-model="unitInfo.userId" :label="scope.row.userId" @change="handleRowChange(scope.row)"
              v-if="tableData.length > 0"><i></i>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="createTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {
    introducerGetListOfDir,
    getRoleUserList,
    introducerGrant2Dir,
    introducerUnGrant2Dir
  } from "@/api/operationRoleApi/userManagement.js"
  import {
    getUserDetail
  } from '@/api/choseManagerApi/choseManagerCom.js'
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
        userInfo: {},
        isAllocation: true,
        chooseList: [],
        unitInfo: {
          userId: '',
          name: '',
          userName: '',
          nickName: '',
          nation: '',
          phonenumber : '',
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
          this.unitInfo.userId = data.userId
          this.unitInfo.name = data.username
          this.unitInfo.userName = data.userName
          this.unitInfo.nickName =data.nickName
          this.unitInfo.nation = data.nation
          this.unitInfo.phonenumber =data.phonenumber
        }
        console.log('unitInfo',this.unitInfo);
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
      // 授权归属
      allocation() {
        this.isAllocation = false
        this.unitInfo = {
          userId: '',
          name: '',
          userName: '',
          nickName: '',
          nation: '',
          phonenumber : '',
        }
        this.getRoleUserList()
      },
      relieveAllocation() {
        let row = this.tableData[0]
        this.$confirm(
          '<p align="left">账号名称：' + row.userName + '</p>' +
          '<p align="left">姓名：' + row.nickName + '</p>' +
          '<p align="left">国家/区号：' + row.nation + '</p>' +
          '<p align="left">联系电话：' + row.phonenumber + '</p>' +
          '<p align="left">确定从这个主管团队收回。这个主管的团队将减少1个专员。</p>',
          '', {
            confirmButtonText: '确认',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
          this.introducerUnGrant2Dir()
        }).catch(() => {});
      },
      // 确认归属
      saveAllocation() {
        let row = this.unitInfo
        this.$confirm(
          '<p align="left">账号名称：' + row.userName + '</p>' +
          '<p align="left">姓名：' + row.nickName + '</p>' +
          '<p align="left">国家/区号：' + row.nation + '</p>' +
          '<p align="left">联系电话：' + row.phonenumber + '</p>' +
          '<p align="left">确定授权归属给这个主管。这个主管团队将新增1名成员。</p>',
          '', {
            confirmButtonText: '确认',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
          this.introducerGrant2Dir()
        }).catch(() => {});
      },
      // 获取已授权主管信息
      async getUserDetail() {
        if (this.row.directorUserId < '-1') {
          return
        }
        this.loading = true
        this.tableData = []
        getUserDetail({
          userId: this.row.directorUserId,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);
          this.loading = false
          if(res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.userInfo = data
            this.tableData.push(this.userInfo)
          } else {
            this.tableData = []
          }

        })
      },

      // 获取服务主管列表
      async getRoleUserList() {
        this.loading = true
        await getRoleUserList({
          page: this.page,
          size: '20',
          roleKey: 'serveDirectorRole',
          phonenumber: this.searchVal,
        }).then((res) => {
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
      // 授权归属网络接口
      async introducerGrant2Dir() {
        await introducerGrant2Dir({
          directoryUserId: this.unitInfo.userId,
          introducerGuid: this.row.introducerGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if(res.OK == "True") {
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.isAllocation = true
              this.$emit('refresh')
              this.row.directorUserId = this.unitInfo.userId
              this.getUserDetail()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }
          }
        })
      },
      // 解除授权
      async introducerUnGrant2Dir() {
        await introducerUnGrant2Dir({
          introducerGuid: this.row.introducerGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if(res.OK == "True") {
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('refresh')
              this.row.directorUserId = '-1'
              this.getUserDetail()
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
      this.getUserDetail()
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
