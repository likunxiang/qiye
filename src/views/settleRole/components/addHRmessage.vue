<template>
  <el-dialog title="增加人力资源信息" width="900px" :visible.sync="isOpen" append-to-body destroy-on-close @close="beforeClose">
    <el-table :data="tableData" border style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="areaCode" label="区号" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="联系电话" align="center">
      </el-table-column>
    </el-table>
    <el-row class="flex flex-center mb10">
      <el-input placeholder="请输入你要找的联系电话" clearable suffix-icon="el-icon-search" v-model="searchVal"
        @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="clearSearch">
		<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
    </el-row>
    <el-table :data="tableData1" border style="width: 100%;margin-bottom: 40px;">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="areaCode" label="区号" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="联系电话" align="center">
      </el-table-column>
      <el-table-column prop="roleType" label="角色类型" align="center">
      </el-table-column>
      <el-table-column prop="addDate" label="增加日期" align="center">
      </el-table-column>
    </el-table>

    <div class="pageBox">
      <el-pagination class="pageMain" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        searchVal: '',
        searchResult: 0,
        tableData: [
          {
            name: '张三',
            areaCode: '中国大陆（+86）',
            tel: '18650767213',
          }
        ],
        tableData1: [
          {
            name: '张三',
            areaCode: '中国大陆（+86）',
            tel: '18650767213',
            roleType: '董事长',
            addDate: '2021-10-15'
          }
        ],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.$emit('close')
      },
      submit() {
        this.$emit('close')
      },
      search() {
        this.searchResult = 0
      },
	  clearSearch() {
	    this.searchVal = ''
	    this.search()
	  },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss">
</style>
