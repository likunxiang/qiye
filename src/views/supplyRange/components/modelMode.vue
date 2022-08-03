<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div class="">
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
			<div class="title-bg">请完善该型号的需求</div>
			<div>
				<div>型号名称</div>
				<el-input v-model="modelName" placeholder="请填写"></el-input>
			</div>
			<plateModel :plateData="plateArr"></plateModel>
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
		getSuppyRangeByModel,
		getPlateEmptyModel
	} from '@/api/supplyRangeApi/supplyRange.js'
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
				plateArr: []
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
			// 编辑时用
			async getSuppyRangeByModel() {
				await getSuppyRangeByModel({
					modelGuid: this.row.modelGuid,
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
			// 新建时用
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
			// web-供应-型号-新增需求范围内容 -- 提交表单
			async insertSupplierModelTc() {
				let modelObj = {
					supplierGuId: this.row.supplierGuId,
					modelGuId: this.row.modelGuId,
					modelName: this.modelName,
					curUserId: this.$store.state.user.adminId,
				}
				for(let i in plateArr) {
					
				}
				const obj1 = {
					SqlCmdName: 'SqlCmdName=aprc\\webSuOrg\\supplier\\model\\info\\insertModel_1_0_1',
					DBC: 'w_a',
					Parameter: JSON.stringify([this.form])
				}
				const obj2 = {
					SqlCmdName: 'SqlCmdName=aprc\\app\\supplier\\model\\info\\insertModelPlates_1_0_1',
					DBC: 'w_a',
					Parameter: JSON.stringify(this.moneyData)
				}
				const data = [obj1, obj2]
				await insertSupplierModelTc(JSON.stringify(data)).then(res => {
					if(res.OK == 'True') {
						
					}
				})
			},
			// web-供应-型号-修改需求范围内容 // TODO
			// web-供应-型号-查询型号名称是否重复
			async etModelNameExistsFlag() {
				await etModelNameExistsFlag({
					supplierGuid: this.row.supplierGuid,
					modelGuid: this.row.modelGuid || '',
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
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
