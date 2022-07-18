<template>
  <el-row v-if="tableData.length">
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="name" align="center" label="品类类型">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="toManage(scope.row)" type="text" size="small">场景下品类定义管理</el-button>
          <!-- <el-button type="text" size="small" @click="toSort(scope.row)">场景品类排序</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import { getList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    props: {
      parentObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      code: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tableData: [],
        loading: true
      };
    },
    methods: {
      toManage(row) {
        let obj = row
        obj.title = row.name
        obj.code = this.code
        this.$router.push({
          path: "classDefinition/classDefinition",
          query: obj,
        });
      },
      async getList() {
		this.loading = true
        await getList().then(res => {
          console.log(res);
          this.tableData = res.Tag[0].Table || []
          this.loading = false
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
</style>
