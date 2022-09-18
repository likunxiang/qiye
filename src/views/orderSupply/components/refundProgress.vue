<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-top: 20px;padding-bottom: 40px;" v-loading="loading">
			<div class="flex flex-center jsb mb10">
				<div style="width: 100%;" class="flex flex-center jsb">
					<div class="flex">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + row.categoryImg"
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
			<div class="title-bg mt10">退货签收进度</div>
			<div>
				<el-timeline>
					<el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
						:type="activity.type" :timestamp="activity.timestamp" :hide-timestamp="true">
						<div class="flex flex-center">
							<div style="width: 300px;">{{activity.content}}</div>
							<el-button size="small" :type="activity.type" :disabled="activity.type!='primary'" v-if="activity.buttonContent" @click="clickButton(activity.buttonType)">{{activity.buttonContent}}</el-button>
							<el-button size="small" :type="activity.type" :disabled="activity.type!='primary'" v-if="activity.buttonContent2" @click="clickButton(activity.buttonType2)">{{activity.buttonContent2}}</el-button>
						</div>
					</el-timeline-item>
				</el-timeline>
			</div>
			
			<refundAddress v-if="isAddress" @close="closeAddress" :row="row" @refresh="getRefundDetail" :addressType="addressType"></refundAddress>
			<refundProve v-if="isProve" @close="closeProve" :row="row"></refundProve>
			<refundVerifyPass v-if="isPass" @close="closePass" :row='row' :pageType="pageType" @refresh="getRefundDetail" @refreshTop="refreshTop"></refundVerifyPass>
		</div>
	</el-dialog>
</template>

<script>
	import refundAddress from '@/views/orderSupply/components/refundAddress.vue'
	import refundProve from '@/views/orderSupply/components/refundProve.vue'
	import refundVerifyPass from '@/views/orderSupply/components/refundVerifyPass.vue'
	import { getRefundDetail } from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		components: {
			refundAddress,
			refundProve,
			refundVerifyPass
		},
		data() {
			return {
				isOpen: true,
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				activities: [{
					content: '接收退货订单',
					timestamp: '2018-04-15',
					type: 'primary',
					buttonContent: '',
					buttonType: 1
				}, {
					content: '提交收货地址',
					timestamp: '2018-04-13',
					buttonContent: '提交收货地址',
					type: 'primary',
					buttonType: 2
				}, {
					content: '接收需方退货证明',
					timestamp: '2018-04-11',
					buttonContent: '查看需方退货证明',
					type: '',
					buttonType: 3
				}, {
					content: '退货验收确认',
					timestamp: '2018-04-11',
					buttonContent: '验收通过',
					buttonContent2: '验收不通过',
					type: '',
					buttonType: 4,
					buttonType2: 5
				}],
				isAddress: false,
				isProve: false,
				isPass: false,
				pageType: 'pass',
				addressType: 'new',
				loading: false,
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
			clickButton(type) {
				console.log(type);
				if(type === 2) {
					this.isAddress = true
					this.addressType = 'new'
				} else if (type === 3) {
					this.isProve = true
				} else if (type === 4) {
					this.isPass = true
					this.pageType = 'pass'
				} else if (type === 5) {
					this.isPass = true
					this.pageType = 'noPass'
				} else if (type === 6) {
					this.isAddress = true
					this.addressType = 'edit'
				}
			},
			closeAddress() {
				this.isAddress = false
			},
			closeProve() {
				this.isProve = false
			},
			closePass() {
				this.isPass = false
			},
			refreshTop() {
				this.$emit('refresh')
				this.close()
			},
			async getRefundDetail() {
				this.loading = true
				await getRefundDetail({
					orderRefundGuid: this.row.orderRefundGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							// this.activities[1].type = data.submitRefundAddrFlag == '1'?'primary':''
							if (data.submitRefundAddrFlag == '1') {
								this.activities[1] = {
									content: '提交收货地址',
									timestamp: '2018-04-13',
									buttonContent: '查看收货地址',
									type: 'primary',
									buttonType: 6
								}
								console.log(this.activities);
							}
							this.activities[2].type = data.demandSubmitProve == '1'?'primary':''
							this.activities[3].type = data.demandSubmitProve == '1'?'primary':''
							this.activities = this.clone(this.activities)
						}
					}
				})
			}
		},
		created() {
			this.getRefundDetail()
		}
	};
</script>

<style lang="scss" scoped>
</style>
