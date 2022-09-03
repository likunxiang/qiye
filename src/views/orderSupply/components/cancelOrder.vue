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

			<div class="title-bg mt10">
				<div v-if="isCancel">取消订单事由</div>
			</div>
			
			<div v-if="isCancel">
				<el-input
				  type="textarea"
				  :rows="3"
				  placeholder="请如实填写取消订单的理由"
				  v-model="textareaValue">
				</el-input>
			</div>

			<div class="flex flex-center" v-if="!isCancel">
				<div class="radio mr10" v-if="!isRadio" @click="changeRadio"></div>
				<div class="radio-full mr10" v-if="isRadio" @click="changeRadio"></div>
				<div class="flex flex-center">
					<div>我已阅读并同意</div>
					<div style="text-decoration: underline;color: #1890FF;" @click="openCancel">《品类取消订单规则》</div>
					<div>和</div>
					<div style="text-decoration: underline;color: #1890FF;" @click="openRefund">《退货裁决规则》</div>
				</div>
			</div>
			
			<categoryCancelRule v-if="isCancelRule" @close="closeCancel" :row="row"></categoryCancelRule>
			<refundRule v-if="isRefund" @close="closeRefund" :row="row"></refundRule>
		</div>
		<span slot="footer" class="dialog-footer" v-if="!isCancel">
			<el-button type="primary" @click="toCancel" :disabled="!isRadio">填写取消订单事由111</el-button>
		</span>
		<span slot="footer" class="dialog-footer" v-if="isCancel">
			<el-button type="primary" @click="submit" :disabled="!textareaValue.trim()">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import categoryCancelRule from '@/views/orderSupply/components/categoryCancelRule.vue'
	import refundRule from '@/views/orderSupply/components/refundRule.vue'
	export default {
		name: "index",
		components: {
			categoryCancelRule,
			refundRule
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
				isCancelRule: false,
				isRefund: false,
				isCancel: false,
				textareaValue: '',
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
			openRefund() {
				this.isRefund = true
			},
			closeRefund() {
				this.isRefund = false
			},
			openCancel() {
				this.isCancelRule = true
			},
			closeCancel() {
				this.isCancelRule = false
			},
			toCancel() {
				console.log(999);
				this.isCancel = true
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
