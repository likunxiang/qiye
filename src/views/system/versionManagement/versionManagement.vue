<template>
  <div class="app-container">
    <el-form ref="form" :model="searchForm">
      <el-row class="flex flex-center">
        <el-form-item label="发布状态" label-width="80px">
          <el-select v-model="searchForm.status"  placeholder="请选择" style="width: 200px;">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布平台" label-width="80px">
          <el-select v-model="searchForm.platform"  placeholder="请选择" style="width: 200px;">
            <el-option v-for="item in platformList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" label-width="80px">
          <el-input v-model="searchForm.version" placeholder="请输入版本号" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="发布人" label-width="80px">
          <el-input v-model="searchForm.issuer" placeholder="请输入发布人" style="width: 200px;" />
        </el-form-item>
      </el-row>

      <el-form-item>
        <el-date-picker class="mr20" v-model="searchForm.date" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss" :clearable="false" @change="changeDate">
        </el-date-picker>
        <el-button class="ml20" type="primary" @click="toSearch">查询</el-button>
        <el-button type="primary" @click="toAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%,;margin-top: 20px;" v-loading="loading">
      <el-table-column type="index" width="50" label="序号" align="center" />
      <el-table-column prop="version" label="版本号" align="center" width="80" />
      <el-table-column prop="wegiht" label="权重" align="center" width="80" />
      <el-table-column prop="status" label="发布状态" align="center" width="100">
        <template slot-scope="scope">
          {{scope.row.status == 0?'全部':scope.row.status == 1?'已发布':'未发布'}}
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="发布平台" align="center" width="100">
        <template slot-scope="scope">
          {{scope.row.platform == 0?'全部':scope.row.platform == 1?'Android':'IOS'}}
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间" align="center" width="120" />
      <el-table-column prop="remark" label="版本说明" align="center" :show-overflow-tooltip="true" />

      <el-table-column prop="publishUserName" label="发布人" align="center" width="100" />
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="toRelease(scope.row)" :disabled="scope.row.status == 1">发布</el-button>
        </template>
      </el-table-column>
    </el-table>

    <addVersionPop v-if="isAdd" @close="closeAdd" @refresh="getList_1_0_1"></addVersionPop>
    <pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
  </div>
</template>

<script>
  import addVersionPop from '@/views/system/versionManagement/addVersionPop.vue'
  import pages from '@/views/components/common/pages.vue'
  import {
    getList_1_0_1,
    updateStatus_1_0_1
  } from '@/api/system/versionManagement'
  export default {
    name: "index",
    components: {
      addVersionPop,
      pages
    },
    data() {
      return {
        searchForm: {
          status: '0',
          platform: '0',
          version: '',
          issuer: '',
          date: ['2000-11-18 00:00:00', '2000-11-25 12:00:00'],
        },
        statusList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '已发布'
        }, {
          value: '2',
          label: '未发布'
        }],
        platformList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: 'Android'
        }, {
          value: '2',
          label: 'IOS'
        }],
        page: 1,
        pageTotal: 0,
        tableData: [],
        isAdd: false,
        loading: true,
      };
    },
    methods: {
      setDate() {
        var starTime = (new Date).getTime() - 7 * 24 * 60 * 60 * 1000;
        var endTime = (new Date).getTime();

        var start = new Date(starTime);
        start = start.getFullYear() + "-" + (start.getMonth() > 9 ? (start.getMonth() + 1) : "0" + (
          start.getMonth() + 1)) + "-" + (start.getDate() > 9 ? (start.getDate()) : "0" + (start.getDate())) + ' ' + '12:00:00';

        var end = new Date(endTime);
        end = end.getFullYear() + "-" + (end.getMonth() > 9 ? (end.getMonth() + 1) : "0" + (
          end.getMonth() + 1)) + "-" + (end.getDate() > 9 ? (end.getDate()) : "0" + (end
          .getDate())) + ' ' + '12:00:00';
        this.searchForm.date[0] = start
        this.searchForm.date[1] = end
      },
      changeDate(date) {
        console.log(date);
      },
      toSearch() {
        this.getList_1_0_1()
      },
      changePage(page) {
        this.page = page
        this.getList_1_0_1()
      },
      toAdd() {
        this.isAdd = true
      },
      closeAdd() {
        this.isAdd = false
      },
      toRelease(row) {
        let versionGuid = row.versionGuid
        this.updateStatus_1_0_1(versionGuid)
      },
      async getList_1_0_1() {
        this.loading = true
        let parma = {
          status: this.searchForm.status,
          platform: this.searchForm.platform,
          version: this.searchForm.version,
          publishUserName: this.searchForm.issuer,
          startPublishTime: this.searchForm.date[0],
          endPublishTime: this.searchForm.date[1],
          page: this.page,
          size: '20'
        }
        await getList_1_0_1(parma).then(res => {
          this.loading = false
          console.log(res);
          if(res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
            20 + 1
        })
      },
      async updateStatus_1_0_1(id) {
        await updateStatus_1_0_1({
          versionGuid: id,
          userId: this.$store.state.user.adminId
        }).then(res => {
          console.log(res);
          if(res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getList_1_0_1()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
        })
      }
    },
    created() {
      this.setDate()
      this.getList_1_0_1()
    }
  }
</script>

<style scoped lang="scss">
</style>
