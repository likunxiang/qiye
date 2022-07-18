<template>
  <div class="app-container" v-if="loading">
    <el-row>
      <span class="bold">品类名称：</span>
      <span class="ml10">{{openRow.categoryName}}</span>
    </el-row>
    <el-row>
      <el-row class="mt20 flex">
        <div class="bold mr20">板块名称</div>
        <div class="">{{tableData[0].plateName}}</div>
      </el-row>
      <el-row class="mt10 flex">
        <div class="bold mr20">板块类型</div>
        <div class="">{{tableData[0].plateTypeName}}</div>
      </el-row>
    </el-row>
    <el-row class="mt20">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="字段名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.plateFieldName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="nameFrom" label="字段名称来源" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.plateFieldSource=="1"?'固化':'自建'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="contentFrom" label="字段内容来源" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.plateFieldContentSource > 0" class="el-icon-check"></p>
            <p v-else class="">未设置</p>
          </template>
        </el-table-column>
        <el-table-column prop="demander" label="供方操作设置" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.operation > 0" class="el-icon-check"></p>
            <p v-else class="">未设置</p>
          </template>
        </el-table-column>
        <el-table-column prop="fieldMessage" label="字段内容管理" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.plateFieldContentSource=='3' || scope.row.plateFieldContentSource=='4'" class="el-icon-check">
            </p>
            <p v-else-if="scope.row.content==='1'" class="el-icon-check"></p>
            <p v-else class="">未设置</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="openContentFrom(scope.row,scope.$index)" type="text" size="small">内容来源设置</el-button>
            </el-row>
            <el-row>
              <el-button @click="openDemander(scope.row,scope.$index)" type="text" size="small">需方操作设置</el-button>
            </el-row>
            <el-row>
              <el-button @click="openFieldMessage(scope.row,scope.$index)" type="text" size="small">字段内容管理</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 内容来源配置 -->
    <contentSources v-if="isContentFrom" :categoryName="openRow.categoryName" :fieldObj="tableData[0]"
      @close="closeContentFrom" @refresh="getPlateFieldContents" :bizType="this.openRow.bizType"></contentSources>

    <!-- 需方操作设置 -->
    <userOperation v-if="isDemander" :type="openRow.catTreeCode" :categoryName="openRow.categoryName" :fieldObj="tableData[0]"
      @close="closeDemander" @refresh="getPlateFieldContents" :bizType="this.openRow.bizType"></userOperation>

    <!-- 字段内容管理 -->
    <fieldContentManagement v-if="isFieldMessage" :type="openRow.catTreeCode" :categoryName="openRow.categoryName"
      :fieldObj="tableData[0]" @close="closeFieldMessage" @refresh="getPlateFieldContents" :bizType="this.openRow.bizType"></fieldContentManagement>
  </div>
</template>

<script>
  import {
    getPlateFieldContents,
    setPlateFieldContentSource,
    setSDOperation,
    setPlateFieldContent,
    deletePlateFieldContent
  } from '@/api/modelRoleApi/tradingContent.js'
  import contentSources from '@/views/modelRole/tradingContent/components/contentSources.vue' // 内容来源设置
  import userOperation from '@/views/modelRole/tradingContent/components/userOperation.vue' // 供/需方操作设置
  import fieldContentManagement from '@/views/modelRole/tradingContent/components/fieldContentManagement.vue' // 供/需方操作设置
  export default {
    name: "index",
    components: {
      contentSources,
      userOperation,
      fieldContentManagement
    },
    data() {
      return {
        openRow: {},
        tableData: [],
        loading: false,
        isContentFrom: false,
        contentFromList: [],
        radioContent: 0,
        // 需方操作设置
        isDemander: false,
        demanderList: [{
            id: 1,
            name: '字段内容固化库'
          },
          {
            id: 2,
            name: '需方'
          },
        ],
        radioDemander: 0,
        contentFromWay: 2, // 1是字段内容固化  2是需方
        inputDemander: '',
        // 字段内容管理
        isFieldMessage: false,
      };
    },
    mounted() {
      this.openRow = this.$route.query
      console.log('openRow', this.openRow);
      this.getPlateFieldContents()
    },
    methods: {
      // 获取表单信息
      async getPlateFieldContents() {
        await getPlateFieldContents({
          plateFieldGuid: this.openRow.plateFieldGuid,
          catTreeCode: this.openRow.type || this.openRow.catTreeCode,
          bizType: this.openRow.bizType,
          categoryGuid: this.openRow.categoryGuid,
        }).then(res => {
          this.loading = true
          console.log(res);
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
          } else {
            this.tableData = []
          }
        })
      },
      deltips() {
        this.$alert('该字段名称未关联完整，请先关联完整再处理。', {
          confirmButtonText: '知道了',
          showClose: true,
          center: true,
          callback: action => {
            console.log('成功回调');
          }
        });
      },
      //
      openContentFrom(row) {
        this.isContentFrom = true
        // 固化和自建的选项不同
        if (this.tableData[0].plateFieldSource === "1") {
          this.contentFromList = [{
              id: 1,
              name: '字段内容固化库'
            },
            {
              id: 3,
              name: '需方'
            }
          ]
        } else {
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
      },
      closeContentFrom() {
        this.isContentFrom = false
        this.getPlateFieldContents()
      },
      submitContentFrom() {
        this.setPlateFieldContentSource()
        this.isContentFrom = false
      },
      // 设置字段内容来源
      async setPlateFieldContentSource() {
        console.log('字段内容来源', this.radioContent);
        return
        await setPlateFieldContentSource({
          plateFieldGuid: this.tableData[0].plateFieldGuid,
          contentSource: this.radioContent
        }).then(res => {
          console.log(res);
          this.getPlateFieldContents()
        })
      },
      openDemander() {
        this.isDemander = true
      },
      closeDemander() {
        this.isDemander = false
        this.getPlateFieldContents()
      },
      submitDemander() {
        this.isDemander = false
      },
      openFieldMessage() {
        this.isFieldMessage = true
      },
      closeFieldMessage() {
        this.isFieldMessage = false
        this.getPlateFieldContents()
      },
      submitFieldMessage() {
        this.isFieldMessage = false
      }
    },
  };
</script>

<style lang="scss">
</style>
