<template>
  <el-dialog title="批量新建字段名称" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <p>请输入字段名称(一行一个)</p>
    <el-input class="mb10" type="textarea" placeholder="请输入" :rows="10" v-model="fieldObj.content"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!fieldObj.content.trim()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    insertPlateField
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
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
        isOpen: true,
        fieldObj: {
          content: ''
        },
        newFieldList: []
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
        this.newFieldList = arr
        this.insertPlateField()
        // this.$emit('submitNewBatch', arr)
        // this.close()
      },
      async insertPlateField() {
        let arr = []
        let data = this.newFieldList
        for (let i in data) {
          if (data[i].trim() === '') {
            
          } else {
            let obj = {
              catTreeCode: this.openRow.type || this.openRow.catTreeCode,
              bizType: this.openRow.bizType,
              categoryGuid: this.openRow.categoryGuid,
              plateFieldName: data[i].trim()
            }
            arr.push(obj)
          }
        }
        await insertPlateField(JSON.stringify(arr)).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '新建成功'
            })
            this.$emit('refresh')
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '新建失败'
            })
          }
          // 新增成功，刷新列表
        })
      },
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
