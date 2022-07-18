<template>
  <el-dialog title="批量新建机构名称" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <p>机构名称(1行1个)</p>
    <el-input class="mb10" type="textarea" placeholder="请输入" :rows="10" v-model="fieldObj.content"></el-input>
    <el-row class="mb10">
      关联机构路径
    </el-row>
    <orgPathTree @getPathOrg="getPathOrg"></orgPathTree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!fieldObj.content.trim()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import orgPathTree from '@/views/choseManager/agencyInformation/components/orgPathTree'
  import {
    orgInsertOrgName,
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    components: {
      orgPathTree
    },
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
        newFieldList: [],
        orgPathGuid: '',
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
      // 获取选中的节点
      getPathOrg(data) {
        this.orgPathGuid = data.orgPathGuid
      },
      submit() {
        let data = this.fieldObj
        let arr = data.content.split('\n')
        this.newFieldList = arr
        this.orgInsertOrgName()
        // this.$emit('submitNewBatch', arr)
        // this.close()
      },
      async orgInsertOrgName() {
        let arr = []
        let data = this.newFieldList
        for (let i in data) {
          if (data[i].trim() === '') {

          } else {
            let obj = {
              orgName: data[i].trim(),
              orgPathGuid: this.orgPathGuid,
              curUserId: this.$store.state.user.adminId
            }
            arr.push(obj)
          }
        }
        await orgInsertOrgName(JSON.stringify(arr)).then(res => {
          console.log(res);
          if(res.OK == 'True') {
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                type: 'error',
                message: '机构名称已存在!'
              })
            }
            // 新增成功，刷新列表
          }

        })
      },
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
