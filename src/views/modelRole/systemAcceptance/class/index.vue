<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未设置" name="first">
        <el-row style="min-height: 77vh;">
          <notSet v-if="activeName=='first'"></notSet>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="已设置" name="second">
        <el-row style="min-height: 77vh;">
          <haveSet v-if="activeName=='second'"></haveSet>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import haveSet from '@/views/modelRole/systemAcceptance/class/pans/haveSet.vue'
  import notSet from '@/views/modelRole/systemAcceptance/class/pans/notSet.vue'
  export default {
    name: "index",
    components: {
      haveSet,
      notSet
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
