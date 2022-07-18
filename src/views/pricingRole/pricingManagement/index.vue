<template>
  <div class="app-container">
    <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal" @keyup.enter.native="search"
        style="width: 200px;margin-right: 20px;" @clear="search">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类名称" align="center">
      </el-table-column>
      <el-table-column prop="cattypeName" label="品类类型" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-row>
            <el-button @click="toSetting(scope.row)" type="text" size="small">服务费用定价设置</el-button>
          </el-row> -->
          <el-row>
            <el-button @click="openPricing(scope.row,0)" type="text" size="small">按品类收取</el-button>
          </el-row>
          <!-- <el-row>
            <el-button @click="openPricing(scope.row,1)" type="text" size="small">按供方型号收取</el-button>
          </el-row>
          <el-row>
            <el-button @click="openPricing(scope.row,2)" type="text" size="small">按我方型号收取</el-button>
          </el-row> -->
          <el-row>
            <el-button @click="openPricing(scope.row,1)" type="text" size="small">按型号类型</el-button>
          </el-row>
          <el-row>
            <el-button @click="openPricing(scope.row,2)" type="text" size="small">按型号名称</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
    <toClass v-if="isSetting && collectType == 0" @close="closePricing" :openRow="openRow"></toClass>
    <!-- <toSupply v-if="isSetting && collectType == 1" @close="closePricing" :openRow="openRow"></toSupply>
    <toOur v-if="isSetting && collectType == 2" @close="closePricing" :openRow="openRow"></toOur> -->
    <toModelType v-if="isSetting && collectType == 1" @close="closePricing" :openRow="openRow"></toModelType>
    <toModelName v-if="isSetting && collectType == 2" @close="closePricing" :openRow="openRow"></toModelName>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/pricingRoleApi/pricingManagement.js'
  import toClass from '@/views/pricingRole/pricingManagement/components/accordingToClass.vue'
  import toSupply from '@/views/pricingRole/pricingManagement/components/accordingToSupply.vue'
  import toOur from '@/views/pricingRole/pricingManagement/components/accordingToOur.vue'
  import toModelType from '@/views/pricingRole/pricingManagement/components/accordingToModelType.vue'
  import toModelName from '@/views/pricingRole/pricingManagement/components/accordingToModelName.vue'
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      toClass,
      toSupply,
      toOur,
      pages,
      toModelType,
      toModelName
    },
    data() {
      return {
        searchResult: 0,
        isToSearch: false,
        searchVal: '',
        tableData: [],
        page: 1,
        pageTotal: 0,
        isSetting: false,
        loading: false
      };
    },
    methods: {
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getList()
      },
      toSetting(row) {
        let obj = row
        this.$router.push({
          path: 'pricingSetting',
          query: obj
        })
      },
      openPricing(row, type) {
        this.openRow = row
        this.collectType = type
        this.isSetting = true
      },
      closePricing() {
        this.isSetting = false
      },

      changePage(page) {
        this.page = page
        this.getList()
      },
      async getList() {
        this.loading = true
        await getList({
          categoryName: this.searchVal,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
          this.searchResult = this.tableData.length
        })
      }
    },
    mounted() {
      this.getList()
    }
  };
</script>

<style lang="scss">
  .pageBox {
    height: 48px;

    .pageMain {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
  }
</style>
