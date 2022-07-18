<template>
  <el-dialog title="批量新建字段内容" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <p>请输入字段内容(一行一个)</p>
    <el-input class="mb10" type="textarea" placeholder="请输入" :rows="10" v-model="fieldObj.content"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!fieldObj.content.trim()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    setPlateFieldContent
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        fieldObj: {
          content: ''
        }
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
      submit() {
        let data = this.fieldObj
        let arr = data.content.split('\n')
        this.$emit('submitNewBatch', arr)
        this.close()
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
