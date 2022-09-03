<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-top: 20px;padding-bottom: 40px;">
			<div class="title-bg">{{title}}</div>
			<div class="flex flex-center jsb mb10">
				<div style="width: 100%;" class="flex flex-center jsb">
					<div class="flex">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"
							fit="fit"></el-image>
						<div>
							<div>{{row.categoryName}}</div>
							<div>{{row.categoryAlias}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex jsb">
				<div>采购编号：{{row.orderNo}}</div>
				<div>日期：{{row.orderTime}}</div>
			</div>
			<template v-if="pageType == '1' || pageType == '2'">
				<div class="title-bg mt10">申请内容</div>
				<div>
					<div class="my-label">申请日期</div>
					<div class="mt10">{{dataObj.orderCancelTime}}</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="my-label">取消订单事由</div>
					<div class="mt10">{{dataObj.reason}}</div>
				</div>
				<div class="title-bg mt10">适用规则</div>
				<div style="text-decoration: underline;color: #1890FF;">《{{dataObj.bizRuleType1Name}}》</div>
				<div style="text-decoration: underline;color: #1890FF;">《{{dataObj.bizRuleType21Name}}》</div>
			</template>
			<template v-if="pageType == '6'">
				<div class="title-bg mt10">详情描述</div>
				<div>
					<div class="my-label">申请日期</div>
					<div class="mt10">{{dataObj.refundTime}}</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="my-label">退货理由</div>
					<div class="mt10">{{dataObj.reason}}</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="my-label">证据说明</div>
					<div class="flex flex-center mt10">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="item" v-for="(item,index) in imgList" :key="index" fit="fit">
						</el-image>
					</div>
				</div>
				<div class="title-bg mt10">适用规则</div>
				<div style="text-decoration: underline;color: #1890FF;">《{{dataObj.bizRuleType21Name}}》</div>
			</template>
			<template v-if="pageType == '5' || pageType == '8' || pageType == '9'">
				<div class="title-bg mt10">详情描述</div>
				<div>
					<div class="my-label">验收日期</div>
					<div class="mt10">{{dataObj.demandAcceptTime}}</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="my-label">验收方式</div>
					<div class="mt10">{{dataObj.demandAcceptWay === '1'?'手工验收':'系统验收'}}</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="my-label">验收结果</div>
					<div class="mt10">{{dataObj.demandAcceptStatus === '1'?'验收通过':'验收不通过'}}</div>
				</div>
				<div class="title-bg mt10">适用规则</div>
				<div style="text-decoration: underline;color: #1890FF;">《{{data.bizRuleType2Name}}》</div>
			</template>
			<template v-if="pageType == '4'">
				<div class="title-bg mt10">详情描述</div>
				<div>
					<div class="my-label">交付日期</div>
					<div class="mt10">{{dataObj.supplyDoneTime}}</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="my-label">交付结果</div>
					<div class="mt10">{{dataObj.supplyDoneFlag === '0'?'订单未处理':'订单已处理'}}</div>
				</div>
				<div class="title-bg mt10">适用规则</div>
				<div style="text-decoration: underline;color: #1890FF;">《{{dataObj.bizRuleType3Name}}》</div>
			</template>
			<template v-if="pageType == '7'">
				<div class="title-bg mt10">详情描述</div>
				<div>
					<div class="my-label">提交日期</div>
					<div class="mt10">{{proveObj.proveTime}}</div>
				</div>
				<div class="title-bg mt10">需方退货信息</div>
				<div>
					<div class="my-label">退货物流单子（本订单货物发还给供方的物流编号或者供方当面签收书面证明）</div>
					<div class="flex flex-center mt10">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="item" v-for="(item,index) in proveImgs" :key="index" fit="fit">
						</el-image>
					</div>
				</div>
				<div class="title-bg mt10">证明供方签收信息</div>
				<div>
					<div class="my-label">签收日期</div>
					<div class="mt10">{{proveObj.proveSupplySignDate}}</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="my-label">签收证明（如物流回单证明或者供方当面签收书面证明）</div>
					<div class="flex flex-center mt10">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="item" v-for="(item,index) in proveSupplySignImgs" :key="index" fit="fit">
						</el-image>
					</div>
				</div>
				<div class="title-bg mt10">适用规则</div>
				<div style="text-decoration: underline;color: #1890FF;">《{{proveObj.bizRuleType23Name}}》</div>
			</template>
		</div>
	</el-dialog>
</template>

<script>
	import {
		orderJudgeGetDetail,
		orderCancelGetDetail,
		getRefundApplyDetail,
		getDemandAcceptDetail,
		getSupplyAcceptDetail,
		getSupplyDoneDetail
	} from '@/api/orderSupplyApi/orderSupply.js'
	import { getDemandProveDetail } from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			pageType: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpen: true,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				imgBasicUrl1: this.$store.state.basics.img_url_ord,
				isRule: false,
				dataObj: {},
				imgList: [],
				proveImgs: [], // 退货证明图片
				proveSupplySignImgs: [], // 需方提供的供方签收证明图片
				proveObj: {}, // 退货证明数据
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
			openRefund() {
				this.isRule = true
			},
			closeRefundRule() {
				this.isRule = false
			},
			// 供应-查询供方处理订单情况(交付情况)
			async getSupplyDoneDetail() {
				await getSupplyDoneDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							this.dataObj = res.Tag[0].Table[0]

						}
					}
				})
			},
			// 供应-查询退货供方验收情况(订单有裁决，供方验收情况)
			async getSupplyAcceptDetail() {
				await getSupplyAcceptDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							this.dataObj = res.Tag[0].Table[0]
						}
					}
				})
			},
			// 查询验收情况(订单未裁决，需方正常验收)
			async getDemandAcceptDetail() {
				await getDemandAcceptDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							this.dataObj = res.Tag[0].Table[0]
						}
					}
				})
			},
			// 供应-查询退货申请
			async getRefundApplyDetail() {
				await getRefundApplyDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							this.dataObj = res.Tag[0].Table[0]
							this.imgList = this.dataObj.proveImgs.split(',')
							this.imgList = this.imgList.map(item => this.imgBasicUrl1 + item)
						}
					}
				})
			},
			// 查询取消订单详情(订单已取消)
			async orderCancelGetDetail() {
				await orderCancelGetDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							this.dataObj = res.Tag[0].Table[0]
						}
					}
				})
			},
			// 查看退货证明
			async getDemandProveDetail() {
				await getDemandProveDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.proveObj = data
							this.proveImgs = data.proveImgs.split(',')
							this.proveImgs = this.proveImgs.map(item => this.imgBasicUrl1 + item)
							this.proveSupplySignImgs = data.proveSupplySignImgs.split(',')
							this.proveSupplySignImgs = this.proveSupplySignImgs.map(item => this.imgBasicUrl1 + item)
						}
					}
				})
			}
		},
		created() {
			let type = this.pageType
			if (type == '1' || type == '2') {
				this.title = '查看取消事由'
				this.orderCancelGetDetail()
			} else if (type == '6') {
				this.title = '查看退货申请'
				this.getRefundApplyDetail()
			} else if (type == '5' || type == '8' || type == '9') {
				this.title = '查看验收情况'
				if (type == '5') {
					this.getDemandAcceptDetail()
				} else {
					this.getSupplyAcceptDetail()
				}
				
			} else if (type == '4') {
				this.title = '查看交付情况'
				this.getSupplyDoneDetail()
			} else if (type == '7') {
				this.title = '查看退货证明'
				this.getDemandProveDetail()
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
