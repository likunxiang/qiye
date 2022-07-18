<template>
  <div class="">
    <div class="title-bg mb10">结算信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label1" label="账号名称">{{supplyObj.bankUserName}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label1" label="开户银行">{{supplyObj.bankName}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label1" label="银行账号">{{supplyObj.bankNo}}</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label1" label="银行地址">{{supplyObj.bankAddr}}</el-descriptions-item>
    </el-descriptions>
    <div class="title-bg mb10">结算信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label1" label="供应主体">{{supplyObj.supplyCompanyName}}
      </el-descriptions-item>
    </el-descriptions>
    <template v-if="supplyObj.modelName">
      <div class="title-bg mb10">型号信息</div>
      <el-descriptions :colon="false" class="margin-top" :column="1">
        <el-descriptions-item label-class-name="my-label1" label="型号名称">{{supplyObj.modelName}}</el-descriptions-item>
      </el-descriptions>
    </template>
    <div v-loading="loading">
      <div v-for="(item,index) in supplyObj.plate" :key='index'>
        <div class="title-bg mb10">{{item.name}}</div>
        <div v-for="(type,index) in item.type">
          <div class="mb10">| {{type.name}}</div>
          <div v-for="(field,index) in type.field">
            <div class="mb10 bold">{{field.name}}</div>
            <template v-if="field.operation < 4">
              <div class="mb10" v-for="(value,index) in field.value">{{value.key}}</div>
            </template>
            <template v-else>
              <template v-if="field.operation == 4">
                <div v-for="(value,index) in field.value" class="mb10 flex flex-center" style="flex-wrap: wrap;">
                  <el-image class="mr10 mb10" :preview-src-list="getImgUrl(value.key)"
                    style="width: 100px; height: 100px" v-for="(img,index) in getImgUrl(value.key)" :key="index"
                    :src="img"></el-image>
                </div>
              </template>
              <template v-if="field.operation == 5">
                <div v-for="(value,index) in field.value" class="mb10 flex flex-center" style="flex-wrap: wrap;">
                  <div class="mr10 mb10" >{{value.key}}</div>
                </div>
              </template>
            </template>


          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    getSupplydMessage
  } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
  export default {
    name: "index",
    props: {
      orderGuid: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        supplyObj: {},
        imgUrl: this.$store.state.basics.img_url_plate,
        loading: true,
      };
    },
    methods: {
      getImgUrl(str) {
        let imgArr = str.split(',')

        for (let i in imgArr) {
          imgArr[i] = this.imgUrl + imgArr[i]
        }
        return imgArr
      },
      // 需求信息
      async getSupplydMessage() {
        this.loding = true
        await getSupplydMessage({
          orderGuid: this.orderGuid
        }).then(res => {
          this.loading = false
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.supplyObj = data
          } else {
            this.supplyObj = {}
          }

        })
      },
    },
    created() {
      this.getSupplydMessage()
    }
  }
</script>

<style lang="scss">
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
    font-weight: bold;
  }

  .my-label1 {
    font-weight: bold;
  }
</style>
