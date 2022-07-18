<template>
  <el-dialog title="权限对象统计" :visible.sync="isOpen" width="1000px" @close="beforeClose">
    <div style="padding-bottom: 60px;">
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="location" label="所在地点" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
            <el-button type="text" @click="toNumber(scope.row)">查看权限对象数量详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
      <jurisdictionNumber v-if="isNumber" :row="row" @close="closeNumber"></jurisdictionNumber>
    </div>
  </el-dialog>
</template>

<script>
  import jurisdictionNumber from '@/views/operationRole/userManagement/serviceAttach/components/jurisdictionNumber'
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      pages,
      jurisdictionNumber
    },
    props: {
      row: {
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
        page: 1,
        pageTotal: 0,
        isNumber: false,
        openRow: {}
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
      changePage(page) {
        this.page = page
        //
      },
      toNumber(row) {
        this.isNumber = true
        this.openRow = row
      },
      closeNumber() {
        this.isNumber = false
      }
    },
    created() {
      this.tableData.push(this.row)
    }
  };
</script>

<style lang="scss" scoped>
</style>
