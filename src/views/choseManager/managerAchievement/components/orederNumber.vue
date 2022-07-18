<template>
  <el-dialog title="查看订单验收通过数量" :visible.sync="isOpen" width="700px" @close="beforeClose" :append-to-body="true">
    <div style="padding-bottom: 60px;">
      <el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构名称">{{row.name}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构创建日期">{{row.date}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="订单验收通过数量">{{row.number}}
        </el-descriptions-item>
      </el-descriptions>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="name" label="品类名称" align="center"></el-table-column>
        <el-table-column prop="date" label="品类类型" align="center"></el-table-column>
        <el-table-column prop="number" label="订单验收通过数量" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toOrderDetail(scope.row)">{{scope.row.number}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <orderDetail v-if="isOrderDetail" @close="closeOrderDetail" :row="openRow"></orderDetail>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </el-dialog>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  import orderDetail from '@/views/choseManager/managerAchievement/components/orderDetail'
  export default {
    name: "index",
    components: {
      searchCom,
      pages,
      orderDetail
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
        loading: false,
        tableData: [{
          name: '食用鲜苹果',
          date: '动产产品需求',
          number: '5'
        }],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
        isOrderDetail: false,
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
      search(data) {
        this.searchVal = data
        this.page = 1
        //
      },
      changePage(page) {
        this.page = page
        //
      },
      toOrderDetail(row) {
        this.openRow = row
        this.isOrderDetail = true
      },
      closeOrderDetail() {
        this.isOrderDetail = false
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
