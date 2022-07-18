<template>
  <div class="flex flex-center" :class="isMb20?'mb20':''">
    <el-input :placeholder="placeholderText" clearable v-model="searchVal"
      @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
	  <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
    </el-input>
    <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      placeholderText: {
        type: String,
        default: '请输入'
      },
      searchResult: {
        type: Number,
        default: 0
      },
      isMb20: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        searchVal: '',
        isToSearch: false,
        
      };
    },
    methods: {
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        let searchVal = this.searchVal
        this.$emit('toSearch', searchVal)
      },
    },
    created() {
      
    }
  }
</script>

<style scoped lang="scss">
</style>
