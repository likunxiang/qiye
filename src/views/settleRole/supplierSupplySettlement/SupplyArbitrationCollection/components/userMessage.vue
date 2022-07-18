<template>
  <el-dialog title="个人账号信息" width="900px" :visible.sync="isOpen" append-to-body destroy-on-close
    @close="beforeClose">
    <div class="title-bg mb10">账号信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label" label="账号名称">18650767213</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="姓名">林都</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="联系电话">18650767213</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="注册日期">2021-09-18</el-descriptions-item>
    </el-descriptions>
    <div class="title-bg mb10">实名认证</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label" label="姓名">18650767213</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="证件类型">林都</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="证件号码">18650767213</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="证件生效时间">2021-09-18</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="证件有效期限">2021-09-18</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="签发机关">2021-09-18</el-descriptions-item>
    </el-descriptions>
    <el-row>
      <div class="my-label mb10">证件证明</div>
      <div class="flex mb10">
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
      </div>
    </el-row>
    <div class="title-bg mb10">其他信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label" label="角色类型">个人主体 > 退休人员</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="是否是引导专员">是</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="是否有引导专员">是</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.$emit('close')
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }

  .my-label {
    width: 120px;
    font-weight: bold;
  }
</style>
