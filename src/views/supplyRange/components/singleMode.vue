<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div class="" v-loading="loading">
			<div style="width: 100%;" class="flex flex-center jsb mb20">
				<div class="flex">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + row.categoryImg"
						:fit="fit"></el-image>
					<div>
						<div>{{row.nickName}}</div>
						<div>{{row.categoryAlias}}</div>
					</div>
				</div>
			</div>
			<div class="title-bg flex flex-center">
				<div>需求范围设置</div>
				<el-switch v-model="rangeValue" @change="changeSwitch" active-color="#13ce66" inactive-color="grey">
				</el-switch>
			</div>
			<div v-if="userPriceMode=='1'">
				提示：需求范围关闭，代表你希望只要是这个品类的采购需求你都接收。
			</div>
			<!-- 按单 -->
			<template v-if="userPriceMode=='2'">
				<plateModel :plateData="plateArr"></plateModel>
			</template>
			<!-- 型号 -->
			<template v-else>
				<div class="flex flex-center jsb">
					<div class="flex flex-center">
						<el-input placeholder="请输入你要找的品类名称" v-model="searchVal" @keyup.enter.native="searchClass"
							style="width: 200px;" clearable @clear="clearSearch">
							<i class="el-icon-search el-input__icon" slot="suffix" @click="searchClass">
							</i>
						</el-input>
						<div v-if="isToSearch" class="ml0">搜索结果: {{searchResult}}</div>
					</div>
					<el-button type="primary" @click="creationModel">创建型号</el-button>
				</div>
				<el-table :data="modelData" border>
					<el-table-column prop="name" label="品类名称" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<div class="flex">
								<el-button type="text" @click="delModel(scope.row)">删除型号</el-button>
								<el-button type="text" @click="editModel(scope.row)">编辑型号</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<modelMode v-if="isModel" @close="closeModel" :pageType="pageType" :row="openRow"></modelMode>
		</div>
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
				isModel: true,
				pageType: 'new',
				isEdit: true,
				modelData: [{
					name: '型号名称1',
					guid: '1'
				}, {
					name: '型号名称2',
					guid: '2'
				}],
				loading: false,
				plateArr: [], // 板块内容
				openRow: {}
			};
		},
		methods: {
			searchClass() {
				if (this.searchVal.length > 0) {
					this.isToSearch = true
				} else {
					this.isToSearch = false
				}
				this.page = 1
			},
			changeSwitch() {
				let rangeValue = this.rangeValue
				if (rangeValue) {
					this.$confirm('确认关闭【需求范围】，不限制需方需求信息？关闭后，原需求范围内容将被删除', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {

					}).catch(() => {});
				} else {
					this.$confirm('确认开启【需求范围】，有条件接收需方需求信息？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {

					}).catch(() => {});
				}
			},
			creationModel(row) {
				this.isModel = true
				let obj = this.row
				this.openRow = obj
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
						let rangeFlag = res.Tag[0].rangeFlag
						this.rangeValue = rangeFlag
						if (rangeFlag == '1') {
							if (this.row.priceMode == '1') {
								// 型号
								this.getModels()
							} else if (this.row.priceMode == '2') {
								// 按单

							}
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
						let userPriceMode = res.Tag[0].userPriceMode
						this.userPriceMode = userPriceMode
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
						if (userPriceMode == '1') {
							this.deleteModelBySupplierGuid()
						} else {
							this.deleteBill()
						}
						this.userPriceMode = userPriceMode
					}
				})
			},
			// web-供应-按单-查询供方需求范围内容
			async getSupplyRangeBySingle() {
				await getSupplyRangeBySingle({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
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
						if (res.tag > 0) {
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
			// 按型号关闭需求范围调用该删除接口
			async deleteModelBySupplierGuid() {
				await deleteModelBySupplierGuid({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.tag > 0) {
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
			// 按单-新增需求范围内容
			async insertBill() {
				await insertBill({
					supplierGuid: this.row.supplierGuid,
					plateGuid: '',
					plateAlias: '',
					plateNorder: '',
					plateFieldGuid: '',
					plateFieldNorder: '',
					plateFieldCode: '',
					plateFieldValue: '',
					fieldContentGc: '',
					operation: '',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.tag > 0) {
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
			// 按单-已有值修改需求范围内容
			async updateBill() {
				await updateBill({
					supplierGuid: this.row.supplierGuid,
					plateFieldValue: '',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.tag > 0) {
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
						if (res.tag > 0) {
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
				await getPlateEmptyModel({
					categoryGuid: this.row.categoryGuid,
					catTreeCode: this.row.catTreeCode,
					bizType: this.row.bizType,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
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

		}
	};
</script>

<style lang="scss" scoped>
</style>
