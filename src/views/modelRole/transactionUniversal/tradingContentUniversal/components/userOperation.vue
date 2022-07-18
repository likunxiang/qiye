<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-row>
        <el-descriptions border :column="1" size="medium">
          <el-descriptions-item label="品类名称">{{categoryName}}</el-descriptions-item>
          <el-descriptions-item label="板块名称">{{fieldObj.plateName}}</el-descriptions-item>
          <el-descriptions-item label="板块类型">{{fieldObj.plateTypeName}}</el-descriptions-item>
          <el-descriptions-item label="字段名称">{{fieldObj.plateFieldName}}</el-descriptions-item>
          <el-descriptions-item label="字段名称来源">{{fieldObj.plateFieldSource=="1"?'固化':'自建'}}</el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-row>
        <p><span class="bold mr20">内容来源设置</span>
          <span>{{contentSources}}</span>
        </p>
      </el-row>

      <!-- demand -->
      <el-row v-if="fieldObj.catTreeCode=='demand'">
        <!-- 需方需方需方 -->
        <el-row>
          <el-row v-if="fieldObj.plateFieldContentSource == 0">
            <!-- 未设置 -->
          </el-row>
          <el-row v-else-if="fieldObj.plateFieldContentSource == 1">
            <el-row>
              <p class="bold">请选择</p>
            </el-row>
            <!-- 固化 -->

            <el-radio-group v-model="radioDemander">
              <el-row class="mb10">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
              </el-row>
            </el-radio-group>
          </el-row>
          <el-row v-else-if="fieldObj.plateFieldContentSource == 2">
            <el-row>
              <p class="bold">请选择</p>
            </el-row>
            <!-- 自建 -->
            <el-radio-group v-model="radioDemander">
              <el-row>
                <el-radio :label="item.id" v-for="(item,index) in demanderList" :key="index">{{item.name}}</el-radio>
              </el-row>
            </el-radio-group>
          </el-row>
          <!-- 需方 -->
          <el-row v-else-if="fieldObj.plateFieldContentSource == 3 || fieldObj.plateFieldContentSource == 3 ">
            <el-row>
              <p class="bold">请选择</p>
            </el-row>
            <el-radio-group v-model="radioDemander" @change="changeRadioDemander">
              <el-row class="mb10">
                <el-radio :label="3">填写</el-radio>
                <el-radio :label="4">图片上传</el-radio>
                <el-radio :label="5">文档上传</el-radio>
              </el-row>
            </el-radio-group>
            <el-input type="textarea" placeholder="请输入需要需方填写或者上传时的注意要点" v-model="inputDemander">
            </el-input>
            <!-- 是否能上传文档 -->
            <div v-if="radioDemander>3">
              <el-row>
                <p class="bold">是否需要下载待传图片/文件模板</p>
              </el-row>
              <el-row>
                <el-radio-group v-model="radioDown">
                  <el-row class="mb10">
                    <el-radio :label="1">否</el-radio>
                    <el-radio :label="2">是</el-radio>
                  </el-row>
                </el-radio-group>
                <div>
                  <el-upload ref="upload" class="upload-demo" action="" :on-preview="handlePreview" :accept="accptSting"
                    :on-remove="handleRemove" :on-change="changeFile" :before-remove="beforeRemove" show-file-list :on-success="uploadSuccess"
                    multiple :http-request="uploadFile" :limit="1" :on-progress="uploading" :on-exceed="handleExceed"
                    :auto-upload="false" :before-upload="beforeUpload" :file-list="fileList">
                    <el-button size="small" type="primary" slot="tip" :disabled="true" v-if="radioDown!=2">点击上传</el-button>
                    <el-button size="small" type="primary" v-else>点击上传</el-button>
                  </el-upload>
                </div>
              </el-row>
            </div>
          </el-row>

          <!-- supply -->
          <el-row v-else>
            <el-row>
              <p class="bold">请选择</p>
            </el-row>
            <!-- 供方/需方 -->
            <!-- 自建和固化可选内容不同 -->
            <el-row v-if="fieldObj.plateFieldSource=='1'">
              <el-radio-group v-model="radioDemander">
                <el-row class="mb10">
                  <el-radio :label="3">填写</el-radio>
                </el-row>
              </el-radio-group>
              <el-input type="textarea" placeholder="请输入需方填写时的注意点或者提示语" v-model="inputDemander"></el-input>
            </el-row>
            <el-row v-else>
              <el-radio-group v-model="radioDemander" @change="changeRadioDemander">
                <el-row class="mb10">
                  <el-radio :label="3">填写</el-radio>
                  <el-radio :label="4">图片上传</el-radio>
                  <el-radio :label="5">文档上传</el-radio>
                </el-row>
              </el-radio-group>
              <el-input type="textarea" placeholder="请输入需要需方填写或者上传时的注意要点"
                v-model="inputDemander"></el-input>
              <!-- 是否能上传文档 -->
              <div v-if="radioDemander>3">
                <el-row>
                  <p class="bold">是否需要下载待传图片/文件模板</p>
                </el-row>
                <el-row>
                  <el-radio-group v-model="radioDown">
                    <el-row class="mb10">
                      <el-radio :label="1">否</el-radio>
                      <el-radio :label="2">是</el-radio>
                    </el-row>
                  </el-radio-group>
                  <div>
                    <el-upload ref="upload" class="upload-demo" action="" :on-preview="handlePreview" :accept="accptSting"
                      :on-remove="handleRemove" :on-change="changeFile" :before-remove="beforeRemove" show-file-list :on-success="uploadSuccess"
                      multiple :http-request="uploadFile" :limit="1" :on-progress="uploading" :on-exceed="handleExceed"
                      :auto-upload="false" :before-upload="beforeUpload" :file-list="fileList">
                      <el-button size="small" type="primary" slot="tip" :disabled="true" v-if="radioDown!=2">点击上传</el-button>
                      <el-button size="small" type="primary" v-else>点击上传</el-button>
                    </el-upload>
                  </div>
                </el-row>
              </div>
            </el-row>
          </el-row>
        </el-row>
      </el-row>
      <!-- supply -->
      <el-row v-else>
        <el-row v-if="fieldObj.plateFieldContentSource == 0">
          <!-- 未设置 -->
        </el-row>

        <el-row v-if="bizType == '1'">
          <el-row v-if="fieldObj.plateFieldSource == '1'">
            <el-row v-if="fieldObj.plateFieldContentSource == 3">
              <el-radio-group v-model="radioDemander">
                <el-row class="mb10">
                  <el-radio :label="1">单选</el-radio>
                  <el-radio :label="2">多选</el-radio>
                </el-row>
              </el-radio-group>
            </el-row>
            <el-row v-else-if="fieldObj.plateFieldContentSource == 4">
              <el-radio-group v-model="radioDemander">
                <el-row class="mb10">
                  <el-radio :label="3">填写</el-radio>
                </el-row>
              </el-radio-group>
              <el-input type="textarea" placeholder="请输入需方填写时的注意点或者提示语" v-model="inputDemander"></el-input>
            </el-row>
          </el-row>

          <el-row v-if="fieldObj.plateFieldSource == '2'">
            <el-row v-if="fieldObj.plateFieldContentSource == 3">
              <el-radio-group v-model="radioDemander">
                <el-row class="mb10">
                  <el-radio :label="1">单选</el-radio>
                  <el-radio :label="2">多选</el-radio>
                </el-row>
              </el-radio-group>
            </el-row>
          </el-row>

        </el-row>
        <el-row v-if="bizType == '2'">
          <el-row v-if="fieldObj.plateFieldContentSource == 1 || fieldObj.plateFieldContentSource == 2">
            <el-radio-group v-model="radioDemander">
              <el-row class="mb10">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
              </el-row>
            </el-radio-group>
          </el-row>
          <el-row v-else-if="fieldObj.plateFieldContentSource == 4">
            <el-radio-group v-model="radioDemander" @change="changeRadioDemander">
              <el-row class="mb10">
                <el-radio :label="3">填写</el-radio>
                <el-radio :label="4">图片上传</el-radio>
                <el-radio :label="5">文档上传</el-radio>
              </el-row>
            </el-radio-group>
            <el-input type="textarea" placeholder="请输入需要需方填写或者上传时的注意要点" v-model="inputDemander">
            </el-input>
            <!-- 是否能上传文档 -->
            <div v-if="radioDemander>3">
              <el-row>
                <p class="bold">是否需要下载待传图片/文件模板</p>
              </el-row>
              <el-row>
                <el-radio-group v-model="radioDown">
                  <el-row class="mb10">
                    <el-radio :label="1">否</el-radio>
                    <el-radio :label="2">是</el-radio>
                  </el-row>
                </el-radio-group>
                <div>
                  <el-upload ref="upload" class="upload-demo" action="" :on-preview="handlePreview" :on-success="uploadSuccess"
                    :on-remove="handleRemove" :on-change="changeFile" :before-remove="beforeRemove" show-file-list
                    multiple :http-request="uploadFile" :limit="1" :on-progress="uploading" :accept="accptSting"
                    :on-exceed="handleExceed" :auto-upload="false" :before-upload="beforeUpload" :file-list="fileList">
                    <el-button size="small" type="primary" slot="tip" :disabled="true" v-if="radioDown!=2">点击上传</el-button>
                    <el-button size="small" type="primary" v-else>点击上传</el-button>
                  </el-upload>
                </div>
              </el-row>
            </div>
          </el-row>
        </el-row>



        <el-row v-if="bizType == '3'">
          <el-row v-if="fieldObj.plateFieldContentSource == 3">
            <el-radio-group v-model="radioDemander">
              <el-row class="mb10">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
              </el-row>
            </el-radio-group>
          </el-row>
        </el-row>


      </el-row>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitDemander" :disabled="!radioDemander">确 定</el-button>
    </span>

    <batchImport v-if="isImport"></batchImport>
  </el-dialog>
