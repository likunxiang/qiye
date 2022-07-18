<template>
  <el-dialog title="发布记录" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="p20" style="min-height: 20vh;">
      <div class="mb20 bold">【{{openRow.categoryName}}】</div>
      <el-row class="mb10" v-for="(item,index) in record" :key="index">{{item.publishTime}}</el-row>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getDealRulePublishHistory
  } from '@/api/modelRoleApi/transactionRules.js'
  export default {
    name: "newClassName",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isNew: true,
        record: []
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
      async getDealRulePublishHistory() {
        await getDealRulePublishHistory({
          categoryGuid: this.openRow.categoryGuid
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.record = data
          } else {
            this.record = []
          }
        })
      }
    },
    mounted() {
      this.getDealRulePublishHistory()
    }
  };
</script>

<style lang="scss">
</style>
