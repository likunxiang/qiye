<template>
  <el-dialog v-loading="loading" title="筛选方式添加" :visible.sync="isOpen" width="700px" @close="beforeClose"
    append-to-body>
    <div class="total">总人数{{pageTotal}}，符合筛选条件{{suitableTotal}}.</div>
    <div class="flex flex-center">
      <div class="text-box">供应品类名称</div>
      <div class="flex flex-center">
        <el-button type="primary" :disabled="chooseClass.length?true:false" @click="openClass">选择供应品类名称</el-button>
        <div class="flex flex-center ml10" v-if="chooseClass.length">
          <div>{{chooseClass[0].name}}</div>
          <div class="ml10" @click="delClass"><i class="el-icon-close"></i></div>
        </div>
      </div>
    </div>
    <div class="flex flex-center">
      <div class="text-box">注册情况</div>
      <el-radio-group v-model="radioRegister" @change="changeRegister">
        <el-radio class="radio-box" :label="1">已注册</el-radio>
        <el-radio class="radio-box" :label="2">未注册</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">引导专员发展情况</div>
      <el-radio-group v-model="radioGuide" @change="changeGuide">
        <el-radio class="radio-box" :label="1">是引导专员</el-radio>
        <el-radio class="radio-box" :label="2">不是引导专员</el-radio>
      </el-radio-group>
    </div>
    <!-- <div class="flex flex-center">
      <div class="text-box">是否有引导专员情况</div>
      <el-radio-group v-model="radioHaveGuide" @change="changeHaveGuide">
        <el-radio class="radio-box" :label="1">有引导专员</el-radio>
        <el-radio class="radio-box" :label="2">没有引导专员</el-radio>
      </el-radio-group>
    </div> -->
    <div class="flex flex-center">
      <div class="text-box">供应成果情况</div>
      <el-radio-group v-model="radioSupplyResult" @change="changeSupplyResult">
        <el-radio class="radio-box" :label="1">有供应成果</el-radio>
        <el-radio class="radio-box" :label="2">没有供应成果</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">采购成果情况</div>
      <el-radio-group v-model="radioPurchaseResult" @change="changePurchaseResult">
        <el-radio class="radio-box" :label="1">有采购成果</el-radio>
        <el-radio class="radio-box" :label="2">没有采购成果</el-radio>
      </el-radio-group>
    </div>
    <div class="flex flex-center">
      <div class="text-box">认领情况</div>
      <el-radio-group v-model="radioClaim" @change="changeClaim">
        <el-radio class="radio-box" :label="1">可认领</el-radio>
        <el-radio class="radio-box" :label="2">已认领</el-radio>
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
        <el-radio class="radio-box" :label="role.dictValue" v-for="(role,index) in roleList" :key="index">
          {{role.dictLabel}}
        </el-radio>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
    <!-- 选择类名 -->
    <el-dialog title="筛选方式添加" :visible.sync="isClass" width="700px" @close="beforeCloseClass" append-to-body>
      <!-- <el-row style="padding-bottom: 20px;">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-row> -->
      <el-row style="padding-bottom: 20px;">
        <classTree @save="saveClass"></classTree>
      </el-row>
    </el-dialog>
    <!-- 选择类名 end -->
  </el-dialog>
</template>

