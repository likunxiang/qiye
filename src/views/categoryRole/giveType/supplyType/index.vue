<template>
  <div class="app-container">
    <el-tree :data="mainList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

  </div>
</template>

<script>
  import { getSonOfSDList,getSonList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    data() {
      return {
        mainList: [],
        defaultProps: {
          children: 'mainList',
          label: 'name'
        },
        code: 'supply'
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      async getSonOfSDList() {
        await getSonOfSDList({
          code: this.code,
        }).then(res => {
          console.log(res);
          this.mainList = res.Tag[0].Table
          for (let i in this.mainList) {
            if (this.mainList[i].hasSon) {
              getSonList({
                guid: this.mainList[i].guid,
              }).then(res => {
                this.mainList[i].mainList = res.Tag[0].Table
                console.log("儿子",this.mainList);
                this.mainList = this.clone(this.mainList)
              })
            }
          }

        })
      }
    },
    mounted() {
      this.getSonOfSDList()
    },
  };
</script>

<style>
</style>
