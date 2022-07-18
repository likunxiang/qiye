<template>
  <el-dialog title="选择存留时长" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <div class="p20">
      <el-radio-group v-model="radio">
        <el-row v-for="(item,index) in timeList" :key="index">
          <el-radio :label="item.value">{{item.label}}</el-radio>
        </el-row>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        radio: 9999999,
        timeList: [{
            value: 90,
            label: '90天以上'
          },
          {
            value: 120,
            label: '120天以上'
          },
          {
            value: 180,
            label: '180天以上'
          },
          {
            value: 270,
            label: '270天以上'
          },
          {
            value: 360,
            label: '90天以上'
          }
        ]
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
      submit() {
        let time = this.radio
        this.$emit('getTime',time)
        this.close()
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
