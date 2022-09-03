<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;padding-top: 20px;">
			<el-result icon="success" title="成果上传提交成功" subTitle="采购编号：202222222222222">
				<template slot="subTitle">
				    <div>
						<div>【{{row.categoryName}}】</div>
						<div>采购编号：{{row.orderNo}}</div>
					</div>
				  </template>
				<template slot="extra">
					<el-button type="primary" size="medium" @click="backList">返回供应交接管理</el-button>
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
			this.title = ''
			
		}
	};
</script>

<style lang="scss" scoped>
</style>
