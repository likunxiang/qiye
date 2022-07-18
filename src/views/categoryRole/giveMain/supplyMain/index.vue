<template>
  <div class="app-container">
    <div class="" v-for="(main,index) in mainList" :key="index">
      {{main.name}}
    </div>
  </div>
</template>

<script>
  import { getSonOfSDList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    data() {
      return {
        mainList: []
      };
    },
    methods: {
      async getSonOfSDList() {
        await getSonOfSDList({
          code: 'supply',
        }).then(res => {
          console.log(res);
          this.mainList = res.Tag[0].Table
        })
      }
    },
    mounted() {
      this.getSonOfSDList()
    },
  };
</script>

<style lang="scss">
</style>
