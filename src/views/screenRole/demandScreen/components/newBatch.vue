<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div class="flex flex-center">
      <div class="input-text">父级场景</div>
      <el-input type="text" :value="fatherSceneSureName" placeholder="请选择" suffix-icon="el-icon-search"
        @focus="openFather" />
    </div>
    <div class="flex flex-center mt10">
      <div class="input-text"></div>
      <div>{{treeTitleString}}</div>
    </div>
    <p>请输入字段内容(一行一个)</p>
    <el-input class="mb10" type="textarea" placeholder="请输入" :rows="10" v-model="fieldObj.content"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!fieldObj.content">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    setPlateFieldContent
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    props: {
      title: {
        type: String,
        default: '批量新建'
      },
      fatherSceneSureName: {
        type: String,
        default: ''
      },
      treeTitleString: {
        type: String,
        default: ''
      }
    },
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
      openFather() {
        this.$emit('openFather')
      },
      submit() {
        let data = this.fieldObj
        let arr = data.content.split('\n')
        this.$emit('submitNewBatch', arr)
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .input-text {
    width: 100px;
  }
</style>
