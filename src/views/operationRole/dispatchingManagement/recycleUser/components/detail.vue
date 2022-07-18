<template>
  <div>
    <el-dialog title="详情" width="900px" :visible.sync="isOpen" destroy-on-close @close="beforeClose">

      <div style="padding-bottom: 60px;">
        <el-descriptions :colon="false" class="margin-top" :column="1">
          <el-descriptions-item label-class-name="my-label" label="品类名称">{{row.categoryName}}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="数量">{{row.num}}</el-descriptions-item>
        </el-descriptions>

        <div class="flex flex-center mb20 jsb">
          <el-row class="flex flex-center">
            <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchVal" @keyup.enter.native="search"
              style="width: 200px;margin-right: 20px;" @clear="search">
              <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
            </el-input>
            <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
          </el-row>
        </div>
        <el-table :data="tableData" border>
          <el-table-column prop="userName" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="nation" label="区号" align="center">
          </el-table-column>
          <el-table-column prop="phonenumber" label="联系电话" align="center">
          </el-table-column>
          <el-table-column prop="registerTime" label="注册日期" align="center">
          </el-table-column>
          <el-table-column label="增加人力资源信息" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openAddMessage(scope.row)" :disabled="!scope.row.userId">
                {{scope.row.guideUserCount}}
              </el-button>

            </template>
          </el-table-column>
          <el-table-column label="引导成果" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openGuide(scope.row)" :disabled="!scope.row.userId">
                {{scope.row.guideUserOrderCount}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="供应成果" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openSupply(scope.row)" :disabled="!scope.row.userId">
                {{scope.row.userSupplyOrderCount}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="采购成果" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openPurchase(scope.row)" :disabled="!scope.row.userId">
                {{scope.row.userPurchaseOrderCount}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="其他" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="checkPersonalinformation(scope.row)" :disabled="!scope.row.userId" type="text" size="small">查看个人账号信息</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

        <pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
        <addHRmessage v-if="isMessage" @close="closeAddMessage" :row="openRow"></addHRmessage>
        <guideResult v-if="isGuide" :row="openRow" @close="closeGuide"></guideResult>
        <purchaseResult v-if="isPurchase" @close="closePurchase" :row="openRow"></purchaseResult>
        <supplyResult v-if="isSupply" @close="closeSupply" :row="openRow"></supplyResult>
        <userMessage v-if="isUserMessage" @close="closePersonalinformation" :row="openRow"></userMessage>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import addHRmessage from '@/views/operationRole/components/addHRmessage.vue'
  import guideResult from '@/views/operationRole/components/guideResult.vue'
  import purchaseResult from '@/views/operationRole/components/purchaseResult.vue'
  import supplyResult from '@/views/operationRole/components/supplyResult.vue'
  import userMessage from '@/views/components/common/userMessage'
  import {
    getTakeBackUserList
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  import pages from '@/views/components/common/pages.vue'
  export default {
    name: "index",
    components: {
      addHRmessage,
      guideResult,
      purchaseResult,
      supplyResult,
      userMessage,
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
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        tableData: [],
        isOpen: true,
        isMessage: false,
        isGuide: false,
        isSupply: false,
        isPurchase: false,
        isUserMessage: false,
        page: 1,
        pageTotal: 0,
        openRow: {}
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
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getTakeBackUserList()
      },
      changePage(page) {
        this.page = page
        this.getTakeBackUserList()
      },

      checkPersonalinformation(row) {
        this.openRow = row
        this.isUserMessage = true
      },
      closePersonalinformation() {
        this.isUserMessage = false
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
        console.log(this.isMessage);
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
      async getTakeBackUserList() {
        await getTakeBackUserList({
          categoryGuid: this.row.categoryGuid,
          size: '20',
          page: this.page,
        }).then(res => {
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
          } else {
            this.tableData = []
          }
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
            20 + 1
          this.searchResult = this.tableData.length

        })
      },
    },
    created() {
      this.getTakeBackUserList()
    }
  };
</script>

<style lang="scss">
</style>
