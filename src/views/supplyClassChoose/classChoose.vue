<template>
	<div class="app-container">
		<div class="title-bg">按需求场景选择品类</div>
		<el-tree :data="tableData" :props="defaultProps" @node-expand="getSon" @node-click="chooseRow">
		</el-tree>
		<categoryList v-if="isList" :sreenObj="openRow" @close="closeList"></categoryList>
	</div>
</template>

<script>
	import {
		getSontList,
	} from '@/api/supplyClassChooseApi/supplyClassChoose.js'
	import categoryList from '@/views/supplyClassChoose/components/categoryList'
	export default {
		name: "index",
		components: {
			categoryList
		},
		data() {
			return {
				tableData: [],
				defaultProps: {
					children: 'children',
					label: 'name',
				},
				openRow: {},
				isList: false,
				guid: this.$store.state.user.projectId.sdPathGuid,
			};
		},
		methods: {
			// 尝试
			getTableData() {
				getSontList({
					guid: this.guid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						for (let i in data) {
							if (data[i].hasSon == '1') {
								data[i].children = [{
									name: '加载中...'
								}]
							}
						}
						this.tableData = data
					} else {
						this.tableData = []
					}
					console.log('tableData', this.tableData);
					this.tableData = this.clone(this.tableData)
				})
			},
			getSon(data) {
				console.log('hasSon', data.hasSon);
				if (data.hasSon == '1') {
					this.getSontList(data)
				} else {
					return
				}

			},
			async getSontList(data) {
				let id = data.guid
				await getSontList({
					guid: id,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					console.log(res);
					if (res.Tag.length) {
						// let data = res.Tag[0].Table
						let arr = res.Tag[0].Table
						for (let i in arr) {
							if (arr[i].hasSon == '1') {
								arr[i].children = [{
									name: '加载中...'
								}]
							}
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
			chooseRow(data, node, nodeself) {
				this.treeTitle = []
				this.openRow = data
				if (data.hasSon === '0') {
					this.isList = true
				} else {
					return
				}
			},
			closeList() {
				this.isList = false
			}
		},
		created() {
			console.log(this.$store.state.user.projectId);
			this.getTableData()
		}
	}
</script>

<style scoped lang="scss">
</style>
