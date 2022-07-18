<template>
  <div class="app-container">
    <!-- <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal"
        @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
		<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div> -->
    <el-table v-loading="loading" :element-loading-text="loadingText" :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类类型" align="center">
      </el-table-column>
      <el-table-column prop="record" label="发布记录" align="center" width="200">
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
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="purshaseDis(scope.row)" type="text" size="small">采购需求信息配置</el-button>
          </el-row>
          <el-row>
            <el-button @click="supplyDis(scope.row)" type="text" size="small">供应需求信息配置</el-button>
          </el-row>
          <el-row>
            <el-button @click="messageSort(scope.row)" type="text" size="small">信息格式排序管理</el-button>
          </el-row>
          <el-row>
            <el-button @click="release(scope.row)" type="text" size="small" :disabled="scope.row.publishFlag==2">发布
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <recordPop @closeNew="closeRecord" v-if="isRecord" :openRow="openRow"></recordPop>
    <!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->
  </div>
</template>

<script>
  import recordPop from '@/views/modelRole/tradingContent/components/recordPop.vue'
  import pages from '@/views/components/common/pages.vue'
  import {
    getCattypeDealModes_1_0_1,
    isDealModeCanPublish,
    publishDealMode,
    existsByCGuid,
    getDealModePublishHistory,
    deleteByDealModeGuid,
    getNeedPublishDealMode,
    clearTemporaryValue,
    publishDealMode1,
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    components: {
      recordPop,
      pages
    },
    data() {
      return {
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        tableData: [],
        isRecord: false,
        page: 1,
        pageTotal: 0,
        loading: true,
        publishGuidList: [], // 将要发布得guid
        publishStep: 0, // 发布第几个，从0开始
        loadingText: '发布中,请不要进行别的操作',
        publishGuid: '',
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
        this.getDealModes()
      },
      purshaseDis(row) {
        let obj = row
        obj.type = 'demand'
        obj.bizType = '1',
          this.existsByCGuid(row.categoryName, row.categoryGuid, row.dealModeGuid, () => {
            console.log(999);
            this.$router.push({
              path: "purshaseDis/purshaseDis",
              query: obj,
            });
            console.log(this.$router);
          })


      },
      supplyDis(row) {
        let obj = row
        obj.type = 'supply'
        obj.bizType = '1',
          this.existsByCGuid(row.categoryName, row.categoryGuid, row.dealModeGuid, () => {
            console.log(999);
            this.$router.push({
              path: "supplyDis/supplyDis",
              query: obj,
            });
          })

      },
      messageSort(row) {
        let obj = row
        obj.bizType = '1',
          this.$router.push({
            path: "messageSort/messageSort",
            query: obj,
          });
      },
      // 判断是否可以发布
      async isDealModeCanPublish(id, did) {
        this.publishGuid = id
        await isDealModeCanPublish({
          categoryGuid: id
        }).then(res => {
          console.log(res);
          if (res.Tag[0].Table[0].canPublish > 0) {
            // 可以发布

            // 判断时否需要 一个一个通用发布
            let needNewSearch = res.Tag[0].Table[0].needNewSearch
            console.log('needNewSearch',needNewSearch);
            if (needNewSearch > 0) {
              // needNewSearch 大于0 就走一个个发布
              this.getNeedPublishDealMode(id)
            } else {
              // 否则就直接发布
              this.publishDealMode(did)
            }
          } else {
            let msg = res.Tag[0].Table[0].notPublishReason
            // 不可以发布
            this.$alert(msg, '', {
              confirmButtonText: '知道了',
              callback: action => {}
            });
          }
        })
      },
      // 获取要发布得guid
      async getNeedPublishDealMode(id) {
        await getNeedPublishDealMode({
          categoryGuid: id
        }).then(res => {
          console.log('guid', res);
          let guidList = res.Tag[0].Table
          this.publishGuidList = guidList
          this.publishStep = 0
          this.loading = true
          this.publishDealMode1(id)
        })
      },
      // 发布单个
      async publishDealMode1(cid) {
        let id = this.publishGuidList[this.publishStep].dealModeGuid
        let loadingText = '发布中,请不要进行别的操作' + '(' + this.publishStep + '/' + this.publishGuidList.length + ')'
        this.loadingText = loadingText
        await publishDealMode1({
          dealModeGuid: id
        }).then(res => {
          if (res.OK == 'True') {
            let isFirst = res.Tag[0].Table[0].publishNum > 0 ? false : true
            this.publishStep = this.publishStep + 1
            if (this.publishStep == this.publishGuidList.length) {
              this.loading = false
              this.clearTemporaryValue(cid)
            } else {
              this.publishDealMode1()
            }

          } else {
            this.$message({
              type: 'error',
              message: '发布失败!'
            });
            return false
          }

        })
      },
      // 清理临时值
      async clearTemporaryValue() {
        await clearTemporaryValue({
          cattypeGuid: this.publishGuid
        }).then(res => {
          if (res.OK == 'True') {

            this.$message({
              type: 'success',
              message: '发布成功!'
            });
            this.getDealModes()
          } else {
            this.loading = false
            this.$message({
              type: 'error',
              message: '发布失败!'
            });
            return false
          }

        })
      },
      //
      async publishDealMode(id) {
        await publishDealMode({
          dealModeGuid: id
        }).then(res => {
          let isFirst = res.Tag[0].Table[0].publishNum > 0 ? false : true
          if (isFirst) {
            this.$alert('发布成功', '', {
              confirmButtonText: '知道了',
              callback: action => {
                this.getDealModes()
              }
            });
          } else {
            this.$alert('发布成功且覆盖原来版本，刷新后可使用。', '', {
              confirmButtonText: '知道了',
              callback: action => {
                this.getDealModes()
              }
            });
          }

        })
      },
      // 查询和发布先调用这个接口
      async existsByCGuid(name, cid, did, callback) {
        await existsByCGuid({
          categoryGuid: cid
        }).then(res => {
          if (res.Tag[0].Table[0].num == 0) {
            // 当返回为0时，说明该品类已不存在，要删除交易id

            this.$confirm('系统删除了【' + name + '】', '提示', {
              confirmButtonText: '知道了',
              cancelButtonText: '取消',
              showClose: false,
              showCancelButton: false,
              type: 'info'
            }).then(() => {
              this.deleteByDealModeGuid(did)
            })

          } else {
            // 否则 打开相应操作
            callback()
          }
        })
      },
      async deleteByDealModeGuid(did) {
        await deleteByDealModeGuid({
          dealModeGuid: did
        }).then(res => {
          this.getDealModes()
        })
      },
      release(row) {
        console.log(row.categoryGuid);
        this.existsByCGuid(row.categoryName, row.categoryGuid, row.dealRuleGuid, () => {
          this.isDealModeCanPublish(row.categoryGuid, row.dealRuleGuid)
        })
      },

      openRecord(row) {
        this.isRecord = true
        this.openRow = row

      },
      closeRecord() {
        this.isRecord = false
      }, // 某条品类被删除时触发---被动触发
      deltips() {
        this.$alert('系统删除了【品类名称】', {
          confirmButtonText: '知道了',
          showClose: false,
          callback: action => {
            console.log('成功回调');
          }
        });
      },
      changePage(page) {
        this.page = page
        this.getDealModes()
      },
      async getDealModes() {
        this.loading = true
        await getCattypeDealModes_1_0_1().then(res => {
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
      }
    },
    created() {
      this.getDealModes()
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
</style>
