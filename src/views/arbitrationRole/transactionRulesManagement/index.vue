<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="name" label="规则名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <detail v-if="isDetail" @close="closeDetail" :row="openRow"></detail>
  </div>
</template>

<script>
  import detail from "@/views/arbitrationRole/transactionRulesManagement/components/detail.vue"
  import { getBizRule } from "@/api/arbitrationRoleApi/transactionRulesManagement.js"
  export default {
    name: "index",
    components: {
      detail
    },
    data() {
      return {
		loading: true,
        tableData: [],
        isDetail: false
      };
    },
    methods: {
      toDetail(row) {
        this.openRow = row
        this.isDetail = true
      },
      closeDetail() {
        this.isDetail = false
      },
      // 获取数据列表
      async getBizRule() {
		  this.loading = true
        await getBizRule().then(res => {
			this.loading = false
          if(res.Tag.length) {
            this.tableData = res.Tag[0].Table
          } else {
			this.tableData = []
		  }
        })
      }
    },
    mounted() {
      this.getBizRule()
    }
  };
</script>

<style lang="scss">
</style>
