<template>
	<div class="app-container">
		<div class="title-bg">退货交接管理</div>
		<template v-if="tableData.length > 0">
			<div class="mb10" style="border-bottom: 1px solid #999;padding-bottom: 10px;" v-for="item in tableData"
				@click="toOrderDetail(item)">
				<div class="mb10">
					<el-button type="primary" @click.stop="openResult(item)">查看成果</el-button>
					<el-button type="primary" @click.stop="findingDetail(item)">仲裁结果</el-button>
					<el-button type="primary" @click.stop="openRefund(item)">退货办理</el-button>
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
		<findingResult v-if="isFinding" @close="closeFindingDetail" :row="openRow"></findingResult>
		<refundProgress v-if="isRefund" @close="closeRefund" :row="openRow" @refresh="getJudgeResultNo3OrderList"></refundProgress>
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import orderDetail from '@/views/orderSupply/components/orderDetail.vue'
	import resultRelease from '@/views/orderSupply/components/resultRelease.vue'
	import findingResult from '@/views/components/common/findingResult.vue'
	import refundProgress from '@/views/orderSupply/components/refundProgress.vue'
	import { getJudgeResultNo3OrderList,getOrderDetail } from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		components: {
			pages,
			orderDetail,
			resultRelease,
			findingResult,
			refundProgress
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
				isRefund: false,
				isFinding: false,
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getJudgeResultNo3OrderList()
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
				isResult= true
				// if(item.orderCatVirtualFlag == '1') {
				// 	this.
				// 	 isResult= true
				// } else {
				// 	this.openRefund()
				// }
			},
			closeResult() {
				this.isResult = false
			},
			// 裁决结果批复
			findingDetail(row) {
			  this.openRow = row
			  this.isFinding = true
			},
			closeFindingDetail() {
			  this.isFinding = false
			},
			openRefund(item) {
				if (item.orderCatVirtualFlag == '1') {
					this.isRefund = true
					this.openRow = item
					
				} else {
					const name = `【 ` + item.categoryName + `】`
					const orderNo = `采购编号：` + item.orderNo
					const msg = '属于非动产类的产品交接，退货办理自动完成，默认供方验收通过，退货办理自动完成。请在【订单状态管理】了解进度。'
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
						this.getJudgeResultNo3OrderList()
					});
				}
				
			},
			closeRefund() {
				this.isRefund = false
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
					this.getJudgeResultNo3OrderList()
				});
			},
			async getJudgeResultNo3OrderList() {
				this.loading = true
				await getJudgeResultNo3OrderList({
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
			this.getJudgeResultNo3OrderList()
		}
	}
</script>

<style scoped lang="scss">
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
