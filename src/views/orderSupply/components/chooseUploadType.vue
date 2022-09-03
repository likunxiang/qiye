<template>
	<el-dialog title="选择类型上传" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="choose-item flex jsb flex-center" @click="choose('image')">
				<div>图像类上传</div>
				<div class="el-icon-check" v-if="uploadType=='image'"></div>
			</div>
			<div class="choose-item flex jsb flex-center" @click="choose('file')">
				<div>文档类上传</div>
				<div class="el-icon-check" v-if="uploadType=='file'"></div>
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
				uploadType: '',
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
				this.uploadType = type
			},
			submit() {
				let type = this.uploadType
				this.$emit('getChooseType', type)
				this.close()
			}
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
