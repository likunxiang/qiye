<template>
  <el-dialog title="增加人力资源信息" width="900px" :visible.sync="isOpen" append-to-body destroy-on-close @close="beforeClose">
    <div style="padding-bottom: 68px;">
      <el-table :data="oldUserList" border style="width: 100%;margin-bottom: 20px;">
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
      </el-table>
      <el-row class="flex flex-center mb10">
        <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchVal" @keyup.enter.native="search"
          style="width: 200px;margin-right: 20px;" @clear="search">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
        </el-input>
        <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
      </el-row>
      <el-table v-loading="loading" :data="tableData" border style="width: 100%;margin-bottom: 40px;">
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
        <el-table-column prop="roleType" label="角色类型" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="增加日期" align="center">
        </el-table-column>
      </el-table>

      <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getUserManualAddedList
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  import pages from '@/views/components/common/pages.vue'
  export default {
    name: "index",
    components: {
      pages
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
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        oldUserList: [],
        tableData: [],
        page: 1,
        pageTotal: 0,
		loading: true
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.$emit('close')
      },
      submit() {
        this.$emit('close')
      },
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
		this.page = 1
        this.getUserManualAddedList()
      },
      changePage(page) {
        this.page = page
        this.getUserManualAddedList()
      },

      async getUserManualAddedList() {
        this.loading = true
        await getUserManualAddedList({
          userId: this.row.userId,
          phonenumber: this.searchVal || '',
          page: this.page,
          size: '20'
        }).then(res => {
		  this.loading = false
          console.log(res.Tag.length);
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
            // 从字典获取角色类型
            this.getDicts("user_tag").then(response => {
              var statusOptions = response.Tag;
              console.log('statusOptions', statusOptions);
              for (var j in this.tableData) {
                for (var i in statusOptions) {
                  if (this.tableData[j].userTag == statusOptions[i].dictValue) {
                    this.tableData[j].roleType = statusOptions[i].dictLabel
                    this.tableData = this.clone(this.tableData)
                  }
                }
              }


            });
          } else {
            this.tableData = []
          }
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      },

    },
    mounted() {
      if (this.row.userName) {
        this.row.username = this.row.userName
      }
      this.oldUserList.push(this.row)
      this.getUserManualAddedList()
    }
  };
</script>

<style lang="scss">
</style>
