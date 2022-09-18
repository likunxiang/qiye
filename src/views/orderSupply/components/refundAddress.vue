<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
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
			<div class="title-bg mt10">退货信息</div>

			<template v-if="addressType == 'new'">
				<div class="mt10">
					<div class="flex flex-center mb10">
						<div class="my-label">收货人</div>
						<el-input v-model="consignee" placeholder="请输入内容"></el-input>
					</div>
					<div class="flex flex-center mb10">
						<div class="my-label">国家/地区</div>
						<div>中国大陆（+86）</div>
					</div>
					<div class="flex flex-center mb10">
						<div class="my-label">联系电话</div>
						<el-input v-model="phone" placeholder="请输入"></el-input>
					</div>
					<div class="flex flex-center mb10">
						<div class="my-label">退货地址</div>
						<el-input v-model="address" placeholder="请填写，格式：国家/地区-省-市-区/县-乡镇/街道-详细地址"></el-input>
					</div>
				</div>
			</template>
			<template v-if="addressType == 'edit'">
				<div class="mt10">
					<div class="flex flex-center mb10">
						<div class="my-label">收货人</div>
						<el-input v-model="consignee" :readonly="true" placeholder="请输入内容"></el-input>
					</div>
					<div class="flex flex-center mb10">
						<div class="my-label">国家/地区</div>
						<div>中国大陆（+86）</div>
					</div>
					<div class="flex flex-center mb10">
						<div class="my-label">联系电话</div>
						<el-input v-model="phone" :readonly="true" placeholder="请输入"></el-input>
					</div>
					<div class="flex flex-center mb10">
						<div class="my-label">退货地址</div>
						<el-input v-model="address" :readonly="true" placeholder="请填写，格式：国家/地区-省-市-区/县-乡镇/街道-详细地址"></el-input>
					</div>
				</div>
			</template>
		</div>
		<span slot="footer" class="dialog-footer" v-if="addressType == 'new'">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!consignee || !phone || !address">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		submitRefundAddr,
		getRefundSupplyAddr
	} from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			addressType: {
				type: String,
				default: 'new'
			}
		},
		data() {
			return {
				isOpen: true,
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				consignee: '',
				phone: '',
				address: '',
				loading: false
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
			submit() {
				this.$confirm('提交后，不可更改，需方就按照这个地址退货。请确认提交。', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.submitRefundAddr()
				}).catch(() => {});
			},
			async submitRefundAddr() {
				await submitRefundAddr({
					orderRefundGuid: this.row.orderRefundGuid,
					curUserId: this.$store.state.user.adminId,
					receiverName: this.consignee,
					receiverPhone: this.phone,
					addr: this.address,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							if (res.Tag[0] > 0) {
								this.$message({
									message: '操作成功!',
									type: 'success'
								});
								this.$emit('refresh')
								this.close()
							} else {
								this.$message({
									message: '操作失败!',
									type: 'error'
								});
							}
						}
					}
				})
			},
			async getRefundSupplyAddr() {
				this.loading = true
				await getRefundSupplyAddr({
					orderRefundGuid: this.row.orderRefundGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.consignee = data.receiverName
							this.phone = data.receiverPhone
							this.address = data.addr
						}
					}
				})
			}
		},
		created() {
			if (this.addressType == 'edit') {
				this.getRefundSupplyAddr()
			} else {

			}

		}
	};
</script>

<style lang="scss" scoped>
	.my-label {
		width: 120px;
	}
</style>
