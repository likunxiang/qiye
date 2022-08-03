<template>
	<el-dialog title="切换合作项目" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="">
			<el-tree :data="tableData" :props="defaultProps" node-key="id" @node-expand="getSon" @node-click="chooseRow"></el-tree>
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
				projectObj: {}
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
				setProjectId(this.projectObj)
				this.close()
			},
			
			async getTopParentList() {
			  await getTopParentList({
			    curUserId: this.$store.state.user.adminId,
			  }).then(res => {
			    console.log(res);
			    if (res.Tag.length) {
			      let data = res.Tag[0].Table
			      for(let i in data) {
			        if (data[i].hasSon == '1') {
			          data[i].children = [{pathName:'加载中...'}]
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
				if (data.hasSon === '0') {
					this.projectObj = data
				} else {
					return
				}
			},
			async getSonList(data) {
			  let id = data.allPathGuids
			  await getSonList({
			    allPathGuids: id,
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
			      this.tableData = []
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
