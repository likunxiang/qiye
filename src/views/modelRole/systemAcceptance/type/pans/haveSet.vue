<template>
  <div style="min-height: 83vh;position: relative;padding-bottom: 60px;">
    <!-- <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom> -->
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="categoryName" label="品类类型" align="center"></el-table-column>
      <el-table-column prop="day" label="验收期限" align="center">
        <template slot-scope="scope">{{scope.row.day}}小时</template>
      </el-table-column>
      <el-table-column label="变更记录" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="changeRecord(scope.row)">{{scope.row.updateTime}}</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <record v-if="isRecord" @close="closeRecord" :row="openRow"></record>
  </div>
</template>

<script>
  import record from '@/views/modelRole/systemAcceptance/type/components/changeRecord.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {
    getCattyeDoneDeadlineList_1_0_1
  } from "@/api/modelRoleApi/systemAcceptance.js"
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      record,
      pages,
	  searchCom
    },
    data() {
      return {
		loading: true,
        searchVal: '',
        searchResult: 0,
        isRecord: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
		searchVal: ''
      };
    },
    methods: {
      changeRecord(row) {
        this.openRow = row
        this.isRecord = true
      },
      closeRecord() {
        this.isRecord = false
      },
      search(data) {
		this.searchVal = data
		this.page = 1
        this.getDeadlineList()
      },

      changePage(page) {
        this.page = page
        this.getDeadlineList()
      },
      // 获取数据
      async getDeadlineList() {
		this.loading = true
        await getCattyeDoneDeadlineList_1_0_1().then(res => {
		  this.loading = false
          console.log(res);
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
          this.searchResult = this.tableData.length
        })
      },
    },
    mounted() {
      this.getDeadlineList()
    }
  }
</script>

<style scoped lang="scss">
</style>
