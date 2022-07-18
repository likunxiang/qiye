<template>
  <div class="app-container">
    <div class="flex flex-center">
      <div style="width: 100px;font-weight: bold;">品类类型</div>
      <div>{{pageTitle}}</div>
    </div>
    <div class="flex flex-center mt10">
      <div style="width: 100px;font-weight: bold;">需求场景</div>
      <div>{{treeTitle}}</div>
    </div>
    <div style="margin: 20px 0;">
      <el-button type="primary" @click="openNew">新建字节内容</el-button>
      <el-button type="primary" @click="openNewBatch">批量新建</el-button>
      <el-button type="primary" @click="toByteMain">字节标题管理</el-button>
      <el-button type="primary" :disabled="!tableData.length || building" @click="buildClass">生成品类名称</el-button>
      <el-button type="primary" @click="toBatchDel">批量删除字节内容</el-button>
    </div>
    <!-- <el-row class="flex flex-center mt20 mb20">
      <div class="el-icon-circle-plus-outline" style="font-size: 30px;" @click="addByte"></div>
      <div class="el-icon-remove-outline" style="font-size: 30px; margin-left: 20px;" @click="delByte"></div>
    </el-row> -->

    <el-tree v-loading="loading" :data="tableData" :props="defaultProps" @node-click="getFather" node-key="id"
      @node-expand="getSon" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd"
      @node-drop="handleDrop" draggable @node-contextmenu="rightClick" :allow-drop="allowDrop">
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
    <newByte v-if="isNew" :pageTitle="pageTitle" :treeTitle="treeTitle" :byteType="byteType" :guid="guid"
      @close="closeNew" @refresh="getTableData" :editObj='editSelf'></newByte>
    <newBatch v-if="isBatch" :pageTitle="pageTitle" :treeTitle="treeTitle" :guid="guid" @close="closeNewBatch"
      @refresh="getTableData"></newBatch>
  </div>
</template>

