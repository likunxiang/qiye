<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未封号用户" name="first">
        <sealUserNo v-if="activeName=='first'"></sealUserNo>
      </el-tab-pane>
      <el-tab-pane label="封号用户" name="second">
        <sealUser v-if="activeName=='second'"></sealUser>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import sealUser from "@/views/operationRole/dispatchingManagement/userOperation/pans/sealUser.vue"
  import sealUserNo from "@/views/operationRole/dispatchingManagement/userOperation/pans/sealUserNo.vue"
  export default {
    name: "index",
    components: {
      sealUser,
      sealUserNo
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    onLoad() {},
  };
</script>

<style lang="scss" scoped>
	.app-container{
		padding-bottom:  0px;
	}
</style>
