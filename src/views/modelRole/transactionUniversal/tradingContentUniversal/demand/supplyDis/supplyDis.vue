<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类类型" align="center">
      </el-table-column>
      <!-- <el-table-column prop="cattypeName" label="品类类型" align="center">
      </el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="plateNameDis(scope.row)" type="text" size="small">板块名称配置</el-button>
          </el-row>
          <el-row>
            <el-button @click="plateClassDis(scope.row)" type="text" size="small">板块类型配置</el-button>
          </el-row>
          <el-row>
            <el-button @click="fieldDis(scope.row)" type="text" size="small">字段名称配置</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        openRow: {}
      };
    },
    methods: {
      plateNameDis(row) {
        let obj = row
        this.$router.push({
          path: "plateNameDis",
          query: obj,
        });
      },
      plateClassDis(row) {
        let obj = row
        console.log('板块类型配置',row);
        this.$router.push({
          path: "plateClassDis",
          query: obj,
        });
        console.log(this.$router);
      },
      fieldDis(row) {
        let obj = row
        console.log('板块类型配置',row);
        this.$router.push({
          path: "fieldDis",
          query: obj,
        });
      },
    },
    mounted() {
      this.openRow = this.$route.query
      this.tableData.push(this.openRow)
    }
  };
</script>

<style lang="scss">
</style>
