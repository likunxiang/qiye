<template>
	<el-dialog title="" :visible.sync="isOpen" width="900px" @close="beforeClose">
		<div class="" style="padding-bottom: 60px;">
			<div style="width: 100%;" class="flex flex-center jsb mb20">
				<div class="flex">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg">
					</el-image>
					<div>
						<div>{{row.categoryName}}</div>
						<div>{{row.categoryalias}}</div>
					</div>
				</div>
			</div>
			<div class="title-bg flex flex-center">
				<div class="mr10">接单报价设置</div>
				<el-switch v-model="rangeValue" @change="changeSwitch" active-color="#13ce66" inactive-color="grey">
				</el-switch>
			</div>
			<div>
				<div class="title-bg flex flex-center jsb" style="margin-bottom: 10px;" @click="openList('1')">
					<div>未报价({{priceStatus1}})</div>
					<div class="el-icon-arrow-right"></div>
				</div>
			</div>
			<div>
				<div class="title-bg flex flex-center jsb mb10" style="margin-bottom: 10px;" @click="openList('2')">
					<div>已报价({{priceStatus2}})</div>
					<div class="el-icon-arrow-right"></div>
				</div>
			</div>
			<div>
				<div class="title-bg flex flex-center jsb mb10" style="margin-bottom: 10px;" @click="openList('3')">
					<div>拒绝报价({{priceStatus3}})</div>
					<div class="el-icon-arrow-right"></div>
				</div>
			</div>
			<offerList1 v-if="isList & listType =='1'" @close="closeList" :row="row" :pageNumber='priceStatus1'></offerList1>
			<offerList2 v-if="isList & listType =='2'" @close="closeList" :row="row" :pageNumber='priceStatus2'></offerList2>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getAcceptOrderFlag,
		updAccOrderFlagOn,
		updAccOrderFlagOff,
		countPriceStatus
	} from '@/api/supplyOfferApi/supplyOffer.js'
	import offerList1 from './offerList1.vue'
	import offerList2 from './offerList2.vue'
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
			offerList1,
			offerList2
		},
		data() {
			return {
				isOpen: true,
				rangeValue: false,
				priceStatus1: 0,
				priceStatus2: 0,
				priceStatus3: 0,
				isList: false,
				listType: '1',
				basicImgUrl: this.$store.state.basics.img_url_cat
			};
		},
		methods: {
			openList(type) {
				this.isList = true
				this.listType = type
			},
			closeList() {
				this.isList = false
			},
			changeSwitch() {
				let rangeValue = this.rangeValue
				if (rangeValue) {
					this.$confirm('确认开启【需求范围】，有条件接收需方需求信息？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.updAccOrderFlagOn()
					}).catch(() => {});
				} else {

					this.$confirm('确认关闭【需求范围】，不限制需方需求信息？关闭后，原需求范围内容将被删除', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.updAccOrderFlagOff()
					}).catch(() => {});
				}
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			async getAcceptOrderFlag() {
				await getAcceptOrderFlag({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						let acceptOrderFlag = res.Tag[0].Table[0].acceptOrderFlag
						this.rangeValue = acceptOrderFlag === '1'?true:false
					}
				})
			},
			async updAccOrderFlagOn() {
				await updAccOrderFlagOn({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.countPriceStatus()
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
							this.rangeValue = false
						}
					}
				})
			},
			async updAccOrderFlagOff() {
				await updAccOrderFlagOff({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.countPriceStatus()
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
							this.rangeValue = true
						}
					}
				})
			},
			async countPriceStatus() {
				await countPriceStatus({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.priceStatus1 = data[0].count
							this.priceStatus2 = data[2].count
							this.priceStatus3 = data[1].count
						} else {
							this.priceStatus1 = 0
							this.priceStatus2 = 0
							this.priceStatus3 = 0
						}
					}
				})
			}
		},
		created() {
			this.getAcceptOrderFlag()
			this.countPriceStatus()
		}
	};
</script>

<style lang="scss" scoped>
</style>
