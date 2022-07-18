<template>
  <el-dialog title="按型号类型收取管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类类型</div>
        <div>{{openRow.cattypeName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类名称</div>
        <div>{{openRow.categoryName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">收取范围</div>
        <div>按型号类型</div>
      </el-row>
      <el-divider></el-divider>
      <el-button type="primary" class="mb20" @click="openPricing">新建服务定价</el-button>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="targetObject" label="收取对象" align="center"></el-table-column>
        <el-table-column prop="chargeType" label="收取方式" align="center"></el-table-column>
        <el-table-column prop="mchargeValue" label="有型号--收取数值" align="center"></el-table-column>
        <el-table-column prop="nomchargeValue" label="无型号--收取数值" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
      <pricingModelType v-if="isSetting" @close="closePricing" :openRow="openRow" @refresh="getAcctoMtLogList"></pricingModelType>
    </div>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import pricingModelType from '@/views/pricingRole/pricingManagement/components/pricingModelType.vue'
  import {
    getAcctoMtLogList
  } from '@/api/pricingRoleApi/pricingManagement.js'
  export default {
    name: "index",
    components: {
      pages,
      pricingModelType
    },
    props: {
      openRow: {
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
        loading: false,
        isSetting: false,
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
        this.getAcctoMtLogList()
        //
      },
      openPricing() {
        this.isSetting = true
      },
      closePricing() {
        this.isSetting = false
      },
      async getAcctoMtLogList() {
        this.loading = true
        await getAcctoMtLogList({
          curUserId: this.$store.state.user.adminId,
          categoryGuid: this.openRow.categoryGuid,
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
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      console.log(999);
      this.getAcctoMtLogList()
    }
  };
</script>

<style lang="scss" scoped>
</style>
