<template>
  <el-dialog title="查看服务专员服务详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div style="padding-bottom: 60px;">
      <el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="年份">{{row.year}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="月份">{{row.month}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="日期">{{secRow.day}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="姓名">{{thrRow.nickName}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="国家/区号">{{thrRow.nation}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="联系电话">{{thrRow.phonenumber}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="任职机构">{{fourRow.employedOrgName}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="新增注册对象数量" v-if="pageStatus == '1'">{{fourRow.registerNum}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="采购验收通过订单数量" v-if="pageStatus == '2'">{{fourRow.demandAcceptOkNum}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="供应验收通过订单数量" v-if="pageStatus == '3'">{{fourRow.supplyAcceptOkNum}}
        </el-descriptions-item>
      </el-descriptions>
      <el-divider></el-divider>
      <searchCom @toSearch='search' :searchResult='searchResult' :placeholderText="pageStatus=='2'?'请输入你要找的采购编号':'请输入你要找的供应编号'" v-if="pageStatus!='1'"></searchCom>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
        <el-table-column prop="createTime" label="采购日期" align="center" v-if="pageStatus == 2"></el-table-column>
        <el-table-column prop="createTime" label="供应日期" align="center" v-if="pageStatus == 3"></el-table-column>
        <el-table-column prop="orderNo" label="采购编号" align="center" v-if="pageStatus == 2"></el-table-column>
        <el-table-column prop="orderNo" label="供应编号" align="center" v-if="pageStatus == 3"></el-table-column>
        <el-table-column prop="acceptTime" label="验收通过日期" align="center"></el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import {
    statisticGetOrderDetailList
  } from '@/api/serviceGovernorApi/serviceGovernorCom.js'
  export default {
    name: "index",
    components: {
      pages,
      searchCom
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      },
      secRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      thrRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      fourRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      pageStatus: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        isOpen: true,
        loading: false,
        tableData: [],
        page: 1,
        pageTotal: 0,
        searchResult: 0,
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
      changePage(page) {
        this.page = page
        this.getData()
        //
      },
      search(data) {
        this.searchVal = data
        this.page = 1
        this.getData()
        //
      },
      getData() {
        this.statisticGetOrderDetailList()

      },
      // 订单列表
      async statisticGetOrderDetailList() {
        this.loading = true
        let guserRecordLogGuid = ''
        if (this.pageStatus == '2') {
          guserRecordLogGuid = this.fourRow.demandGuserRecordLogGuid
        } else {
          guserRecordLogGuid = this.fourRow.supplyGuserRecordLogGuid
        }
        console.log('guserRecordLogGuid',guserRecordLogGuid);
        await statisticGetOrderDetailList({
          orderNo: this.searchVal,
          guserRecordLogGuid: guserRecordLogGuid,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              this.tableData = []
            }
            this.searchResult = this.tableData.length
            this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      },

    },
    created() {
      this.getData()
    }
  };
</script>

<style lang="scss" scoped>
</style>
