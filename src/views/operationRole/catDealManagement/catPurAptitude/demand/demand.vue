<template>
  <div class="app-container">
    <div class="flex flex-center mb20">
      <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal"
        @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
		<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类名称" align="center">
      </el-table-column>
      <el-table-column prop="cattypeName" label="品类类型" align="center">
      </el-table-column>
      <el-table-column prop="record" label="发布记录" align="center" width="200">
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
            <el-button @click="purshaseDis(scope.row)" type="text" size="small">采购需求信息配置</el-button>
          </el-row>
          <el-row>
            <el-button @click="supplyDis(scope.row)" type="text" size="small">供应需求信息配置</el-button>
          </el-row>
          <el-row>
            <el-button @click="messageSort(scope.row)" type="text" size="small">信息格式排序管理</el-button>
          </el-row>
          <el-row>
            <el-button @click="release(scope.row)" type="text" size="small" :disabled="scope.row.publishFlag==2">发布</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <recordPop @closeNew="closeRecord" v-if="isRecord" :openRow="openRow"></recordPop>
  </div>
</template>

<script>
  import recordPop from '@/views/modelRole/transactionRules/components/recordPop.vue'
  import {
    getDealModes,
    isDealModeCanPublish,
    publishDealMode,
    existsByCGuid,
    getDealModePublishHistory,
    deleteByDealModeGuid
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    components: {
      recordPop
    },
    data() {
      return {
        searchVal: '',
        isToSearch: false,
        searchResult: 0,
        tableData: [],
        isRecord: false,
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
        this.getDealModes()
      },
      clearSearch() {
        this.search()
      },
      purshaseDis(row) {
        let obj = row
        obj.type = 'demand'
        obj.bizType = '1',
        this.existsByCGuid(row.categoryName, row.categoryGuid, row.dealModeGuid, ()=> {
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
        this.$router.push({
          path: "supplyDis/supplyDis",
          query: obj,
        });
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
      async isDealModeCanPublish(id,did) {
        await isDealModeCanPublish({
          categoryGuid: id
        }).then(res => {
		  console.log(res);
          if(res.Tag[0].Table[0].canPublish>1){
            // 可以发布
            this.publishDealMode(id)
          } else {
			let msg = res.Tag[0].Table[0].notPublishReason
            // 不可以发布
            this.$alert(msg, '', {
              confirmButtonText: '知道了',
              callback: action => {
              }
            });
          }
        })
      },
      //
      async publishDealMode(id) {
        await publishDealMode({
          catDealModeGuid: id
        }).then(res => {
          let isFirst = res.Tag[0].Table[0].publishNum > 0?false:true
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
          if (res.Tag[0].Table[0].num === 0) {
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

        })
      },
      release(row) {
        console.log(row.dealRuleGuid);
        this.existsByCGuid(row.categoryName, row.categoryGuid, row.dealRuleGuid, ()=> {
          this.isDealModeCanPublish(row.categoryGuid,row.dealRuleGuid)
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
      async getDealModes() {
		this.loading = true
        await getDealModes({
          categoryName: this.searchVal
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
