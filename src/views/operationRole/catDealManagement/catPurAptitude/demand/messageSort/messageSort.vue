<template>
  <div class="app-container">
    <el-row>
      <span class="bold">品类名称：</span>
      <span class="ml10">{{openRow.categoryName}}</span>
    </el-row>
    <el-row class="mt20">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="采购需求信息配置" name="demand">
          <el-tree :data="demandList" node-key="id" :props="defaultProps" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="供应需求信息配置" name="supply">
          <el-tree :data="demandList" :props="defaultProps" node-key="id" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop">
          </el-tree>
        </el-tab-pane>
      </el-tabs>

    </el-row>
  </div>
</template>

<script>
  import { getPlates,getPlateTypesByPlateGuid,getPlateFieldsByPlateTypeGuid,updatePlateNorder,updatePlateTypeNorder,updatePlateFieldNorder } from '@/api/modelRoleApi/tradingContent.js'
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
          children:'children',
          isLeaf: true
        },
        type: 1,
        openRow: {},
        guid: '', // 对应的id
        oldNorder: 0, // 旧的顺序
        newNorder: 0, // 新的顺序
      };
    },
    methods: {
      // 获取板块名称
      async getPlates() {
        await getPlates({
          catTreeCode: this.activeName,
          categoryGuid: this.openRow.categoryGuid,
          bizType: this.openRow.bizType,
		  fixedDataBizType: '4',
		  plateTypeGuid: ''
        }).then(res => {
          console.log(res);
          if(res.Tag.length) {
            let data = res.Tag[0].Table
            let arr = []
            for (let i in data) {
              let obj = {
                pid: this.openRow.categoryGuid,
                norder: data[i].norder,
                plateName: data[i].plateName,
                guid: data[i].plateGuid
              }
              arr.push(obj)
            }
            this.demandList = arr
            for(let i in this.demandList) {
              this.getPlateTypesByPlateGuid(this.demandList[i].guid,i)
            }
            console.log(this.demandList);
          } else {
			this.demandList = []
		  }
        })
      },
      async getPlateTypesByPlateGuid(id,index) {
        await getPlateTypesByPlateGuid({
          plateGuid: id
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            let arr = []
            for (let i in data) {
              let obj = {
                pid: id,
                norder: data[i].norder,
                guid : data[i].plateTypeGuid,
                plateName: data[i].plateTypeName
              }
              arr.push(obj)
            }
            this.demandList[index].children = arr
            this.demandList = this.clone(this.demandList)
            for(let i in arr) {
              this.getPlateFieldsByPlateTypeGuid(arr[i].guid,i,index)
            }
          } else {
            return
          }
        })
      },
      async getPlateFieldsByPlateTypeGuid(id,index,index2) {
        await getPlateFieldsByPlateTypeGuid({
          plateTypeGuid: id
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            let arr = []
            for (let i in data) {
              let obj = {
                pid: id,
                norder: data[i].norder,
                guid : data[i].plateFieldGuid,
                plateName: data[i].plateFieldName
              }
              arr.push(obj)
            }
            this.demandList[index2].children[index].children = arr
            this.demandList = this.clone(this.demandList)
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
        this.guid = draggingNode.data.guid
        this.oldNorder = draggingNode.data.norder
        this.newNorder = dropNode.data.norder
		if(this.oldNorder === this.newNorder) {
		  return
		}
		draggingNode.data.norder = this.newNorder
		dropNode.data.norder = this.oldNorder
        if (this.level === 1) {
          this.updatePlateNorder()
        } else if (this.level === 2) {
          this.updatePlateTypeNorder()
        } else if (this.level === 3) {
          this.updatePlateFieldNorder()
        }
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
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
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
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
        await updatePlateTypeNorder({
          plateGuid: this.guid,
          norder: this.oldNorder,
          newNorder: this.newNorder
        }).then(res => {
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
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
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
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
      console.log(this.openRow);
      this.getPlates()
    }
  };
</script>

<style lang="scss">
</style>
