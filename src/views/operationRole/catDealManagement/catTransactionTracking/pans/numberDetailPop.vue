<template>
  <el-dialog title="供方数量" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-table :data="menuData" border>
      <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
      <el-table-column prop="supplierCount" label="供方数量" align="center"></el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="padding-bottom: 68px;">
      <searchCom @toSearch='searchData' :searchResult='searchResult'
        :placeholderText="openType == '1'?'请输入联系电话':'请输入供应主体名称'"></searchCom>
      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="supplyCompanyName" label="供方主体" align="center" v-if="openType=='2'"></el-table-column>
        <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="区号" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="roleType" label="角色类型" align="center"></el-table-column>
      </el-table>
      <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {
    getMode1Suppliers,
    getMode2SupplierInfos
  } from '@/api/operationRoleApi/catDealManagement.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom
    },
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        menuData: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        tableData: [],
        openType: '1',
        loading: true
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
      changePage(page) {
        this.page = page
        let openType = this.openType
        if (openType == '1') {
          this.getMode1Suppliers()
        } else {
          this.getMode2SupplierInfos()
        }
      },
      searchData(data) {
        this.searchVal = data
        this.page = 1
        let openType = this.openType
        if (openType == '1') {
          this.getMode1Suppliers()
        } else {
          this.getMode2SupplierInfos()
        }
      },
      async getMode1Suppliers() {
        this.loading = true
        await getMode1Suppliers({
          phonenumber: this.searchVal || '',
          categoryGuid: this.openRow.categoryGuid,
          page: this.page,
          size: '20'
        }).then(res => {
          this.loading = false
          console.log(res);
          let data = []
          if (res.Tag.length) {
            data = res.Tag[0].Table
            // 从字典获取角色类型
            this.getDicts("user_tag").then(response => {
              var statusOptions = response.Tag;
              console.log('statusOptions', statusOptions);
              for (var j in data) {
                for (var i in statusOptions) {
                  if (data[j].userTag == statusOptions[i].dictValue) {
                    data[j].roleType = statusOptions[i].dictLabel
                  }
                }
              }
              this.tableData = data

            });
          } else {
            data = []
            this.tableData = data
          }

          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      },
      //
      async getMode2SupplierInfos() {
        this.loading = true
        await getMode2SupplierInfos({
          supplyCompanyName: this.searchVal || '',
          categoryGuid: this.openRow.categoryGuid,
          page: this.page,
          size: '20'
        }).then(res => {
          this.loading = false
          console.log(res);
          let data = []
          if (res.Tag.length) {
            data = res.Tag[0].Table
            // 从字典获取角色类型
            this.getDicts("user_tag").then(response => {
              var statusOptions = response.Tag;
              console.log('statusOptions', statusOptions);
              for (var j in data) {
                for (var i in statusOptions) {
                  if (data[j].userTag == statusOptions[i].dictValue) {
                    data[j].roleType = statusOptions[i].dictLabel
                  }
                }
              }
              this.tableData = data

            });
          } else {
            data = []
            this.tableData = data
          }
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      },
    },
    created() {
      this.menuData.push(this.openRow)
      this.openType = this.openRow.openType
      if (this.openType == '1') {
        this.getMode1Suppliers()
      } else {
        this.getMode2SupplierInfos()
      }

    }
  };
</script>

<style lang="scss" scoped>
</style>
