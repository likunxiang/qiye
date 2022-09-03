<template>
	<div class="app-container">
		<div class="title-bg">违约费用缴纳</div>
		<template v-if="tableData.length > 0">
			<div class="mb10" style="border-bottom: 1px solid #999;padding-bottom: 10px;" v-for="item in tableData"
				@click="toSettleDetail(item)">
				<div class="mb10">
					<el-button type="primary" @click.stop="findingDetail(item)">裁决结果</el-button>
				</div>
				<div class="category-item flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + item.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{item.categoryName}}</div>
							<div>{{item.categoryAlias}}</div>
						</div>
					</div>
					<div class="flex flex-center">
						<div>未到款</div>
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
		<payDetail v-if="isDetail" @close="closeSettleDetail" :row="openRow"></payDetail>
		<findingResult v-if="isFinding" @close="closeFindingDetail" :row="openRow"></findingResult>
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import findingResult from '@/views/components/common/findingResult.vue'
	import payDetail from '@/views/supplySettle/defaultCost/components/payDetail.vue'
	import { getJudgeFeeType1List } from '@/api/supplySettleApi/supplySettle.js'
	export default {
		name: "index",
		components: {
			pages,
			findingResult,
			payDetail
		},
		data() {
			return {
				loading: false,
				tableData: [],
				page: 1,
				pageTotal: 0,
				openRow: {},
				basicImgUrl: this.$store.state.basics.img_url_cat,
				isDetail: false,
				isFinding: false
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getJudgeFeeType1List()
				//
			},
			toSettleDetail(item) {
				this.openRow = item
				this.isDetail = true
			},
			closeSettleDetail() {
				this.isDetail = false
			},
			// 裁决结果批复
			findingDetail(item) {
				this.openRow = item
			  this.isFinding = true
			},
			closeFindingDetail() {
			  this.isFinding = false
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
					this.getJudgeFeeType1List()
				});
			},
			async getJudgeFeeType1List() {
				this.loading = true
				await getJudgeFeeType1List({
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
					console.log(this.tableData);
				})
			}
		},
		created() {
			this.getJudgeFeeType1List()
		}
	}
</script>

<style scoped lang="scss">
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
