<template>
  <el-dialog title="批量导入" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="flex flex-center">
      <div class="bold my-label">上段字节标题</div>
      <div>品类N-1段字节标题</div>
    </div>
    <div class="flex flex-center mt10">
      <div class="bold my-label">上段字节内容</div>
      <el-input type="text" placeholder="请关联" style="width: 200px;margin-right: 20px;"></el-input>
      <el-button size="small" @click="openChoose">关联上段字节内容</el-button>
    </div>
    <el-divider></el-divider>
    <div class="flex flex-center">
      <div class="bold my-label">本段字节标题</div>
      <div>品类N-1段字节标题</div>
    </div>
    <div class="flex mt10">
      <div class="bold my-label">本段字节内容</div>
      <el-upload ref="upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
        :on-remove="handleRemove" :auto-upload="false" :on-progress="uploading" :on-success="uploadSuccess" :before-remove="beforeRemove" :file-list="fileList">
        <el-button size="small" type="primary">导入文件</el-button>
        <div slot="tip" class="el-upload__tip">请按模板导入文件</div>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">保存</el-button>
    </span>
    <chooseByte v-if="isChoose" @close="closeChoose" @getRadio="getRadio"></chooseByte>
  </el-dialog>
</template>

<script>
  import chooseByte from '@/views/categoryRole/classDefinition/components/chooseByte.vue'
  export default {
    name: "index",
    components: {
      chooseByte
    },
    data() {
      return {
        isOpen: true,
        isChoose: false,
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        loadingPop: ''

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
      openChoose() {
        this.isChoose = true
      },
      closeChoose() {
        this.isChoose = false
      },
      getRadio(data) {
        console.log(data);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
      submit(){
        this.submitUpload()
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 120px;
  }
</style>
