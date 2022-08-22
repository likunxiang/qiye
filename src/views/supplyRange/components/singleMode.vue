<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;padding-top: 20px;" v-loading="loading">
			<div style="width: 100%;" class="flex flex-center jsb mb20">
				<div class="flex">
					<el-image style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg" fit="fill">
					</el-image>
					<div class="ml10">
						<div>{{row.categoryName}}</div>
						<div>{{row.categoryalias}}</div>
					</div>
				</div>
			</div>
			<div class="title-bg flex flex-center">
				<div class="mr10">需求范围设置</div>
				<el-switch v-model="rangeValue" @change="changeSwitch" active-color="#13ce66" inactive-color="grey">
				</el-switch>
			</div>
			<div v-if="!rangeValue">
				提示：需求范围关闭，代表你希望只要是这个品类的采购需求你都接收。
			</div>

			<div v-else>
				<!-- 按单 -->
				<template v-if="userPriceMode=='2'">
					<plateModel v-if="isLoading" :plateData="plateArr" @getParamData="getParamData"
						:pageType="pageType"></plateModel>
				</template>
				<!-- 型号 -->
				<template v-else>
					<div class="flex flex-center jsb mb20">
						<div class="flex flex-center">
							<el-input placeholder="请输入你要搜索的型号名称" v-model="searchVal" @keyup.enter.native="searchClass"
								style="width: 200px;" clearable>
								<i class="el-icon-search el-input__icon" slot="suffix" @click="searchClass">
								</i>
							</el-input>
							<div v-if="isToSearch" class="ml0">搜索结果</div>
						</div>
						<el-button type="primary" @click="creationModel">创建型号</el-button>
					</div>
					<el-table :data="modelData" border>
						<el-table-column prop="modelName" label="品类名称" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" @click="delModel(scope.row)">删除型号</el-button>
								<el-button type="text" @click="editModel(scope.row)">编辑型号</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<modelMode v-if="isModel" @close="closeModel" :pageType="pageType" :catogoryObj="catogoryObj"
					:row="openRow" @refresh="getModels"></modelMode>
			</div>
		</div>

		<span slot="footer" class="dialog-footer" v-if="userPriceMode =='2' && rangeValue">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit">保 存</el-button>
		</span>

	</el-dialog>
</template>

