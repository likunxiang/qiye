<template>
  <el-dialog title="派发人力资源信息" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row class="mb20">
      <el-table :data="oldUserList" border>
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="mb20">
      <el-button type="primary" @click="openImportWay">导入方式添加</el-button>
      <el-button type="primary" @click="openImportModel"><a :href="downloadFileUrl" download="w3logo">导入模板下载</a>
      </el-button>
      <el-button type="primary" @click="addScreenWay">筛选方式添加</el-button>
    </el-row>
    <el-row class="mb20" style="padding-bottom: 20px;">
      <el-table :data="tableData" border>
        <el-table-column prop="createTime" label="派发日期" align="center">
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="toSendDetail(scope.row)" type="text" size="small">{{scope.row.count}}</el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="方式" align="center">
          <template slot-scope="scope">
            <el-row>
              {{scope.row.source == 4?'导入方式':'筛选方式'}}
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 派发详情 -->
    <el-dialog title="派发详情" :visible.sync="isDetail" width="700px" @close="beforeCloseDetail" append-to-body>
      <el-row class="mb20 flex flex-center">
        <div class="bold label">派发日期</div>
        <div>{{sendDetailRow.createTime}}</div>
      </el-row>
      <el-row class="mb20 flex">
        <div class="bold label">派发数量</div>
        <div>{{sendDetailRow.count}}</div>
      </el-row>
      <el-row class="flex flex-center mb10">
        <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchDetailVal" @keyup.enter.native="searchDetail"
          style="width: 200px;margin-right: 20px;" @clear="searchDetail">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchDetail" />
        </el-input>
        <div class="" v-if="isToSearchDetail">搜索结果：{{searchDetailResult}}</div>
      </el-row>
      <el-row style="padding-bottom: 40px;">
        <el-table :data="countDetailList" border height="50vh">
          <el-table-column prop="username" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="phonenumber" label="联系电话" align="center">
          </el-table-column>
          <el-table-column prop="nation" label="区号" align="center">
          </el-table-column>
          <el-table-column prop="roleType" label="角色类型" align="center">
          </el-table-column>
        </el-table>
      </el-row>
      <!-- <div class="pageBox">
        <el-pagination class="pageMain" @current-change="handleCurrentChange" :current-page="currentPage4"
          :page-sizes="[20]" layout="prev, pager, next" :total="400">
        </el-pagination>
      </div> -->
    </el-dialog>
    <!-- 派发详情 end-->
    <!-- 导入方式添加 -->
    <el-dialog title="导入方式添加" :visible.sync="isImportWay" width="700px" @close="beforeCloseImportWay" append-to-body>
      <el-row>
        <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-change="changeFile"
          :http-request="uploadFile" :on-remove="handleRemove" :file-list="fileList" :on-exceed="handleExceed"
          :limit="1" accept=".csv" :before-upload="beforeUpload" :auto-upload="false" :multiple="false">
          <el-button slot="trigger" size="small" type="primary">导入文件</el-button>
          <div slot="tip" class="el-upload__tip">请按照模板导入文件</div>
        </el-upload>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
          :disabled="fileList.length<=0">上传</el-button>
      </span>
    </el-dialog>
    <!-- 导入方式添加 end -->
    <!-- 筛选方式添加 -->
    <screenPop v-if="isScreen" @close="closeScreenWay" :row="row" @refresh="getUserAdminAddedCountList"></screenPop>
    <!-- 筛选方式添加 end -->

    <!-- 进度条 -->
    <progressCom v-if="isProgress" :progressValue="progressValue"></progressCom>

    <progressResult v-if="isProgressResult" :result="proResult" @close="closeProgressResult" @refresh="getUserAdminAddedCountList"></progressResult>

  </el-dialog>
</template>

