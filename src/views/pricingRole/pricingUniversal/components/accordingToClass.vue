<template>
  <el-dialog title="服务定价设置" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div v-loading="loading">
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类类型</div>
        <div>{{openRow.categoryName}}</div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">收取范围</div>
        <div>{{collectType==0?'按品类':collectType==1?'按供方型号':'按我方型号'}}</div>
      </el-row>
      <el-divider></el-divider>
      <!-- 按品类 -->
      <el-row>
        <div class="bold mb20">型号服务费设置信息</div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">收取对象</div>
        <div>{{targetObject == 'supply'?'供方':'需方'}}</div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">收取方式</div>
        <div>按比例</div>
      </el-row>
      <el-row class="flex mb20 flex-center">
        <div class="bold" style="width: 120px;">收取比例</div>
        <div class="flex flex-center">
          <el-input placeholder="请输入整数" v-model="collectRatio" style="width: 110px;" type="number"></el-input>
          <div>%</div>
        </div>
      </el-row>
      <el-row>
        提示：在供方的服务定价基数上加服务费，即服务费=采购数量（购买数量）*收取比例*服务定价基数

                 供方的结算款=采购数量（购买数量）*服务定价基数
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!collectRatio.trim()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
   import { getDetailOfType1,insertRatioOfType1 } from '@/api/pricingRoleApi/pricingManagement.js'
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
        default: 0,
      },
    },
    data() {
      return {
        isOpen: true,
        targetObject: '',
        collectRatio: '',
        loading: true,
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
        this.insertRatioOfType1()
      },
      // web-设置定价-按品类
      async insertRatioOfType1() {
        await insertRatioOfType1({
          categoryGuid: this.openRow.categoryGuid,
          ratio: parseInt(this.collectRatio)
        }).then(res => {
          console.log(res);
          if(res.Tag[0]>0) {
            this.$message({
              type: 'success',
              message: '设置成功!'
            });
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '设置失败!'
            });
          }
        })
      },
      // 按品类
      async getDetailOfType1() {
        await getDetailOfType1({
          categoryGuid: this.openRow.categoryGuid
        }).then(res => {
          this.loading = false
          console.log(res);
          if(res.Tag.length) {
            let data = res.Tag[0].Table[0]
            this.collectRatio = data.ratio
            this.targetObject = data.targetObject
          }
        })
      },
    },
    created() {
      this.getDetailOfType1()
    }
  };
</script>

<style lang="scss" scoped>
</style>
