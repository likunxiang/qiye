<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="沟通类" name="first">
        <communicationType v-if="activeName=='first'"></communicationType>
      </el-tab-pane>
      <el-tab-pane label="交易类" name="second">
        <transactionType v-if="activeName=='second'"></transactionType>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import communicationType from '@/views/operationRole/catDealManagement/catTransactionTracking/pans/communicationType.vue'
  import transactionType from '@/views/operationRole/catDealManagement/catTransactionTracking/pans/transactionType.vue'
  export default {
    name: "index",
    components: {
      communicationType,
      transactionType
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab) {
        console.log(tab.index);
      },
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    padding-bottom: 0px;
  }
</style>
