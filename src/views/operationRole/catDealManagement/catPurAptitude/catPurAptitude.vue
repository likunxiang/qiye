<template>
  <div class="app-container">
    <div class="flex flex-center mb20">
      <el-button type="primary" class="mr20" @click="openAddClass">添加管制品类名称</el-button>
      <div class="flex flex-center">
        <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal"
          @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
		  <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
        </el-input>
        <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
      </div>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类名称" align="center">
      </el-table-column>
      <el-table-column prop="cattypeName" label="品类类型" align="center">
      </el-table-column>
      <el-table-column prop="record" label="发布记录" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.publishTime">
            <el-row>{{scope.row.publishTime}}</el-row>
          </div>
          <div v-else>未发布</div>
          <div class="del-icon el-icon-d-arrow-right" @click="openRecord(scope.row)" v-if="scope.row.publishTime || true"></div>
          <div class="del-icon el-icon-d-arrow-right" style="color: #CCCCCC;" v-else></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="purshaseDis(scope.row)" type="text" size="small">采购资质信息管理</el-button>
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

    <recordPop @closeNew="closeRecord" v-if="isRecord" :openRow="openRow" bizType='2'></recordPop>
    <addClass v-if="isAdd" @close='closeAddClass' @refresh="getList"></addClass>
    <pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
  </div>
</template>

<script>
  import recordPop from '@/views/modelRole/transactionRules/components/recordPop.vue'
  import addClass from '@/views/operationRole/catDealManagement/components/addClass.vue'
  import pages from '@/views/components/common/pages.vue'
  import {
    getSupplyPriceList,
    existsByCGuid,
    getDealModePublishHistory,
  } from '@/api/modelRoleApi/tradingContent.js'
  import {
    getList,
    addCategory,
    deleteClass,
    isCanPublish,
    publish
  } from '@/api/operationRoleApi/catDealManagement.js'
  export default {
    name: "index",
    components: {
      recordPop,
      addClass,
      pages
    },
    data() {
      return {
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        tableData: [],
        isRecord: false,
        isAdd: false,
        page: 1,
        pageTotal: 0,
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
        this.getList()
      },
      clearSearch() {
        this.search()
      },
      openAddClass() {
        this.isAdd = true
      },
      closeAddClass() {
        this.isAdd = false
      },
      purshaseDis(row) {
        let obj = row
        obj.type = 'demand'
        obj.bizType = '4',
          this.existsByCGuid(row.categoryName, row.categoryGuid, row.qualificationGuid, () => {
            console.log(999);
            this.$router.push({
              path: "purshaseDis/purshaseDis",
              query: obj,
            });
            console.log(this.$router);
          })
      },
      messageSort(row) {
        let obj = row
        obj.type = 'demand'
        obj.bizType = '4'
        this.existsByCGuid(row.categoryName, row.categoryGuid, row.qualificationGuid, () => {
          console.log(999);
          this.$router.push({
            path: "messageSort/messageSort",
            query: obj,
          });
          console.log(this.$router);
        })

      },
      // 判断是否可以发布
      async isCanPublish(id, qid) {
        await isCanPublish({
          categoryGuid: id
        }).then(res => {
          console.log(res);
          if (res.Tag[0].Table[0].canPublish > 0) {
            // 可以发布
            this.publish(qid)
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
      // 发布
      async publish(qid) {
        await publish({
          qualificationGuid: qid
        }).then(res => {
          let isFirst = res.Tag[0].Table[0].publishNum > 0?false:true
          if (isFirst) {
            this.$alert('发布成功', '', {
              confirmButtonText: '知道了',
              callback: action => {
				this.getList()
              }
            });
          } else {
            this.$alert('发布成功且覆盖原来版本，刷新后可使用。', '', {
              confirmButtonText: '知道了',
              callback: action => {
				this.getList()
              }
            });
          }

        })
      },
      // 查询和发布先调用这个接口
      async existsByCGuid(name, cid, qid, callback) {
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
              this.deleteClass(qid)
            })

          } else {
            // 否则 打开相应操作
            callback()
          }
        })
      },
      async deleteClass(qid) {
        await deleteClass({
          qualificationGuid: qid
        }).then(res => {
          this.getList()
        })
      },
      release(row) {
        let id = row.dealRuleGuid
        this.existsByCGuid(row.categoryName, row.categoryGuid, row.qualificationGuid, () => {
          this.isCanPublish(row.categoryGuid, row.qualificationGuid)
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
        this.getList()
      },
      async getList() {
		this.loading = true
        await getList({
          categoryName: this.searchVal,
          page: this.page,
          size: '20'
        }).then(res => {
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
      this.getList()
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
