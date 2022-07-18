<template>
  <el-dialog title="添加库名称" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <el-row>
      <el-descriptions border :column="1" size="medium">
        <el-descriptions-item label="字段名称">{{fieldObj.plateFieldName}}</el-descriptions-item>
        <el-descriptions-item label="字段内容来源">{{contentSources}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-row>
      <div class="flex flex-center mb20 mt20">
        <el-input placeholder="请输入你要找的字段名称" clearable v-model="searchVal" @keyup.enter.native="search"
          style="width: 200px;margin-right: 20px;" @clear="clearSearch">
		  <i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
        </el-input>
        <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
      </div>
    </el-row>
    <el-row>
      <el-radio-group v-model="radioField">
        <el-row class="mb10" v-for='(field,index) in fieldList' :key="index">
          <el-radio :label="field.fixedDataGuid" @change="changeField">{{field.name}}</el-radio>
        </el-row>
      </el-radio-group>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="radioField<=0">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { getFixedData } from '@/api/modelRoleApi/immobilizationContent.js'
  export default {
    name: "index",
    props: {
      fieldObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      contentSources: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isOpen: true,
        searchVal: '',
        searchResult: 0,
        fieldList: [],
        radioField: 0,
        chooseField: {}
      };
    },
    methods: {
      search() {
        this.getFixedData()
      },
      clearSearch() {
        this.search()
      },
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      submit() {
        let data = this.chooseField
        this.$emit('getField',data)
        this.close()
      },
      changeField(val) {
        console.log(val);
        for (let i in this.fieldList) {
          if (this.fieldList[i].fixedDataGuid === val) {
            this.chooseField = this.fieldList[i]
          }
        }
        console.log(this.chooseField);

      },
      async getFixedData() {
        await getFixedData({
          type: 3,
          name: this.searchVal,
		  bizType: '',
		  page: 1,
		  size: '200'
        }).then(res => {
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.fieldList = data
            this.searchResult = this.fieldList.length
          } else {
            this.fieldList = []
            this.searchResult = this.fieldList.length
          }
        })
      }
    },
    created() {
      this.getFixedData()
    }
  };
</script>

<style lang="scss" scoped>
</style>
