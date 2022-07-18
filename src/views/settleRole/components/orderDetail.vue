<template>
  <el-dialog width="900px" :visible.sync="isOrderDetail" append-to-body destroy-on-close
    @close="beforeCloseOrderDetail">
    <template slot="title">
      <div class="flex jsb" style="padding-right: 30px;">
        <div>订单详情</div>
        <div @click="openLogistics" v-if="false">查看物流进度</div>
      </div>
    </template>
    <div class="flex flex-center jsb mb10">
      <div style="width: 100%;" class="flex flex-center jsb">
        <div class="flex">
          <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          <div>
            <div>品类名称</div>
            <div>别名1、别名2</div>
          </div>
        </div>
      </div>
      <div class="flex flex-center" style="flex-shrink: 0;" @click="openPurchaseDetail">
        <div>采购详情</div>
        <div class="el-icon-arrow-right" style="font-size: 26px;"></div>
      </div>
    </div>
    <div class="flex jsb">
      <div>采购编号：2021052412591312346</div>
      <div>日期：2021-05-24</div>
    </div>
    <div class="title-bg mb10 mt10">结算信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label" label="应收金额：">8888.99</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="优惠金额：">0.00</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="实收金额：">8888.99</el-descriptions-item>
    </el-descriptions>
    <div class="title-bg mb10 mt10">开票信息</div>
    <el-descriptions :colon="false" class="margin-top" :column="1">
      <el-descriptions-item label-class-name="my-label" label="发票类型">增值税专用发票</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="发票抬头">公司</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="发票单位">福建省华夏信融数据服务有限公司</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="纳税识别号">3501219967980</el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="地址、电话">
        <div>福建省福州市晋安区宦官溪镇云庭路168号</div>
        <div>0591-83596992</div>
      </el-descriptions-item>
      <el-descriptions-item label-class-name="my-label" label="开户行及账号">
        <div>福建海峡银行股份有限公司福州支行</div>
        <div>350121198102023718</div>
      </el-descriptions-item>
    </el-descriptions>
    <!-- 采购详情 -->
    <el-dialog title="采购详情" width="900px" :visible.sync="isPurchaseDetail" append-to-body destroy-on-close
      @close="beforeClosePurchaseDetail">
      <div class="flex mb10">
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <div>
          <div>品类名称</div>
          <div>别名1、别名2</div>
        </div>
      </div>
      <div class="flex jsb mb10">
        <div>采购编号：2021052412591312346</div>
        <div>日期：2021-05-24</div>
      </div>
      <div class="flex jsb ptb">
        <div class="bold">供应主体</div>
        <div class="flex flex-center" style="flex-shrink: 0;" @click="openMainDetail">
          <div>福建阿里巴巴技术有限公司</div>
          <div class="el-icon-arrow-right" style="font-size: 20px;"></div>
        </div>
      </div>
      <div class="flex jsb ptb">
        <div class="bold">品牌名称</div>
        <div>芝麻开门</div>
      </div>
      <div class="ptb">
        <div class="bold mb10">品牌名称</div>
        <div class="mb10">其中：币种：人民币</div>
        <el-table :data="purchasePriceList" border style="width: 100%;">
          <el-table-column prop="type" label="费用类型" align="center">
          </el-table-column>
          <el-table-column prop="price" label="金额" align="center">
          </el-table-column>
        </el-table>
      </div>
      <!-- 供应主体订单详情 -->
      <el-dialog title="订单详情" width="900px" :visible.sync="isMain" append-to-body destroy-on-close
        @close="beforeClosePurchaseDetail">
        <div class="flex mb10">
          <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          <div>
            <div>品类名称</div>
            <div>别名1、别名2</div>
          </div>
        </div>
        <div class="flex jsb mb10">
          <div>采购编号：2021052412591312346</div>
          <div>日期：2021-05-24</div>
        </div>
        <el-tabs v-model="activeMain" type="card" @tab-click="changeMain">
            <el-tab-pane label="需求信息" name="first">
              <div class="" style="padding-bottom: 40px;">需求信息</div>
              <!-- TODO -->
            </el-tab-pane>
            <el-tab-pane label="供应信息" name="second">
              <div class="" style="padding-bottom: 40px;">供应信息</div>
              <!-- TODO -->
            </el-tab-pane>
          </el-tabs>
      </el-dialog>
    </el-dialog>
    <!-- 物流进度 -->
    <el-dialog title="物流进度" width="900px" :visible.sync="isLogistics" append-to-body destroy-on-close
      @close="beforeCloseLogistics">
      <div class="flex mb10">
        <el-image class="mr10" style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <div>
          <div>品类名称</div>
          <div>别名1、别名2</div>
        </div>
      </div>
      <div class="flex jsb mb10">
        <div>采购编号：2021052412591312346</div>
        <div>日期：2021-05-24</div>
      </div>
      <div class="title-bg mb10">账号信息</div>
      <el-descriptions :colon="false" class="pb20" :column="1">
        <el-descriptions-item label-class-name="my-label" label="20210906">取货</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="20210913">移到深圳仓储中心</el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" label="20210915">到福州站</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOrderDetail: true,
        isPurchaseDetail: false,
        isLogistics: false,
        isMain: false,
        supplyDetailList: [{
          orderDate: '2021-03-21',
          name: '茶',
          NO: '2012100000000'
        }],
        purchasePriceList: [
          {
            type: '产品费用',
            price: '20.00'
          },{
            type: '服务费用',
            price: '*'
          },{
            type: '物流费用',
            price: '*'
          }
        ],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        activeMain: 'first',

      };
    },
    methods: {
      closeOrderDetail() {
        this.isOrderDetail = false
        this.$emit('close')
      },
      beforeCloseOrderDetail() {
        this.closeOrderDetail()
      },
      openPurchaseDetail() {
        this.isPurchaseDetail = true
      },
      closePurchaseDetail() {
        this.isPurchaseDetail = false
      },
      beforeClosePurchaseDetail() {
        this.closePurchaseDetail()
      },
      openLogistics() {
        this.isLogistics = true
      },
      closeLogistics() {
        this.isLogistics = false
      },
      beforeCloseLogistics() {
        this.closeLogistics()
      },
      openMainDetail() {
        this.isMain = true
      },
      closeMainDetail() {
        this.isMain = false
      },
      beforeCloseMainDetail() {
        this.closeMainDetail()
      },
      changeMain(tab, event) {
        console.log(tab, event);
      },
    },
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
</style>
