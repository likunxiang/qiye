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
					<el-button type="text" @click="offerMange(scope.row)">报价管理</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<modelOffer v-if="isOfferByModel" @close="closeOffer" :row='openRow'></modelOffer>
		<singleOffer v-if="isOfferBySingle" @close="closeOffer" :row='openRow'></singleOffer>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import modelOffer from '@/views/supplyOffer/components/modelOffer'
	import singleOffer from '@/views/supplyOffer/components/singleOffer'
	import { getAddedCatList } from '@/api/supplyRangeApi/supplyRange.js'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			modelOffer,
			singleOffer
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
				isOfferByModel: false,
				isOfferBySingle: false,
				basicImgUrl: this.$store.state.basics.img_url_cat
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getAddedCatList()
				//
			},
			/*
			userPriceMode 1是型号，2是按单
			*/
			offerMange(row) {
				let type = row.userPriceMode
				
				if (type == '1') {
					this.isOfferByModel = true
				} else {
					this.isOfferBySingle = true
				}
				this.openRow = row
			},
			closeOffer() {
				this.isOfferByModel = false
				this.isOfferBySingle = false
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
