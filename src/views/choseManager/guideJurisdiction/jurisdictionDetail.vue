<template>
  <div class="app-container">
    <div>
      <el-descriptions :colon="false" class="margin-top" :column="1" border>
        <el-descriptions-item label-class-name="my-label" label="账号名称">{{row.userName}}</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="账号开通日期">{{row.registerTime}}</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="姓名">{{row.nickName}}</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="国家/区号">{{row.nation}}</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="联系电话">{{row.phonenumber}}</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="未合作数量" v-if="pageStatus == 1">{{noSignOrgNum}}</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="在合作数量" v-else>{{signOrgNum}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="flex jsb flex-center">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构'></searchCom>
        <div>
          <el-button type="primary" @click="recycleOrg" :disabled="!delList.length > 0">收回机构({{delList.length}})</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading" @select-all="changeAll" @selection-change="changeOne">
        <el-table-column type="selection" align="center" />
        <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="orgValidCreateTime" label="领取日期" align="center"></el-table-column>
        <el-table-column prop="orgEndDate" label="合同终止日期" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import {
    getValidStaffOrgSignRecords,
    getValidStaffOrgNoSignRecords,
    tkByOrgCoGuid,
    getValidStaffOrgNoSignNum,
    getValidStaffOrgSignNum
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages
    },
    data() {
      return {
        loading: false,
        tableData: [],
        delList: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        pageStatus: 1,
        noSignOrgNum: 0, //未合作数量
        signOrgNum: 0, //在合作数量
      };
    },
    methods: {
      search(data) {
        this.searchVal = data
        this.page = 1
        if (this.pageStatus == '2') {
          this.getValidStaffOrgNoSignRecords()
        } else {
          this.getValidStaffOrgSignRecords()
        }
        //
      },
      changePage(page) {
        this.page = page
        if (this.pageStatus == '2') {
          this.getValidStaffOrgNoSignRecords()
        } else {
          this.getValidStaffOrgSignRecords()
        }
        //
      },
      recycleOrg() {
        // 回收机构
        this.$confirm('【' + this.delList.length + '】家机构你要回收？' , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 走回收接口
          this.tkByOrgCoGuid()
        }).catch(() => {
        });
      },
      changeAll(selection) {
        // let arr = selection.map(item => item.guid)
        // this.delList = arr
        this.delList = selection
      },
      changeOne(selection, row) {
        // let arr = selection.map(item => item.guid)
        // this.delList = arr
        this.delList = selection
      },
      async getValidStaffOrgSignRecords() {
        this.loading = true
        await getValidStaffOrgSignRecords({
          orgName: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page,
          userId: this.row.userId
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              this.tableData = []
            }
            this.searchResult = this.tableData.length
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      },
      async getValidStaffOrgNoSignRecords() {
        this.loading = true
        await getValidStaffOrgNoSignRecords({
          orgName: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page,
          userId: this.row.userId
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              this.tableData = []
            }
            this.searchResult = this.tableData.length
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      },
      // 回收
      async tkByOrgCoGuid() {

        let delList = this.delList
        let arr = []
        for(let i in delList) {
          let obj = {
            orgCollectGuid: delList[i].orgCollectGuid,
            curUserId: this.$store.state.user.adminId,
          }
          arr.push(obj)
        }
        await tkByOrgCoGuid(JSON.stringify(arr)).then(res => {
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              if (this.pageStatus == '2') {
                this.getValidStaffOrgNoSignRecords()
                this.getValidStaffOrgSignNum()
              } else {
                this.getValidStaffOrgSignRecords()
                this.getValidStaffOrgNoSignNum()
              }
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }

          }
        })
      },

      // 机构合作数量-未合作
      async getValidStaffOrgNoSignNum() {
        await getValidStaffOrgNoSignNum({
          userId: this.row.userId,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {
            let noSignOrgNum = res.Tag[0].Table[0].noSignOrgNum
            this.noSignOrgNum = noSignOrgNum
          }
        })
      },
      // 机构合作数量-再合作
      async getValidStaffOrgSignNum() {
        await getValidStaffOrgSignNum({
          userId: this.row.userId,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {
            let signOrgNum = res.Tag[0].Table[0].signOrgNum
            this.signOrgNum = signOrgNum
          }
        })
      }
    },
    created() {
      this.pageStatus = this.$route.query.pageStatus
      this.row = this.$route.query
      console.log('query',this.row);
      if (this.pageStatus == '2') {
        this.getValidStaffOrgNoSignRecords()
        this.getValidStaffOrgSignNum()
      } else {
        this.getValidStaffOrgSignRecords()
        this.getValidStaffOrgNoSignNum()
      }

    }
  }
</script>

<style scoped lang="scss">
</style>
