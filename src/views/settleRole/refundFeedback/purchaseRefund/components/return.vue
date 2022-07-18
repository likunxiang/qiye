<template>
  <el-dialog title="回复" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 40px;">
      <el-input type="textarea" :rows="3" placeholder="请将处理过程或者进度告知对对方"
        v-model="textarea">
      </el-input>
      <el-divider></el-divider>
      <div class="label mb20">意见反馈详情</div>
      <div class="mb20">
        <div class="label mb10">反馈日期</div>
        <div>{{feedbackObj.feedbackDate}}</div>
      </div>
      <div class="mb20">
        <div class="label mb10">品类名称</div>
        <div>{{feedbackObj.categoryName}}</div>
      </div>
      <div class="mb20">
        <div class="label mb10">采购编号</div>
        <div>{{feedbackObj.orderNo}}</div>
      </div>
      <div class="mb20">
        <div class="label mb10">事由</div>
        <div>{{feedbackObj.feedbackContent}}</div>
      </div>
      <div class="label mb10">证据</div>
      <div class="flex flex-center mb20" style="flex-wrap: wrap;">
        <el-image v-for="(img,index) in imgList" :key="index"
          style="width: 100px; height: 100px;margin-right: 20px;flex-shrink: 0;margin-bottom: 10px;" :src="img"
          :preview-src-list="imgList">
        </el-image>
      </div>
      <div class="mb20">
        <div class="label mb10">联系人</div>
        <div>{{feedbackObj.feedbackContact}}</div>
      </div>
      <div class="mb20">
        <div class="label mb10">联系电话</div>
        <div>{{feedbackObj.feedbackNation}}{{feedbackObj.feedbackPhone}}</div>
      </div>
      <el-divider></el-divider>
      <div class="label mb20">账号信息</div>
      <div class="flex flex-center mb20">
        <div class="label">账号名称</div>
        <div>{{feedbackObj.userPhonenumber}}</div>
      </div>
      <div class="flex flex-center mb20">
        <div class="label">姓名</div>
        <div>{{feedbackObj.userName}}</div>
      </div>
      <div class="flex flex-center">
        <div class="label">联系电话</div>
        <div>{{feedbackObj.userNation}} {{feedbackObj.userPhonenumber}}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!textarea.trim()">发 布</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    getReplyDetail,
    reply
  } from '@/api/settleRoleApi/refundFeedback.js'
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
        textarea: '',
        basicUrl: this.$store.state.basics.img_url_user_feedback_order,
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
      submit() {
        this.reply()
      },
      // 回复接口
      async reply() {
        await reply({
          feedbackGuid: this.openRow.feedbackGuid,
          replyContent: this.textarea
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$alert('发布成功！', '', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('refresh')
                this.close()
              }
            });
          } else {
            this.$message({
              type: 'error',
              message: '回复失败！'
            })
          }

        })
      },
      async getReplyDetail() {
        await getReplyDetail({
          feedbackGuid: this.openRow.feedbackGuid
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.feedbackObj = data
            this.imgList = data.imgs.split(',').map(item => this.basicUrl + item)
          }
        })
      }
    },
    created() {
      this.getReplyDetail()
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    font-weight: bold;
    width: 120px;
  }
</style>
