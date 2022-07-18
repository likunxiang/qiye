<template>
  <div class="app-container">
    <h1>{{pageTitle}}</h1>
    <el-divider></el-divider>
    <el-button type="primary" @click="openNew">新建</el-button>
    <!-- <el-button type="primary" @click="openLead">批量导入</el-button>
    <el-button type="primary" @click="openTemplate">下载模板</el-button> -->
    <el-divider></el-divider>

    <div class="">
      <template>
        <el-tree :data="tableData" :lazy="true" :props="defaultProps" :load="againOne" node-key="id" default-expand-all
          @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-click="closeMenu"
          @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable
          @node-contextmenu="rightClick" :allow-drop="allowDrop">
        </el-tree>
      </template>
      <!-- <template>
        请添加
      </template> -->
    </div>

    <div v-show="menuVisible" class="menu-box" :style="{left: menuX + 'px',top: menuY + 'px'}">
      <el-menu id="menu" @select="handleSelect" text-color="#000">
        <el-menu-item index="1" class="menuItem">
          <span slot="title">编辑供应场景</span>
        </el-menu-item>
        <el-menu-item index="2" class="menuItem">
          <span slot="title">删除供应场景</span>
        </el-menu-item>
      </el-menu>
    </div>

    <el-dialog title="新建供应场景" width="700px" v-if="isNew" :visible.sync="isNew" destroy-on-close>
      <div class="mt20">
        <span class="mr20">供应类型</span>
        <span>{{pageTitle}}</span>
      </div>
      <div class="input-box">
        <div class="flex flex-center">
          <div class="input-text">父级场景</div>
          <el-input type="text" :value="fatherSceneSure.name" placeholder="请选择" suffix-icon="el-icon-search"
            @focus="openFather" />
        </div>
        <div class="flex flex-center mt20">
          <div class="input-text">供应场景</div>
          <el-input type="text" v-model="addSceneName" placeholder="请输入" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeNew">取 消</el-button>
        <el-button type="primary" @click="sumbitAdd" :disabled="!addSceneName.trim()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择父级场景" width="700px" :visible.sync="isFather">
      <div class="mt20">
        <span class="mr20">供应类型</span>
        <span>{{pageTitle}}</span>
      </div>
      <el-tree :data="tableData" :lazy="true" :props="defaultProps" :load="againOne" @node-click="fatherChoose" default-expand-all>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFather">取 消</el-button>
        <el-button type="primary" @click="submitFather">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批量导入" width="700px" :visible.sync="isLead">
      <div class="mt20">
        <span class="mr20">供应类型</span>
        <span>{{pageTitle}}</span>
      </div>
      <div class="input-box">
        <div class="flex flex-center">
          <div class="input-text">父级场景</div>
          <el-input type="text" :value="fatherSceneSure.label" placeholder="请选择" suffix-icon="el-icon-search"
            @focus="openFather" />
        </div>
        <div class="flex mt20">
          <div style="height: 32px;line-height: 32px;width: 100px;">供应场景</div>
          <el-upload ref="upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" show-file-list multiple
            :limit="1" :on-progress="uploading" :on-success="uploadSuccess" :on-exceed="handleExceed"
            :auto-upload="false" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请按照模板格式导入</div>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeNew">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑供应场景" width="700px" :visible.sync="isEdit">
      <div class="mt20">
        <span class="mr20">供应类型</span>
        <span>{{pageTitle}}</span>
      </div>
      <div class="input-box">
        <div class="flex flex-center">
          <div class="input-text">父级场景</div>
          <el-input type="text" :value="editFather.name" :disabled="true" />
        </div>
        <div class="flex flex-center mt20">
          <div class="input-text">供应场景</div>
          <el-input type="text" v-model="editScreen" placeholder="请输入" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary" @click="submitEdit" :disabled="!editScreen">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getSonList,
    insertType3,
    updateType3,
    deleteType3,
    updateType3Norder
  } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    data() {
      return {
        pageTitle: '',
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          disabled: function(data,node) {
            if (data.hasSon == "1") {
              return true
            }
          },
          isLeaf: function(data,node) {
            if (data.hasSon == "1") {
              return true
            }
          }
        },
        isNew: false, // 新建弹窗的开关
        addSceneName: '', // 新增的场景名字
        isLead: false, // 批量导入的开关
        isTemplate: false, // 导入模板的开关
        isFather: false, // 选择父级场景开关
        isEdit: false, // 编辑类名
        editSelf: {}, // 将要修改的对象
        editFather: {}, // 将要修改的对象的父亲
        editScreen: '', // 修改完的场景
        menuVisible: false,
        menuX: '',
        menuY: '',
        fatherScene: {}, // 选中的父级
        fatherSceneSure: {}, // 确认选中的父级
        fileList: [],
        loadingPop: '',
        editNode: {},
        editData: {},
        node_had: '',
        resolve_had: '',
        currentGuid: '', // 拖拽的id
        oldNorder: '', // 拖拽的对象
        newNorder: '', // 放入的对象
        guid: '',
        fatherCode: '',
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
      fatherChoose(data) {
        console.log(data);
        this.fatherScene = data
        this.editNode = node
      },
      handleDragStart(node, ev) {
        this.closeMenu()
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        this.currentGuid = draggingNode.data.guid
        this.oldNorder = draggingNode.data.norder
        this.newNorder = dropNode.data.norder
		if(this.oldNorder === this.newNorder) {
		  return
		}
		draggingNode.data.norder = this.newNorder
		dropNode.data.norder = this.oldNorder
        this.updateType3Norder()
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        console.log('正在拖拽的节点',draggingNode);

        console.log('将要放入的节点',dropNode);

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
        this.isEdit = true
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
        this.$confirm('确认删除' + this.editSelf.name, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteType3({
            guid: this.editSelf.guid
          }).then(res => {
            let parent = this.editNode.parent;
            let children = parent.childNodes;
            let index
            for (let i in children) {
              console.log('2',i);
              if (this.editData.guid == children[i].data.guid) {
                console.log('3',i);
                index = i
                children.splice(index, 1);
              }
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 新建弹窗
      openNew() {
        this.isNew = true
        this.fatherSceneSure = {}
        this.addSceneName = ''
        this.closeMenu()
      },
      closeNew() {
        this.isNew = false
      },
      // 批量导入
      openLead() {
        this.isLead = true
        this.closeMenu()
      },
      closeLead() {
        this.isLead = false
      },
      // 导入模板
      openTemplate() {
        this.isTemplate = true
        this.closeMenu()
      },
      closeTemplate() {
        this.isTemplate = false
      },
      // 选择父级场景
      openFather() {
        this.isFather = true
        this.closeMenu()
      },
      closeFather() {
        this.isFather = false
      },
      submitFather() {
        this.fatherSceneSure = this.fatherScene
        console.log('fatherSceneSure', this.fatherSceneSure);
        this.isFather = false
      },
      // 上传文件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      uploading() {
        const loading = this.$loading({
          lock: true,
          text: '文件上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.loadingPop = loading
      },
      uploadSuccess(response, file, fileList) {
        this.loadingPop.close()
        this.$refs.upload.clearFiles(); // 方法呢？
        this.$alert(response.Message, "导入结果", {
          dangerouslyUseHTMLString: true
        });
        this.isLead = false
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      // 确认新增场景
      sumbitAdd() {
        this.insertType3()
      },
      // 懒加载请求子节点
      againOne(node, resolve) {
        let that = this;
        if (node.level == 0) {
          this.node_had = node; //这里是关键！在data里面定义一个变量，将node.level == 0的node存起来
          this.resolve_had = resolve; //同上，把node.level == 0的resolve也存起来
          that.loadtreeData(node, resolve)
        }
        if (node.level >= 1) {
          that.getChildByList(node, resolve)
        }
      },
      requestNewData() {
        this.node_had.childNodes = []; //把存起来的node的子节点清空，不然会界面会出现重复树！

        this.againOne(this.node_had, this.resolve_had); //再次执行懒加载的方法
      },
      loadtreeData(node,resolve) { // 获取loadtreeData 就是父节点数据，getChildByList就是异步获取子节点数据
        getSonList({
          guid: this.guid
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            resolve(data)
          } else {
            return resolve([])
          }
        })
      },
      getChildByList(node, resolve) {
        var _parentID = node.data.guid
        getSonList({
          guid: _parentID
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            resolve(data);
          } else {
            return resolve([])
          }

        })
      },

      // 新增场景
      async insertType3() {
        await insertType3({
          parentGuid: this.fatherSceneSure.guid || this.guid, // 分节点id  有选择父元素的时候
          name: this.addSceneName,
          code: this.fatherSceneSure.code || this.fatherCode
        }).then(res => {
          console.log(res);
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.isNew = false
            this.requestNewData()
          } else {
            this.$message('新增失败');
          }
        })
      },
      // 右键打开菜单
      rightClick(event, data, node) {
        this.menuX = event.clientX
        this.menuY = event.clientY
        this.editSelf = data
        this.editFather = node.parent.data
        this.editScreen = data.name
        this.editNode = node
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
        }
        this.closeMenu()
      },
      // 拖拽接口
      async updateType3Norder() {
        await updateType3Norder({
          guid: this.currentGuid,
          oldNorder: this.oldNorder,
          newNorder: this.newNorder
        }).then(res => {
          console.log(res);
        })
      }
    },

    created() {
      console.log(this.$route.query);
      this.pageTitle = this.$route.query.title
      this.guid = this.$route.query.guid
      this.fatherCode = this.$route.query.code
    },
  };
</script>

<style lang="scss">
  .input-box {
    width: 70%;
    margin: 40px auto;

    .input-text {
      width: 100px;
      flex-shrink: 0;
    }
  }

  .menu-box {
    position: fixed;
    z-index: 9999;
    background-color: #fff;
    box-shadow: 0px 0px 6px #888888;
    width: 200px;
  }
</style>
