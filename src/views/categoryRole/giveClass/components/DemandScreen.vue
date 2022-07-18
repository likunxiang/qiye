<template>
  <el-dialog title="查看需求场景" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="flex flex-center mb10 mt10">
      <div class="input-text">品类名称</div>
      <div>{{openRow.categoryName}}</div>
    </div>
    <div class="flex flex-center ">
      <div class="input-text">品类类型</div>
      <div>{{openRow.cattypeName}}</div>
    </div>
    <el-divider></el-divider>
    <div style="padding-bottom: 40px;">
      <el-tree :data="tableData" :props="defaultProps" node-key="id" @node-click="getSon"></el-tree>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getRelationOfParByCGuid
  } from '@/api/categoryRole/giveClass.js'
  import {
    getSonList
  } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('closeNew')
      },
      beforeClose() {
        this.close()
      },
      async getRelationOfParByCGuid() {
        await getRelationOfParByCGuid({
          categoryGuid: this.openRow.guid
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            for(let i in data) {
              if (data[i].hasSon == '1') {
                data[i].children = [{name:'加载中...'}]
              }
            }
            this.tableData = data
          } else {
            this.tableData = []
          }
        })
      },
      getSon(data) {
        if (data.hasSon == '1') {
          this.getSonList(data)
        } else {
          return
        }

      },
      async getSonList(data) {
        let id = data.guid
        await getSonList({
          guid: id,
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            // let data = res.Tag[0].Table
            let arr = res.Tag[0].Table
            for (let i in arr) {
              if (arr[i].hasSon == '1') {
                arr[i].children = [{
                  name: '加载中...'
                }]
              }
            }
            data.children = arr
          } else {
            this.tableData = []
          }
        })
      },
    },
    created() {
      this.getRelationOfParByCGuid()
    }
  };
</script>

<style lang="scss" scoped>
  .input-text {
    width: 120px;
    font-weight: bold;
  }
</style>
