<template>
  <div class="app-container">
    <div class="org-achievement">
      <div class="org-achievement-item">
        <div class="title-bg">机构权限状态</div>
        <el-descriptions :colon="false" class="margin-top" :column="1" :border="true">
          <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构数量">300
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="org-achievement-item">
        <div class="title-bg">机构签约状态</div>
        <el-descriptions :colon="false" class="margin-top" :column="1" :border="true">
          <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构未签约数量">
            <el-button type="text" class="self-button" @click="openOrg('signNot')">300</el-button>
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构签约过数量">
            <el-button type="text" class="self-button" @click="openOrg('sign')">300</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="org-achievement-item">
        <div class="title-bg">机构注册状态</div>
        <el-descriptions :colon="false" class="margin-top" :column="1" :border="true">
          <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构未注册数量">
            <el-button type="text" class="self-button" @click="openOrg('registerNot')">300</el-button>
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构注册数量">
            <el-button type="text" class="self-button" @click="openOrg('register')">300</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="org-achievement-item">
        <div class="title-bg">机构添加品类状态</div>
        <el-descriptions :colon="false" class="margin-top" :column="1" :border="true">
          <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="已添加品类机构数量">
            <el-button type="text" class="self-button" @click="openOrg('category')">300</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>

    </div>

    <orgGetNot v-if="getNot" @close="closeOrg('getNot')"></orgGetNot>
    <orgGet v-if="get" @close="closeOrg('get')"></orgGet>
    <orgSignNot v-if="signNot" @close="closeOrg('signNot')"></orgSignNot>
    <orgSign v-if="sign" @close="closeOrg('sign')"></orgSign>
    <orgRegisterNot v-if="registerNot" @close="closeOrg('registerNot')"></orgRegisterNot>
    <orgRegister v-if="register" @close="closeOrg('register')"></orgRegister>
    <orgCategory v-if="category" @close="closeOrg('category')"></orgCategory>
    <orgPick v-if="pick" @close="closeOrg('pick')"></orgPick>
    <orgOrder v-if="order" @close="closeOrg('order')"></orgOrder>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>

<script>
  import pages from '@/views/components/common/pages'
  import orgGetNot from '@/views/choseManager/managerAchievement/components/orgGetNot'
  import orgGet from '@/views/choseManager/managerAchievement/components/orgGet'
  import orgSignNot from '@/views/choseManager/managerAchievement/components/orgSignNot'
  import orgSign from '@/views/choseManager/managerAchievement/components/orgSign'
  import orgRegisterNot from '@/views/choseManager/managerAchievement/components/orgRegisterNot'
  import orgRegister from '@/views/choseManager/managerAchievement/components/orgRegister'
  import orgCategory from '@/views/choseManager/managerAchievement/components/orgCategory'
  import orgPick from '@/views/choseManager/managerAchievement/components/orgPick'
  import orgOrder from '@/views/choseManager/managerAchievement/components/orgOrder'
  export default {
    name: "index",
    components: {
      pages,
      orgGetNot,
      orgGet,
      orgSignNot,
      orgSign,
      orgRegisterNot,
      orgRegister,
      orgCategory,
      orgPick,
      orgOrder
    },
    data() {
      return {
        loading: false,
        tableData: [],
        openRow: {},
        page: 1,
        pageTotal: 0,
        getNot: false,
        get: false,
        signNot: false,
        sign: false,
        registerNot: false,
        register: false,
        category: false,
        pick: false,
        order: false,
      };
    },
    methods: {
      changePage(page) {
        this.page = page
        //
      },
      openOrg(type) {
        console.log('open' + type);
        if (type == 'getNot') {
          this.getNot = true
        } else if (type == 'get') {
          this.get = true
        } else if (type == 'signNot') {
          this.signNot = true
        } else if (type == 'sign') {
          this.sign = true
        } else if (type == 'registerNot') {
          this.registerNot = true
        } else if (type == 'register') {
          this.register = true
        } else if (type == 'category') {
          this.category = true
        } else if (type == 'pick') {
          this.pick = true
        } else if (type == 'order') {
          this.order = true
        }
      },
      closeOrg(type) {
        console.log('close' + type);
        if (type == 'getNot') {
          this.getNot = false
        } else if (type == 'get') {
          this.get = false
        } else if (type == 'signNot') {
          this.signNot = false
        } else if (type == 'sign') {
          this.sign = false
        } else if (type == 'registerNot') {
          this.registerNot = false
        } else if (type == 'register') {
          this.register = false
        } else if (type == 'category') {
          this.category = false
        } else if (type == 'pick') {
          this.pick = false
        } else if (type == 'order') {
          this.order = false
        }
      },
    },
    created() {

    }
  }
</script>

<style lang="scss">
  .title-bg {
    width: 100%;
    padding: 10px 0;
    background-color: #D7D7D7;
    margin-bottom: 20px;
  }

  .org-achievement {
    .org-achievement-item {
      margin-bottom: 20px;

      .my-label {
        width: 200px;
        text-align: center;
      }

      .my-content {
        width: 200px;
        text-align: center;
      }

      .self-button {
        padding: 0px;
        text-decoration: underline;
      }
    }

  }
</style>
