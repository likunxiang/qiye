<template>
  <el-dialog title="资质详情" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="flex flex-center mb10">
      <div class="my-label">品类名称1</div>
      <div>{{categoryName}}</div>
    </div>
    <div class="flex flex-center mb10">
      <div class="my-label">姓名</div>
      <div>{{row.userName}}</div>
    </div>
    <div class="flex flex-center mb10">
      <div class="my-label">区号</div>
      <div>{{row.nation}}</div>
    </div>
    <div class="flex flex-center mb10">
      <div class="my-label">联系电话</div>
      <div>{{row.phonenumber}}</div>
    </div>
    <div class="flex flex-center mb10">
      <div class="my-label">角色类型</div>
      <div>{{row.roleType}}</div>
    </div>
    <div v-for="(item,index) in tableData" :key='index'>
      <div class="title-bg mb10">{{item.name}}</div>
      <div v-for="(type,index) in item.type">
        <div class="mb10">{{type.name}}</div>
        <div v-for="(field,index) in type.field">
          <div class="mb10 bold">{{field.name}}</div>
          <template v-if="field.operation < 4">
            <div v-for="(value,index) in field.value">{{value.key}}</div>
          </template>
          <template v-else>
            <template v-if="field.operation == 4">
              <div v-for="(value,index) in field.value" class="mb10 flex flex-center" style="flex-wrap: wrap;">
                <el-image class="mr10 mb10" :preview-src-list="getImgUrl(value.key)" style="width: 100px; height: 100px"
                  v-for="(img,index) in getImgUrl(value.key)" :key="index" :src="img"></el-image>
              </div>
            </template>
            <template v-if="field.operation == 5">
              <div v-for="(value,index) in field.value" class="mb10 flex flex-center" style="flex-wrap: wrap;">
                <div class="mr10 mb10" v-for="(file,index) in getImgUrl(value.key)">{{file.key}}</div>
              </div>
            </template>
          </template>


        </div>
      </div>

    </div>
    <!-- 开始分类 -->
    <template v-if="status == '1' && approveFlag == '0'">
      <div class="title-bg mb10" style="text-align: center;">审批意见</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noPass">不通过</el-button>
        <el-button type="primary" @click="pass">通过</el-button>
      </span>
    </template>
    <template v-else-if="status == '2'">
      <div class="title-bg mb10" style="text-align: center;">审批意见</div>
      <div class="flex" style="justify-content: center;padding: 40px;">版本已过期，作废</div>
    </template>
    <template v-else-if="approveFlag == '1'">
      <div class="title-bg mb10" style="text-align: center;">审批意见</div>
      <div class="flex" style="justify-content: center;padding: 40px;">{{row.approveRemark}}</div>
    </template>
    <template v-else-if="approveFlag == '2'">
      <div class="title-bg mb10" style="text-align: center;">审批意见</div>
      <div class="flex" style="justify-content: center;padding: 40px;">{{row.approveRemark}}</div>
    </template>
  </el-dialog>
</template>

<script>
  import {
    getUserIntelligence,
    updateApprove
  } from '@/api/operationRoleApi/catDealManagement.js'
  export default {
    name: "index",
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      },
      categoryName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isOpen: true,
        tableData: [],
        status: '1', // 1-生效中，2-已过期
        approveFlag: '0', // 0-未审批，1-审批通过，2-审批不通过
        imgUrl: this.$store.state.basics.imgUrl
      };
    },
    methods: {
      // 尝试 把网页的字符串转成数组
      getImgUrl(str) {
        let imgArr = str.split(',')

        for (let i in imgArr) {
          imgArr[i] = this.imgUrl + imgArr[i]
        }
        return imgArr
      },

      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      pass() {
        this.updateApprove(1)
      },
      noPass() {
        this.updateApprove(2)
      },
      async getUserIntelligence() {
        await getUserIntelligence({
          qualificationUserGuid: this.row.qualificationGuid
        }).then(res => {
          console.log(res);
          let data = []
          if (res.Tag.length) {
            data = res.Tag[0].Table
          } else {
            data = []
          }
          this.tableData = data
        })
      },
      async updateApprove(status) {
        await updateApprove({
          qualificationUserGuid: this.row.qualificationGuid,
          approveFlag: status,
        }).then(res => {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.close()
            this.$emit('refresh')
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      }
    },
    created() {
      this.getUserIntelligence()
      this.status = this.row.status
      this.approveFlag = this.row.approveFlag
    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 120px;
    font-weight: bold;
  }

  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
    font-weight: bold;
  }
</style>
