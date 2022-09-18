<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;padding-top: 20px;" v-loading="loading">
			<div class="title-bg">未报价的需方需求({{pageNumber}})</div>
			<div class="mb10" style="border-bottom: 1px solid #000;padding-bottom: 10px;" v-for="item in tableData" @click="toDemandDetail(item)">
				<el-button type="danger" class="mb10" @click.stop="refuseOffer(item)">拒绝报价</el-button>
				<div class="category-item flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{row.categoryName}}</div>
							<div>{{row.categoryalias}}</div>
						</div>
						<div style="display: flex;flex-direction:column-reverse;">日期：{{item.reqCreateTime}}</div>
					</div>
					<div class="el-icon-arrow-right" style="font-size: 36px;"></div>
				</div>
			</div>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
			<checkDemand v-if="isDemandDetail" @close="closeDetail" :catogoryObj="row" :row="openRow" :type="1" @refresh="refreshList"></checkDemand>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import checkDemand from '@/views/supplyOffer/components/checkDemand'
	import {
		getMapReqList,rejectGivePrice
	} from '@/api/supplyOfferApi/supplyOffer.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			pageNumber: {
				type: String,
				default: '0'
			}
		},
		components: {
			pages,
			checkDemand
		},
		data() {
			return {
				isOpen: true,
				page: 1,
				pageTotal: 0,
				openRow: {},
				isDemandDetail: false,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				tableData: [],
				loading: false,
			};
		},
		methods: {
			refreshList() {
				this.getMapReqList()
				this.$emit('refresh')
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			changePage(page) {
				this.page = page
				//
			},
			toDemandDetail(item) {
				this.isDemandDetail = true
				this.openRow = item
			},
			closeDetail() {
				this.isDemandDetail = false
			},
			refuseOffer(row) {
				this.$confirm('确认对【'+ row.reqCreateTime + '】的需方需求拒绝报价。', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.rejectGivePrice(row.requestSupplyGuid)
				}).catch(() => {});
			},
			async getMapReqList() {
				this.loading = true
				await getMapReqList({
					supplierGuid: this.row.supplierGuid,
					priceStatus: '1',
					size: '20',
					curUserId: this.$store.state.user.adminId,
					page: this.page
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if (res.Tag.length) {
							this.tableData = res.Tag[0].Table
							this.pageTotal = (this.page - 1) * 20 + 21
						} else {
							this.tableData = []
							this.pageTotal = (this.page - 1) * 20 + 1
						}
					}
				})
			},
			async rejectGivePrice(requestSupplyGuid) {
				this.loading = true
				await rejectGivePrice({
					requestSupplyGuid: requestSupplyGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.getMapReqList()
							this.$emit('refresh')
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
							this.rangeValue = false
						}
					}
				})
			}
		},
		created() {
			this.getMapReqList()
		}
	};
</script>

<style lang="scss" scoped>
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
