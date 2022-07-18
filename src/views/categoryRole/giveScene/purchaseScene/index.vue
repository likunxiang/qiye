<template>
  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="个人需求" name="first">
        <purchasePerson v-if="mainList.length" :guid="mainList[0].guid"></purchasePerson>
      </el-tab-pane>
      <el-tab-pane label="企业需求" name="second">
        <purchaseCompany v-if="mainList.length" :guid="mainList[1].guid"></purchaseCompany>
      </el-tab-pane>
    </el-tabs> -->
    <purchasePerson></purchasePerson>
  </div>
</template>

<script>
  import purchasePerson from '@/views/categoryRole/giveScene/purchaseScene/panes/purchasePerson.vue'
  import purchaseCompany from '@/views/categoryRole/giveScene/purchaseScene/panes/purchaseCompany.vue'
  import { getSonOfSDList,getSonList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    components: {
      purchasePerson,
      purchaseCompany
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
          code: 'demand',
        }).then(res => {
          console.log(res);
          this.mainList = res.Tag[0].Table
        })
      }
    },
    created() {
      // this.getSonOfSDList()
    }
  };
</script>

<style lang="scss">
</style>
