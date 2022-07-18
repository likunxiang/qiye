<template>
  <el-dialog title="服务定价设置" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div v-loading="loading">
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
        <el-select v-model="form.chargeType" placeholder="" style="width: 140px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row class="flex mb20 flex-center">
        <div class="bold" style="width: 120px;">收取比例</div>
        <div class="flex flex-center" v-if="form.chargeType=='1'">
          <el-input placeholder="请输入整数" v-model="form.chargeValue" style="width: 140px;" type="number"></el-input>
          <div>%</div>
        </div>
        <div class="flex flex-center" v-else>
          <div>￥</div>
          <el-input placeholder="请输入整数" v-model="form.chargeValue" style="width: 140px;" type="number"></el-input>
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
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptionsStart" v-model="form.startDate"
          style="width: 140px;"></el-date-picker>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">终止时间</div>
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd" v-model="form.endDate"
          style="width: 140px;"></el-date-picker>
      </el-row>
      <el-divider></el-divider>
      <el-row class="mb20">
        <div class="bold" style="width: 120px;">更新说明</div>
        <el-input placeholder="请填写本次更新说明" v-model="form.remark" type="textarea"></el-input>
      </el-row>
      <el-row class="mb20">
        <div class="bold" style="width: 120px;">文件说明</div>
        <el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
          :on-change="preUploadImg" :http-request="uploadImg" :multiple="true" :on-success="handleAvatarSuccess">
          <div class="flex" style="flex-wrap: wrap;">
            <el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
              v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
            <div class="flex flex-center non-image">
              <div class="el-icon-plus" style="font-size: 36px;"></div>
            </div>
          </div>
        </el-upload>

      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    upLoadImgApi,
  } from '@/api/commonApi.js'
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  import {
    getAcctoMnMaxEndDate,
    insertAcctoMn,
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
    },
    data() {
      return {
        isOpen: true,
        loading: false,
        tableDataFirst: [],
        imgList: [], // 图片储存
        imgListShow: [], // 展示列表
        url: '',
        uploadUrl: '',
        imgBasicUrl: this.$store.state.basics.img_url_servicefee,
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
        pickerOptionsStart: this.disabledStart(),
        pickerOptionsEnd: this.disabledEnd(),
      };
    },
    methods: {
      disabledStart() {
        let that = this
        return {
          disabledDate(time) {
            return time.getTime() < (new Date(that.startDate).getTime() - 24*60*60*1000);
          }
        }
      },
      disabledEnd() {
        let that = this
        return {
          disabledDate(time) {
            return time.getTime() < (new Date(that.startDate).getTime());
          }
        }
      },
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      submit() {
        if (this.form.chargeValue && this.form.startDate && this.form.endDate && this.uploadUrl) {
          if (this.imgList.length > 0) {
            this.$refs.upload.submit();
          } else {
            this.insertAcctoMn()
          }

        } else {
          this.$message({
            type: 'error',
            message: '有信息没填或填写错误!'
          });
        }
      },
      // 获取最近最终
      async getAcctoMnMaxEndDate() {
        await getAcctoMnMaxEndDate({
          modelGuid: this.modelUpRow.modelGuid,
          curUserId: this.$store.state.user.adminId,
          page: 1,
          size: '20'
        }).then(res => {
          if (res.OK == 'True') {
            if (res.Tag.length > 0) {
              let maxEndDate = res.Tag[0].Table[0].maxEndDate
              this.form.startDate = maxEndDate
              console.log(new Date(maxEndDate).getTime());
              this.startDate = maxEndDate
            }
          }
        })
      },
      async insertAcctoMn() {
        this.loading = true
        await insertAcctoMn({
          categoryGuid: this.categoryRow.categoryGuid,
          modelGuid: this.modelUpRow.modelGuid,
          targetObject: 'demand',
          chargeType: this.form.chargeType,
          chargeValue: parseInt(this.form.chargeValue),
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          remark: this.form.remark,
          remarkImgs: this.uploadUrl || '',
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
              this.$refs.upload.clearFiles()
              this.imgList = []
              this.imgListShow = []
              // this.uploadUrl = []
            }
          }
        })
      },

      // 图片上传相关
      handleAvatarSuccess(res, file) {},
      preUploadImg(file, fileList) {
        this.imgList = fileList
        let imgList = fileList
        let arr = imgList.map(item => URL.createObjectURL(item.raw))
        let uploadUrl = imgList.map(item => item.name).join(',')
        this.uploadUrl = uploadUrl
        console.log(arr, uploadUrl);
        this.imgListShow = arr
      },
      // 正经上传图片
      async uploadImg(item) {
        console.log(item);
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        let FileName = item.file.name
        let FilePath = 'servicefee\\mn\\images'
        let data = base64File
        this.loading = true
        upLoadImgApi(data, FileName, FilePath).then(res => {
          if (res.OK == 'True') {
            this.step++
            if (this.step == this.imgList.length) {
              this.insertAcctoMn()
            }

          }
        })
      },
    },
    created() {
      this.tableDataFirst.push(this.modelRow)
      console.log(Date.now());

      this.getAcctoMnMaxEndDate()
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
