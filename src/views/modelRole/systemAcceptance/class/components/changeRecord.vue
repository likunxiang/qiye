<template>
  <el-dialog title="变更记录" :visible.sync="isOpen" width="500px" @close="beforeClose">
    <div class="flex mb10 flex-center">
      <div class="my-label bold">品类名称</div>
      <div>{{row.category_name}}</div>
    </div>
    <div class="flex mb10 flex-center">
      <div class="my-label bold">品类类型</div>
      <div>{{row.cattypeName}}</div>
    </div>
    <div class="mb20" style="padding-bottom: 20px; min-height: 50vh;">
      <div class="my-label bold mb10">记录内容</div>
      <div class="mb10 flex flex-center" v-for="(item,index) in list" :key="index">
        <div class="my-label">{{item.createTime}}</div>
        <div>{{item.day}}小时</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { getDeadlineHistory } from "@/api/modelRoleApi/systemAcceptance.js"
  export default {
    name: "index",
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        list: []
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
      // 查看变更记录
      async getDeadlineHistory() {
        await getDeadlineHistory({
          category_guid: this.row.category_guid
        }).then(res => {
          console.log(res);
          if(res.Tag) {
            this.list = res.Tag[0].Table
          }

        })
      }
    },
    mounted() {
      this.getDeadlineHistory()
    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 160px;
  }
</style>
