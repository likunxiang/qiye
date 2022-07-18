<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="" v-loading="loading">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色类型" prop="type">
              引导专员
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <!-- <treeselect v-model="ruleForm.deptId" :options="deptOptions" :show-count="true" placeholder="请选择归属部门" /> -->
              引导专员部门
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="ruleForm.userId == undefined" label="账号名称" prop="nickName">
              <el-input v-model="ruleForm.nickName" placeholder="仅支持英文和数字" maxlength="30" :disabled="pageStatus=='2'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="ruleForm.userId == undefined" label="登录密码" prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入登录密码" type="password" maxlength="20"
                show-password />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="ruleForm.userId == undefined" label="用户姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入用户姓名" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="ruleForm.userId == undefined" label="国家/地区">
              中国大陆（+86）
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="userTel">
              <el-input v-model="ruleForm.userTel" placeholder="请输入联系电话" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">
                  {{dict.label}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>

    <attInfoTips v-if="isTips" @close="close" :row="openRow"></attInfoTips>
  </el-dialog>
</template>

<script>
  import {
    treeselect
  } from "@/api/system/dept";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import attInfoTips from '@/views/choseManager/guideAccountInfo/guideAttInfo/components/attInfoTips'
  // import {  getUser } from "@/api/system/user";
  import {
    selectAddStaff,
    getEncryptStr,
    selectUpdateInfoByUid ,// 编辑时用的接口
    getUserDetail
  } from '@/api/choseManagerApi/choseManagerCom.js'


  export default {
    name: "index",
    dicts: ['sys_normal_disable'],
    components: {
      Treeselect,
      attInfoTips
    },
    props: {
      pageStatus: {
        type: String,
        default: '1'
      },
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
        isTips: false,
        title: '',
        // 部门树选项
        deptOptions: undefined,
        ruleForm: {
          nickName: '',
          deptId: 114,
          password: '',
          name: '',
          userTel: '',
          status: '0'
        },
        rules: {
          nickName: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          password: [{
              required: true,
              message: "用户密码不能为空",
              trigger: "blur"
            },
            {
              min: 6,
              max: 20,
              message: '用户密码长度必须介于 6 和 20 之间',
              trigger: 'blur'
            }
          ],
          name: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
          userTel: [{
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }],
          status: [{
            required: true,
            message: '必填',
            trigger: 'change'
          }],
        },
        passwordStr: '', // 密文
        oldForm: {
          nickName: '',
          deptId: 114,
          password: '',
          name: '',
          userTel: '',
          status: '0'
        }, // 修改的时候用于保存原数据
        loading: false,
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('refresh')
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.status === '1') {
              this.$confirm('停用后，该用户不能使用该账号登录。确认停用该账号！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 提交表单
                if (this.ruleForm.password.length > 0) {
                  this.getEncryptStr(this.ruleForm.password)
                } else {
                  this.passwordStr = ''
                  if(this.pageStatus == '1') {
                    this.selectAddStaff()
                  } else {
                    this.selectUpdateInfoByUid()
                  }
                }
              }).catch(() => {});
            } else {
              if (this.ruleForm.password.length > 0) {
                this.getEncryptStr(this.ruleForm.password)
              } else {
                this.passwordStr = ''
                if(this.pageStatus == '1') {
                  this.selectAddStaff()
                } else {
                  this.selectUpdateInfoByUid()
                }
              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /** 查询部门下拉树结构 */
      getTreeselect() {
        treeselect().then(response => {
          this.deptOptions = response.Tag;
        });
      },
      // 筛选节点
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 节点单击事件
      handleNodeClick(data) {
        this.queryParams.deptId = data.id;
        this.getList();
      },

      // 明文密码转密文
      async getEncryptStr(password) {

        let oldForm = this.oldForm
        let ruleForm = this.ruleForm
        console.log('oldForm',oldForm);
        console.log('ruleForm',ruleForm);
        if (oldForm.password != ruleForm.password || oldForm.name != ruleForm.name || oldForm.userTel != ruleForm.userTel || oldForm.status != ruleForm.status || oldForm.deptId != ruleForm.deptId) {
          console.log('password',password);
          await getEncryptStr(password).then(res => {
            console.log(res);
            if (res.OK == 'True') {
              this.passwordStr = res.Tag
              if(this.pageStatus == '1') {
                this.selectAddStaff()
              } else {
                this.selectUpdateInfoByUid()
              }

            }

          })
        } else {
          this.close()
        }
      },

      async selectAddStaff() {
        await selectAddStaff({
          userName: this.ruleForm.nickName,
          passwd: this.passwordStr,
          nickName: this.ruleForm.name,
          phonenumber: this.ruleForm.userTel,
          status: this.ruleForm.status,
          roleKey: 'selectStaffRole',
          curUserId: this.$store.state.user.adminId,
          deptId: this.ruleForm.deptId,
        }).then(res => {
          if (res.OK == 'True') {

            console.log(res);
            if (res.Tag[0] > 0) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.isTips = true
              this.openRow = this.ruleForm
            } else {
              this.$message({
                type: 'error',
                message: '账号名称或联系电话已存在!'
              });
            }

          }
        })
      },
      // 修改用户走这里
      async selectUpdateInfoByUid() {
        console.log('oldForm',this.oldForm);
        await selectUpdateInfoByUid({
          passwd: this.passwordStr,
          nickName: this.ruleForm.name,
          phonenumber: this.ruleForm.userTel,
          status: this.ruleForm.status,
          curUserId: this.$store.state.user.adminId,
          deptId: this.ruleForm.deptId,
          userId: this.row.userId
        }).then(res => {
          if (res.OK == 'True') {

            console.log(res);
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
                message: '账号名称或联系电话已存在!'
              });
            }

          }
        })

      },
      async getUserDetail() {
        this.loading = true
        getUserDetail({
          userId: this.row.userId,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);
          this.loading = false
          let data = res.Tag[0].Table[0]
          this.ruleForm.nickName = data.userName
          this.ruleForm.name = data.nickName
          this.ruleForm.password = data.password
          this.ruleForm.userTel = data.phonenumber
          this.ruleForm.status = data.status
          this.ruleForm.roleKey = 'selectStaffRole',
          this.ruleForm.deptId = data.deptId
          // this.oldForm = this.ruleForm
          this.oldForm.nickName = data.userName
          this.oldForm.name = data.nickName
          this.oldForm.password = data.password
          this.oldForm.userTel = data.phonenumber
          this.oldForm.status = data.status
          this.oldForm.roleKey = 'selectStaffRole',
          this.oldForm.deptId = data.deptId
        })
      }

    },
    created() {
      this.getTreeselect();
      let pageStatus = this.pageStatus
      if (pageStatus == '1') {
        this.title = '新建引导专员'
      } else if (pageStatus == '2') {
        this.title = '修改'
        this.rules = {
          nickName: [{
            trigger: 'change'
          }],
          password: [{
              trigger: "blur"
            },
            {
              min: 0,
              max: 20,
              message: '用户密码长度必须介于 0 和 20 之间',
              trigger: 'blur'
            }
          ],
          name: [{
            message: '必填',
            trigger: 'change'
          }],
          userTel: [{
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }],
          status: [{
            message: '必填',
            trigger: 'change'
          }],
        },
        this.getUserDetail()
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
