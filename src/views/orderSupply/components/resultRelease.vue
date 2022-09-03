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
			<template v-if="!uploadType">
				<div class="title-bg flex jsb flex-center mt10">
					<div v-if="pageType != 'check'">供应交接管理</div>
					<div v-if="pageType == 'check'">成果内容</div>
					<el-button type="primary" size="small" @click="openChoose" v-if="pageType != 'check'">成果上传</el-button>
				</div>
				<div>
					<!-- 图片区域 -->
					<div>
						<div>2022-12-12 12：12</div>
						<div class="flex flex-center mt10">
							<el-image class="mr10" style="width: 100px; height: 100px" v-for="item in 4" fit="fit">
							</el-image>
						</div>
					</div>
					<!-- 文档区域 -->
					<div class="mt10">
						<div>2022-12-12 12：12</div>
						<div class="mt10">
							<div v-for="item in 4">取消订单规则.doc</div>
						</div>
					</div>
				</div>
			</template>

			<template v-else-if="uploadType">
				<!-- 当uploadType为image时 -->
				<div v-if="uploadType == 'image'">
					<div class="title-bg mt10">图像类</div>
					<el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false"
						:auto-upload="false" :on-change="preUploadImg" :http-request="uploadImg" :multiple="true"
						:accept="accptSting" :on-success="handleAvatarSuccess">
						<div class="flex" style="flex-wrap: wrap;">
							<el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
								v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
							<div class="flex flex-center non-image">
								<div class="el-icon-plus" style="font-size: 36px;"></div>
							</div>
						</div>
					</el-upload>
				</div>
				<!-- 当uploadType为file时 -->
				<div v-else-if="uploadType == 'file'">
					<div class="title-bg mt10">文档类</div>
					<el-upload class="upload-demo" ref="upload" action=""
						:on-change="changeFile" :http-request="uploadImg" :on-remove="handleRemove"
						:file-list="fileList" :on-exceed="handleExceed" :limit="1" :accept="accptSting"
						:before-upload="beforeUpload" :auto-upload="false" :multiple="false">
						<el-button slot="trigger" size="small" type="primary">上传文件</el-button>
					</el-upload>
				</div>
				<!-- 上传组件 -->
			</template>
			<chooseUploadType v-if="isChoose" @close="closeChoose" @getChooseType="getChooseType"></chooseUploadType>
			<resultPop v-if="isResultPop" @close="closeResultPop" :row="row" @refresh="close"></resultPop>
		</div>
		<span slot="footer" class="dialog-footer" v-if="pageType != 'check'">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import chooseUploadType from '@/views/orderSupply/components/chooseUploadType.vue'
	import resultPop from '@/views/orderSupply/components/resultPop.vue'
	import { orderSubmitOutcome } from '@/api/orderSupplyApi/orderSupply.js'
	import {
		upLoadImgApi,
		GetfeeNo
	} from '@/api/commonApi.js'
	import {
		uploadImgToBase64
	} from '@/utils/base64.js' // 导入本地图片转base64的方法
	export default {
		name: "index",
		components: {
			chooseUploadType,
			resultPop
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			pageType: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpen: true,
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				uploadType: '',
				isChoose: false,
				imgList: [], // 图片储存
				imgListShow: [], // 展示列表
				uploadUrl: '',
				accptSting: '',
				fileList: [],
				step: 0,
				isResultPop: false
			};
		},
		methods: {
			openResultPop() {
				this.isResultPop = true
			},
			closeResultPop() {
				this.isResultPop = false
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			openChoose() {
				this.isChoose = true
			},
			closeChoose() {
				this.isChoose = false
			},
			getChooseType(data) {
				if (data == 'image') {
					this.uploadType = 'image'
					this.accptSting = ".png, .jpeg, .jpg, .gif, "
				} else if (data == 'file') {
					this.uploadType = 'file'
					this.accptSting = ".doc, .docx"
				}
			},
			submit() {
				if (this.uploadType == 'image') {
					this.$refs.upload.submit();
				} else if (this.uploadType == 'file') {
					this.$refs.upload.submit();
				}
			},
			async orderSubmitOutcome() {
				await orderSubmitOutcome({
					orderGuid: this.row.orderGuid,
					type: this.uploadType=='image'?'1':'2',
					content: this.uploadUrl,
					name: this.uploadUrl,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.$emit('refresh')
							this.openResultPop()
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
				let FilePath = ''
				if(this.uploadType == 'image') {
					FilePath = 'aprc\\order\\images'
				} else {
					FilePath = 'aprc\\order\\images'
				}
				let data = base64File
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgList.length) {
							this.orderSubmitOutcome()
						}

					}
				})
			},

			handleRemove(file, fileList) {
				console.log(file, fileList);
				this.fileList = fileList
			},
			// 选择文件
			changeFile(file, fileList) {
				console.log(file);
				this.fileList = fileList
			},
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
</style>
