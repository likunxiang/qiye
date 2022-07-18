<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div v-if="byteType=='new'">
      <div class="flex flex-center">
        <div class="bold my-label">品类类型</div>
        <div>{{pageTitle}}</div>
      </div>
      <div class="flex flex-center mt10">
        <div class="bold my-label">需求场景</div>
        <div>{{treeTitle}}</div>
      </div>
      <el-divider></el-divider>
      <div class="input-box">
        <div class="flex flex-center">
          <div class="input-text">父级字节内容</div>
          <el-input type="text" :value="fatherSceneSure.name" placeholder="请选择" suffix-icon="el-icon-search"
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
          <el-input type="text" :value="fatherSceneSure.name" placeholder="请选择" suffix-icon="el-icon-search"
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
  </el-dialog>
</template>

<script>
  import chooseByte from '@/views/categoryRole/classDefinition/components/chooseByte.vue'
  import {
    insertNameTree,
    updateNameTree,
    getNameTitleMaxLevel_1_0_1, // 获取最高level
    saveNameTitle_1_0_1, // 生成更高level
  } from '@/api/categoryRole/classDefinition.js'
  export default {
    name: "index",
    components: {
      chooseByte
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
        nowLevel: '1', // 初始level为1
        treeTitleString: '',
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

      submit() {
        if (this.ownObj.level > 1 && !this.byteObj.guid) {
          this.$message("上段字节内容必选")
        } else {
          if (this.byteType == 'edit') {
            this.updateNameTree()
          } else {
            this.insertNameTree()
          }
        }


      },
      // 获取选中的父级
      getFather(data) {
        console.log(data);
        this.fatherSceneSure = data
        this.nowLevel = (parseInt(data.level) + 1).toString()
      },
      getRadio(data) {
        console.log(data);
        this.byteObj = data // 上级字节内容对象
        this.parentByte = this.byteObj.name
      },
      async insertNameTree() {
        console.log('将要建的level',this.nowLevel);
        await insertNameTree({
          catTreeGuid: this.guid,
          parentGuid: this.fatherSceneSure.guid ? this.fatherSceneSure.guid : this.guid,
          name: this.ownByte.trim()
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.toSetLevel()
            this.$emit('refresh')
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '内容过长或当前父级已存在该内容!'
            });
          }
        })
      },
      async updateNameTree() {
        await updateNameTree({
          catTreeGuid: this.guid,
          parentGuid: this.fatherSceneSure.guid ? this.fatherSceneSure.guid : this.guid,
          catNameTreeGuid: this.editObj.guid,
          name: this.ownByte
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.toSetLevel()
            this.$emit('refresh')
            this.close()
          } else {
            this.$message({
              type: 'error',
              message: '内容过长或当前父级已存在该内容!'
            });
          }
        })
      },
      async getNameTitleMaxLevel_1_0_1() {
        await getNameTitleMaxLevel_1_0_1({
          catreeGuid: this.guid
        }).then(res => {
          this.maxLevel = res.Tag[0].Table[0].level
        })
      },
      async saveNameTitle_1_0_1() {
        await saveNameTitle_1_0_1({
          catreeGuid: this.guid,
          name: '品类' + this.nowLevel + '段字节标题',
          level: this.nowLevel
        }).then(res => {
          if (res.Tag[0] > 0) {
          } else {
            this.$message({
              type: 'error',
              message: '字节标题生成失败!'
            });
          }
        })
      },
      toSetLevel() {
        if (parseInt(this.maxLevel) < parseInt(this.nowLevel)) {
          this.saveNameTitle_1_0_1()
        }
      }
    },
    created() {
      this.title = this.byteType == 'new' ? '新建字节内容' : '编辑字节内容'
      if (this.byteType == 'edit') {
        console.log('editObj',this.editObj);
        this.fatherSceneSure.name = this.editObj.parentName
        this.fatherSceneSure.guid = this.editObj.parentGuid
        this.fatherSceneSure.treeTitleString = this.editObj.treeTitleString
        // this.nowLevel = (parseInt(this.editObj.level) + 1).toString()
        this.ownByte = this.editObj.name
      }
      this.getNameTitleMaxLevel_1_0_1()
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