<script>
  import {
    getTakeBackTotalNum,
    getTakeBackListByMulCon,
    insertTakeBackUser
  } from '@/api/operationRoleApi/dispatchingManagementApi.js'
  import classTree from '@/views/categoryRole/giveModel/components/classTree.vue'
  export default {
    name: "index",
    components: {
      classTree
    },
    props: {
      row: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isOpen: true,
        isClass: false,
        loading: true,
        radioRegister: 0,
        radioGuide: 0,
        // radioHaveGuide: 0,
        radioSupplyResult: 0,
        radioPurchaseResult: 0,
        radioClaim: 0,
        radioAdd: 0,
        radioRole: -1,
        roleList: [],
        param: {
          registerFlag: '',
          guideFlag: '',
          // guidedFlag: '',
          supplyFlag: '',
          purchaseFlag: '',
          guideSoure: '',
          userTag: '',
          categoryGuid: ''
        },
        pageTotal: 0, // 总回收数
        suitableTotal: 0, // 合适的回收数
        suitableList: [], // 接口请求获取合适的用户列表
        insertList: [], // 合适用户 -- 将要请求接口的数组
        chooseClass: [],
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
      saveClass(data) {
        console.log(data);
        this.closeClass()
        this.chooseClass.push(data)
        this.param.categoryGuid = data.guid
        this.getTakeBackTotalNum()
      },
      changeRegister(val) {
        console.log(val);
        this.param.registerFlag = val == 1 ? 1 : 0
        console.log(this.param.registerFlag);
        this.getTakeBackTotalNum()
      },
      changeGuide(val) {
        this.param.guideNum = val == 1 ? 1 : 0
        this.getTakeBackTotalNum()
      },
      // changeHaveGuide(val) {
      //   this.param.guidedFlag = val == 1 ? 1 : 0
      //   this.getTakeBackTotalNum()
      // },
      changeSupplyResult(val) {
        this.param.supplyFlag = val == 1 ? 1 : 0
        this.getTakeBackTotalNum()
      },
      changePurchaseResult(val) {
        this.param.purchaseFlag = val == 1 ? 1 : 0
        this.getTakeBackTotalNum()
      },
      changeClaim(val) {
        this.param.guidedStatus = val == 1 ? 2 : (val == 2 ? 1 : 3)
        this.getTakeBackTotalNum()
      },
      changeAdd(val) {
        this.param.guideSoure = val == 1 ? 1 : 2
        this.getTakeBackTotalNum()
      },
      changeRole(val) {
        this.param.userTag = val
        this.getTakeBackTotalNum()
      },
      submit() {
        let suitableList = this.suitableList
        if (this.suitableTotal > 0) {
          let arr = []
          for(let i in suitableList) {
            let obj = {
              targetUserId: this.row.userId,
              phonenumber: suitableList[i].phonenumber,
              userName: suitableList[i].userName,
              nation: suitableList[i].nation
            }
            arr.push(obj)
          }
          this.insertList = arr
          this.insertTakeBackUser()
        } else {
          this.close()
        }


      },
      openClass() {
        this.isClass = true
      },
      closeClass() {
        this.isClass = false
      },
      beforeCloseClass() {
        this.closeClass()
      },

      // 点击某个内容
      handleNodeClick(data) {
        console.log(data);
        if (data.children) {
          return
        } else {
          this.closeClass()
          this.chooseClass.push(data)
          this.param.categoryGuid = data.id
          this.getTakeBackTotalNum()
        }
      },

      getRoleList() {
        console.log(999);
        // 从字典获取角色类型
        // axios.defaults.baseURL = '/stage-api'
        this.getDicts("user_tag").then(response => {
          this.roleList = response.Tag
          console.log(this.roleList);
        });
      },
      // 删除选中类名
      delClass() {
        this.chooseClass = []
      },
      async getTakeBackTotalNum() {
        this.getTakeBackListByMulCon()
        this.loading = true
        await getTakeBackTotalNum(this.param).then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.pageTotal = res.Tag[0].Table[0].count
          } else {
            this.pageTotal = 0
          }
          this.loading = false
        })
      },
      // 获取 筛选后的数量 网络请求
      async getTakeBackListByMulCon() {
        await getTakeBackListByMulCon(this.param).then(res => {
          console.log(res);
          if (res.Tag.length) {
            this.suitableList = res.Tag[0].Table
            this.suitableTotal = res.Tag[0].Table.length
          } else {
            this.suitableList = []
            this.suitableTotal = 0
          }


        })
      },
      // 添加 网络请求
      async insertTakeBackUser() {
        await insertTakeBackUser(this.insertList).then(res => {
          if (res.OK == "True") {
            this.close()
            // this.
            this.$emit('refresh')
          }
        })
      }
    },
    mounted() {
      this.getRoleList()
      this.getTakeBackTotalNum()
    }
  };
</script>

<style lang="scss" scoped>
  .total {
    position: absolute;
    top: 22px;
    left: 170px;
  }

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
