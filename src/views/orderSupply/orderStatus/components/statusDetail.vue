<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-top: 20px;padding-bottom: 40px;" >
			<div class="title-bg">状态详情</div>
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
			<div class="title-bg mt10">详情描述</div>
			<div>
				<div class="detail-item" v-for="(item,index) in tableData" :key="index">
					<div style="width: 140px;">{{item.date}}</div>
					<div style="width: 140px;">{{item.content}}</div>
					<el-button v-if="item.type == '1' || item.type == '2'" @click="openCancel(item.type)">查看取消理由</el-button>
					<el-button v-if="item.type == '3'" @click="findingDetail">查看裁决结果</el-button>
					<el-button v-if="item.type == '4'" @click="openCancel(item.type)">查看交付情况</el-button>
					<el-button v-if="item.type == '5' || item.type == '8' || item.type == '9'" @click="openCancel(item.type)">查看验收情况</el-button>
					<el-button v-if="item.type == '6'" @click="openCancel(item.type)">查看退货申请</el-button>
					<el-button v-if="item.type == '7'" @click="openCancel(item.type)">查看退货证明</el-button>
				</div>
			</div>
			
			<cancelReason v-if="isCancel" :row='row' @close="closeCancel" :pageType="pageType"></cancelReason>
			<orderDetail v-if="isSupplyOrder" @close="closeSupplyOrder" :openRow="row" orderType="supply"></orderDetail>
			<findingResult v-if="isFinding" @close="closeFindingDetail" :row="row" :isOrderStutas="true"></findingResult>
		</div>
	</el-dialog>
</template>

<script>
	import findingResult from '@/views/components/common/findingResult.vue'
	import cancelReason from "@/views/orderSupply/orderStatus/components/cancelReason.vue"
	import orderDetail from '@/views/orderSupply/components/orderDetail.vue'
	import { getOrderStatusDetail } from '@/api/orderSupplyApi/orderSupply.js'
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
			cancelReason,
			orderDetail,
			findingResult
		},
		data() {
			return {
				isOpen: true,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				tableData: [],
				isCancel: false,
				pageType: '',
				isSupplyOrder: false,
				isFinding: false
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
			openCancel(type) {
				this.isCancel = true
				this.pageType = type
			},
			closeCancel() {
				this.isCancel = false
			},
			toOrderDetail() {
				this.isSupplyOrder = true
			},
			closeSupplyOrder() {
				this.isSupplyOrder = false
			},
			// 裁决结果批复
			findingDetail() {
			  this.isFinding = true
			},
			closeFindingDetail() {
			  this.isFinding = false
			},
			
			async getOrderStatusDetail() {
				await getOrderStatusDetail({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table
							let msg = ''
							let type = ''
							let arr = []
							for(let i in data) {
								
								if (data[i].orderStatus == '1') {
									msg = '需方取消订单'
									type = '1'
								} else if (data[i].orderStatus == '2') {
									msg = '供方取消订单'
									type = '2'
								} else if (data[i].orderStatus == '3') {
									msg = '订单交易仲裁'
									type = '3'
								} else if (data[i].orderStatus == '4') {
									msg = '供方处理完成'
									type = '4'
								} else if (data[i].orderStatus == '5') {
									msg = '需方验收通过'
									type = '5'
								} else if (data[i].orderStatus == '6') {
									msg = '需方退货申请'
									type = '6'
								} else if (data[i].orderStatus == '7') {
									msg = '需方退货完成'
									type = '7'
								} else if (data[i].orderStatus == '8') {
									msg = '供方验收不通过'
									type = '8'
								} else if (data[i].orderStatus == '9') {
									msg = '供方验收通过'
									type = '9'
								}
								let obj = {
									date: data[i].orderTime,
									content: msg,
									type: type
								}
								arr.push(obj)
								console.log('arr',arr);
							}
							this.tableData = arr
						} else {
							this.tableData = []
						}
					}
				})
			}
		},
		created() {
			this.getOrderStatusDetail()
		}
	};
</script>

<style lang="scss" scoped>
	.detail-item {
		padding: 10px;
		border-bottom: 1px solid #ccc;
		display: flex;
		align-items: center;
	}
</style>
