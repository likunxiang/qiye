<template>
	<div class="com-contain">
		<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>

		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="userName" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="nation" label="区号" align="center">
			</el-table-column>
			<el-table-column prop="phonenumber" label="联系电话" align="center">
			</el-table-column>
			<el-table-column prop="roleType" label="角色类型" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-row>
						<el-button type="text" @click="openAuthority(scope.row)">账号操作权限管理</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<pages @changePage="changePage" :page="page" :total="pageTotal"></pages>

		<authorityManagement v-if="isAuthority" @close="closeAuthority" :row="openRow" @refresh="permissionGetList"></authorityManagement>
	</div>
</template>

<script>
	import authorityManagement from "@/views/operationRole/dispatchingManagement/userOperation/components/authorityManagement.vue"
	import {
		permissionGetList
	} from "@/api/operationRoleApi/dispatchingManagementApi.js"
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	export default {
		name: "index",
		components: {
			authorityManagement,
			pages,
			searchCom
		},
		data() {
			return {
				searchVal: '',
				searchResult: 0,
				isAutonym: false,
				isAuthority: false,
				page: 1,
				pageTotal: 0,
				loading: true,
				tableData: [],
				openRow: {}, // 传入组件的对象
			};
		},
		methods: {
			search(data) {
				this.searchVal = data
				this.page = 1
				this.permissionGetList()
			},
			changePage(page) {
				this.page = page
				this.permissionGetList()
			},
			openAuthority(row) {
				this.openRow = row
				this.isAuthority = true
			},
			closeAuthority() {
				this.isAuthority = false
			},
			async permissionGetList() {
				await permissionGetList({
					status: 1,
					phonenumber: this.searchVal,
					size: '20',
					page: this.page,
				}).then(res => {
					this.loading = false
					if (res.Tag.length) {
						this.tableData = res.Tag[0].Table
						// 从字典获取角色类型
						this.getDicts("user_tag").then(response => {
						  var statusOptions = response.Tag;
						  console.log('statusOptions',statusOptions);
						  for (var j in this.tableData) {
						    for (var i in statusOptions) {
						      if (this.tableData[j].userTag == statusOptions[i].dictValue) {
						        console.log(this.tableData[j].userTag)
						        this.tableData[j].roleType = statusOptions[i].dictLabel
						      }
						    }
						  }
						  this.tableData = this.clone(this.tableData)
						
						});
					} else {
						this.tableData = []
					}
					this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
						20 + 1
					this.searchResult = this.tableData.length
				})
			}
		},
		created() {
			this.permissionGetList()
		}
	};
</script>

<style lang="scss">
	.com-contain {
		min-height: 82vh;
    padding-bottom: 68px;
	}

	.pageBox {
		height: 48px;

		.pageMain {
			position: absolute;
			bottom: 20px;
			left: 0px;
		}

	}
</style>
