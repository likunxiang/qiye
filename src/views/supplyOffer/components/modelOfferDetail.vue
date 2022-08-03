<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="mb10" style="padding-bottom: 10px;">
				<div class="flex flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{row.categoryName}}</div>
							<div>{{row.categoryalias}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="title-bg">结算信息</div>
			<div>
				<div class="flex mb10 flex-center">
					<div style="width: 100px;">账户名称</div>
					<el-input v-model="offerData.bankUserName" placeholder="请填写"></el-input>
				</div>
				<div class="flex mb10 flex-center">
					<div style="width: 100px;">开户银行</div>
					<el-input v-model="offerData.bankName" placeholder="请填写"></el-input>
				</div>
				<div class="flex mb10 flex-center">
					<div style="width: 100px;">银行账号</div>
					<el-input v-model="offerData.bankUserNo" placeholder="请填写"></el-input>
				</div>
				<div class="flex mb10 flex-center">
					<div style="width: 100px;">银行地址</div>
					<el-input v-model="offerData.bankAddr" placeholder="请填写"></el-input>
				</div>
			</div>
			<div class="title-bg">主体信息</div>
			<div>
				<div class="flex mb10 flex-center">
					<div style="width: 100px;">供应主体</div>
					<el-input v-model="offerData.supplyCompanyName" placeholder="请填写"></el-input>
				</div>
			</div>
			<div class="title-bg">型号信息</div>
			<div>
				<div class="flex mb10 flex-center">
					<div style="width: 100px;">型号名称</div>
					<div>{{row.modelName}}</div>
				</div>
			</div>
			<plateModel :plateData="offerData.plate"></plateModel>
		</div>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="close">取 消</el-button>
		  <el-button type="primary" @click="submit">保 存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import plateModel from "@/views/supplyRange/components/plateModel"
	import {
		getModelPriceContent
	} from '@/api/supplyOfferApi/supplyOffer.js'
	export default {
		name: "index",
		components: {
			plateModel
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				offerData: {
					bankUserName: '',
					bankUserNo: '',
					bankAddr: '',
					bankName: '',
					supplyCompanyName: '',
					plate: []
				}
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
				
			},
			async getModelPriceContent() {
				await getModelPriceContent({
					modelPriceGuid: modelPriceGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						let data = res.Tag[0].Table[0]
						this.offerData = data
						
					}
				})
			}
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
</style>
