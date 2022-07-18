<template>
  <div class="app-container">
    <el-button class="mb10" type="primary" @click="BatchDel" :disabled="delList.length<1">批量删除</el-button>

    <el-tree ref="tree" v-loading="loading" :data="tableData" :props="defaultProps" node-key="id" @node-expand="getSon"
      show-checkbox @check-change="handleCheckChange" :check-strictly="true">
    </el-tree>
  </div>
</template>

<script>
  import {
    pathGetTopParList, // 获取顶级
    pathGetSonList, // 查询儿子
    pathDelete,
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    data() {
      return {
        guid: '',
        pageTitle: '',
        treeTitle: '',
        loading: true,
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'content',
        },
        delList: [], // 选中的数据
      };
    },
    methods: {
      getTableData() {
        this.loading = true
        pathGetTopParList({
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            for (let i in data) {
              if (data[i].hasSon == '1') {
                data[i].children = [{
                  content: '加载中...'
                }]
              }
            }
            this.tableData = data
          } else {
            this.tableData = []
          }
          console.log('tableData', this.tableData);
          this.tableData = this.clone(this.tableData)
        })
      },
      getSon(data) {
        console.log('hasSon', data.hasSon);
        if (data.hasSon == '1') {
          this.getSonList(data)
        } else {
          return
        }

      },
      async getSonList(data) {
        let id = data.orgPathGuid
        await pathGetSonList({
          orgPathParGuid: id,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            // let data = res.Tag[0].Table
            let arr = res.Tag[0].Table
            for (let i in arr) {
              if (arr[i].hasSon == '1') {
                arr[i].children = [{
                  content: '加载中...'
                }]
              }
            }
            data.children = arr
            console.log('data.children',data.children);
            data = this.clone(data)
          } else {
            data.children = []
          }
        })
      },
      BatchDel() {
        console.log('批量删除');
        this.delScreen()
      },
      // 删除场景
      delScreen() {
        this.$confirm('删除后，其之下的从属字节内容全部删除，确认删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.pathDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      async pathDelete() {
        let arr = []
        for (let i in this.delList) {
          let obj = {
            orgPathGuid: this.delList[i].orgPathGuid,
            curUserId: this.$store.state.user.adminId,
          }
          arr.push(obj)
        }
        await pathDelete(JSON.stringify(arr)).then(res => {
          console.log(res);
          // let parent = this.editNode.parent;
          // let children = parent.childNodes;
          // let index
          // for (let i in children) {
          //   console.log('2', i);
          //   if (this.editData.guid == children[i].data.guid) {
          //     console.log('3', i);
          //     index = i
          //     children.splice(index, 1);
          //   }
          // }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTableData()
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
        console.log(this.$refs.tree.getCheckedNodes())
        this.delList = this.$refs.tree.getCheckedNodes()
      },
    },
    created() {
      this.getTableData()
    }
  }
</script>

<style scoped lang="scss">
</style>
