<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="categoryName" label="品类名称" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.categoryName}}</div>
          <div class="del-icon el-icon-d-arrow-right" @click="toClassLibrary(scope.row)"></div>
        </template>
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

    <recordPop @closeNew="closeRecord" v-if="isRecord" :openRow="openRow" bizType='3'></recordPop>
  </div>
</template>

<script>
  import recordPop from '@/views/modelRole/communicateContent/resumeDemand/recordPop.vue'
  import {
    existsByCGuid,
    getDealModePublishHistory,
    deleteByDealModeGuid
  } from '@/api/modelRoleApi/tradingContent.js'
  import {
    getModes,
    isCanPublish,
    deleteByCategoryGuid,
    publishChatMode
  } from '@/api/modelRoleApi/communicateContent.js'
  export default {
    name: "index",
    components: {
      recordPop
    },
    data() {
      return {
        tableData: [],
        isRecord: false,
        isClass: false,
      };
    },
    methods: {
      purshaseDis(row) {
        let obj = row
        obj.type = 'demand'
        obj.bizType = '3',
        this.existsByCGuid(row.categoryName, row.categoryGuid, ()=> {
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
        obj.bizType = '3',
        this.$router.push({
          path: "supplyDis/supplyDis",
          query: obj,
        });
      },
      messageSort(row) {
        let obj = row
        obj.bizType = '3',
        this.$router.push({
          path: "messageSort/messageSort",
          query: obj,
        });
      },
      // web-发布-判断是否可以发布
      async isCanPublish(id,cid) {
        await isCanPublish({
          categoryGuid: id
        }).then(res => {
          if (res.Tag[0].Table[0].canPublish>0) {
            // 可以发布
            this.publishChatMode(cid)

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
      // 发布
      async publishChatMode(id) {
        await publishChatMode({
          chatModeGuid: id
        }).then(res => {
          let isFirst = res.Tag[0].Table[0].publishNum > 0?false:true
          if (isFirst) {
            this.$alert('发布成功', '', {
              confirmButtonText: '知道了',
              callback: action => {
				  this.getModes()
              }
            });
          } else {
            this.$alert('发布成功且覆盖原来版本，刷新后可使用。', '', {
              confirmButtonText: '知道了',
              callback: action => {
				  this.getModes()
              }
            });
          }

        })
      },
      // 移除简历需求信息
      async deleteByCategoryGuid(cid) {
        await deleteByCategoryGuid({
          categoryGuid: cid
        }).then(res => {
          this.getModes()
        })
      },
      // 查询和发布先调用这个接口
      async existsByCGuid(name, cid, callback) {
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
              this.deleteByCategoryGuid(cid)
            })

          } else {
            // 否则 打开相应操作
            callback()
          }
        })
      },
      release(row) {

        this.existsByCGuid(row.categoryName, row.categoryGuid, ()=> {
          // 发布-判断是否可以发布
          this.isCanPublish(row.categoryGuid,row.chatModeGuid)
        })
      },
      // 打开类型
      toClassLibrary(row) {
        let obj = row
        this.$router.push({
          path: "categoryLibrary",
          query: obj,
        });
      },
      // 打开记录
      openRecord(row) {
        this.isRecord = true
        this.openRow = row
      },
      closeRecord() {
        this.isRecord = false
      },
      async getModes() {
        await getModes().then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
        })
      }
    },
    created() {
      this.getModes()
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
