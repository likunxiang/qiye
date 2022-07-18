<template>
  <div class="app-container">
    <div class="flex jsb flex-center">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <div class="mb20 flex">
        <div class="flex flex-center mr20">
          <div class="mr10">合作状态</div>
          <el-select v-model="statusValue" placeholder="请选择" @change="chooseStatus">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="flex flex-center">
          <div class="mr10">合同终止倒计时</div>
          <el-select v-model="contractValue" placeholder="请选择" @change="chooseContract">
              <el-option
                v-for="(item,index) in contractList"
                :key="item.value"
                :label="index > 0?item.label + '天':item.label"
                :value="item.label">
              </el-option>
            </el-select>
        </div>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="orgCreateTime" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="orgCollectTime" label="领取日期" align="center"></el-table-column>
      <el-table-column prop="orgConEndDate" label="合同终止日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openSignDetail(scope.row)">查看签约记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <signedDetail v-if="isDetail" :row="openRow" @close="closeDetail" @refresh="getSignValidOrgList"></signedDetail>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import signedDetail from "@/views/choseAttache/orgSelect/components/signedDetail"
  import {
    getSignValidOrgList
  } from '@/api/choseAttacheApi/choseAttacheCom.js'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      signedDetail
    },
    data() {
      return {
        loading: false,
        tableData: [{
          cattypeName: '中国建设银行股份有限公司福建分公司'
        }],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        statusValue: '0',
        statusList: [
          {
            value: '0',
            label: '不限'
          },
          {
            value: '2',
            label: '在合作'
          },{
            value: '1',
            label: '未合作'
          }
        ],
        contractValue: '不限',
        contractList: [
          {
            value: '0',
            label: '不限'
          },
          {
            value: '1',
            label: '30'
          },
          {
            value: '2',
            label: '60'
          },
          {
            value: '3',
            label: '90'
          },
        ],
        isDetail: false,

      };
    },
    methods: {
      openSignDetail(row) {
        this.openRow = row
        this.isDetail = true
      },
      closeDetail() {
        this.isDetail = false
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getSignValidOrgList()
        //
      },
      changePage(page) {
        this.page = page
        this.getSignValidOrgList()
        //
      },
      chooseStatus() {
        this.getSignValidOrgList()
      },
      chooseContract(value) {
        console.log(value);
        this.getSignValidOrgList()
      },
      async getSignValidOrgList() {
        this.loading = true
        await getSignValidOrgList({
          orgName: this.searchVal,
          curUserId: this.$store.state.user.adminId,
          signStatus: this.statusValue,
          remainDuration: this.contractValue == '不限'?'0':this.contractValue,
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
      this.getSignValidOrgList()
    }
  }
</script>

<style scoped lang="scss">
</style>
