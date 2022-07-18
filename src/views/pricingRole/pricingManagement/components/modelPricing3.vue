<template>
  <el-dialog title="服务定价设置" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row class="flex mb20 mt10">
      <div class="bold" style="width: 120px;">品类名称</div>
      <div>{{openRow.categoryName}}</div>
    </el-row>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">供应报价模式</div>
      <div>型号报价</div>
    </el-row>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">收取范围</div>
      <div>{{collectType==0?'按品类':collectType==1?'按供方型号':'按我方型号'}}</div>
    </el-row>
    <el-divider></el-divider>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">引用型号</div>
      <div>{{modelObj.modelName}}</div>
    </el-row>
    <el-divider></el-divider>
    <!-- 按品类 -->
    <el-row>
      <div class="bold mb20">型号服务费设置信息</div>
    </el-row>
    <el-row class="flex mb20">
      <div class="bold" style="width: 120px;">收取对象</div>
      <div>{{modelObj.targetObject=='supply'?'供方':'需方'}}</div>
    </el-row>
    <el-row class="flex mb20 flex-center">
      <div class="bold" style="width: 120px;">收取比例</div>
      <div class="flex flex-center">
        <el-input placeholder="请输入整数" v-model="collectRatio" style="width: 110px;"></el-input>
        <div>%</div>
      </div>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
   import { updateRatioOfType3 } from '@/api/pricingRoleApi/pricingManagement.js'
  export default {
    name: "index",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      /**
       * 收取类型
       * 0 按品类
       * 1 按供方型号
       * 2 按我方型号
       */
      collectType: {
        type: Number,
        default: 2,
      },
      modelObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        collectRatio: ''
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
        this.updateRatioOfType3()
      },
      // web-设置定价-按供方型号
      async updateRatioOfType3() {
        await updateRatioOfType3({
          modelGuId: this.modelObj.modelGuid,
          ratio: parseInt(this.collectRatio)
        }).then(res => {
          console.log(res);
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '设置成功!'
            });
            this.close()
            this.$emit('refresh')
          } else {
            this.$message({
              type: 'error',
              message: '设置失败!'
            });
          }
        })
      },
    },
    created() {
      this.collectRatio = this.modelObj.ratio
    }
  };
</script>

<style lang="scss" scoped>
</style>
