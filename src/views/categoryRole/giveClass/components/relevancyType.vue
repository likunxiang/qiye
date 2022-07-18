<template>
  <el-dialog :title="title" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="input-box">
      <div class="flex flex-center">
        <div class="input-text bold">品类名称</div>
        <div>{{editRow.categoryName}}</div>
      </div>
      <div class="mt20">
        <div class="input-text bold">{{editRow.type=="demand"?'供应':'采购'}}{{editRow.scene=="type"?'类型':'场景'}}</div>
        <div class="mt10" v-for="(text,index) in textList" :key="index">{{text.allName}}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    getRelationOfParByCGuid
  } from '@/api/categoryRole/giveClass.js'
  export default {
    name: "index",
    props: {
      editRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isNew: true,
        textList: [],
        title: ''
      };
    },
    mounted() {
      this.getRelationOfParByCGuid()
      this.title = '关联' + (this.editRow.type=="demand"?'供应':'采购') + (this.editRow.scene=="type"?'类型':'场景')
    },
    methods: {
      async getRelationOfParByCGuid() {
        await getRelationOfParByCGuid({
          categoryGuid: this.editRow.guid,
          type: this.editRow.scene=="type"?2:3,
          code: this.editRow.type
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.textList = data
          }
        })
      },
      closeNew() {
        this.isNew = false
        this.$emit('closeNew')
      },
      submit() {
        this.$emit('closeNew')
      },
      beforeClose() {
        console.log(999);
        this.$emit('closeNew')
      },



    },
  };
</script>

<style lang="scss">
  .input-box {
    width: 90%;
    margin: 20px auto;
  }
</style>
