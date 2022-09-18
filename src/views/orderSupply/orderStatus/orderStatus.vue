<template>
	<div class="app-container">
		<div class="title-bg">订单状态管理</div>
		<div class="flex jsb flex-center">
		  <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的采购编号'></searchCom>
		</div>
		<template v-if="tableData.length > 0">
			<div class="mb10" style="border-bottom: 1px solid #999;padding-bottom: 10px;" v-for="item in tableData"
				@click="toOrderDetail(item)">
				<div class="mb10">
					<el-button type="primary" @click.stop="openResult(item)">查看成果</el-button>
					<el-button type="primary" @click.stop="openDetail(item)">状态详情</el-button>
				</div>
				<div class="category-item flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + item.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{item.categoryName}}</div>
							<div>{{item.categoryAlias}}</div>
						</div>
			
					</div>
					<div class="el-icon-arrow-right" style="font-size: 36px;"></div>
				</div>
				<div class="flex flex-center jsb">
					<div>采购编号：{{item.orderNo}}</div>
					<div>日期：{{item.orderTime}}</div>
				</div>
			</div>
		</template>
		<template v-else>
			<el-empty description="暂无数据"></el-empty>
		</template>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<orderDetail v-if="isSupplyOrder" @close="closeSupplyOrder" :openRow="openRow" orderType="supply"></orderDetail>
		<resultRelease v-if="isResult" :row="openRow" @close="closeResult" pageType="check"></resultRelease>
		<statusDetail v-if="isStatus" @close="closeStatus" :row="openRow"></statusDetail>
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import orderDetail from '@/views/orderSupply/components/orderDetail.vue'
	import resultRelease from '@/views/orderSupply/components/resultRelease.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import statusDetail from '@/views/orderSupply/orderStatus/components/statusDetail.vue'
	import { getOrderStatusList } from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		components: {
			pages,
			orderDetail,
			resultRelease,
			statusDetail,
			searchCom
		},
		data() {
			return {
				loading: false,
				tableData: [],
				page: 1,
				pageTotal: 0,
				openRow: {},
				isSupplyOrder: false,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				isResult: false,
				searchResult: 0,
				searchVal: '',
				isStatus: false,
			};
		},
		methods: {
			search(data) {
			  this.searchVal = data
			  this.page = 1
			  //
			},
			changePage(page) {
				this.page = page
				this.getOrderStatusList()
				//
			},
			toOrderDetail(item) {
				this.isSupplyOrder = true
				this.openRow = item
			},
			closeSupplyOrder() {
				this.isSupplyOrder = false
			},
			openResult(item) {
				this.openRow = item
				this.isResult = true
			},
			closeResult() {
				this.isResult = false
			},
			openDetail(item) {
				this.isStatus = true
				this.openRow = item
			},
			closeStatus() {
				this.isStatus = false
			},
			// 关联方取消订单
			otherCancelOrder() {
				const name = `【品类名称】`
				const orderNo = `采购编号：20210725121309A1234567`
				const msg = '于20210728关联方取消订单。现进入退货裁决，在【订单状态管理】中可见。'
				const h = this.$createElement;
				this.$msgbox({
					title: '',
					message: h('p', null, [
						h('div', null, name),
						h('div',  { style: 'margin-top: 10px' }, orderNo),
						h('div', { style: 'margin-top: 10px' }, msg)
					]),
					confirmButtonText: '我知道了',
				}).then(action => {
					this.getOrderStatusList()
				});
			},
			async getOrderStatusList() {
				this.loading = true
				await getOrderStatusList({
					sdPathGuid: this.$store.state.user.projectId.sdPathGuid,
					size: '20',
					curUserId: this.$store.state.user.adminId,
					orderNo: this.searchVal,
					page: this.page
				}).then(res =>  {
					this.loading = false
					if(res.OK == 'True') {
						if (res.Tag.length) {
							this.tableData = res.Tag[0].Table
							this.pageTotal = (this.page - 1) * 20 + 21
						} else {
							this.tableData = []
							this.pageTotal = (this.page - 1) * 20 + 1
						}
					}
					console.log(this.tableData);
				})
			}
		},
		created() {
			this.getOrderStatusList()
		}
	}
</script>

<style scoped lang="scss">
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
