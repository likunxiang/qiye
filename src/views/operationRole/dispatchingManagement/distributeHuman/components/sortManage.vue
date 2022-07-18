<template>
  <el-dialog style="margin-top: 30vh !important;" title="排序管理" width="400px" :visible.sync="isOpen" destroy-on-close append-to-body @close="beforeClose">
    <div>
      <div class="mb10 flex flex-center jsb" @click="chooseGuide(index)" v-for="(item,index) in resultList" :key="index">
        <div>{{item.label}}</div>
        <div class="el-icon-check" v-if="item.checked"></div>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="mb10 flex flex-center jsb" @click="chooseSort(index)" v-for="(item,index) in sortList" :key="index">
        <div>{{item.label}}</div>
        <div class="el-icon-check" v-if="item.checked"></div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        resultList: [
          {
            label: '引导成果',
            value: 'guideNum',
            checked: true
          },{
            label: '供应成果',
            value: 'supplyNum',
            checked: false
          },{
            label: '采购成果',
            value: 'purchaseNum',
            checked: false
          }
        ],
        sortList: [
          {
            label: '递减',
            value: 'desc',
            checked: true
          },
          {
            label: '递增',
            value: '',
            checked: false
          },
        ],
        screenRadio: 'guideNum',
        sortRadio: 'desc',
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
      submit() {
        this.$emit('close')
        let data = this.screenRadio + ' ' + this.sortRadio
        this.$emit('sortFun',data)
      },

      chooseGuide(index) {
        this.screenRadio = this.resultList[index].value
        for(let i in this.resultList) {
          if(i == index) {
            this.$set(this.resultList[i], 'checked', true)
          } else {
            this.$set(this.resultList[i], 'checked', false)
          }
        }
      },
      chooseSort(index) {
        this.sortRadio = this.sortList[index].value
        for(let i in this.sortList) {
          if(i == index) {
            this.$set(this.sortList[i], 'checked', true)
          } else {
            this.$set(this.sortList[i], 'checked', false)
          }
        }
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss" scoped="">
  .mt40 {
  	margin-top: 40vh !important;
  }
</style>
