<template>
	<div class="app-container">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="工具使用建议反馈" name="first">
				<div class="title-bg">工具使用建议反馈</div>
				<div class="mb20" style="display: flex;justify-content: flex-end;">
					<el-button type="primary" @click="toFeedback">我要反馈</el-button>
				</div>
				<el-table :data="tableData" border v-loading="loading">
					<el-table-column prop="createTime" label="反馈日期" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="openReturn(scope.row)">回复</el-button>
							<div class="red-round" v-if="scope.row.readFlag === '0'"></div>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="供应退货异常反馈" name="second">
				<div class="title-bg">供应退货异常反馈</div>
				<div class="mb20" style="display: flex;justify-content: flex-end;">
					<el-button type="primary" @click="toFeedback1">我要反馈</el-button>
				</div>
				<el-table :data="tableData" border v-loading="loading">
					<el-table-column prop="createTime" label="反馈日期" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="openReturn1(scope.row)">回复</el-button>
							<div class="red-round" v-if="scope.row.replyContentReadFlag === '1'"></div>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<newFeedback v-if="isFeedback" @close="closeFeedback" @refresh="refreshList"></newFeedback>
		<checkReturn v-if="isReturn" @close="closeReturn" :row="openRow"></checkReturn>
		<newFeedback1 v-if="isFeedback1" @close="closeFeedback1" @refresh="refreshList"></newFeedback1>
		<checkReturn1 v-if="isReturn1" @close="closeReturn1"></checkReturn1>
	</div>
</template>

<script>
	import newFeedback from '@/views/system/usageFeedback/components/newFeedback.vue'
	import checkReturn from '@/views/system/usageFeedback/components/checkReturn.vue'
	import newFeedback1 from '@/views/system/usageFeedback/components/newFeedback1.vue'
	import checkReturn1 from '@/views/system/usageFeedback/components/checkReturn1.vue'
	import pages from '@/views/components/common/pages'
	import {
		getList,
		getListByType
	} from '@/api/system/usageFeedback.js'
	export default {
		name: "index",
		components: {
			newFeedback,
			checkReturn,
			newFeedback1,
			checkReturn1,
			pages
		},
		data() {
			return {
				tableData: [],
				loading: false,
				isFeedback: false,
				isFeedback1: false,
				isReturn: false,
				isReturn1: false,
				activeName: 'first',
				page: 1,
				pageTotal: 0,
				openRow: {}
			};
		},
		methods: {
			refreshList() {
				if (this.activeName == 'first') {
					this.getList()
				} else {
					this.getListByType()
				}
			},
			changePage(page) {
				this.page = page
				if (this.activeName == 'first') {
					this.getList()
				} else {
					this.getListByType()
				}
			},
			openReturn(row) {
				this.openRow = row
				this.isReturn = true
			},
			closeReturn() {
				this.isReturn = false
			},
			toFeedback() {
				this.isFeedback = true
			},
			closeFeedback() {
				this.isFeedback = false
			},
			openReturn1(row) {
				this.openRow = row
				this.isReturn1 = true
			},
			closeReturn1() {
				this.isReturn1 = false
			},
			toFeedback1() {
				this.isFeedback1 = true
			},
			closeFeedback1() {
				this.isFeedback1 = false
			},
			handleClick(tab, event) {
				this.page = 1
				this.tableData = []
				if (this.activeName == 'first') {
					this.getList()
				} else {
					this.getListByType()
				}
			},
			async getList() {
				this.loading = true
				await getList({
					replyFlag: '2',
					content: '',
					curUserId: this.$store.state.user.adminId,
					size: '20',
					page: this.page
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
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
			async getListByType() {
				this.loading = true
				await getListByType({
					curUserId: this.$store.state.user.adminId,
					size: '20',
					page: this.page
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
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
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
	.red-round {
		position: absolute;
		top: 20px;
		left: 10px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: red;
	}
</style>
