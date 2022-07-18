<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="date" label="账号名称" width="180" align='center' header-align='center' show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="name" label="归属部门" width="180" align='center' header-align='center' show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="角色名称" align='center' header-align='center' show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="操作" fixed="right" align='center' header-align='center' width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
        </template>

      </el-table-column>
    </el-table>

    <el-dialog :title='title' :visible.sync="isShow" width="700px">

      <div class="account-msg">
        <div>账户信息</div>
        <div style="padding: 20px;">
          <div class="flex jsb" style="margin-bottom: 20px;">
            <div class="flex">
              <div class="input-text">头像</div>
              <el-avatar shape="square" style='width: 100px;height: 100px;'
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <el-button v-if='isEdit' style='height: 40px;margin-left: 20px;'>上传</el-button>
            </div>
            <div class="flex">
              <div class="input-text">账号名称</div>
              <el-input type="text" value="" disabled />
            </div>
          </div>
          <div class="flex jsb">
            <div class="flex">
              <div class="input-text">密码</div>
              <el-input type="text" value="" :disabled='!isEdit' />
            </div>
            <div class="flex">
              <div class="input-text">确认密码</div>
              <el-input type="text" value="" :disabled='!isEdit' />
            </div>
          </div>
        </div>

      </div>
      <div class="role-msg">
        <div>角色信息</div>
        <div class="role-msg-main">
          <div class="flex jsb">
            <div class="flex flex1">
              <div class="input-text mr10">角色名称</div>
              <div>品类专员</div>
            </div>
            <div class="flex flex1">
              <div class="input-text mr10">归属部门</div>
              <div>华夏信融 > 信息部门</div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePop">取 消</el-button>
        <el-button type="primary" @click="submitEdit" v-if='isEdit'>确 定</el-button>
        <el-button type="primary" @click="closePop" v-else>确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        tableData: [],
		loading: true,
        isShow: false, // 控制弹窗是否打开
        isEdit: false, // 是否编辑
        title: '', // 弹窗的标题,
        attache: {
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          accountName: '品类专员',
          password: '',

        },
      };
    },
    methods: {
      edit(row) {
        console.log('编辑');
        this.title = '用户编辑'
        this.isShow = true
        this.isEdit = true
      },
      check(row) {
        console.log('查看');
        this.isEdit = false
        this.title = '用户查看'
        this.isShow = true
      },
      closePop() {
        this.isShow = false
        this.isEdit = false
      },
      submitEdit() {
        console.log('提交数据');
      },

      testPop() {
        console.log('触发哈哈哈');
      },

    },
    onLoad() {},
  };
</script>

<style lang="scss">
  .account-msg {
    .input-text {
      width: 85px;
    }
  }

  .role-msg {
    .role-msg-main {
      padding: 20px 0;
    }
  }

  .list {
    list-style: none;

    .drag-move {
      transition: transform 0.3s;
    }

    .list-item {
      cursor: move;
      width: 300px;
      // background: #EA6E59;
      border-radius: 4px;
      color: #333;
      margin-bottom: 6px;
      // height: 50px;
      // line-height: 50px;
      text-align: center;
    }
  }
</style>
