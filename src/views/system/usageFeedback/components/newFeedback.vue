<template>
	<el-dialog title="新建反馈" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div>
			<el-input type="textarea" :rows="3" placeholder="请填写意见或者建议" v-model="textarea" />
		</div>
		<el-divider></el-divider>
		<el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
			:on-change="preUploadImg" :http-request="uploadImg" :multiple="true"
			:on-success="handleAvatarSuccess">
			<div class="flex" style="flex-wrap: wrap;">
				<el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
					v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
				<div class="flex flex-center non-image">
					<div class="el-icon-plus" style="font-size: 36px;"></div>
				</div>
			</div>
		</el-upload>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!textarea.trim()">保 存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		upLoadImgApi,
		GetfeeNo
	} from '@/api/commonApi.js'
	import {
		uploadImgToBase64
	} from '@/utils/base64.js' // 导入本地图片转base64的方法
	import {
		InsertOne
	} from '@/api/system/usageFeedback.js'
	export default {
		name: "index",
		data() {
			return {
				isOpen: true,
				textarea: '',
				imgList: [], // 图片储存
				imgListShow: [], // 展示列表
				uploadUrl: '',
				step: 0,
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
				this.$refs.upload.submit();
			},
			async InsertOne() {
				await InsertOne({
					curUserId: this.$store.state.user.adminId,
					content: this.textarea,
					imgs: this.uploadUrl,
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

			// 图片上传相关
			handleAvatarSuccess(res, file) {},
			preUploadImg(file, fileList) {
				this.imgList = fileList
				let imgList = fileList
				let arr = imgList.map(item => URL.createObjectURL(item.raw))
				let uploadUrl = imgList.map(item => item.name).join(',')
				this.uploadUrl = uploadUrl
				console.log(arr, uploadUrl);
				this.imgListShow = arr
			},
			// 正经上传图片
			async uploadImg(item) {
				console.log(item);
				const response = await uploadImgToBase64(item.file)
				const base64File = response.result.replace(/.*;base64,/, '')
				let FileName = item.file.name
				let FilePath = 'aprc\\user\\use_feedback\\images'
				let data = base64File
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgList.length) {
							this.InsertOne()
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
</style>
