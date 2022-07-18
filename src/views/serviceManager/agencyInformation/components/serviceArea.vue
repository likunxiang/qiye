<template>
  <div>
    <div class="flex flex-center mb10">
      <div class="filter-item-title mr10">服务区域选择</div>
      <el-input ref="input" placeholder="请选择" v-model="provincesObj.cityName" @keyup.enter.native="toSearch" style="width: 200px;"
        readonly @focus="openProvinces">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="toSearch">
        </i>
      </el-input>
    </div>
    <chooseProvinces v-if="isProvinces" @close="closeProvinces" @getProvinces="getProvinces"></chooseProvinces>
  </div>
</template>

<script>
  import {
    pathGetOrgPathTitleList
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  import chooseProvinces from '@/views/serviceManager/agencyInformation/components/chooseProvinces.vue'
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
      chooseProvinces
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
        provincesObj: {},
        isProvinces: false,
      };
    },
    methods: {
      getLastGuid(data) {
        console.log('2222',data);
        this.$emit('getLastGuid',data)
      },
      toSearch() {
        this.$emit('toSearch')
      },
      // 选择服务区域
      openProvinces() {
        this.isProvinces = true
      },
      closeProvinces() {
        this.isProvinces = false
      },
      // 获取选择的省市区
      getProvinces(data) {
        this.provincesObj = data
        console.log('provincesObj',this.provincesObj);
        this.$emit('getProvinces',this.provincesObj)
      },
    },
    created() {
    }
  }
</script>

<style scoped lang="scss">
</style>
