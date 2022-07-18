<template>
  <div class="app-container">
    <div v-loading="loading">
      <div class="mb20">
        <div class="flex flex-center jsb mb10">
          <div class="filter-title">按照品类定义筛选</div>
          <el-button type="primary" @click="resetFilter">筛选条件重置</el-button>
        </div>
        <div class="flex flex-center mb10">
          <div class="filter-item-title">选择品类类型</div>
          <el-input placeholder="请选择" v-model="searchForm.class.name" @keyup.enter.native="toSearch"
            style="width: 200px;" :readonly='true' @focus="openClass">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="toSearch">
            </i>
          </el-input>
        </div>
        <div class="flex flex-center mb10">
          <div class="filter-item-title">选择需求场景</div>
          <el-input placeholder="请选择" v-model="searchForm.screen.name" @keyup.enter.native="toSearch"
            style="width: 200px;" readonly @focus="openScreen">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="toSearch">
            </i>
          </el-input>
        </div>
        <!-- 字节标题 -->
        <chooseByteTitle v-if="searchForm.screen.guid" :openRow="searchForm.screen" @getByteGuid="getByteGuid"
          @toSearch="toSearch"></chooseByteTitle>
      </div>
      <div class="mb20">
        <div class="flex flex-center jsb mb10">
          <div class="filter-title">按品类名称状态筛选</div>
        </div>
        <div class="flex flex-center mb10">
          <div class="filter-item-title">品类名称存留时长</div>
          <el-input v-if="searchForm.time == 0" placeholder="请选择" value="" @keyup.enter.native="toSearch"
            style="width: 200px;" readonly @focus="openTime">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="toSearch">
            </i>
          </el-input>
          <el-input v-else placeholder="请选择" v-model="searchForm.time" @keyup.enter.native="toSearch"
            style="width: 200px;" readonly @focus="openTime">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="toSearch">
            </i>
          </el-input>
        </div>
      </div>
      <div class="mb20">
        <div class="flex flex-center jsb mb10">
          <div class="filter-title">按品类名称关键词筛选</div>
        </div>
        <el-input placeholder="请输入你要找的品类名称" v-model="searchForm.searchVal" @keyup.enter.native="toSearch"
          style="width: 200px;">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="toSearch">
          </i>
        </el-input>
      </div>
    </div>
    <div class="table-container">
      <div class="filter-result">
        <div class="flex flex-center">
          <div class="result-text">符合筛选条件的无供方品类（{{classTotal}}）</div>
          <!-- <el-button type="primary" @click="changeAll">{{isAll?'取消全选':'全选'}}</el-button> -->
        </div>
        <el-button type="primary" @click="delClass" :disabled="!delList.length">批量删除品类名称</el-button>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%" @select-all="changeAll" @selection-change="changeOne">
          <el-table-column type="selection" align="center" />
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
          <el-table-column label="品类生成日期" prop="createTime" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <chooseClassType v-if="isClass" @close="closeClass" @getClass="getClass"></chooseClassType>
    <chooseScreen v-if="isScreen" @close="closeScreen" @getScreen="getScreen" :openRow="this.searchForm.class">
    </chooseScreen>
    <chooseTime v-if="isTime" @close="closeTime" @getTime="getTime"></chooseTime>
    <pages @changePage="changePage" :total="classTotal" :page="page"></pages>
  </div>
</template>

