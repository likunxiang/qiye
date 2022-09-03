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
				<div v-if="isInput">缴纳信息</div>
			</div>
			
			<div v-if="isInput">
				<div class="my-label mb10">证明内容</div>
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

			<div class="flex flex-center" v-if="!isInput">
				<div class="radio mr10" v-if="!isRadio" @click="changeRadio"></div>
				<div class="radio-full mr10" v-if="isRadio" @click="changeRadio"></div>
				<div class="flex flex-center">
					<div>我已阅读并同意</div>
					<div style="text-decoration: underline;color: #1890FF;" @click="openRule">《违约费用缴纳规则》</div>
				</div>
			</div>

			<defaultCostRule v-if="isRule" @close="closeRule" :row="row"></defaultCostRule>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="toInputProve" :disabled="!isRadio" v-if="!isInput">填写缴纳证明</el-button>
			<el-button type="primary" @click="submit" v-if="isInput">提交</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import defaultCostRule from '@/views/supplySettle/defaultCost/components/defaultCostRule.vue'
	import { updateJudgeFeeType1 } from '@/api/supplySettleApi/supplySettle.js'
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
			defaultCostRule
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
				accptSting: '.png, .jpeg, .jpg, .gif',
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
				
			},
			async updateJudgeFeeType1() {
				await updateJudgeFeeType1({
					judgeFeeGuid: this.row.judgeFeeGuid,
					payProve: this.uploadUrl,
					bizRuleGuid: 'c9b59c06-7374-11ec-a478-0242ac120003',
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
				let FilePath = 'aprc\\order\\images'
				let data = base64File
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgList.length) {
							this.updateJudgeFeeType1()
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
</style>