<script>
  import editByte from '@/views/categoryRole/classDefinition/components/editByte.vue'
  import newByte from '@/views/categoryRole/classDefinition/components/newByte.vue'
  import newBatch from '@/views/categoryRole/classDefinition/components/newBatch.vue'
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
    genCatNameFlag_1_0_1, // 判断是否生成过品类名称
    web_pasteNameTree_1_0_1
  } from '@/api/categoryRole/classDefinition.js'
  export default {
    name: "index",
    components: {
      editByte,
      newByte,
      newBatch
    },
    data() {
      return {
        pageTitle: '',
        guid: '',
        code: '',
        treeTitle: '', // 层级来源
        isEdit: false,
        openRow: {},
        tableData: [],
        loading: true,
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
          label: 'name',
        },
        editSelf: {}, // 将要修改的对象
        editFather: {}, // 将要修改的对象的父亲
        editNode: {},
        parentData: {}, // 将要拖拽的父亲节点
        building: false, // 是否正在生成
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
        let nodeTitle = node.data.name
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
        // obj.catTreeGuid = row.catTreeGuid
        // obj.createTime = row.createTime
        // obj.level = row.level
        // obj.name = row.name
        // obj.titleGuid = row.titleGuid
        obj.pageTitle = this.pageTitle
        obj.treeTitle = this.treeTitle
        // obj.code = this.code
        // // 判断是否有上级
        // console.log(obj.level);
        // if (obj.level >= 2) {
        //   obj.parentObjName = this.tableData[obj.level - 2].name
        //   obj.parentObjCatTreeGuid = this.tableData[obj.level - 2].catTreeGuid
        //   obj.parentObjLevel = this.tableData[obj.level - 2].level
        // }
        // console.log(obj);
        obj.guid = this.guid
        this.$router.push({
          path: "byteMain",
          query: obj,
        });
      },
      toBatchDel() {
        let obj = {}
        obj.pageTitle = this.pageTitle
        obj.treeTitle = this.treeTitle
        obj.guid = this.guid
        this.$router.push({
          path: "batchdeleteByte",
          query: obj,
        });
      },
      buildClass() {
        // if (this.isBuild) {
        //   this.$confirm('请务必你一定已经删除掉被修正的字节内容产生的品类名称.不然你要1个1个删除垃圾品类名称。', '警告', {
        //     confirmButtonText: '生成品类名称',
        //     cancelButtonText: '取消',
        //     type: 'warning',
        //     center: true
        //   }).then(() => {
        //     this.building = true
        //     this.getNoContentTitles()
        //   }).catch(() => {});
        // } else {
        //   this.building = true
        //   this.getNoContentTitles()
        // }
        this.$confirm(
          '<p align="left">请务必<br>你一定已经删除掉被修正的字节内容产生的品类名称。<br /><br /><strong>不然<br>你要1个1个删除垃圾品类名称。</strong></p>',
          '警告', {
            confirmButtonText: '生成品类名称',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
          this.building = true
          this.getNoContentTitles()
        }).catch(() => {});

      },
      addByte() {
        this.insertTitle()
      },
      delByte() {
        let n = this.tableData.length
        let obj = this.tableData[n - 1]
        console.log(obj);
        this.$confirm('删除后，这个字节标题的字节内容全部删除。确认删除【' + obj.name + '】', '提示', {
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
      // 品类生成预判断
      async getNoContentTitles() {
        await getNoContentTitles({
          catTreeGuid: this.guid
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let length = res.Tag[0].Table.length
            let data = res.Tag[0].Table
            let arr = []
            for (let i in data) {
              arr.push(data[i].titleName)
            }
            let nameString = arr.join(',') + '没有字节内容，请完善。'
            this.$message({
              message: nameString,
              type: 'error'
            });

          } else {
            this.insertCatName()
          }
        })
      },
      // 品类生成预判断
      async insertCatName() {
        await insertCatName({
          catTreeGuid: this.guid
        }).then(res => {
          this.building = false
          console.log(res);
          if (res.Tag.length) {
            let length = res.Tag[0].Table[0].count
            let msg = "成功生成" + length + "个品类"
            this.$message({
              message: msg,
              type: 'success'
            });

          } else {}
          if (res.OK == 'True') {
            this.$message({
              message: res.Message,
              type: 'success'
            });
          } else {
            this.$message({
              message: res.Message,
              type: 'error'
            });
          }

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
          name: this.editScreen
        }).then(res => {
          console.log(res);
          this.editNode.data.name = this.editScreen
          this.$message('编辑成功')
          this.closeEdit()
        })
      },
      // 删除场景
      delScreen() {
        this.$confirm('删除后，其之下的从属字节内容全部删除，确认删除' + this.editSelf.name, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNameTree(this.editSelf.guid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      async deleteNameTree(id) {
        await deleteNameTree({
          catNameTreeGuid: id
        }).then(res => {
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

      // 右键打开菜单
      rightClick(event, data, node) {
        this.treeTitle1 = []
        this.treeTitleString1 = ''
        this.menuX = event.clientX
        this.menuY = event.clientY
        this.editSelf = data
        this.editFather = node.parent.data
        this.editScreen = data.name
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
        if (this.copyData.guid && this.pasteData.guid) {
          this.web_pasteNameTree_1_0_1()
        } else {
          this.$message({
            type: 'error',
            message: '复制内容为空!'
          });
        }

      },
      //
      async web_pasteNameTree_1_0_1() {
        await web_pasteNameTree_1_0_1({
          sourceNameTreeGuid: this.copyData.guid,
          targetNameTreeGuid: this.pasteData.guid
        }).then(res => {
          console.log(res);
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
        this.closeMenu()
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
          name: ''
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
            console.log('data.children',data.children);
            data = this.clone(data)
          } else {
            data.children = []
          }
        })
      },
      // 判断是否生成过品类
      async genCatNameFlag_1_0_1() {
        await genCatNameFlag_1_0_1({
          catTreeGuid: this.guid
        }).then(res => {
          console.log(res);
          if (res.Tag[0].Table[0].genFlag > 0) {
            this.isBuild = true
            this.$confirm('该场景已经生成过品类名称，如果你要修正品类定义内容；请优先删除已生成的品类名称。避免制造垃圾品类名称。', '警告', {
              confirmButtonText: '我知道了',
              showCancelButton: false,
              type: 'warning',
              center: true
            }).then(() => {}).catch(() => {});
          } else {
            this.isBuild = false
          }
        })
      }
    },
    created() {
      this.pageTitle = this.$route.query.title
      this.treeTitle = this.$route.query.treeTitle
      this.guid = this.$route.query.guid
      this.code = this.$route.query.code
      // this.getTitleListByCatreeGuid()
      this.getTableData()
      this.genCatNameFlag_1_0_1()
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
