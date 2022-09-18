<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;padding-top: 20px;max-height: 70vh;overflow-y: auto;">
			<div class="mb10" style="padding-bottom: 10px;">
				<div class="flex flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px"
						:src="basicImgUrl + catogoryObj.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{catogoryObj.categoryName}}</div>
							<div>{{catogoryObj.categoryalias}}</div>
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
			<template v-if="offerType == 'model'">
				<div class="title-bg">型号信息</div>
				<div>
					<div class="flex mb10 flex-center">
						<div style="width: 100px;">型号名称</div>
						<div>{{row.modelName}}</div>
					</div>
				</div>
			</template>
			
			<plateModel v-if="isLoading" :plateData="plateArr" @getParamData="getParamData" :pageType="pageType"></plateModel>
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
		getModelPriceContent,
		insertModelPriceTc,
		insertBillPrice,
		deletePrice
	} from '@/api/supplyOfferApi/supplyOffer.js'
	import {
		getPlateEmptyModel,
	} from '@/api/supplyRangeApi/supplyRange.js'
	import {
		getNewId,
	} from '@/api/commonApi.js'
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
			},
			offerType: {
				type: String,
				default: 'model'
			},
			catogoryObj: {
				type: Object,
				default: () => {
					return {}
				}
			},
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
				},
				plateArr: [],
				paramData: [],
				isLoading: false,
				pageType: 'new',
				fileLength: 0,
			};
		},
		methods: {
			async getNewId() {
				await getNewId().then(res => {
					console.log(res);
					let guid = res
					this.insertModelPriceTc(guid)
				})
			},
			// 新建时用
			async getPlateEmptyModel() {
				this.isLoading = false
				await getPlateEmptyModel({
					categoryGuid: this.catogoryObj.categoryGuid,
					catTreeCode: this.catogoryObj.catTreeCode || 'supply',
					bizType: this.catogoryObj.bizType || '2',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.isLoading = true
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.plateArr = data
							let plateArr = data
							for (let p in plateArr) {
								for (let f in plateArr[p].field) {
									this.fileLength++
								}
							
							
							}
						} else {
							this.plateArr = []
						}
					}
				})
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			getParamData(data) {
				this.paramData = data
				console.log('paramData', data);
			},
			submit() {
				let offerData = this.offerData
				if (offerData.bankUserName && offerData.bankUserNo && offerData.bankAddr && offerData.bankName && offerData.supplyCompanyName) {
					
					let plateArr = this.paramData
					let fileLength = 0
					if (plateArr.length > 0) {
						for (let p in plateArr) {
							for (let f in plateArr[p].field) {
								for (let v in plateArr[p].field[f].values) {
									if (plateArr[p].field[f].values[v].value || plateArr[p].field[f].values[v].key) {
										fileLength++
										console.log(fileLength);
									}
					
								}
							}
					
					
						}
						if (fileLength < this.fileLength) {
							this.$message({
								type: 'error',
								message: '还有信息未填'
							});
							
						} else {
							if (this.offerType == 'single') {
								this.insertBillPrice()
							} else {
								if(this.pageType == 'edit') {
									this.deletePrice()
								} else {
									this.getNewId()
								}
							}
							
						}
					} else {
						this.$message({
							type: 'error',
							message: '还有信息未填'
						});
					}
					
					
					
					
				} else {
					this.$message({
						message: '还有信息没有填写!',
						type: 'error'
					});
				}
				
			},
			async insertModelPriceTc(guid) {
				let modelObj = {
					modelGuid: this.row.modelGuid,
					modelPriceGuid: guid,
					bankUserName: this.offerData.bankUserName,
					bankName: this.offerData.bankName,
					bankUserNo: this.offerData.bankUserNo,
					bankAddr: this.offerData.bankAddr,
					supplyCompanyName: this.offerData.supplyCompanyName,
					curUserId: this.$store.state.user.adminId,
				}
				let plateArr = this.paramData
				let arr = []
				for (let p in plateArr) {
					for (let f in plateArr[p].field) {
						for (let v in plateArr[p].field[f].values) {
							let contentFDCode = ''
							if (this.pageType == 'new') {
								contentFDCode = plateArr[p].field[f].content.length?plateArr[p].field[f].content[0].contentFDCode:''
							} else {
								contentFDCode = plateArr[p].field[f].contentFDCode
							}
							console.log('valuessss',plateArr[p].field[f].values[v].value);
							let obj = {
								modelPriceGuid: guid,
								modelGuid: this.row.modelGuid,
								plateGuid: plateArr[p].plateGuid,
								plateCode: plateArr[p].plateFDCode,
								plateAlias: plateArr[p].alias,
								plateNorder: plateArr[p].norder,
								plateFieldGuid: plateArr[p].field[f].fieldGuid,
								plateFieldAlias: plateArr[p].field[f].alias,
								plateFieldCode: plateArr[p].field[f].fieldFDCode || '',
								plateFieldNorder: plateArr[p].field[f].norder,
								plateFieldValue: plateArr[p].field[f].fieldFDCode=='f00051'?(plateArr[p].field[f].values[v].value * 100).toString() : (plateArr[p].field[f].values[v].value || plateArr[p].field[f].values[v].key).toString(),
								fieldContentGc: contentFDCode,
								operation: plateArr[p].field[f].operation,
								curUserId: this.$store.state.user.adminId,
							}
							arr.push(obj)
						}
					}


				}
				const obj1 = {
					SqlCmdName: 'aprc\\webSuOrg\\supplier\\model\\price\\insertPrice_1_0_1',
					DBC: 'w_a',
					Parameter: JSON.stringify([modelObj])
				}
				const obj2 = {
					SqlCmdName: 'aprc\\webSuOrg\\supplier\\model\\price\\insertPricePlates_1_0_1',
					DBC: 'w_a',
					Parameter: JSON.stringify(arr)
				}
				const data = [obj1, obj2]
				console.log('modelObj', );
				console.log('arr', arr);
				await insertModelPriceTc(JSON.stringify(data)).then(res => {
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
			async deletePrice() {
				await deletePrice({
					modelPriceGuid: this.row.modelPriceGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.getNewId()
							// this.insertModelPriceTc(this.row.modelPriceGuid)
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
						}
					}
				})
			},
			// 按单报价
			async insertBillPrice() {
				let plateArr = this.paramData
				let arr = []
				for (let p in plateArr) {
					for (let f in plateArr[p].field) {
						for (let v in plateArr[p].field[f].values) {
							let contentFDCode = ''
							if (this.pageType == 'new') {
								contentFDCode = plateArr[p].field[f].content.length?plateArr[p].field[f].content[0].contentFDCode:''
							} else {
								contentFDCode = plateArr[p].field[f].contentFDCode
							}
							console.log('valuessss',plateArr[p].field[f].values[v].value);
							let obj = {
								plateGuid: plateArr[p].plateGuid,
								plateFDCode: plateArr[p].plateFDCode,
								plateAlias: plateArr[p].alias,
								plateNorder: plateArr[p].norder,
								plateFieldGuid: plateArr[p].field[f].fieldGuid,
								plateFieldAlias: plateArr[p].field[f].alias,
								plateFieldFDCode: plateArr[p].field[f].fieldFDCode || '',
								plateFieldNorder: plateArr[p].field[f].norder,
								plateFieldValue: plateArr[p].field[f].fieldFDCode=='f00051'?(plateArr[p].field[f].values[v].value * 100).toString() : (plateArr[p].field[f].values[v].value || plateArr[p].field[f].values[v].key).toString(),
								fieldContentGc: contentFDCode,
								operation: plateArr[p].field[f].operation,
								curUserId: this.$store.state.user.adminId,
							}
							arr.push(obj)
						}
					}
				}

				let data = {
					requestGuid: this.row.requestGuid,
					requestSupplyGuid: this.row.requestSupplyGuid,
					bankUserName: this.offerData.bankUserName,
					bankName: this.offerData.bankName,
					bankUserNo: this.offerData.bankUserNo,
					bankAddr: this.offerData.bankAddr,
					supplyCompanyName: this.offerData.supplyCompanyName,
					curUserId: this.$store.state.user.adminId,
					plates: arr
				}
				await insertBillPrice(data).then(res => {
					if (res.OK == 'True') {
						if (res.Tag > 0) {
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
			async getModelPriceContent() {
				this.isLoading = false
				await getModelPriceContent({
					modelPriceGuid: this.row.modelPriceGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.isLoading = true
					if (res.OK == 'True') {
						let data = res.Tag[0].Table[0]
						this.offerData = data
						this.plateArr = data.plate
						console.log(this.plateArr);
					}
				})
			}
		},
		created() {
			if (this.offerType == 'single') {
				this.getPlateEmptyModel()
			} else {
				if (this.row.modelPriceGuid) {
					this.getModelPriceContent()
					this.pageType="edit"
				} else {
					this.getPlateEmptyModel()
					this.pageType="new"
				}
			}

		}
	};
</script>

<style lang="scss" scoped>
</style>
