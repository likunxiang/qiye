<template>
	<el-dialog title="添加管制品类名称" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div class="flex flex-center mt20">
			<el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal"
				@keyup.enter.native="search" style="width: 200px;margin-right: 20px;" @clear="search">
				<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
			</el-input>
			<div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
		</div>
		<el-row class="mt20" style="padding-bottom: 50px;">
			<div class="flex jsb flex-center mb10" v-for="(item,index) in tableData" :key="index">
				<div>{{item.categoryName}}</div>
				<el-button v-if="item.addedFlag==1 || item.check==true">已添加</el-button>
				<el-button v-else type="primary" @click="getAddedFlag(index,item.categoryGuid)">添加</el-button>
			</div>
		</el-row>
		<pages @changePage="changePage" :page="page" :total='pageTotal'></pages>
	</el-dialog>
</template>

<script>
	import {
    getCategoryList,
		addCategory,
		getAddedFlag
	} from '@/api/operationRoleApi/catDealManagement.js'
	import {
		getBriefList,
		deleteByCGuid
	} from '@/api/categoryRole/giveClass.js'
	import pages from '@/views/components/common/pages.vue'
	export default {
		name: "index",
		components: {
			pages
		},
		data() {
			return {
				isOpen: true,
				searchVal: '',
				isToSearch: false,
				searchResult: 0,
				tableData: [],
				page: 1,
				pageTotal: 0,
			};
		},
		methods: {
			close() {
				this.isOpen = false
				this.$emit('close')
				this.$emit('refresh')
			},
			beforeClose() {
				this.close()
			},
			search() {
				if (this.searchVal.length > 0) {
					this.isToSearch = true
				} else {
					this.isToSearch = false
				}
				this.page = 1
				this.getCategoryList()
			},
			async getAddedFlag(index,id) {
				await getAddedFlag({
					categoryGuid: id
				}).then(res => {
					console.log(res);
					if (res.Tag[0].Table[0].addedFlag > 0) {
						this.$message({
							type: 'error',
							message: '添加失败,不可重复添加'
						})
					} else {
						this.addCategory(index,id)
					}
				})
			},
			async addCategory(index,id) {
				await addCategory({
					categoryGuid: id,
				}).then(res => {
					console.log(res);
					if (res.Tag[0] > 0) {
						this.$message({
							type: 'success',
							message: '添加成功'
						})
            this.tableData[index].check = true
            this.getCategoryList()
					} else {
						this.$message({
							type: 'error',
							message: '添加失败'
						})
					}
				})
			},
			// web-查询品类信息分页列表
			async getCategoryList() {
				await getCategoryList({
					categoryName: this.searchVal,
					size: '20',
					page: this.page
				}).then(res => {
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
			changePage(page) {
				this.page = page
				this.getCategoryList()
			}
		},
		created() {
			this.getCategoryList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
