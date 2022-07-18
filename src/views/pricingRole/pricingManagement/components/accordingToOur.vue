<template>
  <el-dialog title="添加型号" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
    <div v-loading="loading">
      <el-row class="flex mb20 mt10">
        <div class="bold" style="width: 120px;">品类名称</div>
        <div>{{openRow.categoryName}}</div>
      </el-row>
      <el-row class="flex mb20">
        <div class="bold" style="width: 120px;">收取范围</div>
        <div>{{collectType==0?'按品类':collectType==1?'按供方型号':'按我方型号'}}</div>
      </el-row>
      <div class="flex flex-center mb20 jsb">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的型号名称' :isMb20="false"></searchCom>
        <!-- 弹出窗 -->
        <el-popover placement="bottom-end" width="400" trigger="click" @show="getModelList" @hide="saveModelList">
          <el-row class="mb20">型号选择</el-row>
          <searchCom @toSearch='searchFuc' :searchResult='searchModelResult' placeholderText='请输入你要找的型号名称'></searchCom>
          <template v-if="radioVersionList.length">
            <el-radio-group v-model="radioVersion">
              <el-row class="mb10" v-for="(item,index) in radioVersionList" :key="index">
                <el-radio :label="item.modelGuid" @change="chooseVersion" :disabled="item.addedFlag == '1'">{{item.modelName}}</el-radio>
              </el-row>

            </el-radio-group>
          </template>
          <template v-else>
            <el-row>没有内容。</el-row>

          </template>
          <el-button slot="reference">引用型号</el-button>
        </el-popover>
      </div>
      <el-row>
        <el-table :data="modelList" border style="width: 100%">
          <el-table-column prop="modelName" label="引用型号" align="center">
          </el-table-column>
          <el-table-column prop="targetObject" label="收取对象" align="center">
            <template slot-scope="scope">
              {{scope.row.targetObject=='supply'?'供方':'需方'}}
            </template>
          </el-table-column>
          <el-table-column prop="ratio" label="收取比例" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="delVersion(scope.row)" type="text" size="small">删除型号名称</el-button>
              </el-row>
              <el-row>
                <el-button @click="openPricing(scope.row)" type="text" size="small">服务定价设置</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <modelPricing3 v-if="isSetting" @close="closePricing" :openRow="openRow" :modelObj="modelObj" @refresh="getAddedModels"></modelPricing3>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    getAddedModels,
    getModelsByType3,
    addModelByType3
  } from '@/api/pricingRoleApi/pricingManagement.js'
  import modelPricing3 from '@/views/pricingRole/pricingManagement/components/modelPricing3.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  export default {
    name: "index",
    components: {
      modelPricing3,
      searchCom
    },
    props: {
      openRow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      /**
       * 收取类型
       * 0 按品类
       * 1 按供方型号
       * 2 按我方型号
       */
      collectType: {
        type: Number,
        default: 2,
      },
    },
    data() {
      return {
        isOpen: true,
		searchVal: '',
        searchResult: 0,
		searchModelVal: '',
        searchModelResult: 0,
        modelList: [],
        radioVersionList: [],
        radioVersionObj: {},
        modelObj: {},
        isSetting: false,
        radioVersion: 0,
        loading: true,
      };
    },
    methods: {
      openPricing(row) {
        this.modelObj = row
        this.isSetting = true
      },
      closePricing() {
        this.isSetting = false
      },
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      submit() {
		this.close()
      },
      search(data) {
		this.page = 1
		this.searchVal = data
        this.getAddedModels()
      },
      searchFuc(data) {
		this.page = 1
		this.searchModelVal = data
        this.getModelsByType3()
      },
      getModelList() {
        this.getModelsByType3()
      },
      saveModelList() {
        if(this.radioVersionObj.modelGuid) {
          this.addModelByType3(this.radioVersionObj.modelGuid,this.radioVersionObj.supplierGuid)
        }
      },
      chooseVersion(e) {
        console.log(e);
        console.log(this.radioVersionList);
        for (let i in this.radioVersionList) {
          if (e == this.radioVersionList[i].modelGuid) {
            this.radioVersionObj = this.radioVersionList[i]
            console.log('obj',this.radioVersionObj);
          }
        }
      },
      // web-查询可添加的型号列表-按我方型号
      async getModelsByType3() {
        await getModelsByType3({
          categoryGuid: this.openRow.categoryGuid,
          modelName: this.searchModelVal || ''
        }).then(res => {
          console.log('可添加型号', res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.radioVersionList = data
          } else {
            this.radioVersionList = []
          }
          this.searchModelResult = this.radioVersionList.length
        })
      },
      // web-查询服务费设置详情(已添加的型号列表)
      async getAddedModels() {
        await getAddedModels({
          categoryGuid: this.openRow.categoryGuid,
          supplierGuId: '',
          type: this.collectType == '1' ? 2 : 3,
          modelName: this.searchVal || ''
        }).then(res => {
          this.loading = false
          console.log('型号列表', res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.modelList = data
          } else {
            this.modelList = []
          }
          this.searchResult = this.modelList.length
        })
      },
      delVersion(row) {
        this.$confirm('确定删除' + row.modelName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteModels(row.modelGuid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 删除已添加型号
      async deleteModels(id) {
        await deleteModels({
          modelGuid: id
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.isAssign = false
            this.getAddedModels()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      },
      // 添加引用型号-按我方型号
      async addModelByType3(id,sid) {
        await addModelByType3({
          categoryGuid: this.openRow.categoryGuid,
          supplierGuId: sid,
          modelGuId: id
        }).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getAddedModels()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      }
    },
    created() {
      this.getAddedModels()
    }
  };
</script>

<style lang="scss" scoped>
</style>