</template>

<script>
  import {
    setSDOperation,
  } from '@/api/modelRoleApi/tradingContent.js'
  import {
    upLoadImgApi,
    getNewId,
    getFileProgress,
    getUploadResult
  } from '@/api/commonApi.js'
  import batchImport from '@/views/modelRole/tradingContent/components/batchImport.vue' // 批量导入
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  export default {
    name: "index",
    props: {
      type: {
        type: String,
        default: 'demand'
      },
      categoryName: {
        type: String,
        default: ''
      },
      fieldObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      bizType: {
        type: String,
        default: '1'
      }
    },
    components: {
      batchImport
    },
    data() {
      return {
        isOpen: true,
        isImport: false,
        title: '',
        contentSources: '',
        radioDemander: 0,
        radioDown: 0, // 是否需要下载待传文件模板
        inputDemander: '', // 填写内容
        demanderList: [{
          id: 1,
          name: '单选'
        }, {
          id: 2,
          name: '多选'
        }, ],
        fileList: [], // 上传文件列表
        loading: false, // 上传文件提示
        accptSting: '', // 文件类型限制
      };
    },
    methods: {
      changeRadioDemander() {
        this.fileList = []
        this.radioDown = 0
        if (this.radioDemander > 3) {
          if (this.radioDemander == 4) {
            this.accptSting= ".png, .jpeg, .jpg, .gif, .doc, .docx, .xls, .xlsx, .ppt, .pdf, .zip, .rar, .7z, .txt, .csv"
          } else if (this.radioDemander == 5) {
            this.accptSting= ".doc, .docx, .xls, .xlsx, .ppt, .pdf, .zip, .rar, .7z, .txt, .csv"
          }
        } else {
          this.accptSting = ''
        }
        console.log('accptSting',this.accptSting);
      },
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      submitDemander() {
        if ((this.fieldObj.operation == this.radioDemander) && (this.fieldObj.placeholder == this.inputDemander) && !this.fileList.length > 0) {
          this.close()
        } else {
          if (this.radioDown == 2 && this.radioDemander > 3) {
            if (!this.fileList.length) {
              this.$message({
                type: 'error',
                message: '请选择上传文件/图片'
              })
            } else {
              // this.setSDOperation()
              this.submitUpload()
            }
          } else {
            this.setSDOperation()
          }
        }

      },
      async setSDOperation() {
        let placeholder = ''
        placeholder = this.inputDemander
        await setSDOperation({
          plateFieldGuid: this.fieldObj.plateFieldGuid,
          operation: this.radioDemander,
          placeholder: placeholder,
          content: this.fileList.length > 0? this.fileList[0].name: ''
        }).then(res => {
          this.loading = false
          if (res.Tag[0] > 0) {
            // this.$message({
            //   type: 'success',
            //   message: '操作成功',
            // })
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败',
            })
          }

        })

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
        console.log(9999,file);

        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        console.log('testmsg', testmsg);
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const extension3 = testmsg === 'doc'
        const extension4 = testmsg === 'docx'
        const extension9 = testmsg === 'ppt'
        const extension10 = testmsg === 'pdf'
        const extension11 = testmsg === 'zip'
        const extension12 = testmsg === 'rar'
        const extension13 = testmsg === '7z'
        const extension14 = testmsg === 'txt'
        const extension15 = testmsg === 'csv'
        const extension5 = testmsg === 'png'
        const extension6 = testmsg === 'jpeg'
        const extension7 = testmsg === 'jpg'
        const extension8 = testmsg === 'gif'
        // 限制文件大小
        const isLt3M = file.size / 1024 / 1024 < 3
        const isLt50M = file.size / 1024 / 1024 < 50
        if (this.radioDemander == 4) {
          if (!extension5 && !extension6 && !extension7 && !extension8 && !extension && !extension2 && !extension3 && !extension4 && !extension9 && !extension10 && !extension11 && !extension12 && !extension13 && !extension14 && !extension15) {
            this.$message({
              message: '上传图片只能上传png、jpeg、jpg、gif、doc、docx、xls、xlsx、ppt、pdf、zip、rar、7z、txt、csv格式!',
              type: 'warning'
            });
            return extension5 || extension6 || extension7 || extension8 || extension || extension2 || extension3 || extension4 || extension9 || extension10 || extension11 || extension12 || extension13 || extension14 || extension15
          }
          if (!isLt50M) {
            this.$message({
              message: '上传文件大小不能超过 50MB!',
              type: 'warning'
            });
            return isLt50M
          }
          return extension5 || extension6 || extension7 || extension8 || extension || extension2 || extension3 || extension4 || extension9 || extension10 || extension11 || extension12 || extension13 || extension14 || extension15 || isLt50M
        } else if (this.radioDemander == 5) {
          if (!extension && !extension2 && !extension3 && !extension4 && !extension9 && !extension10 && !extension11 && !extension12 && !extension13 && !extension14 && !extension15) {
            this.$message({
              message: '上传文件只能上传doc、docx、xls、xlsx、ppt、pdf、zip、rar、7z、txt、csv格式!',
              type: 'warning'
            });
            return extension || extension2 || extension3 || extension4 || extension9 || extension10 || extension11 || extension12 || extension13 || extension14 || extension15
          }
          if (!isLt50M) {
            this.$message({
              message: '上传文件大小不能超过 50MB!',
              type: 'warning'
            });
            return isLt50M
          }
          return extension || extension2 || extension3 || extension4 || extension9 || extension10 || extension11 || extension12 || extension13 || extension14 || extension15 || isLt50M

        }




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
        this.setSDOperation()
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // 选择文件
      changeFile(file, fileList) {
        console.log(file);
        this.fileList = fileList
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
        let FilePath = 'plate\\files\\'
        let data = base64File
        upLoadImgApi(data, FileName, FilePath).then(res => {
          // this.loading = false
          console.log(res);
          if (res.OK == 'True') {
            this.$message({
              type: 'success',
              message: res.Message
            })
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
        this.$refs.upload.submit();
      },
    },
    created() {
      console.log(this.fieldObj);
      this.radioDemander = parseInt(this.fieldObj.operation)
      if (this.type == "demand") {
        this.title = "需方操作设置"

      } else {
        this.title = "供方操作设置"
      }
      if (this.fieldObj.plateFieldContentSource == "0") {
        this.contentSources = '未设置'
      } else if (this.fieldObj.plateFieldContentSource == "1") {
        this.contentSources = '固化'
      } else if (this.fieldObj.plateFieldContentSource == "2") {
        this.contentSources = '自建'
      } else if (this.fieldObj.plateFieldContentSource == "3") {
        this.contentSources = '需方'
      } else {
        this.contentSources = '供方'
      }
      console.log(this.fieldObj);
      this.inputDemander = this.fieldObj.placeholder
      this.changeRadioDemander()
    }
  };
</script>

<style lang="scss" scoped>
</style>
