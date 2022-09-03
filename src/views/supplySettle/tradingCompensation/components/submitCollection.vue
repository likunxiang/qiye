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

			<div class="title-bg mt10">
				<div v-if="isInput">收款信息</div>
			</div>

			<div v-if="isInput">
				<div class="flex flex-center mb10">
					<div class="my-label1">账户名称</div>
					<el-input type="text" placeholder="请输入" v-model="name"></el-input>
				</div>
				<div class="flex flex-center mb10">
					<div class="my-label1">开户银行</div>
					<el-input type="text" placeholder="请输入" v-model="bankName"></el-input>
				</div>
				<div class="flex flex-center mb10">
					<div class="my-label1">银行账号</div>
					<el-input type="text" placeholder="请输入" v-model="bankNo"></el-input>
				</div>
				<div class="flex flex-center">
					<div class="my-label1">银行地址</div>
					<el-input type="text" placeholder="请输入" v-model="bankAddress"></el-input>
				</div>
			</div>

			<div class="flex flex-center" v-if="!isInput">
				<div class="radio mr10" v-if="!isRadio" @click="changeRadio"></div>
				<div class="radio-full mr10" v-if="isRadio" @click="changeRadio"></div>
				<div class="flex flex-center">
					<div>我已阅读并同意</div>
					<div style="text-decoration: underline;color: #1890FF;" @click="openRule">《违约赔偿规则》</div>
				</div>
			</div>

			<defaultDamageRule v-if="isRule" @close="closeRule" :row="row"></defaultDamageRule>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="toInputProve" :disabled="!isRadio" v-if="!isInput">填写收款账号</el-button>
			<el-button type="primary" @click="submit" v-if="isInput" :disabled="!name || !bankName || !bankNo || !bankAddress">提交</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import defaultDamageRule from '@/views/supplySettle/tradingCompensation/components/defaultDamageRule.vue'
	import { submitBankInfo } from '@/api/supplySettleApi/supplySettle.js'
	export default {
		name: "index",
		components: {
			defaultDamageRule,
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
				isRule: false,
				isRadio: false,
				isInput: false,
				name: '',
				bankName: '',
				bankNo: '',
				bankAddress: '',
				isCollection: false,
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
			openRule() {
				this.isRule = true
			},
			closeRule() {
				this.isRule = false
			},
			toInputProve() {
				this.isInput = true
			},
			closeInputProve() {
				this.isInput = false
			},
			submit() {
				this.$confirm('提交后将不可更改。请确认是否提交。', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				}).catch(() => {
				});
			},
			async submitBankInfo() {
				await submitBankInfo({
					judgeFeeGuid: this.row.judgeFeeGuid,
					bankUserName: this.name,
					bank: this.bankName,
					bankNo: this.bankNo,
					bankAddr: this.bankAddress,
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
			},

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

	.my-label1 {
		width: 120px;
	}
</style>
