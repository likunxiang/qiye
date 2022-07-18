<template>
  <!-- 派发人力资源信息 -->
  <div class="app-container">
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
            <el-button @click="checkPersonalinformation(scope.row)" type="text" size="small">查看个人账号信息</el-button>
          </el-row>
          <el-row>
            <el-button @click="sendPersonnel(scope.row)" type="text" size="small">派发人力资源信息</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>


    <sortManage v-if="isSort" @close="closeSort" :row="openRow" @sortFun="sortFun"></sortManage>
    <addHRmessage v-if="isMessage" @close="closeAddMessage" :row="openRow"></addHRmessage>
    <guideResult v-if="isGuide" @close="closeGuide" :row="openRow"></guideResult>
    <purchaseResult v-if="isPurchase" @close="closePurchase" :row="openRow"></purchaseResult>
    <supplyResult v-if="isSupply" @close="closeSupply" :row="openRow"></supplyResult>
    <userMessage v-if="isUserMessage" @close="closePersonalinformation" :row="openRow"></userMessage>
    <!-- 派发人力资源 -->
    <sendPersonnel v-if="isSend" @close="closeSendPersonnel" :row="openRow"></sendPersonnel>

    <pages @changePage="changePage" :page="param.page" :total="pageTotal"></pages>
  </div>
</template>

<script>
  import sortManage from '@/views/operationRole/dispatchingManagement/humanResource/components/sortManage.vue'
  import addHRmessage from '@/views/operationRole/components/addHRmessage.vue'
  import guideResult from '@/views/operationRole/components/guideResult.vue'
  import purchaseResult from '@/views/operationRole/components/purchaseResult.vue'
  import supplyResult from '@/views/operationRole/components/supplyResult.vue'
  import userMessage from "@/views/components/common/autonymMessage.vue"
  import sendPersonnel from '@/views/operationRole/dispatchingManagement/distributeHuman/components/sendPersonnel.vue'
  import pages from '@/views/components/common/pages.vue'
  import {
    getGuideUserInfoList
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  export default {
    name: "index",
    components: {
      sortManage,
      addHRmessage,
      guideResult,
      purchaseResult,
      supplyResult,
      userMessage,
      sendPersonnel,
      pages
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
        isSend: false,
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
        openRow: {},
        pageTotal: 0,
        loading: true,
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
        this.param.phonenumber = this.searchVal
        this.getGuideUserInfoList()
      },
      // 获取组件里传出了的排序
      sortFun(data) {
        this.param.orderBy = data
        this.getGuideUserInfoList()
      },
      changePage(page) {
        this.param.page = page
        this.getGuideUserInfoList()
      },

      checkPersonalinformation(row) {
        this.openRow = row
        this.isUserMessage = true
      },
      closePersonalinformation() {
        this.isUserMessage = false
      },
      // 派发人力资源按钮
      sendPersonnel(row) {
        this.openRow = row
        this.isSend = true
      },
      closeSendPersonnel() {
        this.isSend = false
      },


      openSort() {
        this.isSort = true
      },
      closeSort() {
        this.isSort = false
      },

      openAddMessage(row) {
        console.log(9999);
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
      async getGuideUserInfoList() {
        this.loading = true
        await getGuideUserInfoList(this.param).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            for (let i in data) {
              var tiem = data[i].createTime;
              var division = tiem.indexOf(' ');
              data[i].createTime = tiem.substring(0, division)
            }
            this.tableData = data
          } else {
            this.tableData = []
          }
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.param.page - 1) * 20 + 21 : (this.param.page - 1) *
            20 + 1
        })
      }
    },
    created() {
      this.getGuideUserInfoList()
    }
  };
</script>

<style lang="scss">
</style>
