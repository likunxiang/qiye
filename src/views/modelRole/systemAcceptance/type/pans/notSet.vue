<template>
	<el-row style="min-height: 83vh;position: relative;padding-bottom: 60px;">
		<!-- <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom> -->
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="categoryName" label="品类类型" align="center"></el-table-column>
			<el-table-column prop="day" label="验收期限" align="center">
				<template slot-scope="scope">--</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-row>
						<el-button type="text" @click="settingDay(scope.row)">期限设置</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<setting v-if="isSetting" @close="closeSettingDay" :row="openRow" @refresh="getNoDeadlineList"></setting>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
	</el-row>
</template>

<script>
	import setting from '@/views/modelRole/systemAcceptance/type/components/settingDay.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getUnDoneCattypeDeadlineList_1_0_1
	} from "@/api/modelRoleApi/systemAcceptance.js"
	import pages from '@/views/components/common/pages'
	export default {
		name: "index",
		components: {
			setting,
			pages,
			searchCom
		},
		data() {
			return {
				loading: true,
				tableData: [],
				isSetting: false,
				openRow: {},
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: ''
			};
		},
		methods: {
			settingDay(row) {
				this.openRow = row
				this.isSetting = true
			},
			closeSettingDay() {
				this.isSetting = false
			},
			search(data) {
				this.searchVal = data
				this.page = 1
				this.getNoDeadlineList()
			},
			changePage(page) {
				this.page = page
				this.getNoDeadlineList()
			},
			// 获取数据
			async getNoDeadlineList() {
				this.loading = true
				await getUnDoneCattypeDeadlineList_1_0_1().then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						this.tableData = res.Tag[0].Table
						this.pageTotal = (this.page - 1) * 20 + 21
					} else {
						this.tableData = []
						this.pageTotal = (this.page - 1) * 20 + 1
					}
					this.searchResult = this.tableData.length
				})
			},
		},
		mounted() {
			this.getNoDeadlineList()
		}
	}
</script>

<style scoped lang="scss">
</style>
