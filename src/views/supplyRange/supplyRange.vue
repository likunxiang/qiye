<template>
	<div class="app-container">
		<div class="title-bg">品类列表</div>
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
			<el-table-column prop="image" label="品类图片" align="center">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="basicImgUrl + scope.row.categoryImg" fit="fill">
					</el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="delInfo(scope.row)">删除品类</el-button>
					<el-button type="text" @click="rangeSetting(scope.row)">需求范围设置</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<singleMode v-if="isSetting" @close="closeSetting" :row="openRow"></singleMode>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import singleMode from '@/views/supplyRange/components/singleMode'
	import { getAddedCatList } from '@/api/supplyRangeApi/supplyRange.js'
	import { deleteCat } from '@/api/supplyClassChooseApi/supplyClassChoose.js'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			singleMode
		},
		data() {
			return {
				loading: false,
				tableData: [{
					nickName: '品类1',
					guid: '1',
					categoryAlias: '111'
				}],
				page: 1,
				pageTotal: 0,
				isSetting: false,
				openRow: {},
				basicImgUrl: this.$store.state.basics.img_url_cat
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getAddedCatList()
			},
			rangeSetting(row) {
				this.isSetting = true
				this.openRow = row
			},
			closeSetting() {
				this.isSetting = false
			},
			delInfo(row) {
				this.$confirm('确定删除' + row.categoryName, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteCat(row.supplierGuid)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			async deleteCat(supplierGuid) {
				await deleteCat({
					supplierGuid: supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag[0] > 0) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
							this.getAddedCatList()
						} else {
							this.$message({
								message: '操作失败!',
								type: 'error'
							});
						}
					}
				})
			},
			async getAddedCatList() {
				this.loading = true
				await getAddedCatList({
					sdPathGuid: this.$store.state.user.projectId.sdPathGuid,
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
		},
		created() {
			this.getAddedCatList()
		}
	}
</script>

<style scoped lang="scss">
</style>
