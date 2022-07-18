<template>
  <el-dialog title="内容来源配置" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row>
      <el-descriptions border :column="1" size="medium">
        <el-descriptions-item label="品类名称" v-if="!isUniversal">{{categoryName}}</el-descriptions-item>
        <el-descriptions-item label="品类类型" v-if="isUniversal">{{categoryName}}</el-descriptions-item>
        <el-descriptions-item label="板块名称">{{fieldObj.plateName}}</el-descriptions-item>
        <el-descriptions-item label="板块类型">{{fieldObj.plateTypeName}}</el-descriptions-item>
        <el-descriptions-item label="字段名称">{{fieldObj.plateFieldName}}</el-descriptions-item>
        <el-descriptions-item label="字段名称来源">{{fieldObj.plateFieldSource=="1"?'固化':'自建'}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-row>
      <el-row>
        <p class="bold">请选择</p>
      </el-row>
      <el-row>
        <el-radio-group v-model="radioContent">
          <el-row class="mb10" v-for="(item,index) in contentFromList" :key="index">
            <el-radio :label="item.id">{{item.name}}</el-radio>
          </el-row>
        </el-radio-group>
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitContentFrom" :disabled="!radioContent">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    setPlateFieldContentSource,
  } from '@/api/modelRoleApi/tradingContent.js'
  export default {
    name: "index",
    props: {
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
      },
      isUniversal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isOpen: true,
        radioContent: 0,
        contentFromList: [],
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
      submitContentFrom() {
        if(this.fieldObj.plateFieldContentSource == this.radioContent) {
          this.close()
        } else{
          this.setPlateFieldContentSource()
        }

      },
      // 设置字段内容来源
      async setPlateFieldContentSource() {
        console.log('字段内容来源', this.radioContent);
        await setPlateFieldContentSource({
          plateFieldGuid: this.fieldObj.plateFieldGuid,
          contentSource: this.radioContent
        }).then(res => {
          this.close()
        })
      },
    },
    created() {
      // 固化和自建的选项不同
      console.log(this.fieldObj);
      let catTreeCode = this.fieldObj.catTreeCode
      let bizType = this.bizType
      console.log('bizType',bizType);
      console.log('catTreeCode',catTreeCode);
      this.radioContent = parseInt(this.fieldObj.plateFieldContentSource)
      if (catTreeCode == 'demand') {
        if (bizType == '1' || bizType == '3' || bizType == '4') {
          this.contentFromList = [{
              id: 1,
              name: '字段内容固化库'
            },
            {
              id: 2,
              name: '字段内容自建库'
            },
            {
              id: 3,
              name: '需方'
            }
          ]
        }
      } else if (catTreeCode == 'supply'){
        if (bizType == '1') {
          if (this.fieldObj.plateFieldSource == '1') {
            this.contentFromList = [{
                id: 4,
                name: '供方'
              },
              {
                id: 3,
                name: '需方'
              }
            ]
          } else {
            this.contentFromList = [
              {
                id: 3,
                name: '需方'
              }
            ]
          }

        } else if (bizType == '2') {
          this.contentFromList = [{
              id: 1,
              name: '字段内容固化库'
            },
            {
              id: 2,
              name: '字段内容自建库'
            },
            {
              id: 4,
              name: '供方'
            }
          ]
        } else if (bizType == '3') {
          this.contentFromList = [
            {
              id: 3,
              name: '需方'
            }
          ]
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
