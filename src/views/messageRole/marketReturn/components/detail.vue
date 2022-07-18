<template>
  <el-dialog title="详情" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 40px;">
      <div class="flex flex-center mb20">
        <div class="label">反馈日期</div>
        <div>{{openRow.createTime}}</div>
      </div>
      <div class="mb20">
        <div class="label mb10">反馈内容</div>
        <div>{{openRow.content}}</div>
      </div>
      <div class="flex flex-center mb20" style="flex-wrap: wrap;">
        <el-image v-for="(img,index) in imgList" :key="index"
            style="width: 100px; height: 100px;margin-right: 20px;flex-shrink: 0;margin-bottom: 10px;"
            :src="img"
            :preview-src-list="imgList">
        </el-image>
      </div>
      <el-divider></el-divider>
      <div class="label mb20">供需用户信息</div>
      <div class="flex flex-center mb20">
        <div class="label">姓名</div>
        <div>{{feedbackObj.feedbackUserName}}</div>
      </div>
      <div class="flex flex-center">
        <div class="label">联系电话</div>
        <div>{{feedbackObj.feedbackUserNation}} {{feedbackObj.feedbackUserPhonenumber}}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { getDetail } from '@/api/messageRoleApi/marketReturn.js'
  export default {
    name: "index",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        feedbackObj: {}, // 反馈对象
        basicUrl: this.$store.state.basics.img_url_user_feedback_user,
        imgList: []
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
      async getDetail() {
        await getDetail({
          feedbackGuid: this.openRow.feedbackGuid
        }).then(res => {
          if(res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.feedbackObj = data
            this.imgList = data.imgs.split(',').map(item => this.basicUrl + item)
          }
        })
      }
    },
    created() {
      this.getDetail()
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    font-weight: bold;
    width: 120px;
  }
</style>
