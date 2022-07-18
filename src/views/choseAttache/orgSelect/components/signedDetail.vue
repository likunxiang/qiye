<template>
  <el-dialog title="查看签约记录" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 20px;">
      <el-row class="mb20 flex flex-center">
        <div class="bold label mr20">机构名称</div>
        <div>{{row.orgName}}</div>
      </el-row>
      <el-row class="mb20 flex">
        <div class="bold label mr20">领取日期</div>
        <div>{{row.orgCollectTime}}</div>
      </el-row>
      <div class="flex flex-center">
        <el-row class="mr20">
          <el-button type="primary" @click="openSginForm('1')" v-if="tableData.length > 0"
            :disabled="tableData && tableData[0].signBtn==0">签约</el-button>
          <el-button type="primary" @click="openSginForm('1')" v-else>签约</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="openSginForm('2')" v-if="tableData.length > 0"
            :disabled="tableData && tableData[0].signAgainBtn==0">续约</el-button>
            <!-- <el-button type="primary" @click="openSginForm('2')" v-if="tableData.length > 0"
              :disabled="tableData && tableData[0].signAgainBtn!=0">续约</el-button> -->
          <el-button type="primary" @click="openSginForm('2')" v-else>续约</el-button>
        </el-row>
      </div>
      <div class="mt20">
        <el-table :data="tableData" border v-loading="loading">
          <el-table-column align="center" width="50">
            <template slot-scope="scope">
              <div class="el-icon-question" style="font-size: 20px;" v-if="!scope.row.orgUserGuid"
                @click="openQuestion"></div>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column prop="contractNo" label="合同编号" align="center"></el-table-column>
          <el-table-column prop="startDate" label="合同起始日期" align="center"></el-table-column>
          <el-table-column prop="endDate" label="合同终止日期" align="center"></el-table-column>
          <el-table-column prop="contractYear" label="合作时长" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="delSign(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <sginedForm v-if="isSgin" @close="closeSginForm" :row="row" :signStatus="signStatus" :sginGuid="sginGuid" @refresh="getOneValidOrgSignRecords"
      @refreshList="refreshSignList"></sginedForm>
    <questionTips v-if="isQuestion" @close="closeQuestion"></questionTips>
  </el-dialog>
</template>

<script>
  import sginedForm from "@/views/choseAttache/orgSelect/components/sginedForm"
  import questionTips from "@/views/choseAttache/orgSelect/components/questionTips"
  import {
    getOneValidOrgSignRecords,
    delOrgSignBySignGuid
  } from '@/api/choseAttacheApi/choseAttacheCom.js'
  export default {
    name: "index",
    components: {
      sginedForm,
      questionTips
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
        isSgin: false,
        isQuestion: false,
        tableData: [],
        signStatus: '1', // 签约状态，用于判断是签约还是续约
        sginGuid: '', // 续签时要用到的签约guid
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
      delSign(row) {
        // 删除
        this.$confirm(
          '<p align="left">没有合同约定，合同期间，该机构将收不到采购需求。</p><p align="left">确认删除</p>',
          '删除合同', {
            confirmButtonText: '确认',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
          //
          this.delOrgSignBySignGuid(row.orgSignGuid)
        }).catch(() => {});
      },
      openSginForm(status) {
        this.isSgin = true
        this.signStatus = status
        if(status == '2') {
          this.sginGuid = this.tableData[0].orgSignGuid
        } else {
          this.sginGuid = ''
        }
      },
      closeSginForm() {
        this.isSgin = false
      },
      openQuestion() {
        this.isQuestion = true
      },
      closeQuestion() {
        this.isQuestion = false
      },
      async getOneValidOrgSignRecords() {
        this.loading = true
        await getOneValidOrgSignRecords({
          orgValidGuid: this.row.orgValidGuid,
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: 1
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
      async delOrgSignBySignGuid(id) {
        await delOrgSignBySignGuid({
          orgSignGuid: id,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.getOneValidOrgSignRecords()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }

          }
        })
      },
      // 刷新最外面的列表
      refreshSignList() {
        console.log('我想要刷新最外面的接口')
        this.$emit('refresh')
      }
    },
    created() {
      this.getOneValidOrgSignRecords()
    }
  };
</script>

<style lang="scss" scoped>
</style>
