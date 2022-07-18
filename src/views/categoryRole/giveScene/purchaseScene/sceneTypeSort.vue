<template>
  <div class="app-container">
    <h1>{{pageTitle}}</h1>
    <el-divider></el-divider>
    <div class="">
      <template v-if="true">
        <el-tree :data="data" node-key="id" default-expand-all @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop"
          :allow-drag="allowDrag">
        </el-tree>
      </template>
      <template v-else>
        请添加
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        pageTitle: '',
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            fatherId: 1,
            id: 4,
            label: '二级 1-1',
            children: [{
              fatherId: 4,
              id: 9,
              label: '三级 1-1-1'
            }, {
              fatherId: 4,
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            fatherId: 2,
            id: 5,
            label: '二级 2-1'
          }, {
            fatherId: 2,
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            fatherId: 3,
            id: 7,
            label: '二级 3-1'
          }, {
            fatherId: 3,
            id: 8,
            label: '二级 3-2',
            children: [{
              fatherId: 8,
              id: 11,
              label: '三级 3-2-1'
            }, {
              fatherId: 8,
              id: 12,
              label: '三级 3-2-2'
            }, {
              fatherId: 8,
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
      };
    },
    methods: {
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
    created() {
      this.pageTitle = this.$route.query.title
    },
  };
</script>

<style lang="scss">
</style>
