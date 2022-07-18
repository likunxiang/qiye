<template>
  <el-dialog title="个人账号信息" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row class="">
      <div class="title-bg mb10">账号信息</div>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">账号名称</div>
        <div class="my-label">{{userInfo.username}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">姓名</div>
        <div class="my-label">{{userInfo.username}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">联系电话</div>
        <div class="my-label">{{userInfo.phonenumber}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">注册日期</div>
        <div class="my-label">{{userInfo.createTime}}</div>
      </el-row>
    </el-row>
    <el-row>
      <div class="title-bg mb10">账号信息</div>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">姓名</div>
        <div class="my-label">{{userInfo.realname}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">证件类型</div>
        <div class="my-label">{{userInfo.ID_type===''?'':userInfo.ID_type==1?'身份证': '护照'}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">证件号码</div>
        <div class="my-label">{{userInfo.ID_number}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">证件生效日期</div>
        <div class="my-label">{{userInfo.effective_start_date}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">证件有效期限</div>
        <div class="my-label">{{userInfo.effective_end_date}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">签发机关</div>
        <div class="my-label">{{userInfo.issuance_organ}}</div>
      </el-row>
      <el-row class="mb10">
        <div class="bold my-label label-width">证件证明</div>
        <div class="flex mb10">
          <el-image class="mr10" style="width: 100px; height: 100px" :src="imgs" fit="fit" v-for="(imgs,mIndex) in userInfo.imgArr" :key="mIndex"></el-image>
        </div>
      </el-row>
    </el-row>
    <el-row class="mb20">
      <div class="title-bg mb10">其他信息</div>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">角色类型</div>
        <div class="my-label">{{userInfo.roleType}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">是否是引导专员</div>
        <div class="my-label">{{userInfo.guideUserNum}}</div>
      </el-row>
      <el-row class="mb10 flex flex-center">
        <div class="bold my-label label-width">是否有引导专员</div>
        <div class="my-label">{{userInfo.guidedNum}}</div>
      </el-row>
    </el-row>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="delAutonym">删除认证信息</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
  import {
    getUserCertification,
    getUserInfoOne
  } from "@/api/operationRoleApi/dispatchingManagementApi.js"
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
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit: 'fit',
        userInfo: {
          username: '',
          userTag: '',
          phonenumber: '',
          createTime: '',
          guideUserNum: '',
          guidedNum: '',
          roleType: '',
          certification_id: '',
          user_id: '',
          realname: '',
          ID_type: '',
          ID_number: '',
          effective_start_date: '',
          effective_end_date: '',
          issuance_organ: '',
          create_time: '',
          imgArr: ''
        },
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
      // 获取实名认证信息
      async getUserCertification() {
        //this.row.user_id
        await getUserCertification(this.row.userId).then((res) =>{
          if (res.Tag.length) {
            // this.userInfo = res.Tag[0].Table[0]
            let data = res.Tag[0].Table[0]
            this.userInfo.certification_id = data.certification_id
            this.userInfo.user_id = data.user_id
            this.userInfo.realname = data.realname
            this.userInfo.ID_type = data.ID_type
            this.userInfo.ID_number = data.ID_number
            this.userInfo.effective_start_date = data.effective_start_date
            this.userInfo.effective_end_date = data.effective_end_date
            this.userInfo.issuance_organ = data.issuance_organ
            this.userInfo.create_time = data.create_time
            this.userInfo.imgArr = data.imgs.split(',http')

            for (let i in this.userInfo.imgArr) {
              if (i != 0) {
                this.userInfo.imgArr[i] = "http" + this.userInfo.imgArr[i]
              }
            }
            console.log('实名认证',this.userInfo);
          }

        })
      },
      // 获取用户个人信息
      async getUserInfoOne() {
        await getUserInfoOne(this.row.userId).then((res) =>{
          if (res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.userInfo.username = data.username
            this.userInfo.userTag = data.userTag
            this.userInfo.phonenumber = data.phonenumber
            this.userInfo.createTime = data.createTime
            this.userInfo.guideUserNum = data.guideUserNum > 0?'是': '不是'
            this.userInfo.guidedNum = data.guidedNum > 0? '有': '没有'
            console.log('个人信息',this.userInfo);
            // 从字典获取角色类型
            this.getDicts("user_tag").then(response => {
              var statusOptions = response.Tag;
              console.log('statusOptions',statusOptions);
              for (var i in statusOptions) {
                if (this.userInfo.userTag == statusOptions[i].dictValue) {
                  this.userInfo.roleType = statusOptions[i].dictLabel
                  console.log(this.userInfo);
                  return
                }
              }
            });
          }
        })
      },
    },
    created() {
      this.getUserCertification()
      this.getUserInfoOne()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
    font-weight: bold;
  }

  .my-label {
    padding-bottom: 8px;
  }
  .label-width {
    width: 120px;
  }
</style>
