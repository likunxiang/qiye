<template>
  <el-dialog title="查看实名认证信息" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row class="mb20">
      <el-table :data="tableData" border>
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
        <el-table-column prop="roleType" label="角色类型" align="center">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="title-bg mb10">账号信息</div>
      <el-row class="mb10">
        <div class="bold my-label">姓名</div>
        <div class="my-label">{{userInfo.realname}}</div>
      </el-row>
      <el-row class="mb10">
        <div class="bold my-label">证件类型</div>
        <div class="my-label">{{userInfo.ID_type}}</div>
      </el-row>
      <el-row class="mb10">
        <div class="bold my-label">证件号码</div>
        <div class="my-label">{{userInfo.ID_number}}</div>
      </el-row>
      <el-row class="mb10">
        <div class="bold my-label">证件生效日期</div>
        <div class="my-label">{{userInfo.effective_start_date}}</div>
      </el-row>
      <el-row class="mb10">
        <div class="bold my-label">证件失效日期</div>
        <div class="my-label">{{userInfo.effective_end_date}}</div>
      </el-row>
      <el-row class="mb10">
        <div class="bold my-label">签发机关</div>
        <div class="my-label">{{userInfo.issuance_organ}}</div>
      </el-row>
      <el-row class="mb10">
        <div class="bold my-label">证件证明</div>
        <div class="flex mb10">
          <el-image class="mr10" :preview-src-list="userInfo.imgArr" style="width: 100px; height: 100px" v-for="(img,index) in userInfo.imgArr" :key="index" :src="img" :fit="fit"></el-image>
        </div>
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delAutonym">删除认证信息</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    getUserCertification,
    deleteCertification
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
        tableData: [],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit: 'fit',
        userInfo: {},
        imgUrl: this.$store.state.basics.img_url_user_idcard
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
      delAutonym() {
        let msg = '确认删除账号' + this.row.nation + this.row.phonenumber + '的实名认证信息'
        this.$confirm(msg, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCertification()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async getUserCertification() {
        await getUserCertification(this.row.userId).then((res) =>{
          if (res.Tag.length) {
            this.userInfo = res.Tag[0].Table[0]
            this.userInfo.imgArr = this.userInfo.imgs.split(',')
            for (let i in this.userInfo.imgArr) {

                this.userInfo.imgArr[i] = this.imgUrl + this.userInfo.imgArr[i]

            }
            console.log(this.userInfo.imgArr);
          }

        })
      },
      async deleteCertification() {
        await deleteCertification(this.row.userId).then((res) => {
          if (res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      }
    },
    created() {
      this.getUserCertification()
      this.tableData.push(this.row)
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
</style>
