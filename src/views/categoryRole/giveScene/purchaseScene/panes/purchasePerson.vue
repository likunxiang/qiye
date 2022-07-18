<template>
	<el-table v-loading="loading" :data="tableData" border style="width: 100%">
		<el-table-column prop="name" align="center" label="品类类型">
		</el-table-column>
		<el-table-column label="操作" align="center">
			<template slot-scope="scope">
				<el-button @click="toManage(scope.row)" type="text" size="small">需求场景管理</el-button>
				<!-- <el-button type="text" size="small" @click="toSort(scope.row)">场景品类排序</el-button> -->
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import {
		getList
	} from '@/api/categoryRole/giveScene.js'
	export default {
		name: "index",
		props: {
			guid: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				tableData: [],
				loading: true,
			};
		},
		methods: {
			toManage(row) {
				let obj = row
				obj.title = row.name
				this.$router.push({
					path: "giveScene/purchaseSceneManage",
					query: obj,
				});
			},
			// toSort(row) {
			//   let obj = {}
			//   obj.title = '个人采购 > ' + row.typeName
			//   this.$router.push({
			//     path: "/giveScene/sceneTypeSort",
			//     query: obj,
			//   });
			// },
			async getList() {
				this.loading = true
				await getList().then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						this.tableData = data
					} else {
						this.tableData = []
					}
				})
			}
		},
		mounted() {
			this.getList()
		}
	};
</script>

<style lang="scss">
</style>
