<template>
  <div class="pageMain">
    <el-pagination
      :layout="showTotal?'total,prev, pager, next':'prev, pager, next'"
      :page-size="20"
      :current-page="page"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    showTotal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$emit('changePage', val)
    }
  }
}
</script>

<style scoped lang="scss">
  .pageMain {
    position: absolute;
    bottom: 20px;
  }
</style>
