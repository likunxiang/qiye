<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose">
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

			<div class="title-bg mt10"></div>

			<div class="flex flex-center">
				<div class="radio mr10" v-if="!isRadio" @click="changeRadio"></div>
				<div class="radio-full mr10" v-if="isRadio" @click="changeRadio"></div>
				<div class="flex flex-center">
					<div>我已阅读并同意</div>
					<div style="text-decoration: underline;color: #1890FF;" @click="openConfirm">《订单确认完成规则》</div>
				</div>
			</div>

			<confirmRule v-if="isConfirm" @close="closeConfirm" :row="row"></confirmRule>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="toConfirm" :disabled="!isRadio">确认完成</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import confirmRule from '@/views/orderSupply/components/confirmRule.vue'
	import refundRule from '@/views/orderSupply/components/refundRule.vue'
	import { orderSuDone } from '@/api/orderSupplyApi/orderSupply.js'
	export default {
		name: "index",
		components: {
			confirmRule,
			refundRule,
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
				isRadio: false,
				isConfirm: false,
			};
		},
		methods: {
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			changeRadio() {
				this.isRadio = !this.isRadio
			},
			beforeClose() {
				this.close()
			},
			openConfirm() {
				this.isConfirm = true
			},
			closeConfirm() {
				this.isConfirm = false
			},
			toConfirm() {
				const name = `【` + this.row.categoryName + `】`
				const orderNo = `采购编号：` + this.row.orderNo
				const msg = '确认已经向需方提供供应成果。'
				const h = this.$createElement;
				this.$msgbox({
					title: '',
					message: h('p', null, [
						h('div', null, name),
						h('div', null, orderNo),
						h('div', null, msg)
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(action => {
					this.orderSuDone()
				});
			},
			async orderSuDone() {
				await orderSuDone({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
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
				})
			}
		},
		created() {

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
</style>
