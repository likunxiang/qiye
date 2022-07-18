<template>
  <div class="app-container">
    <el-row>
      <span class="bold">品类名称：</span>
      <span class="ml10">品类名称1</span>
    </el-row>
    <el-row class="mt20">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-if="type == 0">
        <el-tab-pane label="采购需求信息配置" name="first">
          <el-tree :data="data" node-key="id" default-expand-all @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop"
            :allow-drag="allowDrag">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="供应需求信息配置" name="second">
          <el-tree :data="data" node-key="id" default-expand-all @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop"
            :allow-drag="allowDrag">
          </el-tree>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-else>
        <el-tab-pane label="供应报价信息配置" name="first">
          <el-tree :data="data" node-key="id" default-expand-all @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop"
            :allow-drag="allowDrag">
          </el-tree>
        </el-tab-pane>
      </el-tabs>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        activeName: 'first',
        data: [],
        type: 1,
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleDragStart(node, ev) {
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
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {

        if (draggingNode.data.level === dropNode.data.level) {
          //fatherId 是父节点id
          if (draggingNode.data.fatherId === dropNode.data.fatherId) {
            return type === 'prev' || type === 'next'
          } else {
            return false;
          }
        } else {
          // 不同级进行处理
          return false;
        }
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss">
</style>
