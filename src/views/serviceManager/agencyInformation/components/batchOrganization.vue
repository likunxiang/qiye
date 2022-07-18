<template>
  <el-dialog title="批量新建服务对象" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row class="mt10 pb20 flex flex-center">
      <div style="flex-shrink: 0;margin-right: 20px;width: 60px;">国家/地区</div>
      <div>{{nation}}</div>
    </el-row>
    <el-divider></el-divider>
    <div class="flex mb20">
      <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-change="changeFile"
        :http-request="uploadFile" :on-remove="handleRemove" :file-list="fileList" :on-exceed="handleExceed"
        :limit="1" accept=".csv" :before-upload="beforeUpload" :auto-upload="false" :multiple="false">
        <el-button slot="trigger" type="primary">添加上传文件</el-button>
        <el-button type="primary" @click="openImportModel" class="ml10"><a :href="downloadFileUrl" download="w3logo">下载上传文件模板</a></el-button>
      </el-upload>

    </div>


    <el-row class="mb10">
      关联对象路径
    </el-row>
    <orgPathTree @getPathOrg="getPathOrg"></orgPathTree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="!fileList.length > 0">保存</el-button>
    </span>

    <!-- 进度条 -->
    <progressCom v-if="isProgress" :progressValue="progressValue"></progressCom>

    <progressResult v-if="isProgressResult" :result="proResult" @close="closeProgressResult"></progressResult>

  </el-dialog>
</template>

<script>
  import orgPathTree from '@/views/serviceManager/agencyInformation/components/orgPathTree'
  import progressCom from '@/views/components/common/progress.vue'
  import progressResult from '@/views/components/common/progressResult.vue'
  import {
    orgInsertOrgName,
    web_addByFileForNM
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  import {
    upLoadImgApi,
    getNewId,
    getFileProgress_service,
    getUploadResult_service
  } from '@/api/commonApi.js'
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  export default {
    name: "index",
    components: {
      orgPathTree,
      progressCom,
      progressResult
    },
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
        fieldObj: {
          content: ''
        },
        newFieldList: [],
        userPathGuid: '-1',
        nation: '中国大陆（+86）',
        downloadFileUrl: process.env.VUE_APP_BASE_URL_ASSETS + "/Enclosure/服务对象名单模板.csv", // 下载模板地址
        fileList: [],
        timer: '',
        value: 0,
        isProgress: false,
        progressValue: 0,
        isProgressResult: false,
        proResult: '', // 上传结果
        fileNameGuid: '', // 上传文件的uuid
      };
    },
    methods: {
      handlePreview(file) {
        console.log(file);
      },
      // 把数据传到中间件
      web_addByFileForNM() {
        let guid = this.fileNameGuid
        web_addByFileForNM({
          userPathGuid: this.userPathGuid,
          fileUrl: 'WEB/GUIDANCE/NAMELIST/FILES/',
          fileName: guid,
          curUserId: this.$store.state.user.adminId
        }).then(res => {
          console.log(res);
          if (res.tag > 0) {
            this.getFileProgress()
          } else {
            this.$message({
              message: '接收失败!',
              type: 'error'
            });
          }
        })
      },
      // 上传前，检查文件类型
      beforeUpload(file) {
        console.log(file)
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'csv'
        // const isLt2M = file.size / 1024 / 1024 < 10
        if (!extension) {
          this.$message({
            message: '上传文件只能是csv格式!',
            type: 'warning'
          });
        }
        return extension
      },
      // 正经上传文件
      async uploadFile(item) {
        console.log(item);
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        getNewId().then(res => {
          console.log(res);
          let guid = res
          this.fileNameGuid = res
          let FileName = res + '.csv'
          let FilePath = 'WEB/GUIDANCE/NAMELIST/FILES'
          let data = base64File
          upLoadImgApi(data, FileName, FilePath).then(res => {
            if (res.OK == 'True') {
              this.web_addByFileForNM()
            }
          })
        })

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
      // 下载
      openImportModel() {
        console.log('点击下载');
      },

      // 获取上传进度
      async getFileProgress() {
        let fileName = this.fileNameGuid
        await getFileProgress_service(fileName).then(res => {
          console.log(res);
          let arr = res.split(":")
          if (arr[0] == -1 || !res) {
            this.$message({
              type: 'error',
              message: res
            })
            this.fileList = []
          } else {
            this.isProgress = true

            this.progressValue = Number(res.replace('%', ''))
            if (res == '100%') {
              this.timer = setTimeout(this.getUploadResult, 3000);
            } else {
              // 进度不到100的时候重复循环
              this.timer = setTimeout(this.getFileProgress, 1000);
            }
          }
        })
      },
      // 获取上传结果
      async getUploadResult() {
        this.isProgress = false
        let fileName = this.fileNameGuid
        await getUploadResult_service(fileName).then(res => {
          console.log(res);
          this.isProgressResult = true
          let arr = res.split(":")
          console.log(arr);
          this.proResult = arr
        })
      },
      closeProgressResult() {
        this.isProgressResult = false
        console.log(999);
        this.close()
      },

      close() {
        this.isOpen = false
        this.$emit('close')
        this.$emit('refresh')
      },
      beforeClose() {
        this.close()
      },
      // 获取选中的节点
      getPathOrg(data) {
        this.userPathGuid = data.pathGuid
      },
      submit() {
        this.$refs.upload.submit();
      },
      async orgInsertOrgName() {
        let arr = []
        let data = this.newFieldList
        for (let i in data) {
          if (data[i].trim() === '') {

          } else {
            let obj = {
              orgName: data[i].trim(),
              orgPathGuid: this.orgPathGuid,
              curUserId: this.$store.state.user.adminId
            }
            arr.push(obj)
          }
        }
        await orgInsertOrgName(JSON.stringify(arr)).then(res => {
          console.log(res);
          if(res.OK == 'True') {
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.$emit('refresh')
              this.close()
            } else {
              this.$message({
                type: 'error',
                message: '机构名称已存在!'
              })
            }
            // 新增成功，刷新列表
          }

        })
      },
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
