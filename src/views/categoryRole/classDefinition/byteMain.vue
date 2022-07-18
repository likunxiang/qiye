<template>
  <div class="app-container">
    <div class="flex flex-center">
      <div style="width: 120px;font-weight: bold;">品类类型</div>
      <div>{{pageTitle}}</div>
    </div>
    <div class="flex flex-center mt10 mb20">
      <div style="width: 120px;font-weight: bold;">需求场景</div>
      <div>{{treeTitle}}</div>
    </div>

    <!-- <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要找的内容" clearable v-model="searchVal" @keyup.enter.native="search"
        style="width: 200px;margin-right: 20px;" @clear="clearSearch">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div> -->

    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column label="品类字节标题" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.name}}</div>
          <!-- <div class="del-icon el-icon-edit" @click="openEditName(scope.row)"></div> -->
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openEditName(scope.row)">
            编辑字节标题
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="本段品类字节内容" align="center">
      </el-table-column>
      <el-table-column prop="parentName" label="关联上段品类字节内容" align="center">
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delByte(scope.row)">
            删除字节内容
          </el-button>
          <el-button type="text" size="small" @click="editByte(scope.row)">
            编辑字节内容
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->

    <editByte v-if="isEdit" :row="openRow" :length="tableData.length" @close="closeEdit"
      @refresh="getTitleListByCatreeGuid"></editByte>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import editByte from '@/views/categoryRole/classDefinition/components/editByte.vue'
  import {
    getNameListByCatreeGuidAndLevel,
    deleteNameTree,
    getTitleListByCatreeGuid
  } from '@/api/categoryRole/classDefinition.js'
  export default {
    name: "index",
    components: {
      pages,
      editByte
    },
    data() {
      return {
        searchVal: '',
        searchResult: 0,
        isToSearch: false,
        page: 1,
        pageTotal: 0,
        pageTitle: '',
        code: '',
        treeTitle: '',
        ownObj: {}, // 本级字节标题
        parentObj: {}, // 上级字节标题
        openRow: {},
        tableData: [],
        loading: true,
        isEdit: false,
        guid: ''
      };
    },
    methods: {
      openEditName(row) {
        this.openRow = row
        console.log(row);
        this.isEdit = true
      },
      closeEdit() {
        this.isEdit = false
      },
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getNameListByCatreeGuidAndLevel()
      },
      clearSearch() {
        this.searchVal = ''
        this.search()
      },
      changePage(page) {
        this.page = page
        this.getNameListByCatreeGuidAndLevel()
      },


      delByte(row) {
        let obj = row
        this.$confirm('删除后，其之下的从属字节内容全部删除。确认删除【' + obj.name + '】', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNameTree(obj.guid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async deleteNameTree(id) {
        await deleteNameTree({
          catNameTreeGuid: id
        }).then(res => {
          console.log(res);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getNameListByCatreeGuidAndLevel()
        })
      },
      // async getNameListByCatreeGuidAndLevel() {
      //   this.loading = true
      //   await getNameListByCatreeGuidAndLevel({
      //     catreeGuid: this.ownObj.catTreeGuid,
      //     level: this.ownObj.level,
      //     name: this.searchVal,
      //     page: this.page,
      //     size: '20',
      //     orderBy: 't.parentCreateTime',
      //     catTreeContentGuid: ''
      //   }).then(res => {
      //     this.loading = false
      //     console.log(res);
      //     if (res.Tag.length) {
      //       this.tableData = res.Tag[0].Table
      //     } else {
      //       this.tableData = []
      //     }
      //     this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
      //     this.searchResult = this.tableData.length
      //   })
      // }

      async getTitleListByCatreeGuid() {
        this.loading = true
        await getTitleListByCatreeGuid({
          catreeGuid: this.guid
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
          } else {
            this.tableData = []

          }
        })
      },
    },
    created() {
      this.pageTitle = this.$route.query.pageTitle
      this.treeTitle = this.$route.query.treeTitle
      this.guid = this.$route.query.guid
      // this.code = this.$route.query.code
      // this.ownObj.catTreeGuid = this.$route.query.catTreeGuid
      // this.ownObj.createTime = this.$route.query.createTime
      // this.ownObj.level = this.$route.query.level
      // this.ownObj.name = this.$route.query.name
      // this.ownObj.titleGuid = this.$route.query.titleGuid
      // // this.parentObj = this.$route.query.parentObj // 上级字节标题
      // this.parentObj.name = this.$route.query.parentObjName // 上级字节标题
      // this.parentObj.catTreeGuid = this.$route.query.parentObjCatTreeGuid // 上级字节标题
      // this.parentObj.level = this.$route.query.parentObjLevel // 上级字节标题
      console.log('query', this.$route.query);
      // this.getNameListByCatreeGuidAndLevel()
      this.getTitleListByCatreeGuid()
    }
  }
</script>

<style scoped lang="scss">
</style>
