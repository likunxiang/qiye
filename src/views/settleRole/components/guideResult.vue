<template>
  <el-dialog title="增加人力资源信息" width="900px" :visible.sync="isOpen" append-to-body destroy-on-close @close="beforeClose">
    <el-table :data="tableData" border style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="areaCode" label="区号" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="联系电话" align="center">
      </el-table-column>
    </el-table>
    <el-row class="flex flex-center mb10">
      <el-input placeholder="请输入你要找的联系电话" clearable v-model="searchVal"
        @keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="clearSearch">
		<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
      </el-input>
      <div class="" v-if="searchVal">搜索结果：{{searchResult}}</div>
    </el-row>
    <el-table :data="tableData1" border style="width: 100%;margin-bottom: 40px;">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="areaCode" label="区号" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="联系电话" align="center">
      </el-table-column>
      <el-table-column prop="receiveDate" label="领取日期" align="center">
      </el-table-column>
      <el-table-column prop="number" label="数量" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="toDetail(scope.row)" type="text" size="small">用户间接成果详情</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <div class="pageBox">
      <el-pagination class="pageMain" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <el-dialog title="用户间接成果详情" width="900px" :visible.sync="isDetail" append-to-body destroy-on-close
      @close="beforeCloseDetail">
      <el-table :data="tableData2" border style="width: 100%;margin-bottom: 20px;">
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="areaCode" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center">
        </el-table-column>
      </el-table>
      <el-row style="padding-bottom: 40px;">
        <el-table :data="tableData3" border style="width: 100%;">
          <el-table-column prop="mouth" label="统计月份" align="center">
          </el-table-column>
          <el-table-column prop="result" label="月份成果" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="toResultDetail(scope.row)" type="text" size="small">用户月份间接成果详情</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-dialog title="用户月份间接成果详情" width="900px" :visible.sync="isResultDetail" append-to-body destroy-on-close
        @close="beforeCloseResultDetail">
        <el-descriptions :column="1" border style="padding-bottom: 40px;">
          <el-descriptions-item label="统计月份" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
            2021-03
          </el-descriptions-item>
          <el-descriptions-item label="月份成果" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
            60单
          </el-descriptions-item>
          <el-descriptions-item label="采购成果" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
            <el-button type="text" @click="openPurchaseDetail">40单</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="供应成果" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
            <el-button type="text" @click="openSupplyDetail">20单</el-button>
          </el-descriptions-item>
        </el-descriptions>
        <el-dialog title="用户月份采购成果详情" width="900px" :visible.sync="isPurchaseDetail" append-to-body destroy-on-close
          @close="beforeClosePurchaseDetail">
          <div style="width: 100%;padding-bottom: 40px;">
            <el-table :data="purchaseDetailList" border style="width: 100%;">
              <el-table-column prop="orderDate" label="订单日期" align="center">
              </el-table-column>
              <el-table-column prop="name" label="品类名称" align="center">
              </el-table-column>
              <el-table-column prop="NO" label="采购编号" align="center">
              </el-table-column>
              <el-table-column label="采购情况" align="center">
                <template slot-scope="scope">
                  <el-row>
                    <el-button type="text" size="small">采购订单详情</el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-dialog>
        <el-dialog title="用户月份供应成果详情" width="900px" :visible.sync="isSupplyDetail" append-to-body destroy-on-close
          @close="beforeCloseSupplyDetail">
          <div style="width: 100%;padding-bottom: 40px;">
            <el-table :data="supplyDetailList" border style="width: 100%;">
              <el-table-column prop="orderDate" label="订单日期" align="center">
              </el-table-column>
              <el-table-column prop="name" label="品类名称" align="center">
              </el-table-column>
              <el-table-column prop="NO" label="供应编号" align="center">
              </el-table-column>
              <el-table-column label="供应情况" align="center">
                <template slot-scope="scope">
                  <el-row>
                    <el-button type="text" size="small">供应订单详情</el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-dialog>
      </el-dialog>
    </el-dialog>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isOpen: true,
        isDetail: false,
        isResultDetail: false,
        isPurchaseDetail: false,
        isSupplyDetail: false,
        searchVal: '',
        searchResult: 0,
        tableData: [{
          name: '张三',
          areaCode: '中国大陆（+86）',
          tel: '18650767213',
        }],
        tableData1: [{
          name: '张三',
          areaCode: '中国大陆（+86）',
          tel: '18650767213',
          receiveDate: '2021-10-15',
          number: '9单',
        }],
        tableData2: [{
          name: '张三',
          areaCode: '中国大陆（+86）',
          tel: '18650767213',
        }],
        tableData3: [{
          mouth: '2021-03',
          result: '60单',
        }],
        purchaseDetailList: [
          {
            orderDate: '2021-03-21',
            name: '茶',
            NO: '2012100000000'
          }
        ],
        supplyDetailList: [
          {
            orderDate: '2021-03-21',
            name: '茶',
            NO: '2012100000000'
          }
        ],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
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
      },
      search() {
        this.searchResult = 0
      },
	  clearSearch() {
	    this.searchVal = ''
	    this.search()
	  },
      toDetail(row) {
        this.isDetail = true
      },
      closeDetail() {
        this.isDetail = false
      },
      beforeCloseDetail() {
        this.closeDetail()
      },
      toResultDetail() {
        this.isResultDetail = true
      },
      closeResultDetail() {
        this.isResultDetail = false
      },
      beforeCloseResultDetail() {
        this.closeResultDetail()
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
      openSupplyDetail() {
        this.isSupplyDetail = true
      },
      closeSupplyDetail() {
        this.isSupplyDetail = false
      },
      beforeCloseSupplyDetail() {
        this.closeSupplyDetail()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
    onLoad() {},
  };
</script>

<style lang="scss">
</style>
