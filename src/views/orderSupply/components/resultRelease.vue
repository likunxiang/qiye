<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-top: 20px;padding-bottom: 40px;" v-loading="loading">
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
					<el-button type="primary" size="small" @click="openChoose" v-if="pageType != 'check'">
						成果上传</el-button>
				</div>
				<div v-for="(res,index) in tableData.outcome" :key="index">
					<!-- 图片区域 -->
					<div class="mt10" v-if="res.type==='1'">
						<div>{{res.createTime}}</div>
						<div class="flex flex-center mt10">
							<el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl1 + imgItem.url"
								 v-for="(imgItem,imgIndex) in res.data" :key="imgIndex" fit="fit">
							</el-image>
						</div>
					</div>
					<!-- 文档区域 -->
					<div class="mt10" v-if="res.type==='2'">
						<div>{{res.createTime}}</div>
						<div class="mt10">
							<div v-for="(fileItem,fileIndex) in res.data" :key="fileIndex">{{fileItem.url}}</div>
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
					<el-upload class="upload-demo" ref="upload" action="" :on-change="preUploadImg"
						:http-request="uploadImg" :on-remove="handleRemove" :file-list="fileList" :limit="1"
						:accept="accptSting" :auto-upload="false" :multiple="false">
						<el-button slot="trigger" size="small" type="primary">上传文件</el-button>
					</el-upload>
				</div>
				<!-- 上传组件 -->
			</template>
			<chooseUploadType v-if="isChoose" @close="closeChoose" @getChooseType="getChooseType"></chooseUploadType>
			<resultPop v-if="isResultPop" @close="closeResultPop" :row="row" @refresh="close" title='成果上传提交成功'
				buttonText='返回供应交接管理'></resultPop>
		</div>
		<span slot="footer" class="dialog-footer" v-if="uploadType.length > 0 ">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import chooseUploadType from '@/views/orderSupply/components/chooseUploadType.vue'
	import resultPop from '@/views/orderSupply/components/resultPop.vue'
	import {
		orderSubmitOutcome,
		getOutcomeDetailData
	} from '@/api/orderSupplyApi/orderSupply.js'
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
				imgBasicUrl1: this.$store.state.basics.img_url_ord,
				uploadType: '',
				isChoose: false,
				imgList: [], // 图片储存
				imgListShow: [], // 展示列表
				uploadUrl: '',
				accptSting: '',
				fileList: [],
				step: 0,
				isResultPop: false,
				tableData: {},
				showList1: [],
				showList2: [],
				hasData: false,
				loading: false,
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
				let uploadUrl = this.uploadUrl
				let parmaData = []
				for (let i in uploadUrl) {
					let obj = {
						orderGuid: this.row.orderGuid,
						type: this.uploadType == 'image' ? '1' : '2',
						content: uploadUrl[i],
						name: uploadUrl[i],
						curUserId: this.$store.state.user.adminId,
					}
					parmaData.push(obj)
				}
				
				await orderSubmitOutcome(JSON.stringify(parmaData)).then(res => {
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
			// 查看成果详情
			async getOutcomeDetailData() {
				this.loading = true
				await getOutcomeDetailData({
					orderGuid: this.row.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
						if (res.Tag.length) {
							this.hasData = true
							let data = res.Tag[0].Table[0]
							this.tableData = data
							if (data.outcome.length > 0) {
								for (let i in data.outcome) {
									if (data.outcome[i].type == '1') {
										this.showList1 = data.outcome[i].data[0].name.split(',')
										this.showList1 = this.showList1.map(item => this.imgBasicUrl1 + item)
									} else if (data.outcome[i].type == '2') {
										this.showList2 = data.outcome[i].data[0].name.split(',')
										this.showList2 = this.showList2.map(item => item)
									}
								}
							} else {
								this.hasData = false
							}



						} else {
							this.tableData = {}

						}
					}
				})
			},

			// 图片上传相关
			handleAvatarSuccess(res, file) {},
			preUploadImg(file, fileList) {
				this.imgList = fileList
				let imgList = fileList
				console.log(fileList);
				let arr = imgList.map(item => URL.createObjectURL(item.raw))
				let uploadUrl = imgList.map(item => item.name)
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
				if (this.uploadType == 'image') {
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
			this.getOutcomeDetailData()
		}
	};
</script>

<style lang="scss" scoped>
</style>
