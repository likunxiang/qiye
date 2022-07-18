<template>
  <el-dialog title="编辑字节标题" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-input v-model="editName" :placeholder="row.levelTitle"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" :disabled="editName && editName == row.levelTitle">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    pathUpdateOrgPathTitle
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  export default {
    name: "index",
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      },
      length: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        isOpen: true,
        editName: '',
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
        this.pathUpdateOrgPathTitle()
      },
      async pathUpdateOrgPathTitle() {
        let n = this.length
        let n1 = n + 1
        let name = this.editName?this.editName : '机构' + n1 + '级字节标题'
        await pathUpdateOrgPathTitle({
          level: this.row.level,
          levelTitle: name,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);
          this.$emit('refresh')
          this.close()
        })
      }
    },
    created() {
      console.log(this.row);
    }
  };
</script>

<style lang="scss" scoped>
</style>
