<template>
  <el-dialog title="收款账号信息" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row style="padding-bottom: 40px;">
      <el-descriptions border column="1" size="medium">
        <el-descriptions-item label="账户名称" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.name}}</el-descriptions-item>
        <el-descriptions-item label="开户银行" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.yinhan}}</el-descriptions-item>
        <el-descriptions-item label="银行账号" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.zhanghao}}</el-descriptions-item>
        <el-descriptions-item label="银行地址" :labelStyle="{'text-align': 'center'}"
          :contentStyle="{'text-align': 'center'}">{{collectionObj.address}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        collectionObj: {
          name: '林都',
          yinhan: '中国建设银行股份有限公司福州支行',
          zhanghao: '6222  3718  6677  9988  256',
          address: '银行地址'
        }
      };
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
    },
    created() {
      
    }
  };
</script>

<style lang="scss" scoped>
</style>
