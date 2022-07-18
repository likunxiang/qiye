<template>
  <el-dialog title="编辑品类别名" width="700px" :visible.sync="isNew" destroy-on-close @close="beforeClose">
    <div class="input-box">
      <div class="flex flex-center">
        <div class="input-text">品类名称</div>
        <div>{{editRow.categoryName}}</div>
      </div>
      <div class="flex mt20">
        <div style="height: 32px;line-height: 32px;flex-shrink: 0;width: 100px;">品类别名</div>
        <div>
          <div class="flex flex-center mb20" v-for="(item,index) in newNameList" :key="index">
            <el-input class="mr20" style="width: 240px;" type="text" v-model="item.newName" placeholder="请输入这个品类另外的叫法" />
            <div class="el-icon-circle-plus fs26" v-if="index == 0" @click="addName"></div>
            <div class="el-icon-remove fs26" v-else @click="removeName(index)"></div>
          </div>

        </div>

      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeNew">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { getAliasByGuid,updateAliasByCGuid } from '@/api/categoryRole/giveClass.js'
  export default {
    name: "newClassName",
    props: {
      editRow: {
        type: Object,
        default:() => {
          return {}
        }
      }
    },
    data() {
      return {
        newName: '',
        isNew: true,
        newNameList: [
          {
            newName: ''
          }
        ]
      };
    },
    methods: {
      // 新建类名
      closeNew() {
        this.isNew = false
        this.$emit('closeNew')
      },
      submit() {
        this.updateAliasByCGuid()
        this.$emit('closeNew')

      },
      beforeClose() {
        console.log(999);
        this.$emit('closeNew')
      },
      // 增加别名
      addName() {
        this.newNameList.push({
          newName: ''
        })
        console.log(this.newNameList);
      },
      // 删除别名
      removeName(index) {
        this.newNameList.splice(index,1)
      },
      getAliasByGuid() {
        getAliasByGuid({
          categoryGuid: this.editRow.guid
        }).then(res => {
          console.log(res);
          let data = res.Tag[0].Table[0]
          if (data.alias) {
            let arr = data.alias.split(",")
            let newNameList = []
            for(let i in arr) {
              newNameList.push({
                newName: arr[i]
              })
            }
            console.log(newNameList);
            this.newNameList = newNameList
          }
        })
      },
      updateAliasByCGuid() {
        let arr = this.newNameList
        let newArr = []
        for (let i in arr) {
          for (let j in arr[i]) {
            newArr.push(arr[i][j])
          }
        }
        let paramsString = newArr.toString()
        console.log(newArr.toString());
        updateAliasByCGuid({
          categoryGuid: this.editRow.guid,
          aliasName: paramsString
        }).then(res => {
          if(res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.$emit('refresh')
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            });
          }
          
        })
      }
    },
    mounted() {
      this.getAliasByGuid()
    }
  };
</script>

<style lang="scss">
</style>
