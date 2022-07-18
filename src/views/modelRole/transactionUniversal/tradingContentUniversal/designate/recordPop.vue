<template>
  <el-dialog title="发布记录" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="p20" style="min-height: 20vh;">
      <div class="mb20 bold">【{{openRow.categoryName}}】</div>
      <el-row class="mb10" v-for="(item,index) in recordList" :key="index">{{item.publishTime}}</el-row>
    </div>
  </el-dialog>
</template>

<script>
  import { getPublishHistorySupplyassign } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "newClassName",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      bizType: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        isNew: true,
        recordList: []
      };
    },
    methods: {
      // 新建类名
      closeNew() {
        this.isNew = false
        this.$emit('closeNew')
      },
      beforeClose() {
        console.log(999);
        this.$emit('closeNew')
      },
      // 查询供需需求信息发布记录
      async getPublishHistory() {
        await getPublishHistorySupplyassign({
          categoryGuid: this.openRow.categoryGuid,
          bizType: this.bizType
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.recordList = data
          }
        })
      },
    },
    created() {
      this.getPublishHistory()
    }
  };
</script>

<style lang="scss">
</style>
