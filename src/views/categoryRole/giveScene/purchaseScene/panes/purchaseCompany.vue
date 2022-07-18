<template>
  <el-table :data="tableData" border style="width: 100%" v-loading="loading">
    <el-table-column prop="name" align="center" label="类型名称">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button @click="toManage(scope.row)" type="text" size="small">采购场景管理</el-button>
        <!-- <el-button type="text" size="small" @click="toSort(scope.row)">场景品类排序</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { getSonList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    props: {
      guid: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tableData: [],
		loading: true,
      };
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      toManage(row) {
        let obj = {}
        obj.title = '企业需求 > ' + row.name
        this.$router.push({
          path: "purchaseSceneManage",
          query: obj,
        });
      },
      // toSort(row) {
      //   let obj = {}
      //   obj.title = '企业采购 > ' + row.typeName
      //   this.$router.push({
      //     path: "/giveScene/sceneTypeSort",
      //     query: obj,
      //   });
      // },
      async getSonList() {
		this.loading = true
        await getSonList({
          guid: this.guid
        }).then(res => {
		  this.loading = false
          console.log(res);
          this.tableData = res.Tag[0].Table
        })
      }
    },
    mounted() {
      this.getSonList()
    }
  };
</script>

<style lang="scss">
</style>
