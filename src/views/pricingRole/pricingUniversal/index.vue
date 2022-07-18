<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类类型" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="openPricing(scope.row,0)" type="text" size="small">按品类收取</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <toClass v-if="isSetting && collectType == 0" @close="closePricing" :openRow="openRow"></toClass>
  </div>
</template>

<script>
  import {
    getCattypeList_1_0_1
  } from '@/api/pricingRoleApi/pricingUniversal.js'
  import toClass from '@/views/pricingRole/pricingUniversal/components/accordingToClass.vue'
  export default {
    name: "index",
    components: {
      toClass,
    },
    data() {
      return {
        tableData: [],
        isSetting: false,
        loading: false
      };
    },
    methods: {
      openPricing(row, type) {
        this.openRow = row
        this.collectType = type
        this.isSetting = true
      },
      closePricing() {
        this.isSetting = false
      },

      async getList() {
        this.loading = true
        await getCattypeList_1_0_1({
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
