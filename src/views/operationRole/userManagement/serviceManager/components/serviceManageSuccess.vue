<template>
  <el-dialog title="服务经理成果" :visible.sync="isOpen" width="1000px" @close="beforeClose">
    <div style="padding-bottom: 20px;">
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="nickName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toSuccess(scope.row)">服务经理服务成果</el-button>
          </template>
        </el-table-column>
      </el-table>
      <successDetail v-if="isSuccess" @close='closeSuccess' :row="row"></successDetail>
    </div>
  </el-dialog>
</template>

<script>
  import successDetail from '@/views/operationRole/userManagement/serviceManager/components/successDetail'
  export default {
    name: "index",
    components: {
      successDetail
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
        tableData: [],
        loading: false,
        openRow: {},
        isSuccess: false,
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
      toSuccess(row) {
        this.isSuccess = true
        this.openRow = row
      },
      closeSuccess() {
        this.isSuccess = false
      }
    },
    created() {
      this.tableData.push(this.row)
    }
  };
</script>

<style lang="scss" scoped>
</style>
