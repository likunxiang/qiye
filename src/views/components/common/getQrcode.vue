<template>
	<el-dialog title="" :visible.sync="isOpen" width="500px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;padding-top: 20px;display: flex;justify-content: center;">
			<div id="qrcode" ref="qrcode"></div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit">支付成功</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { getPayStatus } from '@/api/commonApi.js'
	export default {
		name: "index",
		components: {
			QRCode
		},
		props: {
			payGuid: {
				type: String,
				default: ''
			},
			url: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpen: true,
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
			qrcode() {
				let qrcode = new QRCode('qrcode', {
					width: 200, // 设置宽度，单位像素
					height: 200, // 设置高度，单位像素
					text: this.url // 设置二维码内容或跳转地址
				})
			},
			submit() {
				this.getPayStatus()
			},
			async getPayStatus() {
				await getPayStatus({
					judgeFeeGuid: this.payGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let payStatus = res.Tag[0].Table[0].payStatus
							if (payStatus == '1') {
								// 支付成功，关闭弹窗
								this.$message({
									message: '支付成功!',
									type: 'success'
								});
								this.$emit('refresh')
								this.close()
							} else {
								// 支付失败，关闭弹窗
								this.$message({
									message: '尚未完成支付，请稍后重试!',
									type: 'error'
								});
								return false
							}
						}
					}
				})
			}
			
		},
		created() {
			this.$nextTick(() => {
				this.qrcode()
			})
		}
	};
</script>

<style lang="scss" scoped>
</style>
