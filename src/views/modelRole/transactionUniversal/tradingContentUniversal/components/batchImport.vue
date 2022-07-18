<template>
  <el-dialog title="批量导入" width="700px" :visible.sync="isOpen" destroy-on-close @close="beforeClose" append-to-body>
    <div class="input-box">
      <el-upload ref="upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" show-file-list multiple
        :limit="1" :on-progress="uploading" :on-success="uploadSuccess" :on-exceed="handleExceed"
        :auto-upload="false" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">请按照模板格式导入</div>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="submitUpload">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "batchImport",
    data() {
      return {
        isOpen: true,
        fileList: [],
        loadingPop: '',
      };
    },
    methods: {
      closeNew() {
        this.isOpen = false
        this.$emit('closeNew')
      },
      beforeClose() {
        console.log(999);
        this.$emit('closeNew')
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
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      uploading() {
        const loading = this.$loading({
          lock: true,
          text: '文件上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.loadingPop = loading
      },
      uploadSuccess(response, file, fileList) {
        this.loadingPop.close()
        this.$alert(response.msg, "导入结果", {
          dangerouslyUseHTMLString: true
        });
        this.isLead = false
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss">
</style>
