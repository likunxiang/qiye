<template>
  <div class="app-container">
    <el-row class="mb20">
      <span class="bold">品类名称：</span>
      <span class="ml10">{{openRow.categoryName}}</span>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="`未审批(` + openRow.approveFlag0 + `)`" name="first">
        <nonApproveList :row="openRow" v-if="activeName=='first'"></nonApproveList>
      </el-tab-pane>
      <el-tab-pane :label="`审批(` + openRow.approveFlag1 + `)`" name="second">
        <approveList :row="openRow" v-if="activeName=='second'"></approveList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import nonApproveList from '@/views/operationRole/catDealManagement/catUserAptitude/onePans/nonApproveList.vue'
  import approveList from '@/views/operationRole/catDealManagement/catUserAptitude/onePans/approveList.vue'
  export default {
    name: "index",
    components: {
      approveList,
      nonApproveList
    },
    data() {
      return {
        openRow: {},
        activeName: 'first',
      };
    },
    methods: {
      handleClick(tab) {
        console.log('tab', tab);
      }
    },
    created() {
      this.openRow = this.$route.query
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    padding-bottom: 0px;
  }
</style>
