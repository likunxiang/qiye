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
				<div v-if="isReason">退货验收不通过事由</div>
			</div>
			
			<template v-if="isReason">
				<div>
					<el-input
					  type="textarea"
					  :rows="3"
					  placeholder="请如实填写不通过事由"
					  v-model="textareaValue">
					</el-input>
				</div>
				 <el-divider></el-divider>
				 <div class="flex flex-center mb10">
					 <div class="my-label mr20">证据说明</div>
					 <div>请提供退货有问题的证明</div>
				 </div>
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
			</template>

			<div class="flex flex-center" v-if="!isReason">
				<div class="radio mr10" v-if="!isRadio" @click="changeRadio"></div>
				<div class="radio-full mr10" v-if="isRadio" @click="changeRadio"></div>
				<div class="flex flex-center">
					<div>我已阅读并同意</div>
					<div style="text-decoration: underline;color: #1890FF;" @click="openVerifyRule">《退货验收规则》</div>
				</div>
			</div>
			<refundVerifyRule v-if="isVerifyRule" @close="closeVerifyRule" :row="row"></refundVerifyRule>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submit" :disabled="!isRadio" v-if="pageType == 'pass'">验收通过</el-button>
			<el-button type="primary" @click="toInputReason" :disabled="!isRadio" v-if="pageType == 'noPass' && !isReason">填写验收不通过事由</el-button>
			<el-button type="primary" @click="submitReason" :disabled="!textareaValue.trim()" v-if="isReason">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import refundVerifyRule from '@/views/orderSupply/components/refundVerifyRule.vue'
	import { refundAcceptW1,refundNotAccept } from '@/api/orderSupplyApi/orderSupply.js'
	import {
		upLoadImgApi,
		GetfeeNo
	} from '@/api/commonApi.js'
	import {
		uploadImgToBase64
	} from '@/utils/base64.js' // 导入本地图片转base64的方法
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			pageType: {
				type: String,
				default: 'pass'
			}
		},
		components: {
			refundVerifyRule
		},
		data() {
			return {
				isOpen: true,
				isRadio: false,
				isVerifyRule: false,
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				isReason: false,
				textareaValue: '',
				imgList: [], // 图片储存
				imgListShow: [], // 展示列表
				uploadUrl: '',
				step: 0,
				accptSting: '.png, .jpeg, .jpg, .gif'
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
			changeRadio() {
				this.isRadio = !this.isRadio
			},
			openVerifyRule() {
				this.isVerifyRule = true
			},
			closeVerifyRule() {
				this.isVerifyRule = false
			},
			toInputReason() {
				this.isReason = true
			},
			closeInputReason() {
				this.isReason = false
			},
			submit() {
				const name = `【` + this.row.categoryName + `】`
				const orderNo = `采购编号：` + this.row.orderNo
				const msg = '确认对收到的退货无异议。'
				const h = this.$createElement;
				this.$msgbox({
					title: '',
					message: h('p', null, [
						h('div', null, name),
						h('div', null, orderNo),
						h('div', null, msg)
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(action => {
					this.refundAcceptW1()
				});
			},
			submitReason() {
				const name = `【` + this.row.categoryName + `】`
				const orderNo = `采购编号：` + this.row.orderNo
				const msg = '验收不通过提交后不可更改。同时本订单退货转为线下处理。确认提交。'
				const h = this.$createElement;
				this.$msgbox({
					title: '',
					message: h('p', null, [
						h('div', null, name),
						h('div', null, orderNo),
						h('div', null, msg)
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(action => {
					this.$refs.upload.submit();
				});
			},
			async refundAcceptW1() {
				await refundAcceptW1({
					orderGuid: this.row.orderGuid,
					orderRefundGuid: this.row.orderRefundGuid,
					bizRuleType22Guid: 'c9b59ba5-7374-11ec-a478-0242ac120003',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.$emit('refresh')
							this.$emit('refreshTop')
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
			async refundNotAccept() {
				await refundNotAccept({
					orderGuid: this.row.orderGuid,
					orderRefundGuid: this.row.orderRefundGuid,
					bizRuleType22Guid: 'c9b59ba5-7374-11ec-a478-0242ac120003',
					supplyNotAcceptReason: this.textareaValue,
					supplyAcceptProve: this.uploadUrl,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.$emit('refresh')
							this.$emit('refreshTop')
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
				let FilePath = 'aprc\\judge\\images'
				let data = base64File
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgList.length) {
							this.refundNotAccept()
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
