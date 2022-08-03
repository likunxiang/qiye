<template>
	<el-dialog title="" :visible.sync="isOpen" width="900px" @close="beforeClose">
		<div class="" style="padding-bottom: 60px;">
			<div style="width: 100%;" class="flex flex-center jsb mb20">
				<div class="flex">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"></el-image>
					<div>
						<div>{{row.categoryName}}</div>
						<div>{{row.categoryalias}}</div>
					</div>
				</div>
			</div>
			<div class="title-bg flex flex-center jsb">
				<div>型号价目表</div>
				<div>结算信息单位：元/人民币</div>
			</div>
			<div class="flex flex-center jsb mb20">
				<div class="flex flex-center">
					<el-input placeholder="请输入你要找的型号名称" v-model="searchVal" @keyup.enter.native="searchClass"
						style="width: 200px;" clearable @clear="clearSearch">
						<i class="el-icon-search el-input__icon" slot="suffix" @click="searchClass">
						</i>
					</el-input>
					<div v-if="isToSearch" class="ml0">搜索结果: {{searchResult}}</div>
				</div>
			</div>
			<el-table :data="modelData" border>
				<el-table-column prop="modelName" label="型号名称" align="center"></el-table-column>
				<el-table-column prop="salesUnit" label="销售单位" align="center"></el-table-column>
				<el-table-column prop="price" label="价格" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<div class="flex">
							<el-button type="text" @click="toOffer(scope.row)">型号价格管理</el-button>
							<el-button type="text" @click="statusChange(scope.row, '1')" v-if="!scope.row.up">型号上架接单
							</el-button>
							<el-button type="text" @click="statusChange(scope.row, '2')" v-else>型号下架接单</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<modelOfferDetail v-if="isOffer" @close="closeOffer" :row="openRow"></modelOfferDetail>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import modelOfferDetail from '@/views/supplyOffer/components/modelOfferDetail'
	import {
		getPriceList,isCanSales,updSalesOn,updSalesOff
	} from '@/api/supplyOfferApi/supplyOffer.js'
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
			pages,
			modelOfferDetail
		},
		data() {
			return {
				basicImgUrl: this.$store.state.basics.img_url_cat,
				isOpen: true,
				isOffer: false,
				searchVal: '', // 搜索内容
				isToSearch: false,
				searchResult: 0,
				page: 1,
				pageTotal: 0,
				openRow: {},
				modelData: []
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				//
			},
			toOffer(row) {
				this.isOffer = true
				this.openRow = row
			},
			closeOffer() {
				this.isOffer = false
			},
			statusChange(row,status) {
				// TODO 库存为0自动下架
				if(status == '1') {
					// 上架
					if (!row.salesUnit) {
						this.$alert('型号价目表中没有【销售单位】的内容，交易信息不完整，请向系统反馈。', '', {
							confirmButtonText: '知道了',
							callback: action => {}
						});
					} else if (row.stock === 0) {
						this.$alert('【' + row.modelName + '】的供应范围中的库存【0】，不能再上架接单。', '', {
							confirmButtonText: '知道了',
							callback: action => {}
						});
					} else {
						this.$confirm('上架后，需方就能收到你的报价。【' + row.modelName + '】确认上架接单？', '', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.updSalesOn(row.modelPriceGuid)
						}).catch(() => {
						});
					}
				} else {
					// 下架
					this.$confirm('下架维护期间需方收不到你的报价。【' + row.modelName + '】确认下架维护。', '', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.updSalesOff(row.modelPriceGuid)
					}).catch(() => {
					});
				}
				
			},
			searchClass() {
				if (this.searchVal.length > 0) {
					this.isToSearch = true
				} else {
					this.isToSearch = false
				}
				this.page = 1
				this.getPriceList()
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			async getPriceList() {
				await getPriceList({
					supplierGuid: this.row.supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if (res.Tag.length) {
							this.modelData = res.Tag[0].Table
							this.pageTotal = (this.page - 1) * 20 + 21
						} else {
							this.modelData = []
							this.pageTotal = (this.page - 1) * 20 + 1
						}
					}
				})
			},
			async isCanSales(modelPriceGuid) {
				await isCanSales({
					modelPriceGuid: modelPriceGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						let canSales = res.Tag[0].canSales
						if(canSales == 0) {
							this.$alert('型号价目表中没有【价格】的内容，交易信息不完整，请向系统反馈。', '', {
								confirmButtonText: '知道了',
								callback: action => {}
							});
						}
					}
				})
			},
			async updSalesOn(modelPriceGuid) {
				await updSalesOn({
					modelPriceGuid: modelPriceGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.getPriceList()
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
						}
					}
				})
			},
			async updSalesOff(modelPriceGuid) {
				await updSalesOff({
					modelPriceGuid: modelPriceGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.getPriceList()
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
						}
					}
				})
			}
		},
		created() {
			this.getPriceList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
