<template>
  <el-dialog title="签约" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body >
    <div v-loading="loading">
      <div>
        <el-row class="mb20 flex flex-center">
          <div class="label mr20">机构名称</div>
          <div>{{row.orgName}}</div>
        </el-row>
        <el-row class="mb20 flex">
          <div class="label mr20">领取日期</div>
          <div>{{row.orgCollectTime}}</div>
        </el-row>

      </div>
      <div style="height: 900px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-col :span="24">
            <div class="title-bg mb10">签约对象信息</div>
          </el-col>

          <el-col :span="18">
            <el-form-item label="机构名称">
              {{row.orgName}}
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="机构地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请填写合同上的机构地址" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="法定代表人" prop="legal">
              <el-input v-model="ruleForm.legal" placeholder="请填写合同上的法定代表人姓名" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="合同联系人" prop="linkman">
              <el-input v-model="ruleForm.linkman" placeholder="请填写合同上的联系人姓名" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="国家/地区">
              中国大陆
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请填写合同上的电话" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="title-bg mb10">签约合作信息</div>
          </el-col>

          <el-col :span="18">
            <el-form-item label="合同编号" prop="contractNumber">
              <el-input v-model="ruleForm.contractNumber" placeholder="请填写合同上的合同编号" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="合同起始日期" prop="contractStart">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.contractStart" value-format="yyyy-MM-dd"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="合同时长" prop="contractTime">
              <el-select v-model="ruleForm.contractTime" placeholder="请选择">
                <el-option v-for="item in contractTimeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="合同终止日期" prop="contractEnd">
              <el-input v-model="contractEnd" placeholder="由合同起始日期+合作时长" maxlength="30" readonly />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="上传文件" prop="efiles">
              <el-upload style="text-align: left !important;" ref="upload" class="upload-demo" action=""
                :on-preview="handlePreview" :accept="accptSting" :on-remove="handleRemove" :on-change="changeFile"
                :before-remove="beforeRemove" show-file-list :on-success="uploadSuccess" multiple
                :http-request="uploadFile" :limit="1" :on-progress="uploading" :on-exceed="handleExceed"
                :auto-upload="false" :before-upload="beforeUpload" :file-list="fileList">
                <div style="text-align: left !important;">
                  <el-button size="small" type="primary">上传合同电子档案</el-button>
                  <div>请将合同每个页面按照页数标号，拍照后，编写对应页码，压缩成合同包上传。文档命名格式：供方接单服务合作协议（机构名称）</div>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>

        </el-form>

      </div>

    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    insertFirstSign,  // 签约
    getSignDetail, // 获取签约详情
    inserAgainSign, // 续约
  } from '@/api/choseAttacheApi/choseAttacheCom.js'
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  import {
    upLoadImgApi,
  } from '@/api/commonApi.js'
  export default {
    name: "index",
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      },
      signStatus: {
        type: String,
        default: '1'
      },
      sginGuid: {
        type: String,
        default: ''
      }
    },
    computed: {
      contractEnd() {
        if (this.signStatus == '2') {
          if (this.ruleForm.contractStart && this.ruleForm.contractTime) {
            let contractStart = this.oldEndDate.split('-')
            this.ruleForm.contractEnd = parseInt(contractStart[0]) + parseInt(this.ruleForm.contractTime) + '-' +
              contractStart[1] + '-' + contractStart[2]
            return parseInt(contractStart[0]) + parseInt(this.ruleForm.contractTime) + '-' + contractStart[1] + '-' +
              contractStart[2]
          } else {
            return ''
          }
        } else {
          if (this.ruleForm.contractStart && this.ruleForm.contractTime) {
            let contractStart = this.ruleForm.contractStart.split('-')
            this.ruleForm.contractEnd = parseInt(contractStart[0]) + parseInt(this.ruleForm.contractTime) + '-' +
              contractStart[1] + '-' + contractStart[2]
            return parseInt(contractStart[0]) + parseInt(this.ruleForm.contractTime) + '-' + contractStart[1] + '-' +
              contractStart[2]
          } else {
            return ''
          }
        }




      }
    },
    data() {
      return {
        isOpen: true,
        ruleForm: {
          address: '',
          legal: '',
          linkman: '',
          phone: '',
          contractNumber: '',
          contractStart: '',
          contractTime: '',
          contractEnd: this.contractEnd,
          efiles: '',
        },
        rules: {
          address: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          legal: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          linkman: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          phone: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          contractNumber: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          contractStart: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          contractTime: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          contractEnd: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          efiles: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
        },
        contractTimeList: [{
          value: 1,
          label: '1年',
        }, {
          value: 2,
          label: '2年',
        }, {
          value: 3,
          label: '3年',
        }, {
          value: 4,
          label: '4年',
        }, {
          value: 5,
          label: '5年',
        }],
        fileList: [], // 上传文件列表
        loading: false, // 上传文件提示
        accptSting: '.rar, .zip', // 文件类型限制
        oldEndDate: '', // 老合同的结束日期
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            this.$confirm(
              '<p align="left">机构首次注册接单管理系统前，需要该合同中的【机构名称】+【联系电话】作为身份验证。请确保内容正确，以免身份验证不成功，导致注册不了。',
              '', {
                confirmButtonText: '保存',
                dangerouslyUseHTMLString: true,
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                //
                this.submitUpload()
            }).catch(() => {});

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 上传文件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        if (file && file.status === "success") {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }


      },
      // 检验文件类型
      beforeUpload(file) {
        console.log(9999, file);

        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        console.log('testmsg', testmsg);
        const extension = testmsg === 'rar'
        const extension2 = testmsg === 'zip'
        // 限制文件大小
        const isLt100M = file.size / 1024 / 1024 < 100

        if (!extension && !extension2) {
          this.$message({
            message: '上传文件只能上传rar、zip格式!',
            type: 'warning'
          });
          return extension || extension2
        }
        if (!isLt100M) {
          this.$message({
            message: '上传文件大小不能超过 100MB!',
            type: 'warning'
          });
          return isLt100M
        }
        return extension || extension2 || isLt100M




      },
      uploading() {
        console.log(888);
        const loading = this.$loading({
          lock: true,
          text: '文件上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.loadingPop = loading
      },
      uploadSuccess(response, file, fileList) {
        // this.insertFirstSign()
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // 选择文件
      changeFile(file, fileList) {
        console.log(file);
        this.fileList = fileList
        this.ruleForm.efiles = this.fileList[0].name
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList
      },
      // 正经上传文件
      async uploadFile(item) {
        console.log(item);
        this.loading = true
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        // getNewId().then(res => {
        //   console.log(res);
        //   let guid = res
        //   this.fileNameGuid = res
        //   let FileName = res + '.csv'
        //   let FilePath = 'plate\\files\\'
        //   let data = base64File
        //   upLoadImgApi(data, FileName, FilePath).then(res => {
        //     if (res.OK == 'True') {
        //       this.web_guide_upload_phone()
        //     }
        //   })
        // })
        let FileName = item.file.name
        let FilePath = 'org\\sign\\images\\'
        let data = base64File
        this.loading = true
        upLoadImgApi(data, FileName, FilePath).then(res => {
          // this.loading = false
          console.log(res);
          if (res.OK == 'True') {
            this.$message({
              type: 'success',
              message: res.Message
            })
            if (this.signStatus == '2') {
              this.inserAgainSign()
            } else {
              this.insertFirstSign()
            }
            // this.$emit('refresh')
            // this.close()
          } else {
            this.$message({
              type: 'error',
              message: res.Message
            })
          }
        })

      },
      submitUpload() {
        console.log(111);
        this.$refs.upload.submit();
        console.log(222);
      },

      //
      async insertFirstSign() {
        await insertFirstSign({
          orgCollectGuid: this.row.orgCollectGuid,
          orgValidGuid: this.row.orgValidGuid,
          orgNameGuid: this.row.orgNameGuid,
          orgName: this.row.orgName,
          orgAddr: this.ruleForm.address,
          legalPerson: this.ruleForm.legal,
          contractPhonePerson: this.ruleForm.linkman,
          contractPhone: this.ruleForm.phone,
          contractNation: '中国大陆',
          contractNo: this.ruleForm.contractNumber,
          startDate: this.ruleForm.contractStart,
          endDate: this.ruleForm.contractEnd,
          contractDuration: this.ruleForm.contractTime * 12, // 转成月份
          efiles: this.fileList.length > 0 ? this.fileList[0].name : '',
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if (res.OK == 'True') {
            this.loading = false
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('refreshList')
              this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }
          }
        })
      },
      // 获取签约详情
      async getSignDetail() {
        this.loading = true
        await getSignDetail({
          orgSignGuid: this.sginGuid,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          this.loading = false
          if (res.OK == 'True') {
            let data = res.Tag[0].Table[0]
            this.ruleForm.address = data.orgAddr
            this.ruleForm.legal = data.legalPerson
            this.ruleForm.linkman = data.contractPhonePerson
            this.ruleForm.phone = data.contractPhone
            this.ruleForm.contractStart = this.getNewDay(data.endDate,1)
            this.oldEndDate = data.endDate
          }
        })
      },
      // 提交续签数据
      async inserAgainSign() {
        await inserAgainSign({
          orgCollectGuid: this.row.orgCollectGuid,
          orgValidGuid: this.row.orgValidGuid,
          orgNameGuid: this.row.orgNameGuid,
          orgName: this.row.orgName,
          orgAddr: this.ruleForm.address,
          legalPerson: this.ruleForm.legal,
          contractPhonePerson: this.ruleForm.linkman,
          contractPhone: this.ruleForm.phone,
          contractNation: '中国大陆',
          contractNo: this.ruleForm.contractNumber,
          startDate: this.ruleForm.contractStart,
          endDate: this.ruleForm.contractEnd,
          contractDuration: this.ruleForm.contractTime * 12, // 转成月份
          efiles: this.fileList.length > 0 ? this.fileList[0].name : '',
          curUserId: this.$store.state.user.adminId,
          lastEndDate: this.oldEndDate
        }).then(res => {
          if (res.OK == 'True') {
            this.loading = false
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.$emit('refreshList')
              this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              });
            }
          }
        })
      }
    },
    created() {
      if(this.signStatus == '2') {
        this.getSignDetail()
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
    font-weight: bold;
  }
</style>
