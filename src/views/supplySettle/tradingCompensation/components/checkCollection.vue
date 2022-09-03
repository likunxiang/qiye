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
			<div class="title-bg mt10">提交信息</div>
			<div>
				<div class="my-label mb10">提交日期</div>
				<div>2022-12-12</div>
			</div>


			<div class="title-bg mt10">收款信息</div>
			<div class="flex flex-center mb10">
				<div class="my-label1">账户名称</div>
				<div>{{name}}</div>
			</div>
			<div class="flex flex-center mb10">
				<div class="my-label1">开户银行</div>
				<div>{{bankName}}</div>
			</div>
			<div class="flex flex-center mb10">
				<div class="my-label1">银行账号</div>
				<div>{{bankNo}}</div>
			</div>
			<div class="flex flex-center">
				<div class="my-label1">银行地址</div>
				<div>{{bankAddress}}</div>
			</div>


		</div>
	</el-dialog>
</template>

<script>
	import {
		orderSuDone
	} from '@/api/orderSupplyApi/orderSupply.js'
	import { getSupplyBankInfo } from '@/api/supplySettleApi/supplySettle.js'
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
		data() {
			return {
				isOpen: true,
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				name: '',
				bankName: '',
				bankNo: '',
				bankAddress: '',
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
			async getSupplyBankInfo() {
				await getSupplyBankInfo({
					judgeFeeGuid: this.row.judgeFeeGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.name = data.bankUserName
							this.bankName = data.bankName
							this.bankNo = data.bankAccount
							this.bankAddress = data.bankAddr
						}
					}
				})
			}

		},
		created() {
			this.getSupplyBankInfo()
		}
	};
</script>

<style lang="scss" scoped>
	.radio {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		border: 1px solid #333;
	}

	.radio-full {
		width: 15px;
		height: 15px;
		background: #333;
		border-radius: 50%;
		border: 1px solid #333;
	}

	.my-label1 {
		width: 120px;
	}
</style>
