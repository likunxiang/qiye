<template>
	<el-dialog title="新建反馈" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div>
			<div class="mb10">品类名称</div>
			<el-input type="text" placeholder="请与你的订单一致" v-model="categoryName" />
		</div>
		<el-divider></el-divider>
		<div>
			<div class="mb10">采购编号</div>
			<el-input type="text" placeholder="请与你的订单一致" v-model="orderNo" />
		</div>
		<el-divider></el-divider>
		<div>
			<div class="mb10">事由</div>
			<el-input type="textarea" :rows="3" placeholder="请填写意见或者建议" v-model="textarea" />
		</div>
		<el-divider></el-divider>
		<div>
			<div class="mb10">证据</div>
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
		</div>
		<el-divider></el-divider>
		<div>
			<div class="mb10">联系人</div>
			<el-input type="text" placeholder="请与你的订单一致" v-model="linkman" />
		</div>
		<el-divider></el-divider>
		<div>
			<div class="mb10">区号</div>
			<div>{{nation}}</div>
		</div>
		<el-divider></el-divider>
		<div>
			<div class="mb10">联系电话</div>
			<el-input type="text" placeholder="请与你的订单一致" v-model="phone" />
		</div>
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
		insert
	} from '@/api/system/usageFeedback.js'
	export default {
		name: "index",
		data() {
			return {
				isOpen: true,
				imgList: [], // 图片储存
				imgListShow: [], // 展示列表
				uploadUrl: '',
				step: 0,
				categoryName: '',
				orderNo: '',
				textarea: '',
				linkman: '',
				phone: '',
				nation: '中国大陆（+86）',
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
			async insert() {
				await insert({
					curUserId: this.$store.state.user.adminId,
					feedbackContent: this.textarea,
					categoryName: this.categoryName,
					orderNo: this.orderNo,
					imgs: this.uploadUrl,
					contact: this.linkman,
					phone: this.phone,
					nation: this.nation
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
				let FilePath = 'aprc\\user\\order_feedback\\images'
				let data = base64File
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgList.length) {
							this.insert()
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
