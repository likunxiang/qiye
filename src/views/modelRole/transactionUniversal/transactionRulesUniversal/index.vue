<template>
  <div class="app-container">
    <!-- <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal" @keyup.enter.native="search"
        style="width: 200px;margin-right: 20px;" @clear="search">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div> -->
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类类型" align="center" >
      </el-table-column>
      <el-table-column prop="record" label="发布记录" align="center" >
        <template slot-scope="scope">
          <div v-if="scope.row.publishTime">
            <el-row>{{scope.row.publishTime}}</el-row>
          </div>
          <div v-else>未发布</div>
          <div class="del-icon el-icon-d-arrow-right" @click="openRecord(scope.row)"
            v-if="scope.row.publishTime || true"></div>
          <div class="del-icon el-icon-d-arrow-right" style="color: #CCCCCC;" v-else></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="400">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="setting(scope.row)" type="text" size="small">品类类型交易节点设置</el-button>
          </el-row>
          <el-row>
            <el-button @click="release(scope.row)" type="text" size="small" :disabled="scope.row.publishFlag==0">发布
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <recordPop @closeNew="closeRecord" v-if="isRecord" :openRow="openRow"></recordPop>
    <tradeSetting @closeSetting="closeSetting" v-if="isSetting" :openRow="openRow"
      :model="openRow.categoryMode=='1'?1:2" @refresh="getDealRules"></tradeSetting>
  </div>
</template>

<script>
  import recordPop from '@/views/modelRole/transactionRules/components/recordPop.vue'
  import tradeSetting from '@/views/modelRole/transactionUniversal/transactionRulesUniversal/components/tradeSetting.vue'
  import {
    getCattypeDealRules_1_0_1,
    updateDealRule,
    publishDealRule,
    deleteDealRule
  } from '@/api/modelRoleApi/transactionRules.js'
  import {
    existsByCGuid
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    components: {
      recordPop,
      tradeSetting,
    },
    data() {
      return {
        searchVal: '',
        searchResult: 0,
        isToSearch: false,
        tableData: [],
        isRecord: false, // 发布记录弹窗
        openRow: {}, // 打开发布记录时选择的
        isSetting: false, // 交易设置弹窗
        loading: true,
      };
    },
    methods: {
      search() {
        if (this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.page = 1
        this.getDealRules()
      },
      setting(row) {
        this.existsByCGuid(row.categoryName, row.categoryGuid, () => {
          this.openRow = row
          this.isSetting = true
        })
      },
      closeSetting() {
        this.isSetting = false
      },
      release(row) {
        let catDealRuleGuid = row.dealRuleGuid
        this.existsByCGuid(row.categoryName, row.categoryGuid, () => {
          this.publishDealRule(catDealRuleGuid)
        })
      },
      openRecord(row) {
        this.isRecord = true
        this.openRow = row
      },
      closeRecord() {
        this.isRecord = false
      },
      // 某条品类被删除时触发---被动触发
      deltips() {
        this.$alert('系统删除了【品类名称】', {
          confirmButtonText: '知道了',
          showClose: false,
          callback: action => {
            console.log('成功回调');
          }
        });
      },
      // 发布节点交易规则
      async publishDealRule(id) {
        await publishDealRule({
          catDealRuleGuid: id
        }).then(res => {
          if (res.Tag[0].Table[0].publishNum > 0) {
            // 非第一次
          } else {
            // 第一次
          }
          this.$message({
            type: 'success',
            message: '发布成功！'
          })
          this.getDealRules()
        })
      },
      // 删除不存在的品类
      async deleteDealRule(cid) {
        await deleteDealRule({
          categoryGuid: cid
        }).then(res => {

        })
      },
      // 查询和发布先调用这个接口
      async existsByCGuid(name, cid, callback) {
        await existsByCGuid({
          categoryGuid: cid
        }).then(res => {
          if (res.Tag[0].Table[0].num === 0) {
            // 当返回为0时，说明该品类已不存在，要删除交易id

            this.$confirm('系统删除了【' + name + '】', '提示', {
              confirmButtonText: '知道了',
              cancelButtonText: '取消',
              showClose: false,
              showCancelButton: false,
              type: 'info'
            }).then(() => {
              this.deleteDealRule(cid)
            })

          } else {
            // 否则 打开相应操作
            callback()
          }
        })
      },
      async getDealRules() {
        this.loading = true
        await getCattypeDealRules_1_0_1().then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
          this.searchResult = this.tableData.length
          this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
        })
      },
    },
    created() {
      this.getDealRules()
    },
  };
</script>

<style lang="scss">
  .pageBox {
    height: 48px;

    .pageMain {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
  }

  .del-icon {
    position: absolute;
    right: 4px;
    top: 4px;
  }

  .el-message-box__btns {
    text-align: center;
  }
</style>
