<template>
  <el-dialog title="按型号名称收取管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 60px;" v-loading="loading">
      <el-table :data="tableDataFirst" border>
        <el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
        <el-table-column prop="personalSupplierCount" label="供方数量" align="center"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- <el-tab-pane label="机构供方" name="first">用户管理</el-tab-pane> -->
        <el-tab-pane label="个人供方" name="first">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>
          <el-table :data="tableData" border>
            <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="registerTime" label="注册日期" align="center"></el-table-column>
            <el-table-column prop="addCatTime" label="品类添加日期" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="modelManage(scope.row)">型号管理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
      <modelManageNew v-if="isModel" @close="closeModelManage" :openRow="openRow" :modelRow="row"></modelManageNew>
    </div>
  </el-dialog>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import modelManageNew from '@/views/pricingRole/pricingManagement/components/modelManageNew.vue'
  import {
    getSupplierCount,
    getAcctoMnPersSupplierList
  } from '@/api/pricingRoleApi/pricingManagement.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      modelManageNew
    },
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    data() {
      return {
        isOpen: true,
        loading: false,
        isModel: false,
        activeName: 'first',
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        tableData: [],
        tableDataFirst: [],
        row: {}
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getAcctoMnPersSupplierList()
        //
      },
      changePage(page) {
        this.page = page
        this.getAcctoMnPersSupplierList()
        //
      },
      modelManage(row) {
        this.row = row
        this.isModel = true
      },
      closeModelManage() {
        this.isModel = false
      },
      async getSupplierCount() {
        this.loading = true
        await getSupplierCount({
          curUserId: this.$store.state.user.adminId,
          categoryGuid: this.openRow.categoryGuid,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            console.log(res);
            let data = res.Tag[0].Table[0].personalSupplierCount
            this.openRow.personalSupplierCount = data
            this.tableDataFirst.push(this.openRow)
            // if (res.Tag.length > 0) {
            //   let data = res.Tag[0].Table
            //   this.tableData = data
            // } else {
            //   this.tableData = []
            // }
          }
        })
      },
      async getAcctoMnPersSupplierList() {
        this.loading = true
        await getAcctoMnPersSupplierList({
          categoryGuid: this.openRow.categoryGuid,
          phonenumber: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
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
      }
    },
    created() {
      this.getSupplierCount()
      this.getAcctoMnPersSupplierList()
    }
  };
</script>

<style lang="scss" scoped>
</style>
