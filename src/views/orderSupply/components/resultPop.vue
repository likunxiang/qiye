<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;padding-top: 20px;">
			<el-result icon="success" :title="title">
				<template slot="subTitle">
				    <div>
						<div>【{{row.categoryName}}】</div>
						<div>采购编号：{{row.orderNo}}</div>
					</div>
				  </template>
				<template slot="extra">
					<el-button type="primary" size="medium" @click="backList">{{buttonText}}</el-button>
				</template>
			</el-result>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				isOpen: true,
			};
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			title: {
				type: String,
				default: '',
			},
			buttonText: {
				type: String,
				default: '',
			}
		},
		methods: {
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			backList() {
				this.$emit('refresh')
				this.close()
			}
		},
		created() {
			
		}
	};
</script>

<style lang="scss" scoped>
</style>
