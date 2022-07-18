<template>
  <div>
    <div class="flex flex-center mb10" v-for="(item,index) in tableData" :key="index">
      <div class="filter-item-title mr10">{{item.levelTitle}}</div>
      <el-input ref="input" placeholder="请选择" v-model="checkedList[index].content" @keyup.enter.native="toSearch" style="width: 200px;"
        readonly @focus="openByte(item,index)">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="toSearch">
        </i>
      </el-input>
    </div>
    <chooseByteContent v-if="isByte" @close="closeByte" :openRow="chooseRow" :guidList='guidList' :byteIndex="byteIndex"
      @getByteGuid="getByteGuid" @getLastGuid="getLastGuid"></chooseByteContent>
  </div>
</template>

<script>
  import {
    pathGetOrgPathTitleList
  } from '@/api/choseManagerApi/choseManagerCom.js'
  import chooseByteContent from './chooseByteContent.vue'
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
    components: {
      chooseByteContent
    },
    data() {
      return {
        isByte: false,
        chooseRow: {}, //
        tableData: [],
        guidList: [], // guid数组，第一个一定是末级guid
        guidListName: [], // 字段内容中文
        byteIndex: 0, // 正在操作的字节下标
        checkedList: [], // 选中的字节内容
        lastOrgPathContentGuid: '0',  // 最大层级机构字节内容guid
      };
    },
    methods: {
      getLastGuid(data) {
        console.log('2222',data);
        this.$emit('getLastGuid',data)
      },
      openByte(row, index) {
        this.chooseRow = row
        this.byteIndex = index + 1
        let guidListLength = this.guidList.length
        if (this.byteIndex > guidListLength) {
          this.stopOpenByte(index)
          return
        }
        this.isByte = true
      },
      toSearch() {
        this.$emit('toSearch')
      },
      // 如果不按顺序选，将跳出弹窗
      stopOpenByte(index) {
        this.$alert('请先选择上级标题内容', '', {
          confirmButtonText: '我知道了',
          callback: action => {
          }
        });
        this.$refs.input[index].$el.children[0].blur()

      },
      closeByte() {
        this.isByte = false
      },
      getByteGuid(data) {
        this.checkedList[this.byteIndex - 1] = data
        this.resetCheckedList(this.byteIndex)
        this.guidList[this.byteIndex] = data.orgPathGuid
        this.guidList.splice(this.byteIndex + 1, )
        this.guidListName[this.byteIndex] = data.content
        this.guidListName.splice(this.byteIndex + 1, )
        this.$emit('getByteGuid', this.guidListName)
      },
      // 乱选的时候，重置数组内容
      resetCheckedList(index) {
        for (let i in this.checkedList) {
          if (i >= index) {
            this.checkedList[i] = {
              name: '',
              guid: ''
            }
          }
        }
        this.checkedList = this.clone(this.checkedList)
      },
      async pathGetOrgPathTitleList() {
        await pathGetOrgPathTitleList({
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
            let arr = [] //
            for (let i in this.tableData) {
              let obj = {
                name: '',
                guid: ''
              }
              arr.push(obj)
            }
            this.checkedList = arr
          } else {
            this.tableData = []

          }
        })
      },
    },
    created() {
      this.guidList[0] = this.openRow.guid
      this.pathGetOrgPathTitleList()
    }
  }
</script>

<style scoped lang="scss">
</style>
