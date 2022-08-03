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
					<el-button type="text" @click="checkDemand(scope.row)">查看需求信息</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<demandMsg v-if="isMsg" @close="closeDemand" :row="openRow"></demandMsg>
	</div>
</template>

<script>
	
	import pages from '@/views/components/common/pages'
	import demandMsg from '@/views/demandReceive/components/demandMsg'
	import { getAddedCatList } from '@/api/supplyRangeApi/supplyRange.js'
	export default {
		name: "index",
		components: {
			pages,
			demandMsg
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
				openRow: {},
				isMsg: false,
				basicImgUrl: this.$store.state.basics.img_url_cat
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getAddedCatList()
			},
			checkDemand(row) {
				this.isMsg = true
				this.openRow = row
			},
			closeDemand() {
				this.isMsg = false
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
			console.log(this.$store.state.user.projectId);
			this.getAddedCatList()
		}
	}
</script>

<style scoped lang="scss">
</style>
