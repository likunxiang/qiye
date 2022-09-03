<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-top: 20px;padding-bottom: 40px;">
			<div class="title-bg">结算详情</div>
			<div class="flex flex-center jsb mb10" @click="toOrderDetail">
				<div class="flex flex-center jsb">
					<div class="flex">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"
							fit="fit"></el-image>
						<div>
							<div>{{row.categoryName}}</div>
							<div>{{row.categoryAlias}}</div>
						</div>
					</div>
				</div>
				<div class="flex flex-center">
					<div>订单详情</div>
					<div class="el-icon-arrow-right" style="font-size: 20px;"></div>
				</div>
			</div>
			<div class="flex jsb">
				<div>采购编号：{{row.orderNo}}</div>
				<div>日期：{{row.orderTime}}</div>
			</div>
			<div class="title-bg mt10">费用缴纳金额</div>
			<div>
				<div class="my-label">金额</div>
				<div class="mt10">{{tableData.judgeFee}}</div>
			</div>
			<div class="title-bg mt10">费用缴纳进度</div>
			<div>
				<el-timeline>
					<el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
						:type="activity.type" :timestamp="activity.timestamp" :hide-timestamp="true">
						<div class="flex flex-center">
							<div style="width: 300px;">{{activity.content}}</div>
							<el-button size="small" v-if="activity.buttonContent"
								@click="clickButton(activity.buttonType)">{{activity.buttonContent}}</el-button>
						</div>
					</el-timeline-item>
				</el-timeline>
			</div>

			<orderDetail v-if="isSupplyOrder" @close="closeSupplyOrder" :openRow="row" orderType="supply"></orderDetail>
			<payProve v-if="isProve" @close="closeProve" :row="row"></payProve>
			<choosePayWay v-if="isChoosePay" @close="closeChoosePay" @getPayWay="getPayWay"></choosePayWay>
			<submitPayProve v-if="isPayProve" @close="closePayProve" :row="row"></submitPayProve>
		</div>
	</el-dialog>
</template>

<script>
	import orderDetail from '@/views/orderSupply/components/orderDetail.vue'
	import payProve from '@/views/supplySettle/verifySettle/components/payProve.vue'
	import choosePayWay from '@/views/supplySettle/defaultCost/components/choosePayWay.vue'
	import submitPayProve from '@/views/supplySettle/defaultCost/components/submitPayProve.vue'
	import { getJudgeFeeType1Detail } from '@/api/supplySettleApi/supplySettle.js'
	export default {
		name: "index",
		components: {
			orderDetail,
			payProve,
			choosePayWay,
			submitPayProve
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				isOpen: true,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				activities: [{
					content: '查看缴纳金额',
					timestamp: '2018-04-15',
					type: 'primary',
					buttonContent: '我要缴纳',
					buttonType: 1
				}, {
					content: '提供缴纳证明',
					timestamp: '2018-04-14',
					buttonContent: '提供缴纳证明',
					buttonType: 2
				}, {
					content: '费用缴纳证明',
					timestamp: '2018-04-13',
					buttonContent: '',
					buttonType: 3
				}],
				tableData: {},
				isSupplyOrder: false,
				isProve: false,
				isChoosePay: false,
				payWay: '',
				isPayProve: false,
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
			toOrderDetail() {
				this.isSupplyOrder = true
			},
			closeSupplyOrder() {
				this.isSupplyOrder = false
			},
			getPayWay(data) {
				this.payWay = data
			},
			clickButton(type) {
				if(type == '1') {
					this.isChoosePay = true
				} else if (type == '2') {
					this.isPayProve = true
				} else if (type == '4') {
					this.isProve = true
				}
			},
			closeChoosePay() {
				this.isChoosePay = false
			},
			closePayProve() {
				this.isPayProve = false
			},
			async getJudgeFeeType1Detail() {
				await getJudgeFeeType1Detail({
					orderRefundGuid: this.row.orderRefundGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.tableData = data
							// this.activities[1].type = data.submitRefundAddrFlag == '1'?'primary':''
							this.activities[0].type = data.judgeFeePayType === '0'?'primary':''
							this.activities[1].type = data.judgeFeePayType === '0'?'':'primary'
							if (data.judgeFeeProveType === '1') {
								this.activities[1] = {
									content: '提供缴纳证明',
									timestamp: '2018-04-14',
									buttonContent: '查看缴纳证明',
									buttonType: 4
								}
							}
							this.activities[2].type = data.confirmPayFlag === '2'?'primary':''
						}
					}
				})
			}
		},
		created() {
			this.getJudgeFeeType1Detail()
		}
	};
</script>

<style lang="scss" scoped>
</style>
