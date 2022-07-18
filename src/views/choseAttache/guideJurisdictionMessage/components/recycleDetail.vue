<template>
  <el-dialog title="查看回收详情" :visible.sync="isOpen" width="700px" @close="beforeClose" v-loading="loading">
    <div style="padding-bottom: 60px;">
      <el-row class="mb20 flex flex-center">
        <div class="bold label">回收日期</div>
        <div>{{row.createTime}}</div>
      </el-row>
      <el-row class="mb20 flex">
        <div class="bold label">回收数量</div>
        <div>{{row.takebackNum}}</div>
      </el-row>
      <h4 class="title-bg">机构列表</h4>
      <div v-if="orgList.length > 0" class="mb10" v-for="(item,index) in orgList" >{{item.orgName}}</div>
      <div v-else>{{item.orgName}}</div>
    </div>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </el-dialog>
</template>

<script>
  import {
    getTakebackDetailListByTime
  } from '@/api/choseAttacheApi/choseAttacheCom.js'
  import pages from '@/views/components/common/pages'
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
    components: {
      pages
    },
    data() {
      return {
        isOpen: true,
        loading: false,
        orgList: [],
        page: 1,
        pageTotal: 0,
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
      changePage(page) {
        this.page = page
        this.getTakebackDetailListByTime()
        //
      },
      async getTakebackDetailListByTime() {
        this.loading = true
        await getTakebackDetailListByTime({
          curUserId: this.$store.state.user.adminId,
          size: '20',
          page: this.page,
          takebackTime: this.row.takebackTime
        }).then(res => {
          this.loading = false
          if(res.OK == 'True') {

            console.log(res);
            if (res.Tag.length > 0) {
              let data = res.Tag[0].Table
              this.orgList = data
            } else {
              this.orgList = []
            }
            this.pageTotal = this.orgList.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
          }
        })
      }
    },
    created() {
      this.getTakebackDetailListByTime()
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    width: 80px;
  }

  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }
</style>
