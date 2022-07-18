<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane :label="tab.name" :name="tab.guid" v-for="(tab,index) in tabList" :key="index">
          <classPans :parentObj="tab" :code="code"></classPans>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  import classPans from "@/views/categoryRole/classDefinition/components/classPans.vue"
  import { getSonOfSDList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    components: {
      classPans
    },
    data() {
      return {
        activeName: '0',
        tabList: [],
        code: 'supply'
      };
    },
    methods: {
      async getSonOfSDList() {
        await getSonOfSDList({
          code: 'supply',
        }).then(res => {
          console.log(res);
          this.tabList = res.Tag[0].Table
          this.activeName = this.tabList[0].guid
        })
      }
    },
    mounted() {
      this.getSonOfSDList()
    },
  }
</script>

<style scoped lang="scss">
</style>
