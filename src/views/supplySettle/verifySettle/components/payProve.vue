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
			<div class="title-bg mt10">证明内容</div>
			<div>
				<div class="my-label">提交日期</div>
				<div class="mt10">{{payData.payTime}}</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="my-label">付款证明</div>
				<div class="flex flex-center mt10">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="item" v-for="(item,index) in imgList" :key="index" fit="fit">
					</el-image>
				</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="my-label">付款说明</div>
				<div class="mt10">{{payData.payRemark}}</div>
			</div>
			<el-divider></el-divider>
		</div>
		<orderDetail v-if="isSupplyOrder" @close="closeSupplyOrder" :openRow="row" orderType="supply"></orderDetail>
	</el-dialog>
</template>

<script>
	import orderDetail from '@/views/orderSupply/components/orderDetail.vue'
	export default {
		name: "index",
		components: {
			orderDetail
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			payData: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				isOpen: true,
				isSupplyOrder: false,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				imgBasicUrl1: this.$store.state.basics.img_url_ord,
				imgList: []
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
		},
		created() {
			this.imgList = this.payData.payProve.split(',')
			this.imgList = this.imgList.map(item => this.imgBasicUrl1 + item)
		}
	};
</script>

<style lang="scss" scoped>
</style>
