<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div v-if="byteType=='new'">
      <div class="input-box">
        <div class="flex flex-center">
          <div class="input-text">服务区域选择</div>
          <el-input type="text" :value="provincesObj.cityName" placeholder="请选择" suffix-icon="el-icon-search"
            @focus="openProvinces" />
        </div>
        <div class="flex flex-center mt10">
          <div class="input-text"></div>
          <div>{{provincesObj.treeTitleString}}</div>
        </div>
        <div class="flex flex-center mt10">
          <div class="input-text">父级字节内容</div>
          <el-input type="text" :value="fatherSceneSure.content" placeholder="请选择" suffix-icon="el-icon-search"
            @focus="openFather" />
        </div>
        <div class="flex flex-center mt10">
          <div class="input-text"></div>
          <div>{{fatherSceneSure.treeTitleString}}</div>
        </div>
        <div class="flex flex-center mt20">
          <div class="input-text">字节内容</div>
          <el-input type="text" v-model="ownByte" placeholder="请输入" />
        </div>
      </div>
    </div>
    <div v-if="byteType == 'edit'">
      <div class="input-box">
        <div class="flex flex-center">
          <div class="input-text">父级字节内容</div>
          <el-input type="text" :value="fatherSceneSure.content" placeholder="请选择" suffix-icon="el-icon-search"
            @focus="openFather" />
        </div>
        <div class="flex flex-center mt10">
          <div class="input-text"></div>
          <div>{{fatherSceneSure.treeTitleString}}</div>
        </div>
        <div class="flex flex-center mt20">
          <div class="input-text">字节内容</div>
          <el-input type="text" v-model="ownByte" placeholder="请输入" />
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" :disabled="!ownByte.trim()">保存</el-button>
    </span>
    <chooseByte v-if="isChoose" @close="closeFather" @getFather="getFather" :pageTitle="pageTitle" :treeTitle="treeTitle" :guid="guid" :parentId='editObj.guid' :byteType="byteType"></chooseByte>
    <chooseProvinces v-if="isProvinces" @close="closeProvinces" @getProvinces="getProvinces"></chooseProvinces>
  </el-dialog>
</template>

<script>
  import chooseByte from '@/views/serviceManager/agencyInformation/components/chooseByte.vue'
  import chooseProvinces from '@/views/serviceManager/agencyInformation/components/chooseProvinces.vue'
  import {
    pathInsert,
    pathUpdate,
  } from '@/api/serviceManagerApi/serviceManagerCom.js'
  export default {
    name: "index",
    components: {
      chooseByte,
      chooseProvinces
    },
    props: {
      byteType: {
        type: String,
        default: '',
      },
      ownObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      parentObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      editObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      guid: {
        type: String,
        default: ''
      },
      pageTitle: {
        type: String,
        default: ''
      },
      treeTitle: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isOpen: true,
        isChoose: false,
        byteObj: {}, // 上级字节对象
        parentByte: '',
        ownByte: '',
        title: '新建字节内容',
        fatherSceneSure: {},
        treeTitleString: '',
        provincesObj: {},
        isProvinces: false,
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

      // 选择父级场景
      openFather() {
        this.isChoose = true
      },
      closeFather() {
        this.isChoose = false
      },

      // 选择服务区域
      openProvinces() {
        this.isProvinces = true
      },
      closeProvinces() {
        this.isProvinces = false
      },

      submit() {
        if (this.ownObj.level > 1 && !this.byteObj.guid) {
          this.$message("上段字节内容必选")
        } else {
          if (this.byteType == 'edit') {
            this.pathUpdate()
          } else {
            this.pathInsert()
          }
        }


      },
      // 获取选中的父级
      getFather(data) {
        console.log(data);
        this.fatherSceneSure = data
      },
      // 获取选择的省市区
      getProvinces(data) {
        this.provincesObj = data
        console.log('provincesObj',this.provincesObj);
      },
      getRadio(data) {
        console.log(data);
        this.byteObj = data // 上级字节内容对象
        this.parentByte = this.byteObj.name
      },
      async pathInsert() {
        await pathInsert({
          cityCodeId: this.provincesObj.cityId,
          parentGuid: this.fatherSceneSure.pathGuid ? this.fatherSceneSure.pathGuid : '0',
          curUserId: this.$store.state.user.adminId,
          content: this.ownByte.trim()
        }).then(res => {
          console.log(res);
          if(res.OK == 'True') {
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
                message: '内容过长或当前父级已存在该内容!'
              });
            }
          }
        })
      },
      async pathUpdate() {
        await pathUpdate({
          cityCodeId: this.provincesObj.cityId,
          parentGuid: this.fatherSceneSure.pathGuid ? this.fatherSceneSure.pathGuid : '0',
          pathGuid: this.editObj.pathGuid,
          content: this.ownByte,
          curUserId: this.$store.state.user.adminId,
        }).then(res => {
          console.log(res);
          if(res.OK=='True') {
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
                message: '内容过长或当前父级已存在该内容!'
              });
            }
          }
        })
      },
    },
    created() {
      this.title = this.byteType == 'new' ? '新建字节内容' : '编辑字节内容'
      if (this.byteType == 'edit') {
        console.log('editObj',this.editObj);
        this.fatherSceneSure.content = this.editObj.parentContent
        this.fatherSceneSure.pathGuid = this.editObj.parentGuid
        this.fatherSceneSure.treeTitleString = this.editObj.treeTitleString
        this.provincesObj.cityId = this.editObj.cityCodeId
        this.ownByte = this.editObj.content
      }
    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 120px;
  }
  .input-box {
    width: 70%;
    margin: 40px auto;

    .input-text {
      width: 100px;
      flex-shrink: 0;
    }
  }
</style>
