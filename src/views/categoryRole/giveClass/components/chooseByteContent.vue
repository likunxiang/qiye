<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="p20" style="min-height: 200px;" v-loading="loading">
      <el-input placeholder="请输入你要找的内容" v-model="searchVal" @keyup.enter.native="searchClass"
        style="width: 200px;" clearable @clear="searchClass">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="searchClass">
        </i>
      </el-input>
      <el-row class="mt20">
        <el-radio-group v-model="radio" @change="getByteObj">
          <el-row style="margin-bottom: 5px;" v-for="(item,index) in tableData" :key="index">
            <el-radio :label="item.guid">{{item.name}}</el-radio>
          </el-row>

        </el-radio-group>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" :disabled="!radio">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    getTopParentNameList_1_0_1, // 获取顶级
    getChildNameList_1_0_1, // 查询儿子
  } from '@/api/categoryRole/classDefinition.js'
  export default {
    name: "index",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      guidList: {
        type: Array,
        default: () => {
          return []
        }
      },
      byteIndex: {
        type: Number,
        default: 1
      },
    },
    data() {
      return {
        isOpen: true,
        tableData: [],
        radio: 0,
        loading: false,
        searchVal: '',

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
      searchClass () {
        this.getTableData()
      },
      getByteObj(val) {
        // 通过切换匹配对象
        for (let i in this.tableData) {
          if (this.tableData[i].guid === val) {
            this.checkedByte = this.tableData[i]
          }
        }
      },
      submit() {
        let data = this.checkedByte
        this.$emit('getByteGuid', data)
        this.close()
      },
      getTableData() {
        this.loading = true
        let id = this.guidList[this.byteIndex - 1]
        if (this.byteIndex > 0) {
          this.getSonList(id)
        } else {
          this.getTopParentNameList_1_0_1(id)
        }
      },
      getSon(data) {
        if (data.hasSon == '1') {
          this.getSonList(data)
        } else {
          return
        }

      },
      async getTopParentNameList_1_0_1(id) {
        getTopParentNameList_1_0_1({
          catreeGuid: id,
          name: this.searchVal
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            // for (let i in data) {
            //   if (data[i].hasSon == '1') {
            //     data[i].children = [{
            //       name: '加载中...'
            //     }]
            //   }
            // }
            this.tableData = data
          } else {
            this.tableData = []
          }
          this.tableData = this.clone(this.tableData)
        })
      },
      async getSonList(id) {
        await getChildNameList_1_0_1({
          parentGuid: id,
          name: this.searchVal
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            // let data = res.Tag[0].Table
            let arr = res.Tag[0].Table
            this.tableData = arr
            // for (let i in arr) {
            //   if (arr[i].hasSon == '1') {
            //     arr[i].children = [{
            //       name: '加载中...'
            //     }]
            //   }
            // }
            // data.children = arr
          } else {
            this.tableData = []
            // data.children = []
          }
        })
      },
    },
    created() {
      this.title = '选择' + '(' + this.openRow.name + ')'
      this.getTableData()
    }
  };
</script>

<style lang="scss" scoped>
</style>
