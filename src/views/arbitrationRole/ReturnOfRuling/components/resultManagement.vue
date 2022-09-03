<template>
  <el-dialog title="成果管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div style="padding-bottom: 40px;">
      <div class="flex flex-center jsb mb10">
        <div style="width: 100%;" class="flex flex-center jsb">
          <div class="flex">
            <el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + resultObj.categoryImg" fit="fit"></el-image>
            <div>
              <div>{{resultObj.categoryName}}</div>
              <div>{{resultObj.categoryAlias}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex jsb">
        <div>采购编号：{{resultObj.orderNo}}</div>
        <div>日期：{{resultObj.orderNo}}</div>
      </div>
      <div v-for="(item,index) in resultObj.outcome" :key='index'>
        <template v-if="item.type=='1'">
          <el-divider></el-divider>
          <div class="content">
            <div class="mb10">{{item.createTime}}</div>
            <div class="flex" style="flex-wrap: wrap;">
              <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="url" fit="fit" v-for="(url,uIndex) in item.data" :key="uIndex"></el-image>
            </div>
          </div>
        </template>
        <template v-if="item.type=='2'">
          <el-divider></el-divider>
          <div class="content">
            <div class="mb10">{{item.createTime}}</div>
            <div>
              <div class="flex flex-center mb10" v-for="(url,uIndex) in item.data" :key="uIndex">
                <div class="mr20" style="text-decoration: underline;">{{url}}.doc</div>
                <el-button size="mini" @click="downFile">下载</el-button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { getOutcomeDetails } from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
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
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit: 'fit',
        resultObj: {},
        imgBasicUrl: this.$store.state.basics.img_url_cat
      };
    },
    methods: {
      async getOutcomeDetails() {
        await getOutcomeDetails({
          orderGuid: this.openRow.orderGuid,
		  curUserId: this.$store.state.user.adminId,
        }).then(res => {
          let data = res.Tag[0].Table[0]
          this.resultObj = data
        })
      },
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      downFile() {
        console.log('下载');
      }
    },
    created() {
      this.getOutcomeDetails()
    }
  };
</script>

<style lang="scss" scoped>
</style>