<script>
	import plateModel from "@/views/supplyRange/components/plateModel"
	import modelMode from "@/views/supplyRange/components/modelMode"
	import {
		getRangeFlag,
		updateRangeFlagOn,
		updateRangeFlagOff,
		getSupplyRangeBySingle,
		deleteBill,
		deleteModelBySupplierGuid,
		insertBill,
		updateBill,
		getModels,
		deleteModel,
		getPlateEmptyModel,
	} from '@/api/supplyRangeApi/supplyRange.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		components: {
			plateModel,
			modelMode
		},
		data() {
			return {
				isOpen: true,
				rangeValue: false,
				searchVal: '', // 搜索内容
				isToSearch: false,
				searchResult: 0,
				isModel: false,
				pageType: 'new',
				isEdit: false,
				modelData: [],
				loading: false,
				plateArr: [], // 板块内容
				openRow: {},
				basicImgUrl: this.$store.state.basics.img_url_cat,
				userPriceMode: '1', // 模式
				paramData: [],
				isLoading: false,
				catogoryObj: {}
			};
		},
		methods: {
			getParamData(data) {
				this.paramData = data
				console.log('paramData', data);
			},

			submit() {
				if (this.pageType == 'edit') {
					this.deleteBill()
				} else {
					this.insertBill()
				}

			},

			searchClass() {
				if (this.searchVal.length > 0) {
					this.isToSearch = true
				} else {
					this.isToSearch = false
				}
				this.page = 1
				this.getModels()
			},
			changeSwitch() {
				let rangeValue = this.rangeValue
				if (rangeValue) {
					this.$confirm('确认开启【需求范围】，有条件接收需方需求信息？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.updateRangeFlagOn()
					}).catch(() => {
						this.rangeValue = !rangeValue
					});
				} else {
					this.$confirm('确认关闭【需求范围】，不限制需方需求信息？关闭后，原需求范围内容将被删除', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.updateRangeFlagOff()
					}).catch(() => {
						this.rangeValue = !rangeValue
					});
				}
			},
			creationModel(row) {
				this.isModel = true
				this.catogoryObj = this.row
				this.pageType = 'new'
			},
			closeModel() {
				this.isModel = false
			},
			delModel(row) {
				this.$confirm('确定删除' + row.modelName + '。删除后将接收不到这个型号的采购需求。', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteModel(row.modelGuid)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			editModel(row) {
				this.isModel = true
				this.pageType = 'edit'
				this.catogoryObj = this.row
				this.openRow = row
			},
			closeEdit() {
				this.isModel = false
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			async getRangeFlag() {
				this.loading = true
				await getRangeFlag({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
						let rangeFlag = res.Tag[0].Table[0].rangeFlag
						let userPriceMode = res.Tag[0].Table[0].userPriceMode
						let billPlateHasValue = res.Tag[0].Table[0].billPlateHasValue

						this.rangeValue = rangeFlag == '1' ? true : false
						if (rangeFlag == '1') {
							if (userPriceMode == '1') {
								// 型号
								this.userPriceMode = '1'
								this.getModels()
							} else if (userPriceMode == '2') {
								this.userPriceMode = '2'
								// 按单
								if (billPlateHasValue == '0') {
									this.getPlateEmptyModel()
									this.pageType = 'new'
								} else if (billPlateHasValue == '1') {
									// 如果按单有值，则字段那里走编辑
									this.getSupplyRangeBySingle()
									this.pageType = 'edit'
								}

							}
						} else {
							// 需求范围关闭的时候，都是按单
							this.userPriceMode = '2'
						}
					}
				})
			},
			async updateRangeFlagOn() {
				this.loading = true
				await updateRangeFlagOn({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
						// let userPriceMode = res.Tag[0].userPriceMode
						// this.userPriceMode = userPriceMode
						this.getRangeFlag()
					} else {
						this.rangeValue = false
					}
				})
			},
			async updateRangeFlagOff() {
				this.loading = true
				await updateRangeFlagOff({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
						let userPriceMode = res.Tag[0].userPriceMode
						if (this.userPriceMode == '1') {
							this.deleteModelBySupplierGuid()
						} else {
							this.deleteBill()
						}
						// this.userPriceMode = userPriceMode
						this.getRangeFlag()
					} else {
						this.rangeValue = true
					}
				})
			},
			// web-供应-按单-查询供方需求范围内容
			async getSupplyRangeBySingle() {
				this.isLoading = false
				await getSupplyRangeBySingle({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.isLoading = true
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
			// 按单-关闭需求范围调用该删除接口
			async deleteBill() {
				await deleteBill({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							if (this.pageType == 'edit') {
								this.insertBill()
							} else {
								// this.$message({
								// 	message: '操作成功!',
								// 	type: 'success'
								// });
								this.plateArr = []
							}
						} else {
							// this.$message({
							// 	message: '操作失败!',
							// 	type: 'error'
							// });
						}
					}
				})
			},
			// 按型号关闭需求范围调用该删除接口
			async deleteModelBySupplierGuid() {
				await deleteModelBySupplierGuid({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.Tag[0] > 0) {
						// this.$message({
						// 	message: '操作成功!',
						// 	type: 'success'
						// });
						this.modelData = []
					} else {
						// this.$message({
						// 	message: '操作失败!',
						// 	type: 'error'
						// });
					}
				})
			},
			// 按单-新增需求范围内容
			async insertBill() {

				let plateArr = this.paramData
				let arr = []
				for (let p in plateArr) {
					for (let f in plateArr[p].field) {
						for (let v in plateArr[p].field[f].values) {
							let contentFDCode = ''
							if (this.pageType == 'new') {
								contentFDCode = plateArr[p].field[f].content.length ? plateArr[p].field[f].content[0]
									.contentFDCode : ''
							} else {
								contentFDCode = plateArr[p].field[f].contentFDCode
							}
							let obj = {
								supplierGuid: this.row.supplierGuid,
								modelGuid: this.row.modelGuid,
								plateGuid: plateArr[p].plateGuid,
								plateCode: plateArr[p].plateFDCode,
								plateAlias: plateArr[p].alias,
								plateNorder: plateArr[p].norder,
								plateFieldGuid: plateArr[p].field[f].fieldGuid,
								plateFieldAlias: plateArr[p].field[f].alias,
								plateFieldCode: plateArr[p].field[f].fieldFDCode,
								plateFieldNorder: plateArr[p].field[f].norder,
								plateFieldValue: plateArr[p].field[f].values[v].value,
								fieldContentGc: contentFDCode,
								operation: plateArr[p].field[f].operation,
								curUserId: this.$store.state.user.adminId,
							}
							arr.push(obj)
						}
					}


				}

				await insertBill(JSON.stringify(arr)).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
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
			// 按单-已有值修改需求范围内容
			async updateBill() {
				await updateBill({
					supplierGuid: this.row.supplierGuid,
					plateFieldValue: '',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
						}
					}
				})
			},
			// 查询品类的按型号列表
			async getModels() {
				await getModels({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
					modelName: this.searchVal
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.modelData = data
						} else {
							this.modelData = []
						}
					}
				})
			},
			// 新增型号 TODO
			// 删除某型号
			async deleteModel(id) {
				await deleteModel({
					modelGuid: id,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.getModels()
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
						}
					}
				})
			},
			// 新建时用 -- 打开按单开关的时候
			async getPlateEmptyModel() {
				this.isLoading = false
				await getPlateEmptyModel({
					categoryGuid: this.row.categoryGuid,
					catTreeCode: this.row.catTreeCode || 'supply',
					bizType: this.row.bizType || '1',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.isLoading = true
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

		},
		created() {
			this.getRangeFlag()
		}
	};
</script>

<style lang="scss" scoped>
</style>
