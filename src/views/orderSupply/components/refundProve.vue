<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-top: 20px;padding-bottom: 40px;">
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
			<div class="title-bg mt10">退货信息</div>
			<div>
				<div class="my-label">提交日期</div>
				<div class="mt10">{{proveObj.proveLogisticTime}}</div>
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
			<div style="text-decoration: underline;color: #1890FF;" @click="openEntityRefundRule">《{{proveObj.bizRuleType23Name}}》</div>
		</div>
		<entityRefundRule v-if="isEntityRefundRule" @close="closeEntityRefundRule" :row="row"></entityRefundRule>
	</el-dialog>
</template>

<script>
	import entityRefundRule from '@/views/orderSupply/orderStatus/components/entityRefundRule.vue'
	import { getDemandProveDetail } from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		components: {
			entityRefundRule
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
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				imgBasicUrl1: this.$store.state.basics.img_url_ord,
				proveObj: {},
				proveImgs: [], // 退货证明图片
				proveSupplySignImgs: [], // 需方提供的供方签收证明图片
				isEntityRefundRule: false, // 实物退货规则

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
			// 实物退货退款规则
			openEntityRefundRule() {
				this.isEntityRefundRule = true
			},
			closeEntityRefundRule() {
				this.isEntityRefundRule = false
			},
			async getDemandProveDetail() {
				await getDemandProveDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.proveObj = data
							this.proveImgs = data.proveLogisticImgs.split(',')
							this.proveImgs = this.proveImgs.map(item => this.imgBasicUrl1 + item)
							this.proveSupplySignImgs = data.proveSupplySignImgs.split(',')
							this.proveSupplySignImgs = this.proveSupplySignImgs.map(item => this.imgBasicUrl1 + item)
						}
					}
				})
			}
		},
		created() {
			this.getDemandProveDetail()
		}
	};
</script>

<style lang="scss" scoped>
	.my-label {
		
	}
</style>
