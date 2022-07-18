<template>
  <div class="app-container">
    <!-- 字节标题 -->
    <serviceArea @getProvinces="getProvinces" @toSearch="toSearch"></serviceArea>
    <chooseByteTitle @getByteGuid="getByteGuid" @toSearch="toSearch" @getLastGuid='getLastGuid'></chooseByteTitle>
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <div>
        <el-button type="primary" @click="openNew">新建服务对象</el-button>
        <el-button type="primary" @click="openImport">批量新建服务对象</el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="employedOrgName" label="任职机构" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center" ></el-table-column>
      <el-table-column label="操作" align="center" width='240'>
        <template slot-scope="scope">
          <el-button type="text" @click="editOrg(scope.row)">编辑服务对象</el-button>
          <el-button type="text" @click="delOrg(scope.row)">删除服务对象</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <newOrganization v-if="isNew" @close="closeNew" @refresh="namelistGetList"></newOrganization>
    <batchOrganization v-if="isImport" @close="closeImport" @refresh="namelistGetList"></batchOrganization>
    <editOrganization v-if="isEdit" @close="closeEdit" :row="openRow" @refresh="namelistGetList"></editOrganization>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import newOrganization from '@/views/serviceManager/agencyInformation/components/newOrganization'
  import batchOrganization from '@/views/serviceManager/agencyInformation/components/batchOrganization'
  import editOrganization from '@/views/serviceManager/agencyInformation/components/editOrganization'
  import chooseByteTitle from '@/views/serviceManager/agencyInformation/components/chooseByteTitle.vue'
  import serviceArea from '@/views/serviceManager/agencyInformation/components/serviceArea.vue'
  import {
    namelistGetList,
    orgInsertOrgName,
    orgUpdateOrgName,
    namelistDel,
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  export default {
    name: "index",
    components: {
      newOrganization,
      batchOrganization,
      editOrganization,
      chooseByteTitle,
      serviceArea,
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
        lastOrgPathContentGuid: '0', // 最大层级机构字节内容guid
        cityCodeId: '0', //
      };
    },
    methods: {
      getLastGuid(data) {
        this.lastOrgPathContentGuid = data
      },
      getProvinces(data) {
        this.cityCodeId = data.cityId
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.namelistGetList()
        //
      },
      toSearch() {
        this.page = 1
        this.namelistGetList()
      },
      getByteGuid(data) {
        this.guidList = data
      },
      changePage(page) {
        this.page = page
        this.namelistGetList()
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
        if (!row.namelistUserId) {
          this.$confirm(
            '<p align="left">姓名：' + row.nickName + '</p>' + '<p align="left">国家/区号：' + row.nation + '</p>' +
            '<p align="left">联系电话：' + row.phonenumber + '</p>' +
            '<p align="left">该用户未注册，删除后，全网不可见这个服务对象的有关信息。确认删除？</p>',
            '', {
              confirmButtonText: '确认',
              dangerouslyUseHTMLString: true,
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
            this.namelistDel(row.namelistGuid)
          }).catch(() => {});

        } else {
          this.$confirm(
            '<p align="left">姓名：' + row.nickName + '</p>' + '<p align="left">国家/区号：' + row.nation + '</p>' +
            '<p align="left">联系电话：' + row.phonenumber + '</p>' + '<p align="left">该用户已经注册，不能删除。</p>',
            '', {
              confirmButtonText: '知道了',
              dangerouslyUseHTMLString: true,
              showCancelButton: false,
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {}).catch(() => {});
        }


      },

      async namelistGetList() {
        this.loading = true
        await namelistGetList({
          cityCodeId: this.cityCodeId,
          size: '20',
          page: this.page,
          curUserId: this.$store.state.user.adminId,
          userPathGuid: this.lastOrgPathContentGuid,
          queryFields: this.searchVal
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {

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
      async namelistDel(id) {
        await namelistDel({
          namelistGuid: id,
          curUserId: this.$store.state.user.adminId,
          deptId: this.$store.state.user.deptId,
        }).then(res => {
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.namelistGetList()
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
      this.namelistGetList()
    }
  }
</script>

<style scoped lang="scss">
</style>
