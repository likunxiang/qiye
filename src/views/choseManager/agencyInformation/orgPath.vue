<template>
  <div class="app-container">
    <div style="margin: 20px 0;">
      <el-button type="primary" @click="openNew">新建字节内容</el-button>
      <el-button type="primary" @click="openNewBatch">批量导入字节内容</el-button>
      <el-button type="primary" @click="toByteMain">机构路径字节标题管理</el-button>
      <el-button type="primary" @click="toBatchDel">批量删除字节内容</el-button>
    </div>

    <el-tree v-loading="loading" :data="tableData" :props="defaultProps" @node-click="getFather" node-key="id"
      @node-expand="getSon" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd"
      @node-drop="handleDrop" @node-contextmenu="rightClick" :allow-drop="allowDrop">
    </el-tree>

    <div v-show="menuVisible" class="menu-box" :style="{left: menuX + 'px',top: menuY + 'px'}">
      <el-menu id="menu" @select="handleSelect" text-color="#000">
        <el-menu-item index="1" class="menuItem">
          <span slot="title">编辑字节内容</span>
        </el-menu-item>
        <el-menu-item index="2" class="menuItem">
          <span slot="title">删除字节内容</span>
        </el-menu-item>
        <el-menu-item index="3" class="menuItem">
          <span slot="title">复制字节内容</span>
        </el-menu-item>
        <el-menu-item index="4" class="menuItem">
          <span slot="title">黏贴字节内容</span>
        </el-menu-item>
      </el-menu>
    </div>

    <editByte v-if="isEdit" :row="openRow" :length="tableData.length" @close="closeEdit" @refresh="getTableData">
    </editByte>
    <newByte v-if="isNew" :byteType="byteType" :guid="guid"
      @close="closeNew" @refresh="getTableData" :editObj='editSelf'></newByte>
    <newBatch v-if="isBatch" :guid="guid" @close="closeNewBatch"
      @refresh="getTableData"></newBatch>
  </div>
</template>

