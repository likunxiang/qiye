<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableData" border style="width: 500px" >
      <el-table-column prop="demandName" label="字段名称（采购）" align="center">
      </el-table-column>
      <el-table-column prop="supplyName" label="字段名称（供应）" align="center">
      </el-table-column>
    </el-table>

    <pages @changePage="changePage" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import { getFixedMappingData } from '@/api/modelRoleApi/immobilizationContent.js'
  export default {
    name: "index",
    components: {
      pages
    },
    data() {
      return {
        tableData: [],
        page: 1,
		loading: true,
      };
    },
    methods: {
      changePage(page) {
        this.page = page
        this.getFixedMappingData()
      },
      async getFixedMappingData() {
		this.loading = true
        await getFixedMappingData().then(res => {
		  this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
        })
      }
    },
    mounted() {
      this.getFixedMappingData()
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
