<template>
	<el-dialog title="切换合作项目" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="">
			<el-tree :data="tableData" :props="defaultProps" node-key="id" @node-expand="getSon"
				@node-click="chooseRow"></el-tree>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submit" :disabled="!projectObj">保 存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		getProjectId,
		setProjectId
	} from '@/utils/auth'
	import {
		getTopParentList,
		getSonList
	} from '@/api/commonApi.js'
	export default {
		name: "index",
		data() {
			return {
				isOpen: true,
				tableData: [],
				defaultProps: {
					children: 'children',
					label: 'pathName',
				},
				projectObj: {},
				treeTitle1: [],
				treeTitleString1: ''
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
			submit() {
				this.projectObj.treeTitleString1 = this.treeTitleString1
				setProjectId(this.projectObj)
				this.close()
				window.location.reload()
			},
			getParent(node) {
				console.log('node111', node);
				let nodeObj = node
				let nodeTitle = node.data.pathName
				let level = node.level
				console.log('nodeLevel', level);
				this.treeTitle1.push(nodeTitle)
				if (level > 1) {
					this.getParent(nodeObj.parent)
				} else {
					let treeTitle = this.treeTitle1
					console.log('treeTitle',treeTitle);
					this.treeTitleString1 = treeTitle.reverse().join(" > ")
				}
			},
			async getTopParentList() {
				await getTopParentList({
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					console.log(res);
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						for (let i in data) {
							if (data[i].hasSon == '1') {
								data[i].children = [{
									pathName: '加载中...'
								}]
							}
						}
						this.tableData = data
					} else {
						this.tableData = []
					}
				})
			},
			getSon(data) {
				if (data.hasSon == '1') {
					this.getSonList(data)
				} else {
					return
				}

			},
			chooseRow(data, node, nodeself) {
				console.log(data);
				this.treeTitleString1 = ''
				this.treeTitle1 = []
				this.getParent(node)
				if (data.hasSon === '0') {
					this.projectObj = data
				} else {
					return
				}
			},
			async getSonList(data) {
				let id = data.allPathGuids || "'" + data.pathGuid + "'"
				await getSonList({
					allPathGuids: id,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					console.log(res);
					if (res.Tag.length) {
						// let data = res.Tag[0].Table
						let arr = res.Tag[0].Table
						for (let i in arr) {
							console.log(arr[i]);
							if (arr[i].hasSon == '1') {
								arr[i].children = [{
									pathName: '加载中...'
								}]
							}
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
		},
		created() {
			this.projectId = getProjectId()
			this.getTopParentList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
