C<template>
  <div class="app-container">
    <el-row class="mb20 flex flex-center">
      <el-button class="mr10" type="primary" @click="openUserScope">用户范围（{{chooseNum}}）</el-button>
      <div>{{chooseCondition}}</div>
    </el-row>
    <div class="flex flex-center mb20 jsb">
      <el-row class="flex flex-center">
        <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchVal" @keyup.enter.native="search"
          style="width: 200px;margin-right: 20px;" @clear="search">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
        </el-input>
        <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
      </el-row>
      <el-row>
        <el-button type="primary" @click="openSort">排序管理<i class="el-icon-arrow-down"></i></el-button>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column prop="username" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="nation" label="区号" align="center">
      </el-table-column>
      <el-table-column prop="phonenumber" label="联系电话" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="注册日期" align="center">
      </el-table-column>
      <el-table-column label="增加人力资源信息" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openAddMessage(scope.row)">
            {{scope.row.manualAddNum}}
          </el-button>

        </template>
      </el-table-column>
      <el-table-column label="引导成果" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openGuide(scope.row)">
            {{scope.row.guideNum}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="供应成果" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openSupply(scope.row)">
            {{scope.row.supplyNum}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="采购成果" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openPurchase(scope.row)">
            {{scope.row.purchaseNum}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="其他" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="checkPersonalinformation(scope.row)" type="text" size="small" :disabled="!scope.row.userId">查看个人账号信息</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>


    <userScope v-if="isScope" @close="closeUserScope" :param="param" @submit="getUserGuideList"
      @getChooseCondition="getChooseCondition">
    </userScope>
    <sortManage v-if="isSort" @close="closeSort" :row="openRow" @sortFun="sortFun"></sortManage>
    <addHRmessage v-if="isMessage" @close="closeAddMessage" :row="openRow"></addHRmessage>
    <guideResult v-if="isGuide" :row="openRow" @close="closeGuide"></guideResult>
    <purchaseResult v-if="isPurchase" @close="closePurchase" :row="openRow"></purchaseResult>
    <supplyResult v-if="isSupply" @close="closeSupply" :row="openRow"></supplyResult>
    <userMessage v-if="isUserMessage" @close="closePersonalinformation" :row="openRow"></userMessage>
    <pages @changePage="changePage" :page="page" :total="pageTotal" :showTotal="false"></pages>
  </div>
</template>

<script>
  import userScope from '@/views/operationRole/dispatchingManagement/humanResource/components/userScope.vue'
  import sortManage from '@/views/operationRole/dispatchingManagement/humanResource/components/sortManage.vue'
  import addHRmessage from '@/views/operationRole/components/addHRmessage.vue'
  import guideResult from '@/views/operationRole/components/guideResult.vue'
  import purchaseResult from '@/views/operationRole/components/purchaseResult.vue'
  import supplyResult from '@/views/operationRole/components/supplyResult.vue'
  import userMessage from "@/views/components/common/userMessage.vue"
  import {
    getUserGuideList,
    getCategoryTakeBakeTotalCount_1_0_1
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  import pages from '@/views/components/common/pages.vue'
  export default {
    name: "index",
    components: {
      userScope,
      sortManage,
      addHRmessage,
      guideResult,
      purchaseResult,
      supplyResult,
      userMessage,
      pages,
    },
    data() {
      return {
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        tableData: [],
        isScope: false,
        isSort: false,
        isMessage: false,
        isGuide: false,
        isSupply: false,
        isPurchase: false,
        isUserMessage: false,
        param: {
          registerFlag: '',
          guideFlag: '',
          guidedFlag: '',
          supplyFlag: '',
          purchaseFlag: '',
          guidedStatus: '',
          guideSoure: '',
          userTag: '',
          phonenumber: '',
          categoryName: '',
          categoryGuid: '',
          page: 1,
          size: '20',
          orderBy: 'guideNum desc'
        }, // 请求参数对象
        chooseNum: 0, // 筛选数量
        openRow: {},
        chooseCondition: '',
        page: 1,
        pageTotal: 0,
        loading: true
      };
    },
    methods: {
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.param.page = 1
        this.getUserGuideList()
        this.getCategoryTakeBakeTotalCount_1_0_1()
      },
      changePage(page) {
        this.param.page = page
        this.getUserGuideList()
      },
      // 获取组件里传出了的排序
      sortFun(data) {
        this.param.orderBy = data
        this.getUserGuideList()
        this.getCategoryTakeBakeTotalCount_1_0_1()
      },
      checkPersonalinformation(row) {
        this.openRow = row
        this.isUserMessage = true
      },
      closePersonalinformation() {
        this.isUserMessage = false
      },

      openUserScope() {
        this.isScope = true
      },
      closeUserScope() {
        this.isScope = false
      },
      openSort() {
        this.isSort = true
      },
      closeSort() {
        this.isSort = false
      },

      openAddMessage(row) {
        this.openRow = row
        this.isMessage = true
      },
      closeAddMessage() {
        this.isMessage = false
      },
      openGuide(row) {
        this.openRow = row
        this.isGuide = true
      },
      closeGuide() {
        this.isGuide = false
      },
      openSupply(row) {
        this.openRow = row
        this.isSupply = true
      },
      closeSupply() {
        this.isSupply = false
      },
      openPurchase(row) {
        this.openRow = row
        this.isPurchase = true
      },
      closePurchase() {
        this.isPurchase = false
      },
      //
      async getUserGuideList(param) {
        this.loading = true
        console.log('param', this.param);
        console.log('data', param);
        this.param = {
          ...this.param,
          ...param
        }
        if (this.searchVal) {
          this.param.phonenumber = this.searchVal
        } else {
          this.param.phonenumber = ''
        }
        await getUserGuideList(this.param).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length > 0) {
            this.tableData = res.Tag[0].Table
            for (let i in this.tableData) {
              var tiem = this.tableData[i].createTime;
              var division = tiem.indexOf(' ');
              this.tableData[i].createTime = tiem.substring(0, division)
            }
          } else {
            this.tableData = []
          }
          console.log('this.tableData.length',this.tableData.length);
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.param.page - 1) * 20 + 21 : (this.param.page - 1) *
            20 + 1
        })
      },
      // 获取选中筛选条件
      getChooseCondition(data) {
        this.chooseCondition = data.roleString
        this.chooseNum = data.chooseNum

      },
      async getCategoryTakeBakeTotalCount_1_0_1() {
        await getCategoryTakeBakeTotalCount_1_0_1({
          categoryName: this.searchVal
        }).then(res => {
          console.log(res);
          this.pageTotal = parseInt(res.Tag[0].Table[0].total)
          this.searchResult = parseInt(res.Tag[0].Table[0].total)
        })
      },
    },
    created() {
      this.getUserGuideList()
      // this.getCategoryTakeBakeTotalCount_1_0_1()
    }
  };
</script>

<style lang="scss">
</style>