<script>
  import editByte from '@/views/choseManager/agencyInformation/components/editByte.vue'
  import newByte from '@/views/choseManager/agencyInformation/components/newByte.vue'
  import newBatch from '@/views/choseManager/agencyInformation/components/newBatch.vue'
  import {
    getTitleListByCatreeGuid,
    insertTitle,
    updateTitleByGuid,
    deleteTitleByGuid,
    getNoContentTitles,
    insertCatName,
    pathGetTopParList, // 获取顶级
    pathGetSonList, // 查询儿子
    updateNameTreeNorder1_0_1, // 变更字节内容节点
    pathDelete,
    web_orgpathtitle_paste
  } from '@/api/choseManagerApi/choseManagerCom.js'
  export default {
    name: "index",
    components: {
      editByte,
      newByte,
      newBatch
    },
    data() {
      return {
        guid: '',
        code: '',
        isEdit: false,
        openRow: {},
        tableData: [],
        loading: false,
        firstBecome: true, // 是否第一次进来
        isNew: false,
        isBatch: false,
        byteType: 'new',
        menuVisible: false,
        menuX: '',
        menuY: '',
        currentGuid: '',
        oldNorder: '', // 拖拽的对象
        newNorder: '', // 放入的对象
        defaultProps: {
          children: 'children',
          label: 'content',
        },
        editSelf: {}, // 将要修改的对象
        editFather: {}, // 将要修改的对象的父亲
        editNode: {},
        parentData: {}, // 将要拖拽的父亲节点
        isBuild: false, // 是否已经生成过品类
        treeTitle1: [],
        treeTitleString1: '',
        copyData: {}, // 复制的数据
        pasteData: {}, // 黏贴的对象
      };
    },
    watch: {
      menuVisible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    methods: {
      getFather(data, node) {
        console.log(node);
      },
      openEditName(row) {
        this.openRow = row
        console.log(row);
        this.isEdit = true
      },
      getParent(node) {
        console.log('node111', node);
        let nodeObj = node
        let nodeTitle = node.data.content
        let level = node.level
        console.log('nodeLevel', level);
        this.treeTitle1.push(nodeTitle)
        if (level > 1) {
          this.getParent(nodeObj.parent)
        } else {
          let treeTitle = this.treeTitle1

          if (typeof(treeTitle) == 'string') {
            console.log(777);
            this.treeTitleString1 = treeTitle
            this.editSelf.treeTitleString = this.treeTitleString1
          } else {
            treeTitle.shift()
            console.log(888);
            this.treeTitleString1 = treeTitle.reverse().join(" > ")
            this.editSelf.treeTitleString = this.treeTitleString1
          }
        }
      },
      closeEdit() {
        this.isEdit = false
      },
      toByteMain(row) {
        let obj = {}
        this.$router.push({
          path: "byteMain",
          query: obj,
        });
      },
      toBatchDel() {
        let obj = {}
        this.$router.push({
          path: "batchdeleteByte",
          query: obj,
        });
      },
      addByte() {
        this.insertTitle()
      },
      delByte() {
        let n = this.tableData.length
        let obj = this.tableData[n - 1]
        console.log(obj);
        this.$confirm('删除后，这个字节标题的字节内容全部删除。确认删除【' + obj.content + '】', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTitleByGuid()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async getTitleListByCatreeGuid() {
        this.loading = true
        await getTitleListByCatreeGuid({
          catreeGuid: this.guid
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
            this.firstBecome = false
          } else {
            this.tableData = []
            if (this.firstBecome == true) {
              this.firstBecome = false
              this.insertTitle()
            } else {
              return
            }

          }
        })
      },

      // async insertTitle() {
      //   let n = this.tableData.length
      //   let n1 = n + 1
      //   let name = '品类' + n1 + '段字节标题'
      //   console.log(name);
      //   await insertTitle({
      //     catreeGuid: this.guid,
      //     name: name,
      //     level: n1
      //   }).then(res => {
      //     if (res.Tag[0] == 1) {
      //       this.getTitleListByCatreeGuid()
      //     }
      //   })
      // },

      async deleteTitleByGuid() {
        let n = this.tableData.length
        let guid = this.tableData[n - 1].titleGuid
        console.log(guid);
        await deleteTitleByGuid({
          titleGuid: guid
        }).then(res => {
          console.log(res);
          this.getTableData()
        })
      },


      openNewBatch() {
        this.isBatch = true
        this.byteType = 'new'
      },
      closeNewBatch() {
        this.isBatch = false
      },
      // 新建弹窗
      openNew() {
        this.isNew = true
        this.byteType = 'new'
        this.closeMenu()
      },
      closeNew() {
        this.isNew = false
      },

      handleDragStart(node, ev) {
        this.closeMenu()
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        // console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        // console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        // console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        this.currentGuid = draggingNode.data.guid
        this.oldNorder = draggingNode.data.norder
        this.newNorder = dropNode.data.norder
        if (this.oldNorder === this.newNorder) {
          return
        }
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        this.parentData = dropNode.parent.data
        let data = this.parentData
        console.log('end data', this.parentData);
        this.loading = true
        this.updateType3Norder(data)
        console.log('end data111', this.parentData);
      },
      allowDrop(draggingNode, dropNode, type) {
        // console.log('dropNode',dropNode);
        // console.log('draggingNode',draggingNode);
        // this.parentData = dropNode.parent.data
        if (draggingNode.data.level === dropNode.data.level) {
          //fatherId 是父节点id
          if (draggingNode.data.parentGuid === dropNode.data.parentGuid) {
            return type === 'prev' || type === 'next'
          } else {
            return false;
          }
        } else {
          // 不同级进行处理
          return false;
        }
      },
      // 编辑场景
      openEdit() {
        this.isNew = true
        this.byteType = 'edit'
        this.closeMenu()
        console.log(this.editSelf);
      },
      closeEdit() {
        this.isEdit = false
      },
      submitEdit() {
        updateType3({
          guid: this.editSelf.guid,
          content: this.editScreen
        }).then(res => {
          console.log(res);
          this.editNode.data.content = this.editScreen
          this.$message('编辑成功')
          this.closeEdit()
        })
      },
      // 删除场景
      delScreen() {
        this.$confirm('删除后，其之下的从属字节内容全部删除，确认删除' + this.editSelf.content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pathDelete(this.editSelf.orgPathGuid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      async pathDelete(id) {
        await pathDelete({
          orgPathGuid: id,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);

          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getTableData()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          }


        })
      },

      // 右键打开菜单
      rightClick(event, data, node) {
        this.treeTitle1 = []
        this.treeTitleString1 = ''
        this.menuX = event.clientX
        this.menuY = event.clientY
        this.editSelf = data
        this.editFather = node.parent.data
        this.editScreen = data.content
        this.editNode = node
        console.log('editNode', this.editNode);
        this.getParent(node)
        this.editData = data
        this.menuVisible = true
      },
      closeMenu() {
        this.menuVisible = false
      },
      handleSelect(key) {
        if (key == 1) {
          this.openEdit()
        } else if (key == 2) {
          this.delScreen()
        } else if (key == 3) {
          this.copyByte()
        } else if (key == 4) {
          this.pasteByte()
        }
        this.closeMenu()
      },
      // 复制内容
      copyByte() {
        this.copyData = this.editData
        this.$message({
          type: 'success',
          message: '复制成功!'
        });
      },
      // 黏贴内容
      pasteByte() {
        this.pasteData = this.editData
        console.log('copyData', this.copyData);
        console.log('pasteData', this.pasteData);
        if (this.copyData.orgPathGuid && this.pasteData.orgPathGuid) {
          this.web_orgpathtitle_paste()
        } else {
          this.$message({
            type: 'error',
            message: '复制内容为空!'
          });
        }

      },
      //
      async web_orgpathtitle_paste() {
        await web_orgpathtitle_paste({
          sourceOrgPathGuid: this.copyData.orgPathGuid,
          targetOrgPathGuid: this.pasteData.orgPathGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);
          if(res.OK == 'True') {
            if (res.Tag > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              let data = this.editFather
              if (data.length > 0) {
                this.getTableData()
              } else {
                this.getSonList(data)
              }
            } else {
              this.$message({
                type: 'error',
                message: res.Message || '操作失败！'
              });
            }
          }
          
        })
      },

      // 拖拽接口
      async updateType3Norder(data) {
        this.loading = true
        await updateNameTreeNorder1_0_1({
          guid: this.currentGuid,
          oldNorder: this.oldNorder,
          newNorder: this.newNorder
        }).then(res => {
          console.log(res);
          if (data.length > 0) {
            this.getTableData()
          } else {
            this.getSonList(data)
          }

        })
      },
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
        this.closeMenu()
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
    },
    created() {
      this.getTableData()
    }
  }
</script>

<style scoped lang="scss">
  .del-icon {
    position: absolute;
    right: 8px;
    top: 20px;
  }

  .menu-box {
    position: fixed;
    z-index: 9999;
    background-color: #fff;
    box-shadow: 0px 0px 6px #888888;
    width: 200px;
  }
</style>
