<template>
  <el-dialog title="查看月新增注册对象数量详情" :visible.sync="isOpen" width="700px" @close="beforeClose" :append-to-body="true">
    <div style="padding-bottom: 60px;">
      <el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="年份">{{row.year}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="月份">{{row.month}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="新增注册对象数量">
          {{row.registerNum}}
        </el-descriptions-item>
      </el-descriptions>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="day" label="日期" align="center"></el-table-column>
        <el-table-column prop="registerNum" label="新增注册机构数量" align="center"></el-table-column>
        <el-table-column prop="nickName" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openRegisterDetail(scope.row)">查看日新增注册对象数量详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    <registerObj v-if="isRegister" @close="closeRegisterDetail" :row="row" :secRow="openRow"></registerObj>
  </el-dialog>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import registerObj from '@/views/serviceGovernor/serviceProgress/components/registerObj'
  import {
    statisticGetMonthRegNumByDirId
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      pages,
      registerObj
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
        openRow: {},
        page: 1,
        pageTotal: 0,
        isRegister: false,
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
        this.getData()
        //
      },
      openRegisterDetail(row) {
        this.openRow = row
        this.isRegister = true
      },
      closeRegisterDetail(row) {
        this.isRegister = false
      },
      getData() {
        this.statisticGetMonthRegNumByDirId()
      },
      async statisticGetMonthRegNumByDirId() {
        this.loading = true
        statisticGetMonthRegNumByDirId({
          month: this.row.year + '-' + this.row.month,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              this.tableData = []
            }
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      this.getData()
    }
  };
</script>

<style lang="scss" scoped>
</style>
