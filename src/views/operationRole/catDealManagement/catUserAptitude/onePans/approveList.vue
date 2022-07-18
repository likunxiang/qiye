<template>
  <div class="pages">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="`通过(` + approveOKCount + `)`" name="first">
        <passPage :row="row" v-if="activeName=='first'"></passPage>
      </el-tab-pane>
      <el-tab-pane :label="`不通过(` + approveNOKCount + `)`" name="second">
        <noPassPage :row="row" v-if="activeName=='second'"></noPassPage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages.vue'
  import noPass from '@/views/operationRole/catDealManagement/catUserAptitude/onePans/twoPans/noPass.vue'
  import pass from '@/views/operationRole/catDealManagement/catUserAptitude/onePans/twoPans/pass.vue'
  import {
    getApprovedDetailCount
  } from '@/api/operationRoleApi/catDealManagement.js'

  export default {
    name: "index",
    components: {
      pages,
      noPassPage: noPass,
      passPage: pass
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        activeName: 'first',
        approveOKCount: '',
        approveNOKCount: ''
      };
    },
    methods: {
      handleClick(tab) {
        console.log('tab', tab);
      },
      async getApprovedDetailCount() {
        await getApprovedDetailCount({
          qualificationGuid: this.row.qualificationGuid,
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.approveOKCount = data.approveOKCount
          this.approveNOKCount = data.approveNOKCount
        })
      }
    },
    created() {
      this.getApprovedDetailCount()
    }
  }
</script>

<style scoped lang="scss">
  .pages {
    min-height: 78vh;
  }
</style>
