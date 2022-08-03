<template>
	<div class="app-container">
		<div class="title-bg">供应交接管理(9)</div>
		<div class="mb10" style="border-bottom: 1px solid #999;padding-bottom: 10px;" v-for="item in tableData"
			@click="toOrderDetail(item)">
			<div class="category-item flex-center">
				<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"></el-image>
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
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<orderDetail v-if="isSupplyOrder" @close="closeSupplyOrder" :openRow="openRow" orderType="supply"></orderDetail>
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import orderDetail from '@/views/orderSupply/components/orderDetail.vue'
	import { getWaitHandleList,getOrderDetail } from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		components: {
			pages,
			orderDetail
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
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getWaitHandleList()
				//
			},
			toOrderDetail(item) {
				this.isSupplyOrder = true
				this.openRow = item
			},
			closeSupplyOrder() {
				this.isSupplyOrder = false
			},
			async getWaitHandleList() {
				this.loading = true
				await getWaitHandleList({
					sdPathGuid: this.$store.state.user.projectId.sdPathGuid,
					size: '20',
					curUserId: this.$store.state.user.adminId,
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
				})
			}
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
