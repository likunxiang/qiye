<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="未裁决" name="first">
          <nonArbitrament v-if="activeName=='first'"></nonArbitrament>
        </el-tab-pane>
        <el-tab-pane label="已裁决" name="second">
          <arbitrament v-if="activeName=='second'"></arbitrament>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  import nonArbitrament from '@/views/arbitrationRole/ReturnOfRuling/systemRule/pans/nonArbitrament.vue'
  import arbitrament from '@/views/arbitrationRole/ReturnOfRuling/systemRule/pans/arbitrament.vue'
  export default {
    name: "index",
    components: {
      nonArbitrament,
      arbitrament
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
    created() {

    }
  }
</script>

<style scoped lang="scss">
</style>
