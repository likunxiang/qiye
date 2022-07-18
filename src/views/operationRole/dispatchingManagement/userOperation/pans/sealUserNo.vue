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
						<el-button type="text" @click="openAutonym(scope.row)">查看实名认证信息</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openAuthority(scope.row)">账号操作权限管理</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openAuthorityPurchase(scope.row)">采购操作权限管理</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openAuthoritySupply(scope.row)">供应操作权限管理</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openAuthorityClass(scope.row)">品类采购权限管理</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openAuthorityClassSupply(scope.row)">品类供应权限管理</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
		<autonymMessage v-if="isAutonym" @close="closeAutonym" :row="openRow"></autonymMessage>
		<authorityManagement v-if="isAuthority" @close="closeAuthority" :row="openRow" @refresh="permissionGetList"></authorityManagement>
		<authorityManagementSupply v-if="isAuthoritySupply" @close="closeAuthoritySupply" :row="openRow"></authorityManagementSupply>
		<authorityManagementPurchase v-if="isAuthorityPurchase" @close="closeAuthorityPurchase" :row="openRow">
		</authorityManagementPurchase>
		<authorityPurchaseClass v-if="isAuthorityClass" :astrictRow="openRow" @close="closeAuthorityClass">
		</authorityPurchaseClass>
		<authoritySupplyClass v-if="isAuthorityClassSupply" :astrictRow="openRow" @close="closeAuthorityClassSupply">
		</authoritySupplyClass>
	</div>
</template>

<script>
	import autonymMessage from "@/views/operationRole/dispatchingManagement/userOperation/components/autonymMessage.vue"
	import authorityManagement from "@/views/operationRole/dispatchingManagement/userOperation/components/authorityManagement.vue"
	import authorityManagementSupply from "@/views/operationRole/dispatchingManagement/userOperation/components/authorityManagementSupply.vue"
	import authorityManagementPurchase from "@/views/operationRole/dispatchingManagement/userOperation/components/authorityManagementPurchase.vue"
	import authorityPurchaseClass from "@/views/operationRole/dispatchingManagement/userOperation/components/authorityPurchaseClass.vue"
	import authoritySupplyClass from "@/views/operationRole/dispatchingManagement/userOperation/components/authoritySupplyClass.vue"
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		permissionGetList
	} from "@/api/operationRoleApi/dispatchingManagementApi.js"
	export default {
		name: "index",
		components: {
			autonymMessage,
			authorityManagement,  // 1
			authorityManagementSupply,  //2
			authorityManagementPurchase, // 3
			authorityPurchaseClass,
			authoritySupplyClass,
			pages,
			searchCom
		},
		data() {
			return {
				searchVal: '',
				isAutonym: false,
				isAuthority: false,
				isAuthoritySupply: false,
				isAuthorityPurchase: false,
				isAuthorityClass: false,
				isAuthorityClassSupply: false, // 供应开关
				searchResult: 0,
				page: 1,
				pageTotal: 0,
				loading: true,
				tableData: [],
				openRow: {}, // 传入组件的对象
				open_user_id: 0, // 用于查看实名认证消息
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

			openAutonym(row) {
				this.openRow = row
				this.isAutonym = true
			},
			closeAutonym() {
				this.isAutonym = false
			},
			openAuthority(row) {
				this.openRow = row
				this.isAuthority = true
			},
			closeAuthority() {
				this.isAuthority = false
			},
			openAuthoritySupply(row) {
				this.openRow = row
				this.isAuthoritySupply = true
			},
			closeAuthoritySupply() {
				this.isAuthoritySupply = false
			},
			openAuthorityPurchase(row) {
				this.openRow = row
				this.isAuthorityPurchase = true
			},
			closeAuthorityPurchase() {
				this.isAuthorityPurchase = false
			},
			openAuthorityClass(row) {
				this.openRow = row
				this.isAuthorityClass = true
			},
			closeAuthorityClass() {
				this.isAuthorityClass = false
			},

			openAuthorityClassSupply(row) {
				this.openRow = row
				this.isAuthorityClassSupply = true
			},
			closeAuthorityClassSupply() {
				this.isAuthorityClassSupply = false
			},
			async permissionGetList() {
				await permissionGetList({
					status: 0,
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
					this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) * 20 + 1
					this.searchResult = this.tableData.length
				})
			}
		},
		created() {
			this.permissionGetList()
		}
	};
</script>

<style lang="scss" scoped>
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
