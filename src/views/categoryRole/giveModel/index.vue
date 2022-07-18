<template>
  <el-container direction="vertical">
    <el-main>
      <div>从供方提交的数据库中导出EXCEL进行二次使用</div>
      <div class="flex flex-center mt20">
        <div>品类名称</div>
        <el-popover placement="bottom" width="200" trigger="manual" v-model="isOpen">
          <classTree @close="closeTree" @save="saveClass"></classTree>
          <el-input slot="reference" placeholder="请选择" v-model="classCheckObj.name" style="width: 200px;margin-left:20px;" :readonly='true' @focus="openTree">
            <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="openTree">
              </i>
          </el-input>
        </el-popover>


      </div>
      <div class="mt20">请选择需要这个品类哪些内容</div>
      <el-checkbox-group v-model="classCheckList" @change="isDisabled">
        <el-row>
          <el-checkbox class="mt20" label="型号名称"></el-checkbox>
        </el-row>
        <el-row>
          <el-checkbox class="mt20" label="品牌信息"></el-checkbox>
        </el-row>
      </el-checkbox-group>
    </el-main>

    <el-footer>
      <el-button type="primary" :disabled="disabled" @click="exportData">导出</el-button>
    </el-footer>
  </el-container>

</template>

<script>
  import classTree from '@/views/categoryRole/giveModel/components/classTree.vue'
  import { exportSupplyModels,exportSupplyBrandNames,exportSModelsAndBNames } from '@/api/categoryRole/categoryCommon.js'
  export default {
    name: "index",
    components: {
      classTree
    },
    data() {
      return {
        searchVal: '',
        isOpen: false,
        classCheckObj: {},
        classCheckList: [],
        disabled: true,
        loadingPop: '',
      };
    },
    methods: {
      openTree() {
        this.isOpen = true
      },
      closeTree() {
        this.isOpen = false
        this.isDisabled()
      },
      saveClass(data) {
        this.classCheckObj = data
        this.closeTree()
      },
      isDisabled() {
        if (this.classCheckObj.guid && this.classCheckList.length) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },
      handleNodeClick(data) {
        this.searchVal = data.label
      },
      exportData() {
        const categoryGuid = this.classCheckObj.guid
        const OutputFileName = '文件名' + this.getNowTime() + '.csv'
        const loading = this.$loading({
          lock: true,
          text: '文件导出中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const classCheckList = this.classCheckList 
        const listLength = classCheckList.length
        if (listLength == 1) {
          if(classCheckList[0] == '型号名称') {
            exportSupplyModels(categoryGuid,OutputFileName).then(res => {
              console.log(res);
              loading.close();
              if (res.OK === 'True') {
                this.DonwLoadFile(OutputFileName)
              } else {
                this.$message('导出失败')
              }
            })
          } else {
            exportSupplyBrandNames(categoryGuid,OutputFileName).then(res => {
              console.log(res);
              loading.close();
              if (res.OK === 'True') {
                this.DonwLoadFile(OutputFileName)
              } else {
                this.$message('导出失败')
              }
            })
          }
        } else {
          exportSModelsAndBNames(categoryGuid,OutputFileName).then(res => {
            console.log(res);
            loading.close();
            if (res.OK === 'True') {
              this.DonwLoadFile(OutputFileName)
            } else {
              this.$message('导出失败')
            }
          })
        }
        
        // TODO
        this.loadingPop = loading
      },
      // 获取当前时间
      getNowTime() {
        let dateTime
        const yy = new Date().getFullYear()
        const mm = new Date().getMonth() + 1
        const dd = new Date().getDate()
        const hh = new Date().getHours()
        const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
        const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
        dateTime = yy + '' + mm + '' + dd + '' + hh + '' + mf + '' + ss
        return dateTime
      },
      // 下载报表
      DonwLoadFile(fileName) {
        window.location.href = 'http://service.xiaofeizzj.com/Enclosure/' + fileName
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss">
  .el-footer {
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    color: #333;
    height: 500px;
  }
</style>
