<template>
  <el-dialog title="服务定价设置" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div v-loading="loading" style="padding-bottom: 40px;">
      <el-table :data="tableDataFirst" border>
        <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册日期" align="center"></el-table-column>
        <el-table-column prop="addCatTime" label="品类添加日期" align="center"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类类型</div>
        <div>{{categoryRow.cattypeName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类名称</div>
        <div>{{categoryRow.categoryName}}</div>
      </el-row>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">收取范围</div>
        <div>按型号名称</div>
      </el-row>
      <el-divider></el-divider>
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">型号名称</div>
        <div>{{modelUpRow.modelName}}</div>
      </el-row>
      <el-divider></el-divider>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">收取对象</div>
        <div>需方</div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">收取方式</div>
        <el-select v-model="form.chargeType" placeholder="" style="width: 140px;" :disabled="true">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row class="flex mb20 flex-center">
        <div class="bold" style="width: 120px;">收取比例</div>
        <div class="flex flex-center" v-if="form.chargeType=='1'">
          <el-input placeholder="请输入整数" v-model="form.chargeValue" style="width: 140px;" :disabled="true"></el-input>
        </div>
        <div class="flex flex-center" v-else>
          <el-input placeholder="请输入整数" v-model="form.chargeValue" style="width: 140px;" :disabled="true"></el-input>
        </div>
      </el-row>
      <el-row class="mb20">
        <div v-if="form.chargeType=='1'">
          提示：这个型号的采购费用=供方的服务定价基数*采购数量+供方的服务定价基数*收取数值*采购数量
        </div>
        <div v-else>
          提示：这个型号的采购费用=供方的服务定价基数*采购数量+收取数值*采购数量
        </div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">起始时间</div>
        <div>{{form.startDate}}</div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">终止时间</div>
        <div>{{form.endDate}}</div>
      </el-row>
      <el-divider></el-divider>
      <el-row class="mb20">
        <div class="bold" style="width: 120px;">更新说明</div>
        <el-input placeholder="请填写本次更新说明" v-model="form.remark" type="textarea" :disabled="true"></el-input>
      </el-row>
      <el-row class="mb20">
        <div class="bold" style="width: 120px;">文件说明</div>
        <el-image class="mr10" style="width: 100px; height: 100px" v-for="(img,index) in thirdImgs" :key='index'
          :src="img" fit="fit"></el-image>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getAcctoMnPersModelDetail
  } from '@/api/pricingRoleApi/pricingManagement.js'
  export default {
    name: "index",
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      modelRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      categoryRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      modelUpRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      serviceRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        loading: false,
        tableDataFirst: [],
        imgBasicUrl: this.$store.state.basics.img_url_servicefee,
        thirdImgs: [],
        step: 0, // 用于判断图片是否传完
        form: {
          chargeType: '1',
          chargeValue: '',
          startDate: '',
          endDate: '',
          remark: '',
          remarkImgs: ''
        },
        startDate: '',
        options: [{
            label: '按比例',
            value: '1'
          },
          {
            label: '按金额',
            value: '2'
          },
        ],
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
      async getAcctoMnPersModelDetail() {
        await getAcctoMnPersModelDetail({
          serviceFeeMnGuid: this.serviceRow.serviceFeeMnGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == "True") {
            let data = res.Tag[0].Table[0]
            this.form.chargeType = data.chargeType=='按比例'?'1':'2'
            this.form.chargeValue = data.chargeValue
            this.form.startDate = data.startDate
            this.form.endDate = data.endDate
            this.form.remark = data.remark
            if (data.remarkFiles.length > 0) {
              let imgArr = data.remarkFiles.split(',')
              let imgArrUrl = imgArr.map(item => this.imgBasicUrl + item)
              this.thirdImgs = imgArrUrl
            } else {
              this.thirdImgs = []
            }
          }
        })
      }

    },
    created() {
      this.tableDataFirst.push(this.modelRow)
      this.getAcctoMnPersModelDetail()
    }
  };
</script>

<style lang="scss" scoped>
  .non-image {
    width: 100px;
    height: 100px;
    justify-content: center;
    background-color: #F5F7FA;
  }
</style>
