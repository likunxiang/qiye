<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="需求信息" name="first" v-loading="loading">
        <div class="mb10" v-for="(item,index) in tableData" :key="index">
          {{item.name}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="报价信息" name="second" v-loading="loading">
        <div class="mb10" v-for="(item,index) in tableData" :key="index">
          {{item.name}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="资质信息" name="third" v-loading="loading">
        <div class="mb10" v-for="(item,index) in tableData" :key="index">
          {{item.name}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    getFixedData
  } from '@/api/modelRoleApi/immobilizationContent.js'
  export default {
    name: "index",
    data() {
      return {
        activeName: 'first',
        tableData: [],
        bizType: '1',
        loading: true
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab);
        this.tableData = []
        this.loading = true
        let index = tab.index
        if (index == 0) {
          this.bizType = '1'
        } else if (index == 1) {
          this.bizType = '2'
        } else if (index == 2) {
          this.bizType = '4'
        }
        this.getFixedData()
      },
      async getFixedData() {
        await getFixedData({
          type: 1,
          name: '',
          bizType: this.bizType,
          page: 1,
          size: '200'
        }).then(res => {
          console.log(res);
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          }
        })
      }
    },
    mounted() {
      this.getFixedData()
    }
  };
</script>

<style lang="scss">
</style>