<script>
  import {
    getCountByCon_1_0_1,
    getListByCon_1_0_1,
    deleteByCGuid
  } from '@/api/categoryRole/giveClass.js'
  import chooseClassType from './components/chooseClassType.vue'
  import chooseScreen from './components/chooseScreen.vue'
  import chooseByteTitle from './components/chooseByteTitle.vue'
  import chooseTime from './components/chooseTime.vue'
  import pages from '@/views/components/common/pages.vue'
  export default {
    name: "index",
    components: {
      chooseClassType,
      chooseScreen,
      chooseByteTitle,
      chooseTime,
      pages
    },
    data() {
      return {
        searchForm: {
          class: {},
          screen: {},
          time: 0,
          searchVal: ''
        },
        guidList: [], // 字节内容guid列表
        tableData: [],
        delList: [],
        isClass: false,
        isScreen: false,
        isTime: false,
        isAll: false, // 全选
        loading: false,
        basicImgUrl: this.$store.state.basics.img_url_cat,
        classTotal: 0,
        page: 1,
      };
    },
    methods: {
      changePage(page) {
        this.page = page
        this.toSearch()
      },
      resetFilter() {
        this.searchForm = {
          class: {},
          screen: {},
          time: 0,
          searchVal: ''
        }
        this.guidList = []
        this.delList = []
        this.toSearch()
      },
      changeAll(selection) {
        let arr = selection.map(item => item.guid)
        this.delList = arr
      },
      changeOne(selection, row) {
        let arr = selection.map(item => item.guid)
        this.delList = arr
      },
      async deleteByCGuid() {
        let arr = []
        for (let i in this.delList) {
          let obj = {
            categoryGuid: this.delList[i]
          }
          arr.push(obj)
        }
        await deleteByCGuid(JSON.stringify(arr)).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.toSearch()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }

        })
      },
      openClass() {
        this.isClass = true
      },
      closeClass() {
        this.isClass = false
      },
      getClass(data) {
        this.searchForm.class = data
      },
      openScreen() {
        this.isScreen = true
      },
      closeScreen() {
        this.isScreen = false
      },
      getScreen(data) {
        this.searchForm.screen = data
      },
      getByteGuid(data) {
        this.guidList = data
      },
      openTime() {
        this.isTime = true
      },
      closeTime() {
        this.isTime = false
      },
      getTime(data) {
        this.searchForm.time = data
      },
      // changeAll() {
      //   this.isAll = !this.isAll
      // },
      delClass() {
        let length = this.delList.length
        this.$confirm('确认删除选中的品类名称(' + length + ')?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.deleteByCGuid()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      async getCountByCon_1_0_1() {
        let param = {
          cattypeGuid: this.searchForm.class.guid ? this.searchForm.class.guid : '',
          catreeGuid: this.searchForm.screen.guid ? this.searchForm.screen.guid : '',
          treeName1: this.guidList[1] ? this.guidList[1] : '',
          treeName2: this.guidList[2] ? this.guidList[2] : '',
          treeName3: this.guidList[3] ? this.guidList[3] : '',
          treeName4: this.guidList[4] ? this.guidList[4] : '',
          treeName5: this.guidList[5] ? this.guidList[5] : '',
          treeName6: this.guidList[6] ? this.guidList[6] : '',
          treeName7: this.guidList[7] ? this.guidList[7] : '',
          treeName8: this.guidList[8] ? this.guidList[8] : '',
          treeName9: this.guidList[9] ? this.guidList[9] : '',
          treeName10: this.guidList[10] ? this.guidList[10] : '',
          categoryName: this.searchForm.searchVal ? this.searchForm.searchVal : '',
          categoryRemainTime: this.searchForm.time > 0 ? this.searchForm.time : 9999999
        }
        await getCountByCon_1_0_1(param).then(res => {
          if (res.Tag.length > 0) {
            this.classTotal = parseInt(res.Tag[0].Table[0].catCount)
          } else {
            this.classTotal = 0
          }
        })
      },
      async getListByCon_1_0_1() {
        let param = {
          cattypeGuid: this.searchForm.class.guid ? this.searchForm.class.guid : '',
          catreeGuid: this.searchForm.screen.guid ? this.searchForm.screen.guid : '',
          treeName1: this.guidList[1] ? this.guidList[1] : '',
          treeName2: this.guidList[2] ? this.guidList[2] : '',
          treeName3: this.guidList[3] ? this.guidList[3] : '',
          treeName4: this.guidList[4] ? this.guidList[4] : '',
          treeName5: this.guidList[5] ? this.guidList[5] : '',
          treeName6: this.guidList[6] ? this.guidList[6] : '',
          treeName7: this.guidList[7] ? this.guidList[7] : '',
          treeName8: this.guidList[8] ? this.guidList[8] : '',
          treeName9: this.guidList[9] ? this.guidList[9] : '',
          treeName10: this.guidList[10] ? this.guidList[10] : '',
          categoryName: this.searchForm.searchVal ? this.searchForm.searchVal : '',
          categoryRemainTime: this.searchForm.time > 0 ? this.searchForm.time : 9999999,
          size: '20',
          page: this.page
        }
        await getListByCon_1_0_1(param).then(res => {
          this.loading = false
          if (res.Tag.length > 0) {
            this.tableData = res.Tag[0].Table
          } else {
            this.tableData = []
          }
        })
      },
      toSearch() {
        this.loading = true
        this.getListByCon_1_0_1()
        this.getCountByCon_1_0_1()
      }
    },
    created() {
      this.toSearch()
    }
  }
</script>

<style scoped lang="scss">
  .filter-title {
    font-size: 16px;
    font-weight: bold;
  }

  .filter-item-title {
    font-weight: bold;
    margin-right: 20px;
  }

  .table-container {
    .filter-result {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .result-text {
        color: red;
        margin-right: 10px;
      }
    }
  }
</style>
