<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="个人供应" name="first">
        <supplyPerson v-if="mainList.length" :guid="mainList[0].guid"></supplyPerson>
      </el-tab-pane>
      <el-tab-pane label="企业供应" name="second">
        <supplyCompany v-if="mainList.length" :guid="mainList[1].guid"></supplyCompany>
      </el-tab-pane>
      <el-tab-pane label="政府供应" name="third">
        <supplyGov v-if="mainList.length" :guid="mainList[2].guid"></supplyGov>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import supplyPerson from '@/views/categoryRole/giveScene/supplyScene/panes/supplyPerson.vue'
  import supplyCompany from '@/views/categoryRole/giveScene/supplyScene/panes/supplyCompany.vue'
  import supplyGov from '@/views/categoryRole/giveScene/supplyScene/panes/supplyGov.vue'
  import { getSonOfSDList,getSonList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    components: {
      supplyPerson,
      supplyCompany,
      supplyGov
    },
    data() {
      return {
        activeName: 'first',
        mainList: []
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async getSonOfSDList() {
        await getSonOfSDList({
          code: 'supply',
        }).then(res => {
          console.log(res);
          this.mainList = res.Tag[0].Table
        })
      }
    },
    created() {
      this.getSonOfSDList()
    }
  };
</script>

<style lang="scss">
</style>
