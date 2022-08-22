<template>
	<el-dialog title=" " :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-top: 20px;max-height: 800px;overflow-y: auto;">
			<div class="title-bg">{{type=='1'?'符合供应范围的需求列表' : '系统推荐的需方需求'}}</div>
			<div class="" style="padding-bottom: 60px;" v-loading="loading">
				<div class="mb10" style="border-bottom: 1px solid #000;padding-bottom: 10px;" v-for="item in tableData" @click="toDetail(item)">
					<el-button type="danger" class="mb10" @click.stop="delItem(item)">删除</el-button>
					<div class="category-item flex-center">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"></el-image>
						<div class="flex jsb mr20" style="flex: 1; height: 100px;">
							<div>
								<div>{{row.categoryName}}</div>
								<div>{{row.categoryAlias}}</div>
							</div>
							<div style="display: flex;flex-direction:column-reverse;">日期：{{item.mtNeCreateTime}}</div>
						</div>
						<div class="el-icon-arrow-right" style="font-size: 36px;"></div>
					</div>
				</div>
			</div>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
			<demandDetail v-if="isDetail" @close='closeDetail' :row ='openRow' :category="row"></demandDetail>
		</div>
	</el-dialog>
</template>

<script>
	import { getListBySuPGuid,deleteDemand } from '@/api/demandReceiveApi/demandReceive.js'
	import pages from '@/views/components/common/pages'
	import demandDetail from "@/views/demandReceive/components/demandDetail"
	export default {
		name: "index",
		props: {
			type: {
				type: String,
				default: '1'
			},
			row: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		components:{
			pages,
			demandDetail
		},
		data() {
			return {
				isOpen: true,
				page: 1,
				pageTotal: 0,
				loading: false,
				isDetail: false,
				openRow: {},
				basicImgUrl: this.$store.state.basics.img_url_cat,
				tableData: []
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
			changePage(page) {
				this.page = page
				this.getListBySuPGuid()
			},
			toDetail(item) {
				this.isDetail = true
				this.openRow = item
			},
			closeDetail() {
				this.isDetail = false
			},
			delItem(row) {
				this.$confirm('删除【' + row.mtNeCreateTime + '】的需求信息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteDemand(row.matchNoticeGuid)
				}).catch(() => {
				});
			},
			async deleteDemand(matchNoticeGuid) {
				await deleteDemand({
					matchNoticeGuid: matchNoticeGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.getListBySuPGuid()
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
						}
					}
				})
			},
			async getListBySuPGuid() {
				this.loading = true
				await getListBySuPGuid({
					supplyPathGuid: this.$store.state.user.projectId.pathGuid,
					recommedType: this.type,
					size: '20',
					curUserId: this.$store.state.user.adminId,
					page: this.page,
					categoryGuid: this.row.categoryGuid
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
			}
		},
		created() {
			this.getListBySuPGuid()
		}
	};
</script>

<style lang="scss" scoped>
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
