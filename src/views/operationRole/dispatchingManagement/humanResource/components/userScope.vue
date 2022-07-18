<template>
  <el-dialog title="用户范围" width="700px" :visible.sync="isScope" destroy-on-close @close="beforeClose">
    <div class="flex flex-center">
      <div class="text-box">注册情况</div>
      <el-radio-group v-model="radioRegister" @change="changeRegister">
        <el-radio class="radio-box" :label="1" value="已注册">已注册</el-radio>
        <el-radio class="radio-box" :label="0" value="未注册">未注册</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">引导专员发展情况</div>
      <el-radio-group v-model="radioGuide" @change="changeGuide">
        <el-radio class="radio-box" :label="1">是引导专员</el-radio>
        <el-radio class="radio-box" :label="0">不是引导专员</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">是否有引导专员情况</div>
      <el-radio-group v-model="radioHaveGuide" @change="changeHaveGuide">
        <el-radio class="radio-box" :label="1">有引导专员</el-radio>
        <el-radio class="radio-box" :label="0">没有引导专员</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">供应成果情况</div>
      <el-radio-group v-model="radioSupplyResult" @change="changeSupplyResult">
        <el-radio class="radio-box" :label="1">有供应成果</el-radio>
        <el-radio class="radio-box" :label="0">没有供应成果</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">采购成果情况</div>
      <el-radio-group v-model="radioPurchaseResult" @change="changePurchaseResult">
        <el-radio class="radio-box" :label="1">有采购成果</el-radio>
        <el-radio class="radio-box" :label="0">没有采购成果</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">认领情况</div>
      <el-radio-group v-model="radioClaim" @change="changeClaim">
        <el-radio class="radio-box" :label="2">可认领</el-radio>
        <el-radio class="radio-box" :label="1">已认领</el-radio>
        <el-radio class="radio-box" :label="3">解绑回收</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">添加情况</div>
      <el-radio-group v-model="radioAdd" @change="changeAdd">
        <el-radio class="radio-box" :label="1">引导专员添加</el-radio>
        <el-radio class="radio-box" :label="2">用户自主添加</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">角色类型情况</div>
      <el-radio-group v-model="radioRole" @change="changeRole">
        <el-radio class="radio-box" :label="role.dictValue" v-for="(role,index) in roleList" :key="index">{{role.dictLabel}}</el-radio>
      </el-radio-group>
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
    props: {
      param: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isScope: true,
        radioRegister: -1,
        radioGuide: -1,
        radioHaveGuide: -1,
        radioSupplyResult: -1,
        radioPurchaseResult: -1,
        radioClaim: -1,
        radioAdd: -1,
        radioRole: -1,
        roleList: [],
        // param: {
        //   registerFlag: '',
        //   guideNum: '',
        //   guidedFlag: '',
        //   supplyFlag: '',
        //   purchaseFlag: '',
        //   guidedStatus: '',
        //   guideSoure: '',
        //   userTag: '',
        // } ,//请求参数
        chooseNum: 0, // 选中数量
        chooseCondition: [], // 选中条件
      };
    },
    methods: {
      // 新建类名
      close() {
        this.isScope = false
        this.$emit('close')
      },
      beforeClose() {
        this.$emit('close')
      },
      changeRegister(val) {
        console.log(val);
        this.param.registerFlag = val
      },
      changeGuide(val) {
        this.param.guideFlag = val
      },
      changeHaveGuide(val) {
        this.param.guidedFlag = val
      },
      changeSupplyResult(val) {
        this.param.supplyFlag = val
      },
      changePurchaseResult(val) {
        this.param.purchaseFlag = val
      },
      changeClaim(val) {
        this.param.guidedStatus = val
      },
      changeAdd(val) {
        this.param.guideSoure = val
      },
      changeRole(val) {
        this.param.userTag = val
      },
      submit() {
        let param = this.param
        let arr = Object.keys(param)
        arr.splice(8,7)
        console.log('arr',arr);
        let chooseNum = 0
        for (let i in arr) {
          if(param[arr[i]] !== '') {
            console.log(param[arr[i]])
            chooseNum++
          }
        }
        console.log(chooseNum);
        // if (chooseNum<=0) {
        //   this.$message("请选择筛选项")
        //   return
        // }
        if(this.param.registerFlag!=='') {
          if (this.param.registerFlag == 1) {
            this.chooseCondition.push('已注册')
          } else {
            this.chooseCondition.push('未注册')
          }
        }
        if(this.param.guideFlag!=='') {
          if (this.param.guideFlag == 1) {
            this.chooseCondition.push('是引导专员')
          } else {
            this.chooseCondition.push('不是引导专员')
          }
        }
        if(this.param.guidedFlag!=='' ) {
          if (this.param.guidedFlag == 1) {
            this.chooseCondition.push('有引导专员')
          } else {
            this.chooseCondition.push('没有引导专员')
          }
        }
        if(this.param.supplyFlag!=='') {
          if (this.param.supplyFlag == 1) {
            this.chooseCondition.push('有供应成果')
          } else {
            this.chooseCondition.push('没有供应成果')
          }
        }
        if(this.param.purchaseFlag!=='') {
          if (this.param.purchaseFlag == 1) {
            this.chooseCondition.push('有采购成果')
          } else {
            this.chooseCondition.push('没有采购成果')
          }
        }
        if(this.param.guidedStatus!=='') {
          if (this.param.guidedStatus == 1) {
            this.chooseCondition.push('已认领')
          } else if(this.param.guidedStatus == 2) {
            this.chooseCondition.push('可认领')
          } else {
            this.chooseCondition.push('解绑回收')
          }
        }
        if(this.param.guideSoure!=='') {
          if (this.param.guideSoure == 1) {
            this.chooseCondition.push('引导专员添加')
          } else {
            this.chooseCondition.push('用户自主添加')
          }
        }
        if(this.param.userTag!=='') {
          for (let i in this.roleList) {
            if(this.param.userTag == this.roleList[i].dictSort) {
              this.chooseCondition.push(this.roleList[i].dictLabel)
            }
          }
        }
        let roleString = this.chooseCondition.join(',')
        let chooseData = {
          roleString: roleString,
          chooseNum: chooseNum
        }
        console.log(roleString);
        this.$emit('submit',param)
        this.$emit('getChooseCondition',chooseData)
        this.$emit('close')

      },
      getRoleList() {
        // 从字典获取角色类型
        this.getDicts("user_tag").then(response => {
          this.roleList = response.Tag
          console.log(this.roleList);
          this.radioRole = this.param.userTag
          console.log(this.radioRole);
        });
      }
    },
    mounted() {
      console.log(this.param);
      this.radioRegister = this.param.registerFlag
      this.radioGuide = this.param.guideFlag
      this.radioHaveGuide = this.param.guidedFlag
      this.radioSupplyResult = this.param.supplyFlag
      this.radioPurchaseResult = this.param.purchaseFlag
      this.radioClaim = this.param.guidedStatus
      this.radioAdd = this.param.guideSoure
      this.getRoleList()
    }
  };
</script>

<style lang="scss">
  .text-box {
    width: 150px;
    padding: 10px 0;
    flex-shrink: 0;
  }
  .radio-box {
    width: 140px;
    padding: 10px 0;
  }
</style>
