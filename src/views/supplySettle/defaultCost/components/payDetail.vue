<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-top: 20px;padding-bottom: 40px;">
			<div class="title-bg">结算详情</div>
			<div class="flex flex-center jsb mb10" @click="toOrderDetail">
				<div class="flex flex-center jsb">
					<div class="flex">
						<el-image class="mr10" style="width: 100px; height: 100px"
							:src="basicImgUrl + orderData.categoryImg" fit="fit"></el-image>
						<div>
							<div>{{orderData.categoryName}}</div>
							<div>{{orderData.categoryAlias}}</div>
						</div>
					</div>
				</div>
				<div class="flex flex-center">
					<div>订单详情</div>
					<div class="el-icon-arrow-right" style="font-size: 20px;"></div>
				</div>
			</div>
			<div class="flex jsb">
				<div>采购编号：{{orderData.orderNo}}</div>
				<div>日期：{{orderData.orderTime}}</div>
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
								@click="clickButton(activity.buttonType)" :type="activity.type"
								:disabled="activity.buttonDisable">{{activity.buttonContent}}</el-button>
						</div>
					</el-timeline-item>
				</el-timeline>
			</div>

			<orderDetail v-if="isSupplyOrder" @close="closeSupplyOrder" :openRow="row" orderType="supply"></orderDetail>
			<payProve v-if="isProve" @close="closeProve" :row="orderData"></payProve>
			<choosePayWay v-if="isChoosePay" @close="closeChoosePay" @getPayWay="getPayWay"></choosePayWay>
			<submitPayProve v-if="isPayProve" @close="closePayProve" :row="orderData" @refresh="getJudgeFeeType1Detail">
			</submitPayProve>
			<qrcode v-if="isCode" @close="closeQrcode" :payGuid='row.judgeFeeGuid' :url="qrcodeUrl"
				@refresh="getJudgeFeeType1Detail"></qrcode>
			<zhifubaoPay v-if="isZFB" @close="closeZFB" :payGuid='row.judgeFeeGuid' :htmlUrl="qrcodeUrl"
				@refresh="getJudgeFeeType1Detail"></zhifubaoPay>
		</div>
	</el-dialog>
</template>

<script>
	import orderDetail from '@/views/orderSupply/components/orderDetail.vue'
	import payProve from '@/views/supplySettle/defaultCost/components/payProve.vue'
	import choosePayWay from '@/views/supplySettle/defaultCost/components/choosePayWay.vue'
	import submitPayProve from '@/views/supplySettle/defaultCost/components/submitPayProve.vue'
	import qrcode from '@/views/components/common/getQrcode.vue'
	import zhifubaoPay from '@/views/components/common/zhifubaoPay.vue'
	import {
		getJudgeFeeType1Detail
	} from '@/api/supplySettleApi/supplySettle.js'
	import {
		aprc_webSuOrg_order_wxpayJudgeFeeType,
		aprc_webSuOrg_order_alipayJudgeFeeType1
	} from '@/api/commonApi.js'
	export default {
		name: "index",
		components: {
			orderDetail,
			payProve,
			choosePayWay,
			submitPayProve,
			qrcode,
			zhifubaoPay
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
					buttonDisable: false,
					buttonContent: '我要缴纳',
					buttonType: 1
				}, {
					content: '提供缴纳证明',
					timestamp: '2018-04-14',
					buttonContent: '提供缴纳证明',
					buttonDisable: true,
					buttonType: 2
				}, {
					content: '费用缴纳证明',
					timestamp: '2018-04-13',
					buttonDisable: false,
					buttonContent: '',
					buttonType: 3
				}],
				tableData: {},
				isSupplyOrder: false,
				isProve: false,
				isChoosePay: false,
				payWay: '',
				isPayProve: false,
				orderData: {},
				qrcodeUrl: 'https://www.baidu.com',
				isCode: false,
				isZFB: false
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
				console.log('this.payWay', this.payWay);
				if (this.payWay == 'wx') {
					this.aprc_webSuOrg_order_wxpayJudgeFeeType()
				} else if (this.payWay == 'zfb') {
					this.aprc_webSuOrg_order_alipayJudgeFeeType1()
				}
			},
			clickButton(type) {
				if (type == '1') {
					this.isChoosePay = true
				} else if (type == '2') {
					this.isPayProve = true
				} else if (type == '4') {
					this.isProve = true
				}
			},
			closeProve() {
				this.isProve = false
			},
			closeChoosePay() {
				this.isChoosePay = false
			},
			closePayProve() {
				this.isPayProve = false
			},
			closeQrcode() {
				this.isCode = false
			},
			closeZFB() {
				this.isZFB = false
			},
			async getJudgeFeeType1Detail() {
				await getJudgeFeeType1Detail({
					judgeFeeGuid: this.row.judgeFeeGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.tableData = data
							this.orderData = data
							// this.activities[1].type = data.submitRefundAddrFlag == '1'?'primary':''
							this.activities[1].type = data.judgeFeePayType === '0' ? '' : 'primary'
							this.activities[0].buttonDisable = data.judgeFeePayType > '0' ? true : false
							this.activities[1].buttonDisable = data.judgeFeePayType === '0' ? true : false
							console.log('data.judgeFeeProveType', data.judgeFeeProveType);
							if (data.judgeFeePayTime.length > '0' && data.judgeFeeProveType == '1') {
								this.activities[1] = {
									content: '提供缴纳证明',
									type: 'primary',
									timestamp: '2018-04-14',
									buttonContent: '查看缴纳证明',
									buttonType: 4
								}
							}
							this.activities[2].type = data.confirmPayFlag === '2' ? 'primary' : ''
						}
					}
				})
			},
			// 支付宝
			async aprc_webSuOrg_order_alipayJudgeFeeType1() {
				await aprc_webSuOrg_order_alipayJudgeFeeType1({
					judgeFeeGuid: this.row.judgeFeeGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						let url = res.Tag.payUrl
						// this.qrcodeUrl = url
						// this.isZFB = true


						let divForm = document.getElementsByTagName('divform')
						if (divForm.length) {
							document.body.removeChild(divForm[0])
						}
						const div = document.createElement('divform');
						div.innerHTML = url;
						document.body.appendChild(div);
						document.forms[0].setAttribute('target', '_self')
						document.forms[0].submit();
					}
				})
			},
			// 微信
			async aprc_webSuOrg_order_wxpayJudgeFeeType() {
				await aprc_webSuOrg_order_wxpayJudgeFeeType({
					judgeFeeGuid: this.row.judgeFeeGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						let url = res.Tag.qrCodeUrl
						this.qrcodeUrl = url
						this.isCode = true
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
