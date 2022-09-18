<template>
	<el-dialog title="请选择支付方式" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="choose-item flex jsb flex-center" @click="choose('wx')">
				<div>微信</div>
				<div class="el-icon-check" v-if="payWay=='wx'"></div>
			</div>
			<div class="choose-item flex jsb flex-center" @click="choose('zfb')">
				<div>支付宝</div>
				<div class="el-icon-check" v-if="payWay=='zfb'"></div>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit">确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				isOpen: true,
				payWay: '',
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
			choose(type) {
				this.payWay = type
			},
			submit() {
				let payWay = this.payWay
				this.$emit('getPayWay', payWay)
				this.close()
			},
			
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
	.choose-item {
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}
</style>
