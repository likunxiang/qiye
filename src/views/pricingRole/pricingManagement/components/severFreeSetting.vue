<template>
  <el-dialog title="服务费用设置" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 60px;" v-loading="loading">
      <el-table :data="tableDataFirst" border>
        <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册日期" align="center"></el-table-column>
        <el-table-column prop="addCatTime" label="品类添加日期" align="center"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类类型</div>
        <div>{{categoryRow.cattypeName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类名称</div>
        <div>{{categoryRow.categoryName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">收取范围</div>
        <div>按型号名称</div>
      </el-row>
      <el-divider></el-divider>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">型号名称</div>
        <div>{{openRow.modelName}}</div>
      </el-row>
      <el-divider></el-divider>
      <el-button class="mb20" type="primary" @click="newPricing">新建服务定价</el-button>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="targetObject" label="收取对象" align="center"></el-table-column>
        <el-table-column prop="chargeType" label="收取方式" align="center"></el-table-column>
        <el-table-column prop="chargeValue" label="收取数值" align="center"></el-table-column>
        <el-table-column prop="startDate" label="起始时间" align="center"></el-table-column>
        <el-table-column prop="endDate" label="终止时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="text" @click="openPricing(scope.row)">详情</el-button>
            </el-row>
            <el-row>
              <el-button type="text" @click="delPricing(scope.row)">删除</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
      <pricingModelName v-if="isNew" @close="closePricing" @refresh="getAcctoMnPersModelList" :categoryRow="categoryRow" :modelUpRow="openRow" :modelRow="modelRow"></pricingModelName>
      <pricingModelNameDetail v-if="isPricing" @close="closePricing" :serviceRow="serviceRow" :categoryRow="categoryRow" :modelUpRow="openRow" :modelRow="modelRow"></pricingModelNameDetail>
      <delPricing v-if="isDel" @close="closeDel" :openRow="serviceRow" @refresh="getAcctoMnPersModelList"></delPricing>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import pricingModelName from '@/views/pricingRole/pricingManagement/components/pricingModelName.vue'
  import pricingModelNameDetail from '@/views/pricingRole/pricingManagement/components/pricingModelNameDetail.vue'
  import delPricing from '@/views/pricingRole/pricingManagement/components/delPricing.vue'
  import {
    getAcctoMnPersModelList,
    deleteMn
  } from '@/api/pricingRoleApi/pricingManagement.js'
  export default {
    name: "index",
    components: {
      pages,
      pricingModelName,
      pricingModelNameDetail,
      delPricing
    },
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      categoryRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      modelRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    data() {
      return {
        isOpen: true,
        page: 1,
        pageTotal: 0,
        tableData: [],
        tableDataFirst: [],
        loading: false,
        isNew: false,
        serviceRow: {},
        isPricing: false,
        isDel: false,
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
      newPricing() {
        this.isNew = true
      },
      closePricing() {
        this.isNew = false
        this.isPricing = false
      },
      openPricing(row) {
        this.serviceRow = row
        this.isPricing = true
      },
      delPricing(row) {
        this.serviceRow = row
        this.isDel = true
      },
      closeDel() {
        this.isDel = false
      },
      changePage(page) {
        this.page = page
        this.getAcctoMnPersModelList()
      },
      async getAcctoMnPersModelList() {
        this.loading = true
        await getAcctoMnPersModelList({
          categoryGuid: this.categoryRow.categoryGuid,
          curUserId: this.$store.state.user.adminId,
          modelGuid: this.openRow.modelGuid,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {

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
      },
    },
    created() {
      this.tableDataFirst.push(this.modelRow)
      this.getAcctoMnPersModelList()
    }
  };
</script>

<style lang="scss" scoped>
</style>