<script>
  import {
    getUserAdminAddedCountList,
    getUserAdminAddedList,
    web_guide_upload_phone
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  import {
    upLoadImgApi,
    getNewId,
    getFileProgress,
    getUploadResult
  } from '@/api/commonApi.js'
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  import screenPop from '@/views/operationRole/dispatchingManagement/distributeHuman/components/screenPop.vue'
  import progressCom from '@/views/components/common/progress.vue'
  import progressResult from '@/views/components/common/progressResult.vue'
  export default {
    name: "index",
    components: {
      screenPop,
      progressCom,
      progressResult
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        isDetail: false,
        isImportWay: false,
        isScreen: false,
        searchVal: '',
        searchResult: 0,
        isToSearch: false,
        searchDetailVal: '',
        isToSearchDetail: false,
        searchDetailResult: 0,
        currentPage4: 1,
        oldUserList: [],
        tableData: [],
        roleList: [],
        sendDetailRow: {}, // 数量详情row
        countDetailList: [], // 数量详情列表

        downloadFileUrl: process.env.VUE_APP_BASE_URL_ASSETS + "/Enclosure/运营经理人力资源调度-上传文件增加人力资源模板.csv", // 下载模板地址
        uploadFileUrl: "/UpLoadFile?FileName=MyImage.png&FilePath=UserPhoto\\min", // 上传的图片服务器地址
        fileList: [],
        loadingPop: null,
        timer: '',
        value: 0,
        isProgress: false,
        progressValue: '0',
        isProgressResult: false,
        proResult: '', // 上传结果
        fileNameGuid: '', // 上传文件的uuid
      };
    },
    methods: {
      // 上传文件获取guid
      async getNewId() {
        await getNewId().then(res => {
          console.log(res);
          let guid = res
          this.fileNameGuid = guid
          console.log(this.fileNameGuid);
          this.web_guide_upload_phone()
        })
      },
      // 获取上传进度
      async getFileProgress() {
        let fileName = this.fileNameGuid
        await getFileProgress(fileName).then(res => {
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
            this.closeImportWay()
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
        await getUploadResult(fileName).then(res => {
          console.log(res);
          this.isProgressResult = true
          let arr = res.split(":")
          console.log(arr);
          this.proResult = arr
        })
      },
      closeProgressResult() {
        this.isProgressResult = false
      },
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      search() {
        if(this.searchVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
        this.getUserAdminAddedCountList()
      },
      searchDetail() {
        if(this.searchDetailVal.length > 0) {
          this.isToSearchDetail = true
        } else {
          this.isToSearchDetail = false
        }
        this.getUserAdminAddedList(this.sendDetailRow)
      },
      toSendDetail(row) {
        console.log(row);
        this.isDetail = true
        this.sendDetailRow = row
        this.getUserAdminAddedList(row)
      },
      closeSendDetail() {
        this.isDetail = false
      },
      beforeCloseDetail() {
        this.closeSendDetail()
      },
      openImportWay() {
        this.isImportWay = true
        this.fileList = []
      },
      closeImportWay() {
        this.isImportWay = false
      },
      beforeCloseImportWay() {
        this.closeImportWay()
      },
      addScreenWay() {
        this.isScreen = true
      },
      closeScreenWay() {
        this.isScreen = false
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
      // 上传文件相关
      submitUpload() {
        this.$refs.upload.submit();
      },
      // 把数据传到中间件
      web_guide_upload_phone() {
        let guid = this.fileNameGuid
        web_guide_upload_phone({
          userId: this.row.userId,
          fileUrl: 'GUIDE/WEB/ADDPHONE/EXCEL/',
          fileName: guid
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
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        getNewId().then(res => {
          console.log(res);
          let guid = res
          this.fileNameGuid = res
          let FileName = res + '.csv'
          let FilePath = 'guide\\web\\addphone\\excel'
          let data = base64File
          upLoadImgApi(data, FileName, FilePath).then(res => {
            if (res.OK == 'True') {
              this.web_guide_upload_phone()
            }
          })
        })

      },
      // uploading() {
      //   const loading = this.$loading({
      //     lock: true,
      //     text: '文件上传中',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      //   this.loadingPop = loading
      // },
      // uploadSuccess(response, file, fileList) {
      //   this.loadingPop.close()
      //   this.$alert(response.msg, "导入结果", {
      //     dangerouslyUseHTMLString: true
      //   });
      //   this.isLead = false
      // },

      handlePreview(file) {
        console.log(file);
      },

      // 下载
      openImportModel() {
        console.log('点击下载');
      },

      //查看被管理员派发的人力资源数量列表
      async getUserAdminAddedCountList() {
        await getUserAdminAddedCountList({
          userId: this.row.userId,
          page: '1',
          size: '200'
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.tableData = res.Tag[0].Table
          } else {
            this.tableData = []
          }
          this.searchResult = this.tableData.length
        })
      },
      //
      async getUserAdminAddedList(row) {
        await getUserAdminAddedList({
          userId: this.row.userId,
          addDay: row.createTime,
          source: row.source,
          phonenumber: this.searchDetailVal || ''
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.countDetailList = res.Tag[0].Table
            // 从字典获取角色类型
            this.getDicts("user_tag").then(response => {
              var statusOptions = response.Tag;
              console.log('statusOptions', statusOptions);
              for (var j in this.countDetailList) {
                for (var i in statusOptions) {
                  if (this.countDetailList[j].userTag == statusOptions[i].dictValue) {
                    this.countDetailList[j].roleType = statusOptions[i].dictLabel
                  }
                }
              }
              this.countDetailList = this.clone(this.countDetailList)


            });
          } else {
            this.countDetailList = []
          }
          this.searchDetailResult = this.countDetailList.length
        })
      }
    },
    mounted() {
      this.oldUserList.push(this.row)
      this.getUserAdminAddedCountList()
    },
    beforeDestroy() {
      // 销毁定时器
      clearTimeout(this.timer);
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    width: 120px;
  }
</style>
