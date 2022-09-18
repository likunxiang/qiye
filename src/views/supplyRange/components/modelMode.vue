<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div class="" style="padding-top: 20px;max-height: 70vh;overflow-y: auto;">
			<div style="width: 100%;" class="flex flex-center jsb mb20">
				<div class="flex">
					<el-image style="width: 100px; height: 100px" :src="basicImgUrl + catogoryObj.categoryImg" fit="fill">
					</el-image>
					<div class="ml10">
						<div>{{catogoryObj.categoryName}}</div>
						<div>{{catogoryObj.categoryalias}}</div>
					</div>
				</div>
			</div>
			<div class="title-bg">请完善该型号的需求</div>
			<div class="flex flex-center">
				<div style="width: 80px;flex-shrink: 0;">型号名称</div>
				<el-input v-model="modelName" placeholder="请填写"></el-input>
			</div>
			<plateModel v-if="loading" :plateData="plateArr" @getParamData="getParamData" :pageType="pageType"></plateModel>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!modelName">保 存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import plateModel from "@/views/supplyRange/components/plateModel"
	import {
		getSuppyRangeByModel,
		getPlateEmptyModel,
		insertSupplierModelTc,
		deleteModel
	} from '@/api/supplyRangeApi/supplyRange.js'
	import {
		getNewId,
	} from '@/api/commonApi.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			catogoryObj: {
				type: Object,
				default: () => {
					return {}
				}
			},
			pageType: {
				type: String,
				default: 'new'
			}
		},
		components: {
			plateModel
		},
		data() {
			return {
				isOpen: true,
				modelName: '',
				plateArr: [],
				loading: false,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				paramData: [],
				fileLength: 0,
			};
		},
		methods: {
			async getNewId() {
				await getNewId().then(res => {
					console.log(res);
					let guid = res
					this.insertSupplierModelTc(guid)
					
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
						if (this.pageType == 'new') {
							this.getNewId()
						} else {
							this.deleteModel()
						}
						
					}
				} else {
					this.$message({
						type: 'error',
						message: '还有信息未填'
					});
				}
				
				
				
			},
			// 编辑时用
			async getSuppyRangeByModel() {
				this.loading = false
				await getSuppyRangeByModel({
					modelGuid: this.row.modelGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = true
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.plateArr = data
						} else {
							this.plateArr = []
						}
					}
				})
			},
			// 新建时用
			async getPlateEmptyModel() {
				this.loading = false
				await getPlateEmptyModel({
					categoryGuid: this.catogoryObj.categoryGuid,
					catTreeCode: this.catogoryObj.catTreeCode || 'supply',
					bizType: this.catogoryObj.bizType || '1',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = true
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
			// web-供应-型号-新增需求范围内容 -- 提交表单
			async insertSupplierModelTc(guid) {
				let modelObj = {
					supplierGuid: this.catogoryObj.supplierGuid,
					modelGuid: guid,
					modelName: this.modelName,
					curUserId: this.$store.state.user.adminId,
				}
				let plateArr = []
				if(this.pageType == 'new') {
					plateArr = this.paramData
				} else {
					plateArr = this.plateArr
				}
				let arr = []
				console.log('plateArr',plateArr);
				for (let p in plateArr) {
					for (let f in plateArr[p].field) {
						for (let v in plateArr[p].field[f].values) {
							let contentFDCode = ''
							if (this.pageType == 'new') {
								contentFDCode = plateArr[p].field[f].content.length?plateArr[p].field[f].content[0].contentFDCode:''
							} else {
								contentFDCode = plateArr[p].field[f].contentFDCode
							}
							let obj = {
								supplierGuid: this.catogoryObj.supplierGuid,
								modelGuid: guid,
								plateGuid: plateArr[p].plateGuid,
								plateCode: plateArr[p].plateFDCode,
								plateAlias: plateArr[p].alias,
								plateNorder: plateArr[p].norder,
								plateFieldGuid: plateArr[p].field[f].fieldGuid,
								plateFieldAlias: plateArr[p].field[f].alias,
								plateFieldCode: plateArr[p].field[f].fieldFDCode,
								plateFieldNorder: plateArr[p].field[f].norder,
								plateFieldValue: plateArr[p].field[f].values[v].value || plateArr[p].field[f].values[v].key,
								fieldContentGc: contentFDCode,
								operation: plateArr[p].field[f].operation,
								curUserId: this.$store.state.user.adminId,
							}
							arr.push(obj)
						}
					}


				}
				const obj1 = {
					SqlCmdName: 'aprc\\webSuOrg\\supplier\\model\\info\\insertModel_1_0_1',
					DBC: 'w_a',
					Parameter: JSON.stringify([modelObj])
				}
				const obj2 = {
					SqlCmdName: 'aprc\\webSuOrg\\supplier\\model\\info\\insertModelPlates_1_0_1',
					DBC: 'w_a',
					Parameter: JSON.stringify(arr)
				}
				const data = [obj1, obj2]
				await insertSupplierModelTc(JSON.stringify(data)).then(res => {
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
			// 先删除
			async deleteModel() {
				let guid = this.row.modelGuid
				await deleteModel({
					modelGuid: guid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.getNewId()
						} else {
						}
					}
				})
			},
			// web-供应-型号-修改需求范围内容 // TODO
			// web-供应-型号-查询型号名称是否重复
			async getModelNameExistsFlag() {
				await etModelNameExistsFlag({
					supplierGuid: this.catogoryObj.supplierGuid,
					modelGuid: this.catogoryObj.modelGuid || '',
					modelName: this.modelName,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						let existsFlag = res.Tag[0].existsFlag
						if (existsFlag > 0) {
							// 重复了
							this.$message({
								message: '型号名称重复，求修改!',
								type: 'error'
							});
						} else {
							if (this.pageType == 'new') {
								this.getPlateEmptyModel()
							} else {
								this.getSuppyRangeByModel()
							}
						}
					}
				})
			}
		},
		created() {
			if (this.pageType == 'new') {
				this.getPlateEmptyModel()
			} else {
				this.getSuppyRangeByModel()
				// 先用直接删除
				// this.getPlateEmptyModel()
				this.modelName = this.row.modelName
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
