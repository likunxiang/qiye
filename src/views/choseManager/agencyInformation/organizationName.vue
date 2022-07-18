<template>
  <div class="app-container">
    <!-- 字节标题 -->
    <chooseByteTitle @getByteGuid="getByteGuid" @toSearch="toSearch" @getLastGuid='getLastGuid'></chooseByteTitle>
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <div>
        <el-button type="primary" @click="openNew">新建机构名称</el-button>
        <el-button type="primary" @click="openImport">批量新建机构名称</el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editOrg(scope.row)">编辑机构名称</el-button>
          <el-button type="text" @click="delOrg(scope.row)">删除机构名称</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <newOrganization v-if="isNew" @close="closeNew" @refresh="orgGetList"></newOrganization>
    <batchOrganization v-if="isImport" @close="closeImport" @refresh="orgGetList"></batchOrganization>
    <editOrganization v-if="isEdit" @close="closeEdit" :row="openRow" @refresh="orgGetList"></editOrganization>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import newOrganization from '@/views/choseManager/agencyInformation/components/newOrganization'
  import batchOrganization from '@/views/choseManager/agencyInformation/components/batchOrganization'
  import editOrganization from '@/views/choseManager/agencyInformation/components/editOrganization'
  import chooseByteTitle from '@/views/choseManager/agencyInformation/components/chooseByteTitle.vue'
  import {
    orgGetList,
    orgInsertOrgName,
    orgUpdateOrgName,
    orgDelOrgName,
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    components: {
      newOrganization,
      batchOrganization,
      editOrganization,
      chooseByteTitle,
      searchCom,
      pages
    },
    data() {
      return {
        loading: false,
        tableData: [],
        guidList: [], // 字节内容guid列表
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isNew: false,
        isImport: false,
        isEdit: false,
        lastOrgPathContentGuid: '0',  // 最大层级机构字节内容guid
      };
    },
    methods: {
      getLastGuid(data) {
        console.log('1112',data);
        this.lastOrgPathContentGuid = data
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.orgGetList()
        //
      },
      toSearch() {
        this.page = 1
        this.orgGetList()
      },
      getByteGuid(data) {
        this.guidList = data
      },
      changePage(page) {
        this.page = page
        this.orgGetList()
        //
      },
      openNew() {
        this.isNew = true
      },
      closeNew() {
        this.isNew = false
      },
      openImport() {
        this.isImport = true
      },
      closeImport() {
        this.isImport = false
      },
      editOrg(row) {
        this.openRow = row
        this.isEdit = true
      },
      closeEdit() {
        this.isEdit = false
      },
      delOrg(row) {

        this.$confirm(
          '<p align="left">机构名称</p><p align="left">删除后，全网不可见这个机构的有关信息。确认删除？</p>',
          '', {
            confirmButtonText: '确认',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
          this.orgDelOrgName(row.orgNameGuid)
        }).catch(() => {});


      },

      async orgGetList() {
        this.loading = true
        await orgGetList({
          orgName: this.searchVal,
          size: '20',
          page: this.page,
          curUserId: this.$store.state.user.adminId,
          orgPathContent1: this.guidList[1] ? this.guidList[1] : '',
          orgPathContent2: this.guidList[2] ? this.guidList[2] : '',
          orgPathContent3: this.guidList[3] ? this.guidList[3] : '',
          orgPathContent4: this.guidList[4] ? this.guidList[4] : '',
          orgPathContent5: this.guidList[5] ? this.guidList[5] : '',
          orgPathContent6: this.guidList[6] ? this.guidList[6] : '',
          orgPathContent7: this.guidList[7] ? this.guidList[7] : '',
          orgPathContent8: this.guidList[8] ? this.guidList[8] : '',
          orgPathContent9: this.guidList[9] ? this.guidList[9] : '',
          orgPathContent10: this.guidList[10] ? this.guidList[10] : '',
          lastOrgPathContentGuid: this.lastOrgPathContentGuid
        }).then( res => {
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
      async orgDelOrgName(id) {
        await orgDelOrgName({
          orgNameGuid: id,
          curUserId: this.$store.state.user.adminId,
          deptId: this.$store.state.user.deptId,
        }).then(res => {
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag[0].Table[0].delType < 2) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.orgGetList()
            } else {
              // 已注册或已签约
              this.$confirm(
                '<p align="left">机构名称</p><p align="left">已注册或者已签约，不能删除。</p>',
                '', {
                  confirmButtonText: '知道了',
                  dangerouslyUseHTMLString: true,
                  cancelButtonText: '取消',
                  showCancelButton: false,
                  type: 'warning',
                }).then(() => {
                //
              }).catch(() => {});
            }

          }
        })
      }
    },
    created() {
      this.orgGetList()
    }
  }
</script>

<style scoped lang="scss">
</style>
