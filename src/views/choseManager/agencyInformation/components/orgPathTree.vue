<template>
  <div>
    <el-tree ref="treeBox" :data="tableData" :highlight-current="true" :default-expanded-keys="[pathParGuid]" node-key="orgPathGuid" :props="defaultProps"
      @node-expand="getSon" @node-click="choosePath" v-loading="loading">
    </el-tree>
  </div>
</template>

<script>
  import {
    pathGetTopParList, // 获取顶级
    pathGetSonList, // 查询儿子
    pathGetSonListById, // 查询儿子，通过id
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    props: {
      type: {
        type: String,
        default: ''
      },
      allparId: {
        type: String,
        default: ''
      },
      // 本身的guid
      pathGuid: {
        type: String,
        default: ''
      },
      // 父级guid
      pathParGuid: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'content',
        },
        loading: false,
        allparIdArr: []
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
            console.log('data.children', data.children);
            data = this.clone(data)
          } else {
            data.children = []
          }
        })
      },
      async pathGetSonListById() {
        await pathGetSonListById({
          orgPathallParentId: this.allparId,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          this.tableData = this.handleTree(res.Tag[0].Table, "orgPathGuid","orgPathParGuid");
          for (let i in this.tableData) {
            if (this.tableData[i].hasSon == '1' && this.tableData[i].children == undefined) {
              this.tableData[i].children = [{
                content: '加载中...'
              }]
            }
          }
          console.log('tableData',this.tableData);
          this.$nextTick(() => {
            // treeBox 元素的ref   value 绑定的node-key
            this.$refs.treeBox.setCurrentKey(this.pathGuid);
          });
        })
      },
      choosePath(data, node, nodeself) {
        console.log(data);
        this.fatherScene = data
        this.$emit('getPathOrg', data)
      },
    },
    created() {

      if(this.type == 'edit') {
        this.pathGetSonListById()
      } else {
        this.getTableData()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
