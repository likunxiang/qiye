<template>
  <div class="app-container">
    <el-row>
      <span class="bold">品类名称：</span>
      <span class="ml10">{{openRow.categoryName}}</span>
    </el-row>
    <el-row class="mt20">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="采购需求信息配置" name="demand" v-if="openRow.bizType == '1'">
          <el-tree :data="demandList" node-key="id" v-loading="loading" :props="defaultProps" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-expand="getSon" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="供应需求信息配置" name="supply" v-if="openRow.bizType == '1'">
          <el-tree :data="demandList" v-loading="loading" @node-expand="getSon" :props="defaultProps" node-key="id" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="供应报价信息配置" name="supply" v-if="openRow.bizType == '2'">
          <el-tree :data="demandList" v-loading="loading" @node-expand="getSon" :props="defaultProps" node-key="id" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="采购资质信息配置" name="demand" v-if="openRow.bizType == '4'">
          <el-tree :data="demandList" v-loading="loading" @node-expand="getSon" :props="defaultProps" node-key="id" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop">
          </el-tree>
        </el-tab-pane>
      </el-tabs>

    </el-row>
  </div>
</template>

<script>
  import {
    getPlates,
    getPlateTypesByPlateGuid,
    getPlateFieldsByPlateTypeGuid,
    updatePlateNorder,
    updatePlateTypeNorder,
    updatePlateFieldNorder
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    data() {
      return {
        activeName: 'demand',
        data: [],
        demandList: [],
        supplyList: [],
        defaultProps: {
          label: 'plateName',
          children: 'children',
          isLeaf: true
        },
        type: 1,
        openRow: {},
        guid: '', // 对应的id
        oldNorder: 0, // 旧的顺序
        newNorder: 0, // 新的顺序
        loading: true,
        parentData: {}
      };
    },
    methods: {
      getSon(data,node) {
        console.log('getson',node);
        this.level = node.level // 获取层级
        if (data.hasSon == '1') {
          if (this.level === 1) {
            this.getPlateTypesByPlateGuid(data)
          } else if (this.level === 2) {
            this.getPlateFieldsByPlateTypeGuid(data)
          }
        } else {
          return
        }
      },
      // 获取板块名称
      async getPlates() {
        await getPlates({
          catTreeCode: this.activeName,
          categoryGuid: this.openRow.categoryGuid,
          bizType: this.openRow.bizType,
          fixedDataBizType: this.openRow.bizType,
          plateTypeGuid: ''
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            let arr = []
            for (let i in data) {
              let obj = {
                pid: this.openRow.categoryGuid,
                norder: data[i].norder,
                plateName: data[i].plateName + '(' + data[i].plateAlias + ')',
                guid: data[i].plateGuid,
                hasSon: data[i].hasSon
              }
              if (data[i].hasSon == '1') {
                obj.children = [{
                  plateName: '加载中...'
                }]
              }
              arr.push(obj)
            }
            this.demandList = arr
          } else {
            this.demandList = []
          }
        })
      },
      // 正常进来时候请求的接口
      async getPlateTypesByPlateGuid(data) {
        await getPlateTypesByPlateGuid({
          plateGuid: data.guid
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            let data1 = res.Tag[0].Table
            let arr = []
            for (let i in data1) {
              let obj = {
                pid: data.guid,
                norder: data1[i].norder,
                guid: data1[i].plateTypeGuid,
                plateName: data1[i].plateTypeName + '(' + data1[i].plateTypeAlias + ')',
                hasSon: data1[i].hasSon
              }
              if (data1[i].hasSon == '1') {
                obj.children = [{
                  plateName: '加载中...'
                }]
              }
              arr.push(obj)
            }
            data.children = arr
          } else {
            return
          }
        })
      },
      // 正常进来时候请求的接口
      async getPlateFieldsByPlateTypeGuid(data) {
        await getPlateFieldsByPlateTypeGuid({
          plateTypeGuid: data.guid
        }).then(res => {
          this.loading = false
          if (res.Tag.length) {
            let data1 = res.Tag[0].Table
            let arr = []
            for (let i in data1) {
              let obj = {
                pid: data.guid,
                norder: data1[i].norder,
                guid: data1[i].plateFieldGuid,
                plateName: data1[i].plateFieldName + '(' + data1[i].plateFieldAlias + ')'
              }
              if (data1[i].hasSon == '1') {
                obj.children = [{
                  plateName: '加载中...'
                }]
              }
              arr.push(obj)
            }
            data.children = arr
          } else {
            return
          }
        })
      },
      handleClick(tab, event) {
        this.getPlates()
      },
      handleDragStart(node, ev) {
        console.log('drag start', node);
        this.level = node.level // 获取层级
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
        this.guid = draggingNode.data.guid
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
        if (this.level === 1) {
          this.updatePlateNorder()
        } else if (this.level === 2) {
          this.updatePlateTypeNorder()
        } else if (this.level === 3) {
          this.updatePlateFieldNorder()
        }
        console.log('end data111', this.parentData);
      },
      allowDrop(draggingNode, dropNode, type) {

        if (draggingNode.data.level === dropNode.data.level) {
          //fatherId 是父节点id
          if (draggingNode.data.pid === dropNode.data.pid) {
            return type === 'prev' || type === 'next'
          } else {
            return false;
          }
        } else {
          // 不同级进行处理
          return false;
        }
      },
      // 修改板块名称排序
      async updatePlateNorder() {
        await updatePlateNorder({
          plateGuid: this.guid,
          norder: this.oldNorder,
          newNorder: this.newNorder
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getPlates()
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      },
      // 修改板块类型排序
      async updatePlateTypeNorder() {
        console.log('板块类型');
        await updatePlateTypeNorder({
          plateGuid: this.guid,
          norder: this.oldNorder,
          newNorder: this.newNorder
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            let data = this.parentData
            this.getPlateTypesByPlateGuid(data)
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      },
      // 修改板块字段名称排序
      async updatePlateFieldNorder() {
        await updatePlateFieldNorder({
          plateFieldGuid: this.guid,
          norder: this.oldNorder,
          newNorder: this.newNorder
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            let data = this.parentData
            this.getPlateFieldsByPlateTypeGuid(data)
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      }
    },
    created() {
      this.openRow = this.$route.query
      if (this.openRow.bizType == '2') {
        this.activeName = 'supply'
      }
      if (this.openRow.bizType == '4') {
        this.activeName = 'demand'
      }
      console.log(this.openRow);
      this.getPlates()
    }
  };
</script>

<style lang="scss">
</style>
