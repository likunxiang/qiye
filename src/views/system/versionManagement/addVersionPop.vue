<template>
  <el-dialog title="新增" :visible.sync="isOpen" width="700px" @close="beforeClose" :close-on-click-modal="false">
    <div class="p20">
      <el-form ref="editForm" :rules="editFormRules" :model="editForm">
        <el-form-item label="版本号：" label-width="80px" prop="version">
          <el-input v-model="editForm.version" placeholder="同一发布平台版本号只能递增" style="width: 250px;" />
        </el-form-item>
        <el-form-item label="发布平台" label-width="80px" prop="platform">
          <el-select v-model="editForm.platform" placeholder="请选择">
            <el-option v-for="item in platformList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重" label-width="80px" prop="weight">
          <el-input v-model="editForm.weight" placeholder="请输入整数" style="width: 250px;" />
        </el-form-item>
        <el-form-item label="版本大小" label-width="80px">
          <el-input v-model="editForm.size" placeholder="请输入版本大小" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="版本说明" label-width="80px">
          <el-input
            v-model="editForm.imprint"
            type="textarea"
            placeholder="请输入版本说明"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item style="text-align: center;padding-bottom: 40px;">
          <el-button type="primary" @click="onSubmit('editForm')">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import {
    insert_1_0_1,
  } from '@/api/system/versionManagement'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        editForm: {
          version: '',
          platform: '0',
          weight: '',
          size: '',
          imprint: ''
        },
        editFormRules: {
          version: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          platform: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          weight: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          size: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }]
        },
        platformList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: 'Android'
        }, {
          value: '2',
          label: 'IOS'
        }],
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
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(666);
            this.insert_1_0_1()
          } else {
            this.$message({
              type: 'error',
              message: '有必填信息没填'
            })
            return false
          }
        })
      },
      async insert_1_0_1() {
        let param = {
          weight: parseInt(this.editForm.weight),
          platform: this.editForm.platform,
          version: this.editForm.version,
          userId: this.$store.state.user.adminId.toString(),
          remark: this.editForm.imprint,
          size: this.editForm.size
        }
        await insert_1_0_1(param).then(res => {
          if(res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.$emit('refresh')
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
        })
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
