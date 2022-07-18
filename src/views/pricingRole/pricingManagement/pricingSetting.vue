<template>
  <div class="app-container">
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">品类名称</div>
      <div>{{className}}</div>
    </el-row>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">供应报价模式</div>
      <div>{{offer}}</div>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="收取范围" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="openPricing(scope.row)" type="text" size="small">收费定价管理</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        className: '',
        offer: '型号报价',
        tableData: [
          {
            name: '按品类',
            id: 1
          },{
            name: '按供方型号',
            id: 2
          },{
            name: '按我方型号',
            id: 3
          },
        ],
        isSetting: false,
        openRow: {},
        collectType: 0,
      };
    },
    methods: {
      openPricing(row) {
        this.openRow = row
        if (row.id == 1) {
          this.collectType = 0
        } else if (row.id == 2) {
          this.collectType = 1
        } else {
          this.collectType = 2
        }
        this.isSetting = true
      },
      closePricing() {
        this.isSetting = false
      },

    },
    created() {
      console.log(this.$route.query);
      this.className = this.$route.query.name
    }
  };
</script>

<style lang="scss">
</style>
