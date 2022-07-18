<template>
  <el-dialog title="详情" :visible.sync="isOpen" @close="beforeClose" width="700px">
    <el-row class="flex mb20">
      <div class="bold label">规则名称</div>
      <div>{{row.name}}</div>
    </el-row>
    <el-row class="detail-box">
      <div class="bold mb10">规则内容</div>

      <div v-html="content"></div>
    </el-row>
  </el-dialog>
</template>

<script>
  import {
    getBizRuleById
  } from "@/api/arbitrationRoleApi/transactionRulesManagement.js"
  export default {
    name: "index",
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
        content: '', // 规则内容
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
      // 获取详情
      async getBizRuleById() {
        await getBizRuleById({
          guid: this.row.guid
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.content = data.content.replace(/\\n/g, '<br>')
          } else {
            this.content = ''
          }
        })
      },
      showHtml: function(str) {
        return str
          .replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
      }
    },
    created() {
      this.getBizRuleById()
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    width: 120px;
  }

  .detail-box {
    min-height: 300px;
    padding-bottom: 40px;
  }
</style>
