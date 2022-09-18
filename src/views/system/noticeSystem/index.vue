<template>
	<div class="app-container">
		<div class="title-bg">消息通知</div>
		<template v-if="tableData.length > 0">
			<div class="mb10" style="border-bottom: 1px solid #999;padding-bottom: 10px;" v-for="item in tableData"
				@click="toSettleDetail(item)">
				<div class="flex jsb mb10">
					<div v-if="item.noticeType ==='2'">请提交缴纳证明</div>
					<div v-if="item.noticeType ==='3'">请提供收款账号</div>
					<div v-if="item.noticeType ==='4'">本订单货款已付清</div>
					<div>日期：{{item.orderTime}}</div>
				</div>
				<div class="category-item flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + item.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{item.categoryName}}</div>
							<div>{{item.categoryAlias}}</div>
						</div>
					</div>
					<div class="flex flex-center" style="position: relative;">
						<div class="red-round" v-if="item.readFlag === '0'"></div>
						<div class="el-icon-arrow-right" style="font-size: 36px;"></div>
					</div>
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
		<settleDetail v-if="isDetail" @close="closeSettleDetail" :row="openRow" ></settleDetail>
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import settleDetail from '@/views/supplySettle/verifySettle/components/settleDetail.vue'
	import { getList,updateReadFlag } from '@/api/system/noticeSystem.js'
	export default {
		name: "index",
		components: {
			pages,
			settleDetail
		},
		data() {
			return {
				loading: false,
				tableData: [],
				page: 1,
				pageTotal: 0,
				openRow: {},
				basicImgUrl: this.$store.state.basics.img_url_cat,
				isDetail: false
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getList()
				//
			},
			toSettleDetail(item) {
				this.openRow = item
				this.isDetail = true
				this.updateReadFlag(item.orderNoticeGuid)
			},
			closeSettleDetail() {
				this.isDetail = false
				this.getList()
			},
			async getList() {
				this.loading = true
				await getList({
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
					console.log(this.tableData);
				})
			},
			async updateReadFlag(orderNoticeGuid) {
				await updateReadFlag({
					orderNoticeGuid: orderNoticeGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					
				})
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
	.category-item {
		display: flex;
		width: 100%;
	}
	.red-round {
		position: absolute;
		left: -20px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: red;
	}
</style>
