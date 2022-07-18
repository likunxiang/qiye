<template>
  <el-dialog title="选择需求场景" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="flex flex-center ">
      <div class="input-text mr20">品类类型</div>
      <div>{{openRow.name?openRow.name:'未选择'}}</div>
    </div>
    <el-divider></el-divider>
    <div style="padding-bottom: 40px;" v-loading="loading">
      <el-tree :data="tableData" :props="defaultProps" node-key="id" @node-expand="getSon" @node-click="getClassDate">
      </el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">保 存</el-button>
    </span>
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
        loading: false,
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        classCheckObj: {}
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      submit() {
        let data = this.classCheckObj
        this.$emit('getScreen',data)
        this.close()
      },
      async getRelationOfParByCGuid() {
        this.loading = true
        await getSonList({
          guid: this.openRow.guid
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            for (let i in data) {
              if (data[i].hasSon == '1') {
                data[i].children = [{
                  name: '加载中...'
                }]
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
      getClassDate(data) {
        if (data.hasSon == '1') {
          return
        } else {
          this.classCheckObj = data
        }

      },
      async getSonList(data) {
        let id = data.guid
        await getSonList({
          guid: id,
        }).then(res => {
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
</style>
