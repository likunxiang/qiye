<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<div class="title-bg">已报价的需方需求({{pageNumber}})</div>
			<div class="mb10" style="border-bottom: 1px solid #000;padding-bottom: 10px;" v-for="item in tableData" @click="toDemandDetail(item)">
				<div class="mb10">{{item.priceTime}}报价</div>
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
			<checkDemand v-if="isDemandDetail" @close="closeDetail" :row="openRow" :type="2"></checkDemand>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
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
				//
			},
			toDemandDetail(item) {
				this.isDemandDetail = true
				this.openRow = item
			},
			closeDetail() {
				this.isDemandDetail = false
			},
			async getMapReqList() {
				await getMapReqList({
					supplierGuid: this.row.supplierGuid,
					priceStatus: '3',
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

		}
	};
</script>

<style lang="scss" scoped>
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
