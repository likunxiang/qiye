<template>
  <div class="app-container">
    <div class="flex flex-center">
      <div style="width: 120px;font-weight: bold;">品类类型</div>
      <div>{{pageTitle}}</div>
    </div>
    <div class="flex flex-center mt10 mb20">
      <div style="width: 120px;font-weight: bold;">需求场景</div>
      <div>{{treeTitle}}</div>
    </div>

    <el-button class="mb10" type="primary" @click="BatchDel" :disabled="delList.length<1">批量删除</el-button>

    <el-tree ref="tree" v-loading="loading" :data="tableData" :props="defaultProps" node-key="id" @node-expand="getSon"
      show-checkbox @check-change="handleCheckChange">
    </el-tree>
  </div>
</template>

<script>
  import {
    getTitleListByCatreeGuid,
    insertTitle,
    updateTitleByGuid,
    deleteTitleByGuid,
    getNoContentTitles,
    insertCatName,
    getTopParentNameList_1_0_1, // 获取顶级
    getChildNameList_1_0_1, // 查询儿子
    updateNameTreeNorder1_0_1, // 变更字节内容节点
    deleteNameTree,
  } from '@/api/categoryRole/classDefinition.js'
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
          label: 'name',
        },
        delList: [], // 选中的数据
      };
    },
    methods: {
      getTableData() {
        this.loading = true
        getTopParentNameList_1_0_1({
          catreeGuid: this.guid,
		  name: '',
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            for (let i in data) {
              if (data[i].hasSon == '1') {
                data[i].children = [{
                  name: '加载中...'
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
        let id = data.guid
        await getChildNameList_1_0_1({
          parentGuid: id,
		  name: '',
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            // let data = res.Tag[0].Table
            let arr = res.Tag[0].Table
            for (let i in arr) {
              if (arr[i].hasSon == '1') {
                arr[i].children = [{
                  name: '加载中...'
                }]
              }
            }
            data.children = arr
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

          this.deleteNameTree()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      async deleteNameTree() {
        let arr = []
        for (let i in this.delList) {
          let obj = {
            catNameTreeGuid: this.delList[i].guid
          }
          arr.push(obj)
        }
        await deleteNameTree(JSON.stringify(arr)).then(res => {
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
      this.pageTitle = this.$route.query.pageTitle
      this.treeTitle = this.$route.query.treeTitle
      this.guid = this.$route.query.guid
      this.getTableData()
    }
  }
</script>

<style scoped lang="scss">
</style>
