<template>
  <el-dialog title="选择品类类型" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="pb20">
      <classTree @close="" @save="saveClass" :isClass="true"></classTree>
    </div>
  </el-dialog>
</template>

<script>
  import classTree from '@/views/categoryRole/giveModel/components/classTree.vue'
  import { getList } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    components: {
      classTree
    },
    data() {
      return {
        isOpen: true,
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        classCheckObj: {},
        loading: true
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      submit() {

      },
      saveClass(data) {
        this.classCheckObj = data
        this.$emit('getClass',data)
        this.close()
      },
    },
    created() {
      // this.getList()
    }
  };
</script>

<style lang="scss" scoped>
</style>
