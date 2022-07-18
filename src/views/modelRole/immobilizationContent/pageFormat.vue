<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="节点（需求供应）" name="first">
        <div class="mb10" v-for="(item,index) in list1" :key="index">
          {{item.name}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="节点（供应需求）" name="second">
        <div class="mb10" v-for="(item,index) in list2" :key="index">
          {{item.name}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="节点（供应报价）" name="third">
        <div class="mb10" v-for="(item,index) in list3" :key="index">
          {{item.name}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="节点（供应管理）" name="four">
        <div class="mb10" v-for="(item,index) in list4" :key="index">
          {{item.name}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        activeName: 'first',
        list1: [{
            name: '沟通模式'
          },
          {
            name: '交易模式'
          }
        ],
        list2: [{
            name: '型号模式'
          },
          {
            name: '非型号模式'
          },
          {
            name: '简历模式'
          }
        ],
        list3: [{
            name: '型号模式'
          },
          {
            name: '按单模式'
          }
        ],
        list4: [{
            name: '沟通模式'
          },
          {
            name: '交易模式'
          }
        ]
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

<style lang="scss">
</style>
