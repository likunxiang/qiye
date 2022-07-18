<template>
  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="tab.name" :name="tab.type" v-for="(tab,index) in tabList" :key="index">

      </el-tab-pane>
    </el-tabs> -->
    <div class="flex flex-center jsb">
      <div class="flex flex-center">
        <!-- <el-button type="primary" @click="openNew">新建</el-button>
          <el-button type="primary" @click="openImport">批量导入</el-button>
          <el-button type="primary" @click="openTemplate">下载模板</el-button> -->
        <el-input placeholder="请输入你要找的品类名称" v-model="searchVal" @keyup.enter.native="searchClass"
          style="width: 200px;" clearable @clear="clearSearch">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchClass">
          </i>
        </el-input>
        <div v-if="isToSearch" class="ml0">搜索结果: {{searchResult}}</div>
      </div>
      <!-- <el-button type="primary" @click="toBatchDeleteClass">批量删除品类名称</el-button> -->
    </div>
    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column label="品类名称" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.categoryName}}</div>
        </template>
      </el-table-column>
      <el-table-column label="品类类型" prop="cattypeName" align="center">
      </el-table-column>
      <el-table-column prop="image" label="品类图片" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="basicImgUrl + scope.row.img" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" size="small"
              @click="openEditName(scope.$index,scope.row)">
              编辑品类别名
            </el-button>
          </el-row>
          <el-row>
            <el-button type="text" size="small"
              @click="openEditImage(scope.$index,scope.row)">
              编辑品类图片
            </el-button>
          </el-row>
          <!-- <el-row>
            <el-button type="text" size="small" @click="relevancyType(scope.$index,scope.row,'type','demand')">
              关联供应类型
            </el-button>
          </el-row>
          <el-row>
            <el-button type="text" size="small" @click="relevancyType(scope.$index,scope.row, 'type', 'supply')">
              关联采购类型
            </el-button>
          </el-row>
          <el-row>
            <el-button type="text" size="small" @click="relevancyType(scope.$index,scope.row, 'scene','demand')">
              关联供应场景
            </el-button>
          </el-row>
          <el-row>
            <el-button type="text" size="small" @click="relevancyType(scope.$index,scope.row, 'scene','supply')">
              关联采购场景
            </el-button>
          </el-row> -->
          <el-row>
            <el-button type="text" size="small" @click="openDemandScreen(scope.$index,scope.row, 'scene','demand')">
              查看需求场景
            </el-button>
          </el-row>
          <el-row>
            <el-button type="text" size="small" @click="delClass(scope.$index,scope.row)" :disabled="scope.row.delBtnFlag == 0">
              删除品类名称
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>


    <!-- <newClassName @closeNew="closeNew" v-if="isNew"></newClassName>
    <batchImport @closeNew="closeImport" v-if="isImport"></batchImport> -->
    <editClassName @closeNew="closeEditName" v-if="isEditName" :editRow="editRow" @refresh="getBriefList"></editClassName>
    <editImage @closeNew="closeEditImage" v-if="isEditImage" :editRow="editRow" @refresh="getBriefList"></editImage>
    <relevancyType @closeNew="closeRelevancyType" v-if="isRelevancyType" :editRow="editRow" @refresh="getBriefList"></relevancyType>
    <DemandScreen @closeNew="closeDemandScreen" v-if="isScreen" :openRow="editRow" @refresh="getBriefList"></DemandScreen>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import newClassName from '@/views/categoryRole/giveClass/components/newClassName.vue'
  import batchImport from '@/views/categoryRole/giveClass/components/batchImport.vue'
  import editClassName from '@/views/categoryRole/giveClass/components/editClassName.vue'
  import editImage from '@/views/categoryRole/giveClass/components/editImage.vue'
  import relevancyType from '@/views/categoryRole/giveClass/components/relevancyType.vue'
  import DemandScreen from '@/views/categoryRole/giveClass/components/DemandScreen.vue'
  import pages from '@/views/components/common/pages.vue'
  import {
    getBriefList,
    deleteByCGuid
  } from '@/api/categoryRole/giveClass.js'
  export default {
    name: "index",
    components: {
      newClassName,
      batchImport,
      editClassName,
      editImage,
      relevancyType,
      DemandScreen,
      pages
    },
    data() {
      return {
        searchVal: '', // 搜索内容
        isToSearch: false,
        searchResult: 0,
        // activeName: "0",
        // tabList: [{
        //   name: '未对称品类',
        //   type: "0"
        // }, {
        //   name: '已对称品类',
        //   type: "1"
        // }],
        tableData: [],
        isNew: false,
        newName: '', // 新建类名
        editName: '', // 编辑类名,
        isImport: false,
        isEditName: false,
        isEditImage: false,
        isRelevancyType: false,
        isScreen: false,
        editRow: {},
        page: 1,
        pageTotal: 0,
        bothSDFlag: 0, // 分类tab选择
        basicImgUrl: this.$store.state.basics.img_url_cat,
		loading: true,
      };
    },
    methods: {
      // 切换表头时,重新请求
      handleClick(val) {
        console.log(val);
        let type = val.name
        if (type == "1") {
          this.bothSDFlag = 1
        } else {
          this.bothSDFlag = 0
        }
        this.getBriefList()
      },
      searchClass() {
        if(this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getBriefList()
      },
      clearSearch() {
        this.searchVal = ''
        this.searchClass()
      },
      toBatchDeleteClass() {
        this.$router.push({
          path: "batchDeleteClass",
          query: {},
        });
      },
      // 删除类名
      delClass(index, row) {
        console.log(row);
        console.log(row.guid);
        this.$confirm('确定删除' + row.categoryName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.tableData.splice(index, 1)
          this.deleteByCGuid(row.guid)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async deleteByCGuid(id) {
        await deleteByCGuid({
          categoryGuid: id
        }).then(res => {
          if(res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getBriefList()
          } else {
            this.$message({
              type: 'error',
              message: '已有供方，不可删除!'
            });
          }

        })
      },
      // 新建类名
      openNew() {
        this.isNew = true
      },
      closeNew() {
        this.isNew = false
      },
      // 批量导入
      openImport() {
        this.isImport = true
      },
      closeImport() {
        this.isImport = false
      },
      // 编辑类名
      openEditName(index, row) {
        this.isEditName = true
        this.editRow = row
      },
      closeEditName() {
        this.isEditName = false
      },
      // 编辑图片
      openEditImage(index, row) {
        this.isEditImage = true
        this.editRow = row
      },
      closeEditImage() {
        this.isEditImage = false
      },
      // 关联供需类型
      relevancyType(index, row, scene, type) {
        this.isRelevancyType = true
        this.editRow = row
        this.editRow.scene = scene
        this.editRow.type = type
      },
      closeRelevancyType() {
        this.isRelevancyType = false
      },
      // 关联供需场景
      relevancyScene(index, row) {

      },
      // 查看需求场景
      openDemandScreen(index, row) {
        this.editRow = row
        this.isScreen = true
      },
      closeDemandScreen() {
        this.isScreen = false
      },
      // web-查询品类信息分页列表
      async getBriefList() {
		this.loading = true
        await getBriefList({
          categoryName: this.searchVal,
          size: '20',
          bothSDFlag: this.bothSDFlag,
          page: this.page
        }).then(res => {
		  this.loading = false
          console.log(res);
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
          this.searchResult = this.tableData.length
        })
      },
      changePage(page) {
        this.page = page
        this.getBriefList()
      }
    },
    mounted() {
      console.log('url',process.env.VUE_APP_BASE_URL_MID);
      this.getBriefList()
    }
  };
</script>

<style lang="scss">
  .del-icon {
    position: absolute;
    right: 4px;
    top: 4px;
  }

  .input-box {
    width: 70%;
    margin: 40px auto;

    .input-text {
      width: 100px;
      flex-shrink: 0;
    }
  }
</style>
