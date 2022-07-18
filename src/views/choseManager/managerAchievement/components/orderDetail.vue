<template>
  <el-dialog title="查看订单详情" :visible.sync="isOpen" width="700px" @close="beforeClose" :append-to-body="true">
    <div style="padding-bottom: 60px;">
      <el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构名称">{{row.name}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构创建日期">{{row.date}}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="验收通过订单数量">{{row.number}}
        </el-descriptions-item>
      </el-descriptions>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的采购编号'></searchCom>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="name" label="品类名称" align="center"></el-table-column>
        <el-table-column prop="date" label="品类类型" align="center"></el-table-column>
        <el-table-column prop="bianhao" label="采购编号" align="center"></el-table-column>
      </el-table>
    </div>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </el-dialog>
</template>

<script>
  import searchCom from '@/views/components/common/searchCom.vue'
  import pages from '@/views/components/common/pages'
  export default {
    name: "index",
    components: {
      searchCom,
      pages
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
          name: '资金资源需求',
          date: '个人用自己的市场化房子',
          bianhao: '20220418121200000004'
        }],
        openRow: {},
        page: 1,
        pageTotal: 0,
        searchResult: 0,
        searchVal: '',
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
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
</style>
