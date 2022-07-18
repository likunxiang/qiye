<template>
  <el-dialog title="引导合格标准设置" :visible.sync="isOpen" @close="beforeClose" width="700px">
    <el-row v-for="(item,index) in certerion" :key="index">
      <div class="title-bg mb10">{{item.phaseName+" "+item.phaseTitle}}</div>
      <el-descriptions :colon="false" class="margin-top" :column="1">
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="引导目标">是
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="权限时间">
          <el-input-number size="mini" v-model="item.effectiveDays"
            @change="handleChange(item.gcriterionId,item.effectiveDays)" :min="1" :max="99" label="描述文字">
          </el-input-number>
          <span class="ml0">天</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
  </el-dialog>
</template>

<script>
  import {
    getCerterion,
    updateCerterion
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        num: 1,
        certerion: [],
        changeList: [], // 修改的内容
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
        for(let i in this.changeList) {
          this.updateCerterion(this.changeList[i])
        }
        this.close()
      },
      handleChange(id, num) {
        console.log('num', num)
        console.log('id', id)
        console.log(222);
        for(let i in this.changeList) {
          if (this.changeList[i].gcriterionId == id) {
            this.changeList.splice(i,1)
          }
        }
        this.changeList.push({
          effectiveDays: num,
          gcriterionId: id,

        })
        console.log(this.changeList);
      },
      // 获取合格引导标准
      async getCerterion() {
        await getCerterion().then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.certerion = res.Tag[0].Table
          } else {
            this.certerion = []
          }
          console.log(this.certerion);
        })
      },
      // 循环修改
      async updateCerterion(obj) {
        await updateCerterion(obj).then()
      }
    },
    mounted() {
      this.getCerterion()
    }
  };
</script>

<style lang="scss" scoped>
  .title-bg {
    background-color: #F2F2F2;
    padding: 10px;
  }

  .my-label {
    width: 120px;
    font-weight: bold;
  }

  .my-content {
    text-align: right;
    color: #324157;
    flex: 1;
  }
</style>
